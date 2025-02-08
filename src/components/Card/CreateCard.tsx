import { Box, Input } from "@mui/material";
import { CardPaper } from "./CardPaper";
import { Card_Schema } from "src/database/schemas/card.schema";

interface Props {
  cardDraft: Card_Schema;
  onChange: (card: Card_Schema) => void;
  onSubmit: () => void;
}

export function CreateCard(props: Props) {
  if (!props.cardDraft) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    props.onSubmit();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({ ...props.cardDraft, title: e.target.value });
  };

  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length);
  };
  return (
    <CardPaper>
      <Box display="flex" flexDirection="column">
        <Input
          autoFocus
          onFocus={onFocus}
          value={props.cardDraft.title}
          onChange={onChange}
          fullWidth
          multiline
          sx={{
            padding: 0,
            lineHeight: 1.5,
            pointerEvents: "none",
          }}
          onKeyDown={onKeyDown}
          onBlur={props.onSubmit}
        />
      </Box>
    </CardPaper>
  );
}
