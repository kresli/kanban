import { Commit_CUD } from "./commit-base.schema";
import { Metadata_Schema } from "./metadata.schema";
import { CommitType } from "./commit-type";

interface CardCommitMeta {
  cardId: string;
}

export interface CardData {
  listId: string;
  position: number;
  title: string;
}

export type Card_Commit_Schema = Commit_CUD<
  CommitType.CARD_CREATE,
  CommitType.CARD_UPDATE,
  CommitType.CARD_DELETE,
  CardCommitMeta,
  CardData
>;

export type Card_Schema = Metadata_Schema &
  CardData & {
    schemaType: CommitType.CARD;
  };
