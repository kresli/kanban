import { Input } from "@mui/material";
import { Card_Schema } from "src/database/schemas/card.schema";
import { UseBoolean } from "src/hooks/useBoolean";
import { useApi } from "src/hooks/useApi";
import { UseText } from "src/hooks/useText";

interface Props {
  card: Card_Schema;
  isEdit: UseBoolean;
  draftTitle: UseText;
}

export function EditableTitle(props: Props) {
  const db = useApi();
  if (!props.isEdit.value) return null;
  const applyChanges = () => {
    db.emitActivity({
      id: db.generateId(),
      activityType: "card_update",
      authorId: "user",
      cardId: props.card.id,
      createdAt: new Date().toISOString(),
      payload: {
        title: {
          oldValue: props.card.title,
          newValue: props.draftTitle.value,
        },
      },
    });
    props.draftTitle.setValue("");
    props.isEdit.setFalse();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    applyChanges();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.draftTitle.setValue(e.target.value);
  };

  const onBlur = () => applyChanges();
  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length);
  };

  return (
    <Input
      autoFocus
      onFocus={onFocus}
      value={props.draftTitle.value}
      onChange={onChange}
      fullWidth
      multiline
      sx={{
        padding: 0,
        lineHeight: 1.5,
      }}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
}
