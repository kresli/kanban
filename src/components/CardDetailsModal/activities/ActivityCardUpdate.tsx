import { ActivityCard } from "./ActivityCard";
import { Activity_Card_Update_Schema } from "src/database/schemas/activity-card-update.schema";

interface Props {
  activity: Activity_Card_Update_Schema;
}

type AcceptedFields = keyof Activity_Card_Update_Schema["payload"];

export function ActivityCardUpdate(props: Props) {
  const changesText = Object.keys(props.activity.payload)
    .map((key) => localize(key as AcceptedFields))
    .filter(Boolean)
    .join(", ");
  return (
    <ActivityCard activity={props.activity} activityType="changed">
      <span className="text-base">{changesText}</span>
    </ActivityCard>
  );
}

function localize(text: AcceptedFields) {
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
