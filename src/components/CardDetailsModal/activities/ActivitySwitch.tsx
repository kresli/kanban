import { ActivityCardCreate } from "./ActivityCardCreate";
import { ActivityCommentCreate } from "./ActivityCommentCreate";
import { ActivityCardUpdate } from "./ActivityCardUpdate";
import { ActivityCardDelete } from "./ActivityCardDelete";
import { Comment } from "../Comment";
import { Commit_Schema } from "src/database/schemas/commit.schema";
import { CommitType } from "src/database/schemas/commit-type";
import { Comment_Schema } from "src/database/schemas/comment.schema";

export function ActivitySwitch(props: {
  activity: Commit_Schema | Comment_Schema;
}) {
  switch (props.activity.type) {
    case CommitType.COMMENT:
      return <Comment comment={props.activity} />;
    // case "card_update_commit":
    //   return <ActivityCardUpdate activity={props.activity} />;
    case CommitType.CARD_CREATE:
      return null;
    case CommitType.COMMENT_CREATE:
      return null;
    case CommitType.CARD_UPDATE:
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
