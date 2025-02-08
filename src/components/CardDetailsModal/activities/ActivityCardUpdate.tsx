import { Typography } from "@mui/material";
import { ActivityCard } from "./ActivityCard";
import { Activity_Card_Update_Schema } from "src/database/schemas/activity-card-update.schema";

interface Props {
  activity: Activity_Card_Update_Schema;
}

type AccpetedFields = keyof Activity_Card_Update_Schema["payload"];

export function ActivityCardUpdate(props: Props) {
  const changesText = Object.keys(props.activity.payload)
    .map((key) => localize(key as AccpetedFields))
    .filter(Boolean)
    .join(", ");
  return (
    <ActivityCard activity={props.activity} activityType="changed">
      <Typography variant="body1">{changesText}</Typography>
    </ActivityCard>
  );
}

function localize(text: AccpetedFields) {
  switch (text) {
    case "listId":
      return "List";
    case "position":
      return false;
    case "title":
      return "Title";
    case "description":
      return "Description";
    default:
      return text;
  }
}
