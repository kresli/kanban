import { Activity_Board_Base_Schema } from "./activity-board-base.schema";
import { Board_Schema } from "./board.schema";

export interface Activity_Board_Create_Schema
  extends Activity_Board_Base_Schema {
  activityType: "board_create";
  payload: Board_Schema;
}
