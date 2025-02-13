import { IconX } from "@tabler/icons-react";
import { EditableInput } from "./EditableInput";
import { Card_Schema } from "src/database/schemas/card.schema";

export function Header(props: { card: Card_Schema; onClose: () => void }) {
  return (
    <div className="sticky top-0 z-10 rounded-t-md border-b border-rim bg-white p-8">
      <Title card={props.card} onClose={props.onClose} />
    </div>
  );
}

function Title(props: { card: Card_Schema; onClose: () => void }) {
  return (
    <div className="flex w-full items-start space-x-2">
      <EditableInput card={props.card} />
      <button
        onClick={props.onClose}
        className="cursor-pointer rounded p-1 hover:bg-gray-200"
      >
        <IconX size={16} />
      </button>
    </div>
  );
}
