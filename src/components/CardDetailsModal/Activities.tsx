import { FormatListBulleted } from "@mui/icons-material";
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
    <div className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-y-4 hover:[.sort-button]:visible">
      <Icon />
      <div className="flex w-full flex-row items-center gap-x-2">
        <h6 className="flex-1 text-base font-semibold">Activity</h6>
      </div>
      <div className="z-10 col-[body] flex flex-col gap-y-2">
        <CreateActivityComment card={props.card} />
        {activities}
      </div>
      <TimelineLine />
    </div>
  );
}

function Icon() {
  return (
    <FormatListBulleted className="flex self-center justify-self-center" />
  );
}
