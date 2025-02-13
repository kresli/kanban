import { IconDots } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Markdown } from "src/components/Markdown";
import {
  Comment_Commit_Create_Schema,
  Comment_Commit_Update_Schema,
  Comment_Schema,
} from "src/database/schemas/comment.schema";
import { Editor } from "../Editor";
import { useApi } from "src/hooks/useApi";
import { useLiveQuery } from "dexie-react-hooks";
import { Menu } from "src/components/Menu";
import { useFormatDate } from "src/hooks/useFormatDate";

interface Props {
  comment: Comment_Schema;
}

export function Comment(props: Props) {
  const api = useApi();
  const [editedText, setEditedText] = useState<string | null>(null);
  const isEditing = editedText !== null;

  const versions = useLiveQuery(
    () => api.comment.getVersions(props.comment.id),
    [api.comment, props.comment.id],
  );
  const onSubmit = async (text: string) => {
    if (!editedText || editedText === props.comment.text) {
      setEditedText(null);
      return;
    }
    await api.comment.update(props.comment.id, {
      text,
    });
    setEditedText(null);
  };
  const edits =
    versions?.length && versions.length <= 1 ? null : (
      <Edits versions={versions ?? []} />
    );
  return (
    <div
      data-testid="activity-comment-create"
      className="overflow-hidden rounded-lg border border-rim bg-white"
    >
      <div>
        <div className="flex items-center space-x-2 border-b border-rim bg-primary-100 py-2 pr-2 pl-4">
          <span className="text-sm font-medium">{props.comment.authorId}</span>
          <FormatedDate comment={props.comment} />
          <div className="flex flex-1" />
          {edits}
          <CardOptionsButton onEdit={() => setEditedText(props.comment.text)} />
        </div>
        {!isEditing && (
          <div className="p-4">
            <Markdown>{props.comment.text}</Markdown>
          </div>
        )}
        {isEditing && (
          <UpdateEditor
            onSubmit={onSubmit}
            editedText={editedText}
            setEditedText={setEditedText}
            onCancel={() => setEditedText(null)}
          />
        )}
      </div>
    </div>
  );
}

function UpdateEditor(props: {
  onSubmit: (text: string) => void;
  editedText: string;
  setEditedText: (text: string) => void;
  onCancel: () => void;
}) {
  const { onSubmit, editedText, setEditedText } = props;
  return (
    <div className="flex flex-col gap-2 p-2">
      <Editor
        value={editedText}
        onChange={setEditedText}
        onSubmit={onSubmit}
        autoFocus
      />
      <EditorActions
        onCancel={props.onCancel}
        onComment={() => onSubmit(editedText)}
      />
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
        Update comment
      </button>
    </div>
  );
}

function Edits(props: {
  versions: (Comment_Commit_Update_Schema | Comment_Commit_Create_Schema)[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const sorted = useMemo(
    () => props.versions.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)),
    [props.versions],
  );
  return (
    <Menu isOpen={isOpen} onOpenChange={setIsOpen}>
      <Menu.Trigger className="flex cursor-pointer items-center rounded p-1 px-2 text-xs text-primary-400 hover:bg-primary-200">
        Edits
      </Menu.Trigger>
      <Menu.Content>
        <div className="space-y-1 p-1">
          {sorted.map((version, i) => (
            <Version key={version.id} version={version} current={i === 0} />
          ))}
        </div>
      </Menu.Content>
    </Menu>
  );
}

function Version(props: {
  version: Comment_Commit_Update_Schema | Comment_Commit_Create_Schema;
  current: boolean;
}) {
  const formatedDate = useFormatDate(props.version.createdAt);
  return (
    <div className="flex items-center justify-start space-x-2 text-sm text-primary-800">
      <span>{props.version.authorId}</span>
      <span className="text-primary-400">{formatedDate}</span>
      {props.current && (
        <span className="rounded border bg-secondary-50 px-2 text-secondary-400">
          Current
        </span>
      )}
    </div>
  );
}

function CardOptionsButton(props: { onEdit: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const onEdit = () => {
    props.onEdit();
    setIsOpen(false);
  };

  return (
    <Menu isOpen={isOpen} onOpenChange={setIsOpen}>
      <Menu.Trigger className="cursor-pointer rounded p-1 text-sm text-primary-400 hover:bg-primary-200">
        <IconDots size={16} />
      </Menu.Trigger>
      <Menu.Content>
        <OptionItem onClick={onEdit}>Edit</OptionItem>
        <OptionItem onClick={() => alert("Delete")}>Delete</OptionItem>
      </Menu.Content>
    </Menu>
  );
}

function OptionItem(props: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      className="block w-full cursor-pointer rounded-md p-1 px-2 text-left text-sm text-primary-800 hover:bg-primary-100"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

function FormatedDate(props: Props) {
  const friendlyDate = useFormatDate(props.comment.createdAt);
  return <span className="text-sm text-gray-500">{friendlyDate}</span>;
}
