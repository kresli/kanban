import { Activity_Card_Create_Schema } from "src/database/schemas/activity-card-create.schema";
import { ActivityCard } from "./ActivityCard";

interface Props {
  activity: Activity_Card_Create_Schema;
}

export function ActivityCardCreate(props: Props) {
  return (
    <ActivityCard activity={props.activity}>
      {/* <Typography variant="body1">{props.activity}</Typography> */}
    </ActivityCard>
  );
}
