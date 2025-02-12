import { Commit_CUD } from "./commit-base.schema";
import { Metadata_Schema } from "./metadata.schema";
import { CommitType } from "./commit-type";

interface CommentCommitMeta {
  commentId: string;
  cardId: string;
}

export interface CommentData {
  text: string;
}

export type Comment_Commit_Schema = Commit_CUD<
  CommitType.COMMENT_CREATE,
  CommitType.COMMENT_UPDATE,
  CommitType.COMMENT_DELETE,
  CommentCommitMeta,
  CommentData
>;

export type Comment_Schema = Metadata_Schema &
  CommentData & {
    type: CommitType.COMMENT;
    cardId: string;
  };
