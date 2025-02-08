import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { CreditCard, Close, ArrowDropDown } from "@mui/icons-material";
import { EditableInput } from "./EditableInput";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";
import { useLiveQuery } from "dexie-react-hooks";
import { UseBoolean, useBoolean } from "src/hooks/useBoolean";
import { useState } from "react";

const rootSx: SxProps = {
  display: "grid",
  gridTemplateColumns: "[icon] 40px [body] minmax(0, 1fr)",
  rowGap: 0,
};

const cardSx: SxProps = {
  display: "flex",
  alignSelf: "flex-start",
  justifySelf: "center",
  mt: 0.8,
};

export function Header(props: { card: Card_Schema; onClose: () => void }) {
  const db = useApi();
  const onTitleChange = (title: string) =>
    db.emitActivity({
      id: db.generateId(),
      activityType: "card_update",
      authorId: "user",
      cardId: props.card.id,
      createdAt: db.generateDate(),
      payload: {
        title: {
          oldValue: props.card.title,
          newValue: title,
        },
      },
    });
  return (
    <Box sx={rootSx}>
      <CreditCard sx={cardSx} />
      <Stack direction="row" spacing={2} alignItems="center" width="100%">
        <EditableInput
          value={props.card.title}
          onChange={onTitleChange}
          sx={{ fontSize: "h6.fontSize" }}
        />
        <IconButton onClick={props.onClose} size="small">
          <Close />
        </IconButton>
      </Stack>
      <Stack flexGrow={1} style={{ gridColumnStart: "body" }}>
        <ListPicker card={props.card} />
      </Stack>
    </Box>
  );
}

function ListPicker(props: { card: Card_Schema }) {
  const isOpen = useBoolean();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const db = useApi();
  const list = useLiveQuery(
    () => db.getListById(props.card.listId),
    [db, props.card.listId]
  );
  if (!list) return null;
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="body2" color="text.secondary" paddingBottom={0.3}>
        in list
      </Typography>
      <Button
        ref={setAnchorEl}
        size="small"
        variant="text"
        onClick={isOpen.setTrue}
        endIcon={<ArrowDropDown />}
      >
        {list.title}
      </Button>
      <ListMenu card={props.card} anchorEl={anchorEl} isOpen={isOpen} />
    </Stack>
  );
}

function ListMenu(props: {
  card: Card_Schema;
  anchorEl: HTMLButtonElement | null;
  isOpen: UseBoolean;
}) {
  const db = useApi();

  const allLists = useLiveQuery(async () => {
    const cardBoard = await db.getBoardByCardId(props.card.id);
    if (!cardBoard) return [];
    return db.getListByBoardId(cardBoard.id);
  }, [db, props.card.id]);

  const cards = useLiveQuery(
    () => db.getCardByListId(props.card.listId),
    [db, props.card.listId]
  );
  const lists = allLists?.map((list) => (
    <MenuItem value={list.id} key={list.id}>
      {list.title}
    </MenuItem>
  ));
  const positions = cards?.map((_, i) => {
    return (
      <MenuItem value={i} key={i}>
        {i + 1}
      </MenuItem>
    );
  });
  const list = allLists?.find((list) => list.id === props.card.listId);

  const onListChange = (e: SelectChangeEvent<string>) => {
    db.emitActivity({
      id: db.generateId(),
      activityType: "card_update",
      authorId: "user",
      cardId: props.card.id,
      createdAt: db.generateDate(),
      payload: {
        listId: {
          oldValue: props.card.listId,
          newValue: e.target.value,
        },
      },
    });
  };

  const onPositionChange = (e: SelectChangeEvent<string>) => {
    const position = parseInt(e.target.value);
    db.emitActivity({
      id: db.generateId(),
      activityType: "card_update",
      authorId: "user",
      cardId: props.card.id,
      createdAt: db.generateDate(),
      payload: {
        position: {
          oldValue: props.card.position,
          newValue: position,
        },
      },
    });
  };

  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.isOpen.value}
      onClose={props.isOpen.setFalse}
    >
      <Box p={1}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>List</InputLabel>
          <Select value={list?.id} onChange={onListChange} label="List">
            {lists}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Position</InputLabel>
          <Select
            value={`${getCardIndex(cards, props.card.id)}`}
            onChange={onPositionChange}
            label="Position"
          >
            {positions}
          </Select>
        </FormControl>
      </Box>
    </Menu>
  );
}

function getCardIndex(cards: Card_Schema[] = [], cardId: string) {
  return cards.findIndex((card) => card.id === cardId);
}
