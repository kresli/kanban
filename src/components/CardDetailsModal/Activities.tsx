import { TimelineLine } from "./TimelineLine";
import { ActivitySwitch } from "./activities/ActivitySwitch";
import { CreateActivityComment } from "./CreateActivityComment";
import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useMemo } from "react";

interface Props {
  card: Card_Schema;
}

export function Activities(props: Props) {
  const db = useApi();
  const acts = useLiveQuery(
    () => db.getActivitiesByCardId(props.card.id),
    [db, props.card.id],
  );
  const activities = useMemo(
    () =>
      acts
        ?.toSpliced(0, 1)
        ?.map((activity) => (
          <ActivitySwitch key={activity.id} activity={activity} />
        )),
    [acts],
  );

  return (
    <div className="relative z-0 flex flex-col gap-y-4 hover:[.sort-button]:visible">
      {activities}
      <TimelineLine />
      <CreateActivityComment card={props.card} />
    </div>
  );
}
