import { Activity_Card_Base_Schema } from "./activity-card-base.schema";

export interface Activity_Card_Delete_Schema extends Activity_Card_Base_Schema {
  activityType: "card_delete";
}
