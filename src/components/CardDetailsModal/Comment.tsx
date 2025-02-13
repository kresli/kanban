import {
  useFloating,
  offset,
  flip,
  shift,
  FloatingPortal,
  autoUpdate,
  useInteractions,
  useDismiss,
  useClick,
  FloatingFocusManager,
} from "@floating-ui/react";
import { IconDots } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { Markdown } from "src/components/Markdown";
import { Comment_Schema } from "src/database/schemas/comment.schema";
import { Editor } from "../Editor";
import { useApi } from "src/hooks/useApi";
import { useLiveQuery } from "dexie-react-hooks";

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
  console.log(versions);
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
  return (
    <div
      data-testid="activity-comment-create"
      className="overflow-hidden rounded-lg border border-rim bg-white"
    >
      <div>
        <div className="flex items-center space-x-2 border-b border-rim bg-primary-100 py-2 pr-2 pl-4">
          <span className="text-base font-medium">
            {props.comment.authorId}
          </span>
          <FormatedDate comment={props.comment} />
          <div className="flex flex-1" />
          <CardOptionsButton onEdit={() => setEditedText(props.comment.text)} />
        </div>
        {!isEditing && (
          <div className="p-4">
            <Markdown>{props.comment.text}</Markdown>
          </div>
        )}
        {isEditing && (
          <div className="p-2">
            <Editor
              value={editedText}
              onChange={setEditedText}
              onSubmit={onSubmit}
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Edits() {}

function CardOptionsButton(props: { onEdit: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
    onOpenChange: setIsOpen,
    open: isOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const onEdit = () => {
    props.onEdit();
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="cursor-pointer rounded p-1 hover:bg-primary-200"
      >
        <IconDots size={16} />
      </button>

      {isOpen && (
        <FloatingPortal>
          <menu
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: 50,
            }}
            className="absolute min-w-[120px] rounded-lg border border-rim bg-white p-2 shadow-lg"
          >
            <OptionItem onClick={onEdit}>Edit</OptionItem>
            <OptionItem onClick={() => alert("Delete")}>Delete</OptionItem>
          </menu>
        </FloatingPortal>
      )}
    </>
  );
}

function useFloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, refs, strategy } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return { x, y, refs, strategy, toggleMenu, isOpen };
}

function OptionItem(props: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      className="block w-full cursor-pointer rounded-md p-1 px-2 text-left hover:bg-primary-100"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

function FormatedDate(props: Props) {
  const friendlyDate = format(
    parseISO(props.comment.createdAt),
    "'on' MMM dd, yyyy",
  );
  return <span className="text-sm text-gray-500">{friendlyDate}</span>;
}
