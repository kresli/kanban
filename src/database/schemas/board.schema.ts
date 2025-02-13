import { Record_Schema } from "./record.schema";
import { RecordType } from "./record-type";
import { Commit_Create_Schema } from "./commit-create.schema";
import { Commit_Update_Schema } from "./commit-update.schema";
import { Commit_Delete_Schema } from "./commit-delete.schema";
import { Commit_Diff_Schema } from "./commit-diff.schema";

export interface BoardData {
  title: string;
  description: string;
}

export interface Board_Commit_Create_Schema extends Commit_Create_Schema {
  type: RecordType.BOARD_CREATE;
  boardId: string;
  data: BoardData;
}

export interface Board_Commit_Update_Schema extends Commit_Update_Schema {
  type: RecordType.BOARD_UPDATE;
  boardId: string;
  diff: Commit_Diff_Schema<BoardData>;
}

export interface Board_Commit_Delete_Schema extends Commit_Delete_Schema {
  type: RecordType.BOARD_DELETE;
  boardId: string;
}

export type Board_Commit_Schema =
  | Board_Commit_Create_Schema
  | Board_Commit_Update_Schema
  | Board_Commit_Delete_Schema;

export interface Board_Schema extends Record_Schema, BoardData {
  type: RecordType.BOARD;
}
