import { ActivityCardUpdate } from "./ActivityCardUpdate";
import { Comment } from "../Comment";
import { Commit_Schema } from "src/database/schemas/commit.schema";
import { RecordType } from "src/database/schemas/record-type";
import { Comment_Schema } from "src/database/schemas/comment.schema";

export function ActivitySwitch(props: {
  activity: Commit_Schema | Comment_Schema;
}) {
  switch (props.activity.type) {
    case RecordType.CARD_CREATE:
    case RecordType.COMMENT_CREATE:
    case RecordType.COMMENT_UPDATE:
      return null;
    case RecordType.COMMENT:
      return <Comment comment={props.activity} />;
    case RecordType.CARD_UPDATE:
      return <ActivityCardUpdate activity={props.activity} />;
    default:
      console.warn("Unknown activity type", props.activity);
      return null;
    // case "card_create":
    //   return <ActivityCardCreate activity={props.activity} />;
    // case "card_update":
    //   return <ActivityCardUpdate activity={props.activity} />;
    // case "card_delete":
    //   return <ActivityCardDelete activity={props.activity} />;
    // case "card_comment_create":
    //   return <ActivityCommentCreate activity={props.activity} />;
    // default:
    //   console.warn("Unknown activity type", props.activity);
    //   return null;
  }
}
