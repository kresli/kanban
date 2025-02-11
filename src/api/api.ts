import { Database } from "src/database/database";
import { ApiCard } from "./api-card";
import { ApiList } from "./api-list";
import { ApiBoard } from "./api-board";
import { ApiActivity } from "./api-activity";
import { ApiComment } from "./api-comment";

export class Api {
  database: Database;
  userId: string;
  card: ApiCard;
  list: ApiList;
  board: ApiBoard;
  activity: ApiActivity;
  comment: ApiComment;

  constructor(config: {
    databaseName: string;
    userId: string;
    clearDatabaseOnInit?: boolean;
  }) {
    this.userId = config.userId;
    if (config.clearDatabaseOnInit) {
      indexedDB.deleteDatabase(config.databaseName);
    }
    this.database = new Database(config.databaseName);
    this.card = new ApiCard(this);
    this.list = new ApiList(this);
    this.board = new ApiBoard(this);
    this.activity = new ApiActivity(this);
    this.comment = new ApiComment(this);
  }
}
