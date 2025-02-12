import { useState } from "react";
import { Editor } from "src/components/Editor";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";

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
      <button
        className="rounded border border-rim px-3 py-1 text-sm hover:bg-gray-100"
        onClick={props.onCancel}
      >
        Cancel
      </button>
      <button
        className="cursor-pointer rounded border bg-secondary-500 px-3 py-1 text-sm text-white hover:bg-secondary-600"
        onClick={props.onComment}
      >
        Comment
      </button>
    </div>
  );
}
