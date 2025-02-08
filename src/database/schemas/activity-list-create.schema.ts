import { Activity_Base_Schema } from "./activity-base.schema";
import { List_Schema } from "./list.schema";

export interface Activity_List_Create_Schema extends Activity_Base_Schema {
  activityType: "list_create";
  payload: List_Schema;
}
