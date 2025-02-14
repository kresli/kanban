import { Board } from "src/components/Board";
import { CardDetailsModal } from "src/components/CardDetailsModal";
import { useParams } from "react-router";
import { useApi } from "src/hooks/useApi";
import { useQueryClient } from "react-query";
import { useLiveQuery } from "dexie-react-hooks";
import { Board_Schema } from "src/database/schemas/board.schema";
import { useGoto } from "src/hooks/useGoto";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useState } from "react";
import { SecondaryButton } from "src/components/SecondaryButton";
import { PrimaryButton } from "src/components/PrimaryButton";
import classNames from "classnames";

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
      {board.id === "kanban-demo" && <DemoWarning />}
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

function DemoWarning() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="p-2">
        <div className="flex flex-row items-center space-x-2 rounded-md border bg-yellow-400 p-2 text-primary-900">
          <div className="self-start p-1">
            <IconAlertTriangle size={16} />
          </div>
          <span>
            This is a demo board. Any changes will reset to the latest release
            upon app reload. Clone this board to retain your modifications.
          </span>
          <button
            className="cursor-pointer self-start rounded border bg-amber-100 px-2 text-sm whitespace-nowrap text-yellow-800 hover:bg-amber-200"
            onClick={() => setIsModalOpen(true)}
          >
            Clone board
          </button>
        </div>
      </div>
      {isModalOpen && <CloneModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

function CloneModal(props: { onClose: () => void }) {
  const api = useApi();
  const goto = useGoto();
  const [mouseDownOnBackground, setMouseDownOnBackground] = useState(false);
  const onMouseDown = () => setMouseDownOnBackground(true);
  const onMouseUp = () => {
    if (!mouseDownOnBackground) return;
    props.onClose();
    setMouseDownOnBackground(false);
  };
  const [boardName, setBoardName] = useState("");
  const onClone = async () => {
    if (!boardName) return;
    const boardId = await api.board.cloneById("kanban-demo", {
      title: boardName,
    });
    if (!boardId) return;
    goto.board(boardId);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBoardName(e.target.value);
  return (
    <div
      data-testid="card-details"
      className="bg-opacity-50 fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black/30 text-primary-800"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className="absolute top-12 flex w-full items-center justify-center">
        <div
          className="relative mb-24 box-border h-full w-full max-w-3xl items-start justify-center space-y-4 rounded-lg border border-primary-300 bg-white shadow-lg"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="border-b border-rim p-4">
            <h1 className="text-lg">Clone demo board</h1>
            <p className="text-sm text-primary-600">
              This will create a new board with the same content as the demo
              board.
            </p>
          </div>
          <div className="flex flex-col space-y-2 p-4">
            <span className="text-primary-600">Board name</span>
            <input
              autoFocus
              onChange={onChange}
              className={classNames(
                "w-full rounded-md border border-rim px-2 py-1",
                !boardName && "border-red-600! outline-red-600!",
              )}
            />
          </div>
          <div className="flex justify-end space-x-2 p-4">
            <SecondaryButton onClick={props.onClose} text="Cancel" />
            <PrimaryButton onClick={onClone} text="Clone" />
          </div>
        </div>
      </div>
    </div>
  );
}
