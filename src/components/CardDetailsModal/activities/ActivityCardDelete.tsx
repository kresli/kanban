import { Commit_Schema } from "src/database/schemas/commit.schema";
import { ActivityCard } from "./ActivityCard";

interface Props {
  activity: Commit_Schema;
}

export function ActivityCardDelete(props: Props) {
  return (
    <ActivityCard activity={props.activity}>
      {/* <Typography variant="body1">{props.activity}</Typography> */}
    </ActivityCard>
  );
}
