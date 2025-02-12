import { TimelineLine } from "./TimelineLine";
import { CreateActivityComment } from "./CreateActivityComment";
import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useMemo } from "react";
import { Comment } from "./Comment";
import { Comment_Schema } from "src/database/schemas/new/comment.schema";
import { Card_Commit_Schema } from "src/database/schemas/new/card-commit.schema";
import { ActivitySwitch } from "./activities/ActivitySwitch";

interface Props {
  card: Card_Schema;
}

export function Activities(props: Props) {
  const api = useApi();
  const activityArray = useLiveQuery(() =>
    api.getActivitiesByCardId(props.card.id),
  );
  const activities = activityArray?.map((activity) => (
    <ActivitySwitch key={activity.id} activity={activity} />
  ));
  return (
    <div className="relative z-0 flex flex-col gap-y-4 hover:[.sort-button]:visible">
      {activities}
      <TimelineLine />
      <CreateActivityComment card={props.card} />
    </div>
  );
}
