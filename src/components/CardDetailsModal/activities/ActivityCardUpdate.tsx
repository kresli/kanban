import { useLiveQuery } from "dexie-react-hooks";
import { ActivityCard, ActivityTag } from "./ActivityCard";
import { useApi } from "src/hooks/useApi";
import {
  Card_Commit_Schema,
  Card_Commit_Update_Schema,
} from "src/database/schemas/card.schema";
import { RecordType } from "src/database/schemas/record-type";

interface Props {
  activity: Card_Commit_Schema;
}

export function ActivityCardUpdate(props: Props) {
  return (
    <ActivityCard activity={props.activity}>
      <ActivityTagSwitcher activity={props.activity} />
    </ActivityCard>
  );
}

function ActivityTagSwitcher(props: { activity: Card_Commit_Schema }) {
  switch (props.activity.type) {
    case RecordType.CARD_UPDATE: {
      switch (true) {
        case "listId" in props.activity.diff:
          return <ActivityList activity={props.activity} />;
        default: {
          return <DefaultActivity activity={props.activity} />;
        }
      }
    }
    default: {
      console.warn("Unknown activity type", props.activity);
      return null;
    }
  }
}

function DefaultActivity(props: { activity: Card_Commit_Update_Schema }) {
  const changes = Object.keys(props.activity.diff)
    .map(localize)
    .filter(Boolean) as string[];
  return (
    <span className="flex items-center space-x-2">
      <span>changed</span>
      {changes.map((change) => (
        <ActivityTag key={change} color="neutral">
          {change}
        </ActivityTag>
      ))}
    </span>
  );
}

function ActivityList(props: { activity: Card_Commit_Update_Schema }) {
  const api = useApi();
  const { listId } = props.activity.diff;
  const fromList = useLiveQuery(() =>
    listId?.from ? api.list.getById(listId.from) : null,
  );
  const toList = useLiveQuery(() =>
    listId ? api.list.getById(listId.to) : null,
  );
  return (
    <>
      {fromList && (
        <>
          <span>moved from</span>
          <ActivityTag color="red">{fromList.title}</ActivityTag>
          <span>to</span>
        </>
      )}
      {toList && <ActivityTag color="green">{toList.title}</ActivityTag>}
    </>
  );
}

function localize(text: string) {
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
