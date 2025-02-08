import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";
import { ROUTE_URL } from "src/utils/route-url";
import { NavbarItem } from "./NavbarItem";
import { useGoto } from "src/hooks/useGoto";
import { Board_Schema } from "src/database/schemas/board.schema";
import { PropsWithChildren, useState } from "react";

export function Navbar() {
  return (
    <div className="bg-opacity-50 w-min-w-56 max-w-min-w-56 sticky left-0 z-10 flex h-full min-w-56 flex-col border-r border-gray-200 bg-gray-50 backdrop-blur">
      <LogoButton />
      <Divider />
      <BoardsGroup />
      <Divider />
      <NavbarGroup>
        <NavbarItem to={"sa"} title="Activity" />
        <NavbarItem to={"xsa"} title="Settings" />
      </NavbarGroup>
    </div>
  );
}

function Divider() {
  return <div className="w-full border-t border-gray-200" />;
}

function LogoButton() {
  const goto = useGoto();
  const onClick = () => goto.home();
  return (
    <div
      className="flex h-12 w-full cursor-pointer items-center justify-center font-semibold text-blue-900 hover:bg-blue-200"
      onClick={onClick}
    >
      <p>Kanban</p>
    </div>
  );
}

function BoardsGroup() {
  const api = useApi();
  const goto = useGoto();
  const boardsQuery = useLiveQuery(() => api.getBoards(), [api]);
  const boards = boardsQuery?.map((board) => (
    <BoardItem key={board.id} board={board} />
  ));
  const onCreateBoard = async () => {
    const boardId = api.generateId();
    await api.emitActivity({
      activityType: "board_create",
      authorId: "user",
      id: api.generateId(),
      boardId,
      createdAt: api.generateDate(),
      payload: {
        title: "New Board",
        authorId: "user",
        createdAt: api.generateDate(),
        description: "",
        id: boardId,
      },
    });
    goto.board(boardId);
  };
  const actions = (
    <button className="p-2" onClick={onCreateBoard}>
      Add
    </button>
  );

  return (
    <div className="flex w-full flex-1 flex-col">
      <NavbarTitle title="Boards" actions={actions} />
      <div className="flex w-full flex-1 flex-col">{boards}</div>
    </div>
  );
}

function BoardItem(props: { board: Board_Schema }) {
  const [isEdit, setIsEdit] = useState(false);
  const { board } = props;
  const api = useApi();
  const onTitleChange = async (value: string) => {
    await api.emitActivity({
      activityType: "board_update",
      authorId: "user",
      id: api.generateId(),
      boardId: board.id,
      createdAt: api.generateDate(),
      payload: {
        title: {
          oldValue: board.title,
          newValue: value,
        },
      },
    });
    setIsEdit(false);
  };
  const actions = <button onClick={() => setIsEdit(true)}>Edit</button>;

  if (isEdit)
    return (
      <EditableTitle defaultTitle={board.title} onChnage={onTitleChange} />
    );

  return (
    <NavbarItem
      key={board.id}
      to={ROUTE_URL.board(board.id)}
      title={board.title}
      actions={actions}
    />
  );
}

export function EditableTitle(props: {
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
      autoFocus
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
}

function NavbarGroup(
  props: PropsWithChildren<{
    title?: string;
    actions?: React.ReactNode;
  }>,
) {
  return (
    <div className="flex w-full flex-col">
      {props.title && (
        <div className="flex flex-row items-center justify-between px-2 py-1">
          <p className="text">{props.title}</p>
          {props.actions}
        </div>
      )}
      <div className="w-full">{props.children}</div>
    </div>
  );
}

function NavbarTitle(props: { title: string; actions: React.ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-between px-2 py-1">
      <p className="text-base">{props.title}</p>
      {props.actions}
    </div>
  );
}
