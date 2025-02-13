import { Commit_Create_Schema } from "./commit-create.schema";
import { Commit_Diff_Schema } from "./commit-diff.schema";
import { RecordType } from "./record-type";
import { Record_Schema } from "./record.schema";

export interface ListData {
  title: string;
  boardId: string;
  position: number;
}

export interface List_Commit_Create_Schema extends Commit_Create_Schema {
  type: RecordType.LIST_CREATE;
  listId: string;
  data: ListData;
}

export interface List_Commit_Update_Schema extends Commit_Create_Schema {
  type: RecordType.LIST_UPDATE;
  listId: string;
  diff: Commit_Diff_Schema<ListData>;
}

export interface List_Commit_Delete_Schema extends Commit_Create_Schema {
  type: RecordType.LIST_DELETE;
  listId: string;
}

export type List_Commit_Schema =
  | List_Commit_Create_Schema
  | List_Commit_Update_Schema
  | List_Commit_Delete_Schema;

export interface List_Schema extends Record_Schema, ListData {
  type: RecordType.LIST;
}
