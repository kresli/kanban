import { Commit_Create_Schema } from "./commit-create.schema";
import { Commit_Diff_Schema } from "./commit-diff.schema";
import { RecordType } from "./record-type";
import { Record_Schema } from "./record.schema";

export interface CommentData {
  text: string;
}

export interface Comment_Commit_Create_Schema extends Commit_Create_Schema {
  type: RecordType.COMMENT_CREATE;
  cardId: string;
  commentId: string;
  data: CommentData;
}

export interface Comment_Commit_Update_Schema extends Commit_Create_Schema {
  type: RecordType.COMMENT_UPDATE;
  cardId: string;
  commentId: string;
  diff: Commit_Diff_Schema<CommentData>;
}

export interface Comment_Commit_Delete_Schema extends Commit_Create_Schema {
  type: RecordType.COMMENT_DELETE;
  cardId: string;
  commentId: string;
}

export type Comment_Commit_Schema =
  | Comment_Commit_Create_Schema
  | Comment_Commit_Update_Schema
  | Comment_Commit_Delete_Schema;

export interface Comment_Schema extends Record_Schema, CommentData {
  type: RecordType.COMMENT;
  cardId: string;
}
