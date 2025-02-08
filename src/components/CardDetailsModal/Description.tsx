import { Subject, Edit } from "@mui/icons-material";
import { Box, Button, Stack, SxProps, Typography } from "@mui/material";
import { Editor } from "../Editor";
import { Markdown } from "src/components/Markdown";
import { UseBoolean, useBoolean } from "src/hooks/useBoolean";
import { UseText, useText } from "src/hooks/useText";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";

interface Props {
  card: Card_Schema;
}

export function Description(props: Props) {
  const iconSx: SxProps = {
    display: "flex",
    alignSelf: "center",
    justifySelf: "center",
  };
  const rootSx: SxProps = {
    display: "grid",
    gridTemplateColumns: "[icon] 40px [body] minmax(0, 1fr)",
    rowGap: 1,
    "&:hover .edit-button": {
      visibility: "visible",
    },
  };
  const isEditing = useBoolean();
  const editText = useText();
  return (
    <Box sx={rootSx}>
      <Subject sx={iconSx} />
      <Header editText={editText} isEditing={isEditing} card={props.card} />
      <Content card={props.card} isEditing={isEditing} editText={editText} />
      {isEditing.value && (
        <EditorActions
          card={props.card}
          isEditing={isEditing}
          editText={editText}
        />
      )}
    </Box>
  );
}

function Header(props: {
  editText: UseText;
  isEditing: UseBoolean;
  card: Card_Schema;
}) {
  const { editText, isEditing, card: card } = props;
  const onEdit = () => {
    editText.setValue(card.description);
    isEditing.setTrue();
  };
  return (
    <Stack direction="row" spacing={2} alignItems="center" width="100%">
      <Typography variant="h6" fontSize={16} flex={1}>
        Description
      </Typography>
      {!isEditing.value && <EditButton onClick={onEdit} />}
    </Stack>
  );
}

function EditorActions(props: {
  card: Card_Schema;
  isEditing: UseBoolean;
  editText: UseText;
}) {
  const db = useApi();
  const onSave = () => {
    db.emitActivity({
      id: db.generateId(),
      activityType: "card_update",
      authorId: "user",
      cardId: props.card.id,
      createdAt: db.generateDate(),
      payload: {
        description: {
          oldValue: props.card.description,
          newValue: props.editText.value,
        },
      },
    });
    props.isEditing.setFalse();
  };
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      gap={1}
      sx={{ gridColumnStart: "body" }}
    >
      <Button
        variant="outlined"
        size="small"
        onClick={props.isEditing.setFalse}
      >
        Cancel
      </Button>
      <Button variant="contained" size="small" onClick={onSave}>
        Save
      </Button>
    </Box>
  );
}

function Content(props: {
  card: Card_Schema;
  isEditing: UseBoolean;
  editText: UseText;
}) {
  const sx: SxProps = {
    gridColumnStart: "body",
    fontFamily: "body1.fontFamily",
  };
  const onDoubleClick = () => {
    props.editText.setValue(props.card.description);
    props.isEditing.setTrue();
  };
  if (props.isEditing.value) {
    return (
      <Box sx={sx}>
        <Editor
          value={props.editText.value}
          onChange={props.editText.setValue}
          autoFocus
        />
      </Box>
    );
  }
  return (
    <Box sx={sx} onDoubleClick={onDoubleClick}>
      <Markdown>{props.card.description}</Markdown>
    </Box>
  );
}

function EditButton(props: { onClick: () => void }) {
  return (
    <Button
      className="edit-button"
      variant="text"
      size="small"
      style={{ gridColumnStart: "body" }}
      startIcon={<Edit />}
      onClick={props.onClick}
      sx={{
        visibility: "hidden",
      }}
    >
      Edit
    </Button>
  );
}
