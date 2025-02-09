import { Edit } from "@mui/icons-material";
import { useRef } from "react";
import { useBoolean } from "src/hooks/useBoolean";
import { useText } from "src/hooks/useText";
import classNames from "classnames";

export function Title(props: {
  onChange: (value: string) => void;
  value: string;
}) {
  const isEditing = useBoolean();
  const text = useText();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      text.setValue(props.value);
      isEditing.setFalse();
      return;
    }
    if (e.key !== "Enter") return;
    if (e.shiftKey) return;
    props.onChange(text.value);
    isEditing.setFalse();
  };

  const onBlur = () => {
    console.log("onBlur");
    props.onChange(text.value);
    isEditing.setFalse();
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    text.setValue(e.target.value);
  };

  const onEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    isEditing.setTrue();
    text.setValue(props.value);
  };

  const ref = useRef<HTMLDivElement>(null);
  const value = isEditing.value ? text.value : props.value;

  const textareaClasses = classNames(
    "w-full resize-none outline-none transition-colors disabled:text-black disabled:pointer-events-none",
    isEditing.value && "border-b border-gray-300",
    !isEditing.value && "border-none bg-transparent",
  );

  return (
    <div className="group relative">
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        className={textareaClasses}
        onClick={(e) => isEditing.value && e.stopPropagation()}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        disabled={!isEditing.value}
        rows={1}
      />
      {!isEditing.value && (
        <button
          onClick={onEditClick}
          className="invisible absolute top-1 right-1 rounded-full bg-white p-1 transition-colors group-hover:visible hover:bg-gray-100"
        >
          <Edit className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
