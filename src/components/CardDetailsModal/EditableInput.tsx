import { useBoolean } from "src/hooks/useBoolean";
import { useText } from "src/hooks/useText";
import classNames from "classnames";

export function EditableInput(props: {
  onChange: (value: string) => void;
  value: string;
  autoFocus?: boolean;
  className?: string;
}) {
  const isEditing = useBoolean(false);
  const text = useText();

  const onFocus = () => {
    isEditing.setTrue();
    text.setValue(props.value);
  };
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
    props.onChange(text.value);
    isEditing.setFalse();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    text.setValue(e.target.value);
  };

  const value = isEditing.value ? text.value : props.value;

  return (
    <input
      autoFocus={props.autoFocus}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      className={classNames(
        "w-full border-none bg-transparent p-0 leading-snug text-primary-900 focus:outline-none",
        props.className,
      )}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
}
