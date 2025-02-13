import { IconPencil } from "@tabler/icons-react";
import classNames from "classnames";
import { useState } from "react";
import { NavLink } from "react-router";
import { Board_Schema } from "src/database/schemas/board.schema";
import { useApi } from "src/hooks/useApi";
import { ROUTE_URL } from "src/utils/route-url";

export function BoardGroupItem(props: { board: Board_Schema }) {
  const [isEdit, setIsEdit] = useState(false);
  const { board } = props;
  const api = useApi();
  const onTitleChange = async (value: string) => {
    await api.board.update({
      id: board.id,
      title: value,
    });
    setIsEdit(false);
  };

  if (isEdit)
    return (
      <EditableTitle defaultTitle={board.title} onChnage={onTitleChange} />
    );

  const to = ROUTE_URL.board(board.id);

  const onClick = (e: React.MouseEvent) => {
    console.log("onDoubleClick");
    e.stopPropagation();
    e.preventDefault();
    setIsEdit(true);
  };

  return (
    <NavLink to={to} className="group w-full no-underline">
      {({ isActive }) => (
        <div
          onDoubleClick={onClick}
          className={classNames(
            "px4 box-border flex cursor-pointer items-center rounded-md border border-transparent px-2 py-1 font-light",
            isActive && "gradient-border",
            !isActive &&
              "text-gray-600 hover:border-secondary-100! hover:bg-white",
          )}
        >
          <span className="flex-1 text-base">{board.title}</span>
          <button
            className="actions invisible cursor-pointer text-primary-400 group-hover:visible hover:text-primary-800"
            onClick={onClick}
          >
            <IconPencil size={16} />
          </button>
        </div>
      )}
    </NavLink>
  );
}

function EditableTitle(props: {
  defaultTitle: string;
  onChnage: (value: string) => void;
}) {
  const [value, setValue] = useState(props.defaultTitle);
  const applyChanges = () => props.onChnage(value);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    applyChanges();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => applyChanges();
  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length);
  };

  return (
    <input
      className="h-[34px] p-2"
      autoFocus
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
}
