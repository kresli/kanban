import { useLiveQuery } from "dexie-react-hooks";
import { ActivityCard, ActivityTag } from "./ActivityCard";
import { Activity_Card_Update_Schema } from "src/database/schemas/activity-card-update.schema";
import { useApi } from "src/hooks/useApi";

interface Props {
  activity: Activity_Card_Update_Schema;
}

type AcceptedFields = keyof Activity_Card_Update_Schema["payload"];

export function ActivityCardUpdate(props: Props) {
  return (
    <ActivityCard activity={props.activity}>
      <ActivityTagSwitcher activity={props.activity} />
    </ActivityCard>
  );
}

function ActivityTagSwitcher(props: { activity: Activity_Card_Update_Schema }) {
  const api = useApi();
  const { listId } = props.activity.payload;
  const fromList = useLiveQuery(() =>
    listId ? api.list.getById(listId.oldValue) : null,
  );
  const toList = useLiveQuery(() =>
    listId ? api.list.getById(listId.newValue) : null,
  );
  if (fromList && toList) {
    return (
      <>
        <span>moved from</span>
        <ActivityTag color="red">{fromList.title}</ActivityTag>
        <span>to</span>
        <ActivityTag color="green">{toList.title}</ActivityTag>
      </>
    );
  }
  const changesText = Object.keys(props.activity.payload)
    .map((key) => localize(key as AcceptedFields))
    .filter(Boolean)
    .join(", ");
  return (
    <>
      <span>updated</span> <ActivityTag>{changesText}</ActivityTag>
    </>
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
    default:
      return text;
  }
}
