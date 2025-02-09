import { IconCreditCard, IconX, IconChevronDown } from "@tabler/icons-react";
import { EditableInput } from "./EditableInput";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";
import { useLiveQuery } from "dexie-react-hooks";
import { useBoolean } from "src/hooks/useBoolean";
import { useState } from "react";

export function Header(props: { card: Card_Schema; onClose: () => void }) {
  const db = useApi();
  const onTitleChange = (title: string) =>
    db.emitActivity({
      id: db.generateId(),
      activityType: "card_update",
      authorId: "user",
      cardId: props.card.id,
      createdAt: db.generateDate(),
      payload: {
        title: {
          oldValue: props.card.title,
          newValue: title,
        },
      },
    });
  return (
    <div className="sticky top-0 z-10 rounded-t-md border-b border-rim bg-white p-8 pb-4">
      <Title
        title={props.card.title}
        onTitleChange={onTitleChange}
        onClose={props.onClose}
      />
      <div className="col-start-2 flex-grow">
        <ListPicker card={props.card} />
      </div>
    </div>
  );
}

function Title(props: {
  title: string;
  onTitleChange: (title: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="flex w-full items-center space-x-2">
      <EditableInput
        value={props.title}
        onChange={props.onTitleChange}
        className="text-lg font-semibold"
      />
      <button
        onClick={props.onClose}
        className="cursor-pointer rounded p-1 hover:bg-gray-200"
      >
        <IconX size={16} />
      </button>
    </div>
  );
}

function ListPicker(props: { card: Card_Schema }) {
  const isOpen = useBoolean();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const db = useApi();
  const list = useLiveQuery(
    () => db.getListById(props.card.listId),
    [db, props.card.listId],
  );
  if (!list) return null;
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">in list</span>
      <button
        ref={setAnchorEl}
        className="flex items-center space-x-1 rounded p-1 text-sm font-medium hover:bg-gray-200"
        onClick={isOpen.setTrue}
      >
        <span>{list.title}</span>
        <IconChevronDown size={16} />
      </button>
      {isOpen.value && <ListMenu card={props.card} onClose={isOpen.setFalse} />}
    </div>
  );
}

function ListMenu(props: { card: Card_Schema; onClose: () => void }) {
  const db = useApi();
  const allLists = useLiveQuery(async () => {
    const cardBoard = await db.getBoardByCardId(props.card.id);
    if (!cardBoard) return [];
    return db.getListByBoardId(cardBoard.id);
  }, [db, props.card.id]);

  const onListChange = (listId: string) => {
    db.emitActivity({
      id: db.generateId(),
      activityType: "card_update",
      authorId: "user",
      cardId: props.card.id,
      createdAt: db.generateDate(),
      payload: {
        listId: {
          oldValue: props.card.listId,
          newValue: listId,
        },
      },
    });
    props.onClose();
  };

  return (
    <div className="absolute mt-2 w-48 rounded border bg-white shadow-lg">
      {allLists?.map((list) => (
        <button
          key={list.id}
          className="w-full px-4 py-2 text-left hover:bg-gray-100"
          onClick={() => onListChange(list.id)}
        >
          {list.title}
        </button>
      ))}
    </div>
  );
}
