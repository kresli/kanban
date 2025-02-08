import { Activity_Board_Create_Schema } from "./activity-board-create.schema";
import { Activity_List_Create_Schema } from "./activity-list-create.schema";
import { Activity_Card_Comment_Create_Schema } from "./activity-card-comment-create.schema";
import { Activity_Card_Create_Schema } from "./activity-card-create.schema";
import { Activity_Card_Delete_Schema } from "./activity-card-delete.schema";
import { Activity_Card_Update_Schema } from "./activity-card-update.schema";
import { Activity_Board_Update_Schema } from "./activity-board-update.schema";

export type Activity_Schema =
  | Activity_Card_Comment_Create_Schema
  | Activity_Card_Create_Schema
  | Activity_Card_Update_Schema
  | Activity_Card_Delete_Schema
  | Activity_Board_Create_Schema
  | Activity_List_Create_Schema
  | Activity_Board_Update_Schema;
