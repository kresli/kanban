import { Comment_Schema } from "./comment.schema";
import { Commit_Diff_Schema } from "./commit-diff.schema";

export interface Comment_Commit_Schema {
  readonly type: "comment_update_commit";
  readonly id: string;
  readonly commentId: string;
  readonly cardId: string;
  readonly authorId: string;
  readonly createdAt: string;
  readonly diff: Commit_Diff_Schema<Comment_Schema, "text">;
}
