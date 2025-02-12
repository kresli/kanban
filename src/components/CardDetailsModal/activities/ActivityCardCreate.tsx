import { Commit_Schema } from "src/database/schemas/commit.schema";
import { ActivityCard, ActivityTag } from "./ActivityCard";

interface Props {
  activity: Commit_Schema;
}

export function ActivityCardCreate(props: Props) {
  return (
    <ActivityCard activity={props.activity} testid="activity-card-create">
      <ActivityTag color="green">created Card</ActivityTag>
    </ActivityCard>
  );
}
