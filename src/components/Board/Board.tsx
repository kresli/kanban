import { Box, Button } from "@mui/material";
import { List } from "src/components/List";
import { useApi } from "src/hooks/useApi";
import { useLiveQuery } from "dexie-react-hooks";
import { useCardDraftState } from "src/hooks/useCardDraftState";

export function Board(props: { boardId: string }) {
  const api = useApi();
  const cardDraft = useCardDraftState(api);

  const listsQuery = useLiveQuery(
    () => api.getListByBoardId(props.boardId),
    [api, props.boardId]
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
    <Box
      onDragOver={onDragOver}
      onDrop={onDrop}
      display="flex"
      boxSizing="border-box"
      width="100%"
      height="100%"
      justifyContent="flex-start"
      alignItems="flex-start"
      p={2}
      sx={{
        // overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      {lists}
      <Box
        height="100%"
        paddingLeft={1}
        paddingRight={1}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Button onClick={onCreateList} sx={{ textWrap: "nowrap" }}>
          Create new list
        </Button>
      </Box>
    </Box>
  );
}
