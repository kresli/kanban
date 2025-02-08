import { Activity_Card_Base_Schema } from "./activity-card-base.schema";
import { Card_Schema } from "./card.schema";

type AccpetedFields = keyof Omit<Card_Schema, "id">;

export interface Activity_Card_Update_Schema extends Activity_Card_Base_Schema {
  activityType: "card_update";
  payload: {
    [field in AccpetedFields]?: {
      oldValue: Card_Schema[field];
      newValue: Card_Schema[field];
    };
  };
}
