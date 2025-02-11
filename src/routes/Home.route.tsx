import { useLiveQuery } from "dexie-react-hooks";
import { Board_Schema } from "src/database/schemas/board.schema";
import { useApi } from "src/hooks/useApi";
import { useGoto } from "src/hooks/useGoto";

export function HomeRoute() {
  const db = useApi();
  const boardsQuery = useLiveQuery(() => db.board.getAll(), [db]);
  const boards = boardsQuery?.map((board) => (
    <Board key={board.id} board={board} />
  ));
  return (
    <div className="box-border flex h-full w-full flex-col flex-wrap items-start justify-start gap-2 bg-gray-100 p-4">
      {boards}
    </div>
  );
}

function Board(props: { board: Board_Schema }) {
  const goto = useGoto();
  return (
    <div
      onClick={() => goto.board(props.board.id)}
      className="h-[100px] w-[300px] cursor-pointer rounded-lg bg-white p-4 shadow-md hover:bg-blue-100"
    >
      <p className="m-0 text-lg leading-tight font-medium">
        {props.board.title}
      </p>
    </div>
  );
}
