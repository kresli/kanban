import { ActivityCard } from "./ActivityCard";
import { Activity_Card_Delete_Schema } from "src/database/schemas/activity-card-delete.schema";

interface Props {
  activity: Activity_Card_Delete_Schema;
}

export function ActivityCardDelete(props: Props) {
  return (
    <ActivityCard activity={props.activity}>
      {/* <Typography variant="body1">{props.activity}</Typography> */}
    </ActivityCard>
  );
}
