import { Add } from "@mui/icons-material";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router";
import { BASE_URL } from "src/contants";
import { useApi } from "src/hooks/useApi";

export function Mainbar() {
  const db = useApi();
  const navigate = useNavigate();
  const onCreateBoard = async () => {
    const boardId = db.generateId();
    await db.emitActivity({
      id: db.generateId(),
      activityType: "board_create",
      authorId: "user",
      createdAt: db.generateDate(),
      boardId,
      payload: {
        title: "New Board",
        description: "New Board",
        id: boardId,
        authorId: "user",
        createdAt: db.generateDate(),
      },
    });
    navigate(`${BASE_URL}/board/${boardId}`);
  };
  return (
    <Toolbar variant="dense" sx={{ bgcolor: blueGrey[800], color: "white" }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Kanban
      </Typography>
      {/* <Button
        startIcon={<Add />}
        variant="contained"
        color="primary"
        onClick={onCreateBoard}
      >
        Create Board
      </Button> */}
    </Toolbar>
  );
}
