import {
  alpha,
  Box,
  Divider,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";
import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";
import { ROUTE_URL } from "src/utils/route-url";
import { NavbarGroup } from "./NavbarGroup";
import { NavbarItem } from "./NavbarItem";
import { Add, Edit } from "@mui/icons-material";
import { useGoto } from "src/hooks/useGoto";
import { Board_Schema } from "src/database/schemas/board.schema";
import { useState } from "react";

export function Navbar() {
  return (
    <Box
      sx={{
        width: 260,
        minWidth: 260,
        maxWidth: 260,
        alignItems: "center",
        color: blueGrey[900],
        position: "sticky",
        bgcolor: alpha(blueGrey[200], 0.5),
        backdropFilter: "blur(10px)",
        left: 0,
        zIndex: 1,
        borderRight: "1px solid",
        borderColor: blueGrey[300],
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LogoButton />
      <Divider
        sx={{ my: 1, mt: 0, borderColor: blueGrey[300], width: "100%" }}
      />
      <BoardsGroup />
      <Divider sx={{ my: 1, borderColor: blueGrey[300], width: "100%" }} />
      <NavbarGroup>
        <NavbarItem to={"sa"} title="Activity" />
        <NavbarItem to={"xsa"} title="Settings" />
      </NavbarGroup>
    </Box>
  );
}

function LogoButton() {
  const goto = useGoto();
  const onClick = () => goto.home();
  return (
    <Box
      sx={{
        cursor: "pointer",
        color: blueGrey[900],
        fontWeight: 600,
        ":hover": {
          bgcolor: blueGrey[300],
        },
        display: "flex",
        width: "100%",
        px: 2,
        boxSizing: "border-box",
        py: 1,
      }}
      onClick={onClick}
    >
      <Typography variant="h6">Kanban</Typography>
    </Box>
  );
}

function BoardsGroup() {
  const api = useApi();
  const goto = useGoto();
  const boardsQuery = useLiveQuery(() => api.getBoards(), [api]);
  const boards = boardsQuery?.map((board) => (
    <BoardItem key={board.id} board={board} />
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
  const actions = (
    <IconButton size="small" sx={{ p: 0 }} onClick={onCreateBoard}>
      <Add />
    </IconButton>
  );
  return (
    <NavbarGroup title="BOARDS" sx={{ flex: 1 }} actions={actions}>
      {boards}
    </NavbarGroup>
  );
}

function BoardItem(props: { board: Board_Schema }) {
  const [isEdit, setIsEdit] = useState(false);
  const { board } = props;
  const api = useApi();
  const onTitleChange = async (value: string) => {
    await api.emitActivity({
      activityType: "board_update",
      authorId: "user",
      id: api.generateId(),
      boardId: board.id,
      createdAt: api.generateDate(),
      payload: {
        title: {
          oldValue: board.title,
          newValue: value,
        },
      },
    });
    setIsEdit(false);
  };
  const actions = (
    <IconButton
      size="small"
      sx={{
        p: 0,
        ":hover": {
          color: "white",
        },
      }}
      onClick={() => setIsEdit(true)}
    >
      <Edit />
    </IconButton>
  );
  if (isEdit)
    return (
      <EditableTitle defaultTitle={board.title} onChnage={onTitleChange} />
    );
  return (
    <NavbarItem
      key={board.id}
      to={ROUTE_URL.board(board.id)}
      title={board.title}
      actions={actions}
    />
  );
}

export function EditableTitle(props: {
  defaultTitle: string;
  onChnage: (value: string) => void;
}) {
  const [value, setValue] = useState(props.defaultTitle);
  const applyChanges = () => props.onChnage(value);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    applyChanges();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => applyChanges();
  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length);
  };

  return (
    <Input
      autoFocus
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      fullWidth
      multiline
      sx={{
        padding: 0,
        lineHeight: 1.5,
      }}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
}
