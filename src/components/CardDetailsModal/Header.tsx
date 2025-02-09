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
    <div className="sticky top-0 z-10 rounded-t-md border-b border-rim bg-white p-8">
      <Title
        title={props.card.title}
        onTitleChange={onTitleChange}
        onClose={props.onClose}
      />
    </div>
  );
}

function Title(props: {
  title: string;
  onTitleChange: (title: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="flex w-full items-start space-x-2">
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
