import { ActivityCardCreate } from "./ActivityCardCreate";
import { ActivityCommentCreate } from "./ActivityCommentCreate";
import { Activity_Schema } from "src/database/schemas/activity.schema";
import { ActivityCardUpdate } from "./ActivityCardUpdate";
import { ActivityCardDelete } from "./ActivityCardDelete";

export function ActivitySwitch(props: { activity: Activity_Schema }) {
  switch (props.activity.activityType) {
    case "card_create":
      return <ActivityCardCreate activity={props.activity} />;
    case "card_update":
      return <ActivityCardUpdate activity={props.activity} />;
    case "card_delete":
      return <ActivityCardDelete activity={props.activity} />;
    case "card_comment_create":
      return <ActivityCommentCreate activity={props.activity} />;
    default:
      console.warn("Unknown activity type", props.activity);
      return null;
  }
}
