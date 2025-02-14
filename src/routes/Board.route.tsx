import { Board } from "src/components/Board";
import { CardDetailsModal } from "src/components/CardDetailsModal";
import { useParams } from "react-router";
import { useApi } from "src/hooks/useApi";
import { useQueryClient } from "react-query";
import { useLiveQuery } from "dexie-react-hooks";
import { Board_Schema } from "src/database/schemas/board.schema";
import { useGoto } from "src/hooks/useGoto";

function useBoardRouteParams() {
  const params = useParams<"board-id" | "card-id">();
  return { boardId: params["board-id"], cardId: params["card-id"] };
}

export function BoardRoute() {
  const db = useApi();
  const queryClient = useQueryClient();
  const { boardId, cardId } = useBoardRouteParams();
  const goto = useGoto();
  if (!boardId && !cardId) throw new Error("No board or card id provided");

  const boardQuery = useLiveQuery(async () => {
    let board: Board_Schema | undefined;
    if (boardId) {
      board = await db.board.getById(boardId);
    } else if (cardId) {
      const card = await db.card.getById(cardId);
      if (!card) throw new Error("Card not found");
      board = await db.board.getByCardId(cardId);
    }
    if (!board) throw new Error("Board not found");
    queryClient.setQueryData(["board", board.id], board);
    return board;
  }, [boardId, cardId, db, queryClient]);

  const board = boardQuery ?? queryClient.getQueryData(["board", boardId]);

  const onModalClose = () => board && goto.board(board.id);

  if (!board) return null;

  return (
    <>
      <Board boardId={board.id} />
      {cardId && (
        <CardDetailsModal
          cardId={cardId}
          isOpen={true}
          onClose={onModalClose}
        />
      )}
    </>
  );
}
