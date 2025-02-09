import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";
import { useGoto } from "src/hooks/useGoto";
import { useState } from "react";
import { Board_Schema } from "src/database/schemas/board.schema";
import { ROUTE_URL } from "src/utils/route-url";
import classNames from "classnames";
import { NavLink } from "react-router";
import {
  IconLayoutDashboardFilled,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
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
    await api.emitActivity({
      activityType: "board_create",
      authorId: "user",
      id: api.generateId(),
      boardId,
      createdAt: api.generateDate(),
      payload: {
        title: "New Board",
        authorId: "user",
        createdAt: api.generateDate(),
        description: "",
        id: boardId,
      },
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
