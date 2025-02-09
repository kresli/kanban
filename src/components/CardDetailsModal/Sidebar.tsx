import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";
import classNames from "classnames";

export function Sidebar(props: { card: Card_Schema; onClose: () => void }) {
  return (
    <div className="flex max-w-[168px] min-w-[168px] flex-row items-start space-x-2">
      <DeleteButton card={props.card} onClick={props.onClose} />
    </div>
  );
}

function DeleteButton(props: { card: Card_Schema; onClick: () => void }) {
  const db = useApi();
  const onClick = () => {
    db.emitActivity({
      id: db.generateId(),
      activityType: "card_delete",
      authorId: "user",
      cardId: props.card.id,
      createdAt: db.generateDate(),
    });
    props.onClick();
  };
  return (
    <button
      className="w-full rounded border border-gray-300 px-3 py-1 text-sm text-blue-500 hover:bg-gray-100"
      onClick={onClick}
    >
      Delete
    </button>
  );
}
