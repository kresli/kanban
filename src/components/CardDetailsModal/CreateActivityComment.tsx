import { useState } from "react";
import { Editor } from "src/components/Editor";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";
import { PrimaryButton } from "../PrimaryButton";
import { SecondaryButton } from "../SecondaryButton";

export function CreateActivityComment(props: { card: Card_Schema }) {
  const api = useApi();
  const [value, setValue] = useState("");
  const isEditing = !!value.length;
  const onSubmit = async (submitValue: string) => {
    await api.comment.create({
      cardId: props.card.id,
      comment: submitValue,
    });
    setValue("");
  };
  return (
    <div className="flex flex-col gap-2 bg-white">
      <Editor value={value} onChange={setValue} onSubmit={onSubmit} />
      {isEditing && (
        <EditorActions
          onCancel={() => setValue("")}
          onComment={() => onSubmit(value)}
        />
      )}
    </div>
  );
}

function EditorActions(props: { onCancel: () => void; onComment: () => void }) {
  return (
    <div className="flex justify-end gap-2">
      <SecondaryButton onClick={props.onCancel} text="Cancel" />
      <PrimaryButton onClick={props.onComment} text="Comment" />
    </div>
  );
}
