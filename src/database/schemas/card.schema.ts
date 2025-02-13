import { Record_Schema } from "./record.schema";
import { RecordType } from "./record-type";
import { Commit_Create_Schema } from "./commit-create.schema";
import { Commit_Update_Schema } from "./commit-update.schema";
import { Commit_Delete_Schema } from "./commit-delete.schema";
import { Commit_Diff_Schema } from "./commit-diff.schema";

export interface CardData {
  listId: string;
  position: number;
  title: string;
}

export interface Card_Commit_Create_Schema extends Commit_Create_Schema {
  type: RecordType.CARD_CREATE;
  cardId: string;
  data: CardData;
}

export interface Card_Commit_Update_Schema extends Commit_Update_Schema {
  type: RecordType.CARD_UPDATE;
  cardId: string;
  diff: Commit_Diff_Schema<CardData>;
}

export interface Card_Commit_Delete_Schema extends Commit_Delete_Schema {
  type: RecordType.CARD_DELETE;
  cardId: string;
}

export type Card_Commit_Schema =
  | Card_Commit_Create_Schema
  | Card_Commit_Update_Schema
  | Card_Commit_Delete_Schema;

export interface Card_Schema extends Record_Schema, CardData {
  type: RecordType.CARD;
}
