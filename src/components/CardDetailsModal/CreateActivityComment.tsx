import { useState } from "react";
import { Editor } from "src/components/Editor";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";
import classNames from "classnames";

export function CreateActivityComment(props: { card: Card_Schema }) {
  const db = useApi();
  const [value, setValue] = useState("");
  const isEditing = !!value.length;
  return (
    <div className="flex flex-col gap-2">
      <span className="pl-1 text-sm text-gray-600">Add a comment</span>
      <Editor value={value} onChange={setValue} />
      {isEditing && (
        <EditorActions
          onCancel={() => setValue("")}
          onComment={() => {
            db.emitActivity({
              id: db.generateId(),
              activityType: "card_comment_create",
              authorId: "user",
              cardId: props.card.id,
              createdAt: new Date().toISOString(),
              payload: { comment: value },
            });
            setValue("");
          }}
        />
      )}
    </div>
  );
}

function EditorActions(props: { onCancel: () => void; onComment: () => void }) {
  return (
    <div className="flex justify-end gap-2">
      <button
        className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
        onClick={props.onCancel}
      >
        Cancel
      </button>
      <button
        className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        onClick={props.onComment}
      >
        Comment
      </button>
    </div>
  );
}
