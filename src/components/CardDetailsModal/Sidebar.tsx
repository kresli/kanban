import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";
import { IconCalendar, IconList, IconUser } from "@tabler/icons-react";
import { useLiveQuery } from "dexie-react-hooks";

export function Sidebar(props: { card: Card_Schema; onClose: () => void }) {
  return (
    <div className="flex max-w-[168px] min-w-[168px] flex-col items-start space-y-2">
      <div className="w-full space-y-2 pb-2">
        <ListSelector card={props.card} />
        <div className="flex flex-row items-center space-x-2 px-2 text-sm text-gray-500">
          <IconCalendar size={14} />
          <span>Jan 02, 2022</span>
        </div>
        <div className="flex flex-row items-center space-x-2 px-2 text-sm text-gray-500">
          <IconUser size={14} />
          <span>{props.card.authorId}</span>
        </div>
      </div>
      <div className="w-full border-t border-rim py-2">
        <DeleteButton card={props.card} onClick={props.onClose} />
      </div>
    </div>
  );
}

function ListSelector(props: { card: Card_Schema }) {
  const api = useApi();
  const lists = useLiveQuery(() => api.getLists(), [api]);
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    api.updateCard({ ...props.card, listId: e.target.value });
  };
  return (
    <div className="relative flex w-full appearance-none flex-row items-center justify-center space-x-2 rounded border border-rim bg-primary-50 text-sm font-light text-primary-500 hover:bg-primary-100 focus:bg-primary-100 focus:outline-none active:bg-primary-100 active:outline-none">
      <IconList size={14} className="absolute left-2" />
      <div className="h-full w-full pl-5">
        <select
          value={props.card.listId}
          onChange={onChange}
          className="w-full cursor-pointer appearance-none rounded px-2 py-1 text-sm font-light text-primary-500 hover:bg-primary-100 focus:bg-primary-100 focus:outline-none active:bg-primary-100 active:outline-none"
        >
          {lists?.map((list) => (
            <option key={list.id} value={list.id}>
              {list.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function DeleteButton(props: { card: Card_Schema; onClick: () => void }) {
  const api = useApi();
  const onClick = async () => {
    await api.deleteCard(props.card.id);
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
