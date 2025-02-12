import { Commit_CUD } from "./commit-base.schema";
import { Metadata_Schema } from "./metadata.schema";
import { CommitType } from "./commit-type";
import { SchemaType } from "./schema-type";

interface BoardCommitMeta {
  boardId: string;
}

export interface BoardData {
  title: string;
  description: string;
}

export type Board_Commit_Schema = Commit_CUD<
  CommitType.BOARD_CREATE,
  CommitType.BOARD_UPDATE,
  CommitType.BOARD_DELETE,
  BoardCommitMeta,
  BoardData
>;

export type Board_Schema = Metadata_Schema &
  BoardData & {
    schemaType: SchemaType.BOARD;
  };
