import { Board_Commit_Schema } from "./board.schema";
import { Card_Commit_Schema } from "./card.schema";
import { Comment_Commit_Schema } from "./comment.schema";
import { List_Commit_Schema } from "./list.schema";

export type Commit_Schema =
  | Card_Commit_Schema
  | List_Commit_Schema
  | Board_Commit_Schema
  | Comment_Commit_Schema;
