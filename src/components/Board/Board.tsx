import { List } from "src/components/List";
import { useApi } from "src/hooks/useApi";
import { useLiveQuery } from "dexie-react-hooks";
import { useCardDraftState } from "src/hooks/useCardDraftState";

export function Board(props: { boardId: string }) {
  const api = useApi();
  const cardDraft = useCardDraftState(api);

  const listsQuery = useLiveQuery(
    () => api.list.getByBoardId(props.boardId),
    [api, props.boardId],
  );
  const lists = listsQuery?.map((list) => (
    <List key={list.id} listId={list.id} cardDraft={cardDraft} />
  ));

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    cardDraft.clearCard();
  };

  const onCreateList = async () => {
    await api.list.create({
      title: "New List",
      boardId: props.boardId,
    });
  };

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="box-border flex h-full w-full items-start justify-start overflow-y-hidden p-4"
    >
      {lists}
      <div
        className="h-full max-w-[275px] min-w-[275px] px-1"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <button
          onClick={onCreateList}
          className="bg-whie w-full cursor-pointer rounded border border-primary-200 p-2 text-sm whitespace-nowrap text-primary-600 hover:border-primary-300 hover:bg-secondary-50"
        >
          Create new list
        </button>
      </div>
    </div>
  );
}
