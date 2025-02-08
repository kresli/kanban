import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Editor } from "src/components/Editor";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";

export function CreateActivityComment(props: { card: Card_Schema }) {
  const db = useApi();
  const [value, setValue] = useState("");
  const isEditing = !!value.length;
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="body2" color="text.secondary" pl={1}>
        Add a comment
      </Typography>
      <Editor value={value} onChange={setValue} />
      {isEditing && (
        <EditorActions
          onCancel={() => setValue("")}
          onComment={() => {
            db.emitActivity({
              id: db.generateId(),
              activityType: "card_comment_create",
              authorId: "user",
              cardId: props.card.id,
              createdAt: new Date().toISOString(),
              payload: { comment: value },
            });
            setValue("");
          }}
        />
      )}
    </Box>
  );
}

function EditorActions(props: { onCancel: () => void; onComment: () => void }) {
  return (
    <Box display="flex" justifyContent="flex-end" gap={1}>
      <Button variant="outlined" size="small" onClick={props.onCancel}>
        Cancel
      </Button>
      <Button variant="contained" size="small" onClick={props.onComment}>
        Comment
      </Button>
    </Box>
  );
}
