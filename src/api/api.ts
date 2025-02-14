import { Database } from "src/database/database";
import { ApiCard } from "./api-card";
import { ApiList } from "./api-list";
import { ApiBoard } from "./api-board";
import { ApiActivity } from "./api-activity";
import { ApiComment } from "./api-comment";
import { ApiCommits } from "./api-commits";
import defaultKanbanBoard from "./kanban-demo-board.json";
import { Board_Schema } from "src/database/schemas/board.schema";
import { List_Schema } from "src/database/schemas/list.schema";
import { Card_Schema } from "src/database/schemas/card.schema";
import { Comment_Schema } from "src/database/schemas/comment.schema";
import { Commit_Schema } from "src/database/schemas/commit.schema";

const DEMO_BOARD_ID = "kanban-demo";

export class Api {
  database: Database;
  userId: string;
  card: ApiCard;
  list: ApiList;
  board: ApiBoard;
  activity: ApiActivity;
  comment: ApiComment;
  commit: ApiCommits;

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
    this.commit = new ApiCommits(this);
  }

  /**
   * Get all comments and card commits (changes) for a card
   */
  async getActivitiesByCardId(cardId: string) {
    const [comments, cardCommits] = await Promise.all([
      this.comment.getByCardId(cardId),
      this.commit.getByCardId(cardId),
    ]);

    return [...comments, ...cardCommits].sort((a, b) => {
      return a.createdAt < b.createdAt ? -1 : 1;
    });
  }

  async exportDemoBoard() {
    const [commits, comments, cards, lists, board] = await Promise.all([
      this.commit.getByBoardId(DEMO_BOARD_ID),
      this.comment.getByBoardId(DEMO_BOARD_ID),
      this.card.getByBoardId(DEMO_BOARD_ID),
      this.list.getByBoardId(DEMO_BOARD_ID),
      this.board.getById(DEMO_BOARD_ID),
    ]);

    const data = { board, lists, cards, comments, commits };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "kanban-demo-board.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }

  importDemoBoard() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const jsonString = await file.text();
        const data = JSON.parse(jsonString);
        await this.board.deleteById(DEMO_BOARD_ID);
        await Promise.all([
          this.database.boards.add(data.board),
          this.database.lists.bulkAdd(data.lists),
          this.database.cards.bulkAdd(data.cards),
          this.database.comments.bulkAdd(data.comments),
          this.database.commits.bulkAdd(data.commits),
        ]);
        window.location.reload();
      }
    };
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }

  async resetDemoBoard() {
    await this.board.deleteById(DEMO_BOARD_ID);
    const { board, lists, cards, comments, commits } = defaultKanbanBoard;
    await Promise.all([
      this.database.boards.add(board as Board_Schema),
      this.database.lists.bulkAdd(lists as List_Schema[]),
      this.database.cards.bulkAdd(cards as Card_Schema[]),
      this.database.comments.bulkAdd(comments as Comment_Schema[]),
      this.database.commits.bulkAdd(commits as Commit_Schema[]),
    ]);
    window.location.reload();
  }
}
