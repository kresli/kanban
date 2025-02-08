import { Stack, Button } from "@mui/material";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";

export function Sidebar(props: { card: Card_Schema; onClose: () => void }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      minWidth={168}
      maxWidth={168}
      alignItems="flex-start"
    >
      <DeleteButton card={props.card} onClick={props.onClose} />
    </Stack>
  );
}

function DeleteButton(props: { card: Card_Schema; onClick: () => void }) {
  const db = useApi();
  const onClick = () => {
    db.emitActivity({
      id: db.generateId(),
      activityType: "card_delete",
      authorId: "user",
      cardId: props.card.id,
      createdAt: db.generateDate(),
    });
    props.onClick();
  };
  return (
    <Button
      variant="outlined"
      color="primary"
      fullWidth
      size="small"
      onClick={onClick}
    >
      Delete
    </Button>
  );
}
