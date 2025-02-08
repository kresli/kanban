import { Activity_Board_Base_Schema } from "./activity-board-base.schema";
import { Board_Schema } from "./board.schema";

type AccpetedFields = keyof Omit<Board_Schema, "id">;

export interface Activity_Board_Update_Schema
  extends Activity_Board_Base_Schema {
  activityType: "board_update";
  payload: {
    [field in AccpetedFields]?: {
      oldValue: Board_Schema[field];
      newValue: Board_Schema[field];
    };
  };
}
