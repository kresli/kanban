import { Commit_CUD } from "./commit-base.schema";
import { Metadata_Schema } from "./metadata.schema";
import { CommitType } from "./commit-type";
import { SchemaType } from "./schema-type";

interface ListCommitMeta {
  listId: string;
}

interface ListData {
  title: string;
  boardId: string;
  position: number;
}

export type List_Commit_Schema = Commit_CUD<
  CommitType.LIST_CREATE,
  CommitType.LIST_UPDATE,
  CommitType.LIST_DELETE,
  ListCommitMeta,
  ListData
>;

export type List_Schema = ListData &
  Metadata_Schema &
  ListData & {
    schemaType: SchemaType.LIST;
  };
