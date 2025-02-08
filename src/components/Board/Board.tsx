import { List } from "src/components/List";
import { useApi } from "src/hooks/useApi";
import { useLiveQuery } from "dexie-react-hooks";
import { useCardDraftState } from "src/hooks/useCardDraftState";

export function Board(props: { boardId: string }) {
  const api = useApi();
  const cardDraft = useCardDraftState(api);

  const listsQuery = useLiveQuery(
    () => api.getListByBoardId(props.boardId),
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
    const listId = api.generateId();
    await api.emitActivity({
      activityType: "list_create",
      id: listId,
      authorId: "user",
      createdAt: api.generateDate(),
      payload: {
        authorId: "user",
        boardId: props.boardId,
        title: "New List",
        id: listId,
        createdAt: api.generateDate(),
        position: (listsQuery?.at(-1)?.position ?? 0) + 10,
      },
    });
  };

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="box-border flex h-full w-full items-start justify-start overflow-y-hidden p-2"
    >
      {lists}
      <div className="h-full px-1" onDragOver={onDragOver} onDrop={onDrop}>
        <button
          onClick={onCreateList}
          className="rounded bg-blue-500 p-2 whitespace-nowrap text-white"
        >
          Create new list
        </button>
      </div>
    </div>
  );
}
