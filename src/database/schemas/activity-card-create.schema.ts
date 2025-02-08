import { Card_Schema } from "./card.schema";
import { Activity_Card_Base_Schema } from "./activity-card-base.schema";

export interface Activity_Card_Create_Schema extends Activity_Card_Base_Schema {
  activityType: "card_create";
  payload: Card_Schema;
}
