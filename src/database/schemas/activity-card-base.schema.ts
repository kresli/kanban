import { Activity_Base_Schema } from "./activity-base.schema";
export interface Activity_Card_Base_Schema extends Activity_Base_Schema {
  /** card which activity applies for */
  cardId: string;
}
