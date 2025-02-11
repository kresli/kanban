import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";
import { useGoto } from "src/hooks/useGoto";
import { IconLayoutDashboardFilled, IconPlus } from "@tabler/icons-react";
import { BoardGroupItem } from "./BoardGroupItem";

export function BoardsGroup() {
  const api = useApi();
  const goto = useGoto();
  const boardsQuery = useLiveQuery(() => api.getBoards(), [api]);
  const boards = boardsQuery?.map((board) => (
    <BoardGroupItem key={board.id} board={board} />
  ));
  const onCreateBoard = async () => {
    const boardId = api.generateId();
    await api.createBoard({
      title: "New Board",
      description: "",
    });
    goto.board(boardId);
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex flex-row items-center justify-between space-x-2 px-4 pt-4 pb-3 text-primary-400">
        <IconLayoutDashboardFilled size={20} />
        <p className="flex-1 text-base font-light">Boards</p>
        <button
          className="aspect-square cursor-pointer hover:text-primary-800"
          onClick={onCreateBoard}
        >
          <IconPlus size={16} />
        </button>
      </div>
      <div className="flex w-full flex-1 flex-col gap-1 px-2">{boards}</div>
    </div>
  );
}
