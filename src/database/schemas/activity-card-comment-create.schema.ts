import { Activity_Card_Base_Schema } from "./activity-card-base.schema";
export interface Activity_Card_Comment_Create_Schema
  extends Activity_Card_Base_Schema {
  activityType: "card_comment_create";
  payload: {
    comment: string;
  };
}
