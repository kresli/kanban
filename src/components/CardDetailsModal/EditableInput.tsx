import { useBoolean } from "src/hooks/useBoolean";
import { useText } from "src/hooks/useText";
import { useLayoutEffect, useRef } from "react";
import { useApi } from "src/hooks/useApi";
import { Card_Schema } from "src/database/schemas/card.schema";

export function EditableInput(props: { card: Card_Schema }) {
  const api = useApi();
  const isEditing = useBoolean(false);
  const text = useText();
  const title = props.card.title;

  const onFocus = () => {
    isEditing.setTrue();
    text.setValue(title);
  };

  const onSubmit = async () => {
    const trimmedValue = text.value.trim().trimStart();
    if (!trimmedValue || trimmedValue === title) {
      isEditing.setFalse();
      text.setValue("");
    } else {
      await api.card.update(props.card.id, { title: trimmedValue });
      isEditing.setFalse();
      text.setValue("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      text.setValue(title);
      isEditing.setFalse();
      return;
    }
    if (e.key !== "Enter") return;
    if (e.shiftKey) return;
    textareaRef.current?.blur();
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    text.setValue(e.target.value);
  };

  const value = isEditing.value ? text.value : title;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text.value]);

  return (
    <textarea
      ref={textareaRef}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      className="w-full resize-none border-none bg-transparent p-0 text-lg leading-snug font-semibold text-primary-900 focus:outline-none"
      rows={1}
      onKeyDown={onKeyDown}
      onBlur={onSubmit}
    />
  );
}
