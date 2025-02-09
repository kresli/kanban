import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";
import classNames from "classnames";

export function Sidebar(props: { card: Card_Schema; onClose: () => void }) {
  return (
    <div className="flex max-w-[168px] min-w-[168px] flex-col items-start space-y-2">
      <div className="py-2">
        <Author />
      </div>
      <div className="w-full border-t border-rim py-2">
        <DeleteButton card={props.card} onClick={props.onClose} />
      </div>
    </div>
  );
}

function Author() {
  return (
    <div className="flex flex-col items-start px-2">
      <div className="text-sm text-gray-500">Author</div>
      <div className="text-sm font-semibold">User</div>
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
      className="flex w-full cursor-pointer justify-start rounded px-2 py-1 text-sm font-light text-primary-500 hover:bg-gray-100"
      onClick={onClick}
    >
      Delete
    </button>
  );
}
