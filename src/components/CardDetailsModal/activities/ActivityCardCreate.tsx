import { Activity_Card_Create_Schema } from "src/database/schemas/activity-card-create.schema";
import { ActivityCard, ActivityTag } from "./ActivityCard";

interface Props {
  activity: Activity_Card_Create_Schema;
}

export function ActivityCardCreate(props: Props) {
  return (
    <ActivityCard activity={props.activity} testid="activity-card-create">
      <ActivityTag color="green">created Card</ActivityTag>
    </ActivityCard>
  );
}
