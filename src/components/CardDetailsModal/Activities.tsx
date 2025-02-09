import { TimelineLine } from "./TimelineLine";
import { ActivitySwitch } from "./activities/ActivitySwitch";
import { CreateActivityComment } from "./CreateActivityComment";
import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";
import { Card_Schema } from "src/database/schemas/card.schema";

interface Props {
  card: Card_Schema;
}

export function Activities(props: Props) {
  const db = useApi();
  const acts = useLiveQuery(
    () => db.getActivitiesByCardId(props.card.id),
    [db, props.card.id],
  );
  const activities = acts?.map((activity) => (
    <ActivitySwitch key={activity.id} activity={activity} />
  ));

  return (
    <div className="relative z-0 space-y-8 hover:[.sort-button]:visible">
      <div className="relative z-10 flex flex-col gap-y-2">
        {activities}
        <TimelineLine />
      </div>
      <CreateActivityComment card={props.card} />
    </div>
  );
}
