import { IconEdit, IconFileText } from "@tabler/icons-react";
import { useBoolean } from "src/hooks/useBoolean";
import { useText } from "src/hooks/useText";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";
import classNames from "classnames";
import { Editor } from "../Editor";
import { Markdown } from "src/components/Markdown";

interface Props {
  card: Card_Schema;
}

export function Description(props: Props) {
  const isEditing = useBoolean();
  const editText = useText();

  return (
    <div className="hover:edit-button:visible grid grid-cols-[40px_minmax(0,1fr)] gap-2">
      <IconFileText className="self-center justify-self-center text-primary-600" />
      <Header editText={editText} isEditing={isEditing} card={props.card} />
      <Content card={props.card} isEditing={isEditing} editText={editText} />
      {isEditing.value && (
        <EditorActions
          card={props.card}
          isEditing={isEditing}
          editText={editText}
        />
      )}
    </div>
  );
}

function Header(props: {
  editText: ReturnType<typeof useText>;
  isEditing: ReturnType<typeof useBoolean>;
  card: Card_Schema;
}) {
  const { editText, isEditing, card } = props;
  const onEdit = () => {
    editText.setValue(card.description);
    isEditing.setTrue();
  };
  return (
    <div className="flex w-full items-center space-x-2">
      <span className="flex-1 text-lg font-semibold text-primary-600">
        Description
      </span>
      {!isEditing.value && <EditButton onClick={onEdit} />}
    </div>
  );
}

function EditorActions(props: {
  card: Card_Schema;
  isEditing: ReturnType<typeof useBoolean>;
  editText: ReturnType<typeof useText>;
}) {
  const db = useApi();
  const onSave = () => {
    db.emitActivity({
      id: db.generateId(),
      activityType: "card_update",
      authorId: "user",
      cardId: props.card.id,
      createdAt: db.generateDate(),
      payload: {
        description: {
          oldValue: props.card.description,
          newValue: props.editText.value,
        },
      },
    });
    props.isEditing.setFalse();
  };
  return (
    <div className="col-start-2 flex justify-end gap-2">
      <button
        className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
        onClick={props.isEditing.setFalse}
      >
        Cancel
      </button>
      <button
        className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
}

function Content(props: {
  card: Card_Schema;
  isEditing: ReturnType<typeof useBoolean>;
  editText: ReturnType<typeof useText>;
}) {
  const onDoubleClick = () => {
    props.editText.setValue(props.card.description);
    props.isEditing.setTrue();
  };
  if (props.isEditing.value) {
    return (
      <div className="col-start-2">
        <Editor
          value={props.editText.value}
          onChange={props.editText.setValue}
          autoFocus
        />
      </div>
    );
  }
  return (
    <div className="col-start-2" onDoubleClick={onDoubleClick}>
      <Markdown>{props.card.description}</Markdown>
    </div>
  );
}

function EditButton(props: { onClick: () => void }) {
  return (
    <button
      className="edit-button flex items-center space-x-1 border border-transparent px-2 py-1 text-sm hover:bg-gray-100"
      onClick={props.onClick}
    >
      <IconEdit size={16} />
      <span>Edit</span>
    </button>
  );
}
