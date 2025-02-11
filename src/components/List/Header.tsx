import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";

interface Props {
  listId: string;
}

export function Header(props: Props) {
  const db = useApi();
  const list = useLiveQuery(
    () => db.list.getById(props.listId),
    [db, props.listId],
  );
  return (
    <h3 className="p-2 text-center font-semibold text-primary-600">
      {list?.title}
    </h3>
  );
}
