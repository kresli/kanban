import { Box, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { format, parseISO } from "date-fns";
import { Markdown } from "src/components/Markdown";
import { Activity_Card_Comment_Create_Schema } from "src/database/schemas/activity-card-comment-create.schema";

interface Props {
  activity: Activity_Card_Comment_Create_Schema;
}

export function ActivityCommentCreate(props: Props) {
  return (
    <Box
      sx={{
        borderColor: blueGrey[100],
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: "solid",
        bgcolor: "white",
        overflow: "hidden",
      }}
    >
      <Box>
        <Stack
          direction="row"
          spacing={1}
          bgcolor={blueGrey[50]}
          py={1}
          px={2}
          borderBottom={1}
          borderColor="divider"
          alignItems="center"
        >
          <Typography variant="body1">{props.activity.authorId}</Typography>
          <FormatedDate activity={props.activity} />
        </Stack>
        <Markdown
          sx={{
            padding: 2,
          }}
        >
          {props.activity.payload.comment}
        </Markdown>
      </Box>
    </Box>
  );
}

function FormatedDate(props: Props) {
  const friendlyDate = format(
    parseISO(props.activity.createdAt),
    "'on' MMM dd, yyyy"
  );
  return (
    <Typography variant="body2" color="text.secondary">
      {friendlyDate}
    </Typography>
  );
}
