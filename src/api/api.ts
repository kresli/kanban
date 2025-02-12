import { Database } from "src/database/database";
import { ApiCard } from "./api-card";
import { ApiList } from "./api-list";
import { ApiBoard } from "./api-board";
import { ApiActivity } from "./api-activity";
import { ApiComment } from "./api-comment";
import { ApiCardCommits } from "./api-card-commits";
import { Activity_Schema } from "src/database/schemas/activity.schema";

export class Api {
  database: Database;
  userId: string;
  card: ApiCard;
  list: ApiList;
  board: ApiBoard;
  activity: ApiActivity;
  comment: ApiComment;
  cardCommit: ApiCardCommits;

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
    this.cardCommit = new ApiCardCommits(this);
  }

  async getActivitiesByCardId(cardId: string): Promise<Activity_Schema[]> {
    const [comments, cardCommits] = await Promise.all([
      this.comment.getByCardId(cardId),
      this.cardCommit.getByCardId(cardId),
    ]);

    return [...comments, ...cardCommits].sort((a, b) => {
      return a.createdAt < b.createdAt ? -1 : 1;
    });
  }
}
