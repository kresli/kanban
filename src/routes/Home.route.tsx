import { Box, Card, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useLiveQuery } from "dexie-react-hooks";
import { Board_Schema } from "src/database/schemas/board.schema";
import { useApi } from "src/hooks/useApi";
import { useGoto } from "src/hooks/useGoto";

export function HomeRoute() {
  const db = useApi();
  const boardsQuery = useLiveQuery(() => db.getBoards(), [db]);
  const boards = boardsQuery?.map((board) => (
    <Board key={board.id} board={board} />
  ));
  return (
    <Box
      sx={{
        bgcolor: blueGrey[50],
        height: "100%",
        width: "100%",
        p: 2,
        boxSizing: "border-box",
        gap: 2,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        justifyItems: "flex-start",
        flexDirection: "column",
      }}
    >
      {boards}
    </Box>
  );
}

function Board(props: { board: Board_Schema }) {
  const goto = useGoto();
  return (
    <Card
      onClick={() => goto.board(props.board.id)}
      sx={{
        cursor: "pointer",
        width: 300,
        ":hover": {
          bgcolor: "primary.light",
        },
        height: 100,
      }}
    >
      <Box p={2}>
        <Typography variant="body1" sx={{ m: 0, lineHeight: 1 }}>
          {props.board.title}
        </Typography>
      </Box>
    </Card>
  );
}
