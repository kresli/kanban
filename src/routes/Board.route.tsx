import { Board } from "src/components/Board";
import { CardDetailsModal } from "src/components/CardDetailsModal";
import { useNavigate, useParams } from "react-router";
import { useApi } from "src/hooks/useApi";
import { useQueryClient } from "react-query";
import { useLiveQuery } from "dexie-react-hooks";
import { BASE_URL } from "src/contants";
import { Board_Schema } from "src/database/schemas/board.schema";

function useBoardRouteParams() {
  const params = useParams<"board-id" | "card-id">();
  return { boardId: params["board-id"], cardId: params["card-id"] };
}

export function BoardRoute() {
  const db = useApi();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { boardId, cardId } = useBoardRouteParams();
  if (!boardId && !cardId) throw new Error("No board or card id provided");

  const boardQuery = useLiveQuery(async () => {
    let board: Board_Schema | undefined;
    if (boardId) {
      board = await db.getBoardById(boardId);
    } else if (cardId) {
      board = await db.getBoardByCardId(cardId);
    }
    if (!board) throw new Error("Board not found");
    queryClient.setQueryData(["board", board.id], board);
    return board;
  }, [boardId, cardId, db, queryClient]);

  const board = boardQuery ?? queryClient.getQueryData(["board", boardId]);

  const onModalClose = () => navigate(`${BASE_URL}/board/${board?.id}`);

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
