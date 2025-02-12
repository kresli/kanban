import { Card_Schema } from "./card.schema";
import { Commit_Diff_Schema } from "./commit-diff.schema";

export interface Card_Commit_Schema {
  readonly type: "card_update_commit";
  readonly id: string;
  readonly cardId: string;
  readonly authorId: string;
  readonly createdAt: string;
  readonly diff: Commit_Diff_Schema<
    Card_Schema,
    "title" | "listId" | "position"
  >;
}
