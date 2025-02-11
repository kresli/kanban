import { Card_Schema } from "./database/schemas/card.schema";
import { Activity_Schema } from "./database/schemas/activity.schema";
import { Database } from "./database/database";
import { Activity_Board_Create_Schema } from "./database/schemas/activity-board-create.schema";
import { Board_Schema } from "./database/schemas/board.schema";

export class Api {
  database: Database;
  userId: string;

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
  }

  generateId() {
    return crypto.randomUUID();
  }

  generateDate() {
    return new Date().toISOString();
  }

  async createBoard(props: {
    title: string;
    description: string;
  }): Promise<Board_Schema> {
    const payload: Activity_Board_Create_Schema["payload"] = {
      id: this.generateId(),
      createdAt: this.generateDate(),
      authorId: this.userId,
      ...props,
    };
    await this.emitActivity({
      activityType: "board_create",
      authorId: payload.authorId,
      boardId: payload.id,
      createdAt: payload.createdAt,
      id: this.generateId(),
      payload,
    });
    return payload;
  }

  async createList(props: { title: string; boardId: string }) {
    const payload = {
      id: this.generateId(),
      createdAt: this.generateDate(),
      authorId: this.userId,
      position: 1,
      ...props,
    };
    await this.emitActivity({
      activityType: "list_create",
      authorId: payload.authorId,
      createdAt: payload.createdAt,
      id: this.generateId(),
      payload,
    });
    return payload;
  }

  async createCard(props: {
    title: string;
    description: string;
    listId: string;
  }) {
    const payload = {
      id: this.generateId(),
      createdAt: this.generateDate(),
      authorId: this.userId,
      position: 1,
      ...props,
    };
    await this.emitActivity({
      activityType: "card_create",
      authorId: payload.authorId,
      cardId: payload.id,
      createdAt: payload.createdAt,
      id: this.generateId(),
      payload,
    });
    return payload;
  }

  async updateCard(props: { id: string; title?: string; listId?: string }) {
    const card = await this.getCardById(props.id);
    if (!card) return;
    const diffEntries = Object.entries(props).filter(([key, value]) => {
      return card[key as keyof Card_Schema] !== value;
    });
    const payload = Object.fromEntries(
      diffEntries.map(([key, value]) => {
        return [
          key,
          {
            oldValue: card[key as keyof Card_Schema],
            newValue: value,
          },
        ];
      }),
    );

    await this.emitActivity({
      activityType: "card_update",
      authorId: this.userId,
      cardId: props.id,
      createdAt: this.generateDate(),
      id: this.generateId(),
      payload,
    });
  }

  async createCardComment(props: { cardId: string; comment: string }) {
    await this.emitActivity({
      activityType: "card_comment_create",
      authorId: this.userId,
      cardId: props.cardId,
      createdAt: this.generateDate(),
      id: this.generateId(),
      payload: {
        comment: props.comment,
      },
    });
  }

  /** this is the only function which can modify tables. All others should call this instead of modifying a table by themselves */
  async emitActivity(activity: Activity_Schema) {
    switch (activity.activityType) {
      case "card_create": {
        this.database.cards.add(activity.payload);
        this.database.activities.add(activity);
        break;
      }
      case "card_update": {
        const updatedEntries = Object.entries(activity.payload).map(
          ([key, value]) => [key, value.newValue],
        );
        const updatedCard: Partial<Card_Schema> =
          Object.fromEntries(updatedEntries);
        this.database.cards.update(activity.cardId, updatedCard);
        this.database.activities.add(activity);
        break;
      }
      case "card_delete": {
        this.database.cards.delete(activity.cardId);
        this.database.activities.add(activity);
        break;
      }
      case "card_comment_create": {
        this.database.activities.add(activity);
        break;
      }
      case "board_create": {
        this.database.boards.add(activity.payload);
        this.database.activities.add(activity);
        break;
      }
      case "list_create": {
        this.database.lists.add(activity.payload);
        this.database.activities.add(activity);
        break;
      }
      case "board_update": {
        const updatedEntries = Object.entries(activity.payload).map(
          ([key, value]) => [key, value.newValue],
        );
        const updatedBoard = Object.fromEntries(updatedEntries);
        this.database.boards.update(activity.boardId, updatedBoard);
        this.database.activities.add(activity);
        break;
      }
      default:
        console.error("Unknown action type", activity);
    }
  }

  /** card */

  async getCardById(id: string): Promise<Card_Schema | null> {
    const card = await this.database.cards.get(id);
    return card ?? null;
  }
  async getCardByListId(listId: string) {
    return this.database.cards
      .where("listId")
      .equals(listId)
      .sortBy("position");
  }

  /** list */

  async getListByBoardId(boardId: string) {
    return this.database.lists
      .where("boardId")
      .equals(boardId)
      .sortBy("position");
  }

  async getListById(id: string) {
    const list = await this.database.lists.get(id);
    return list ?? null;
  }

  async getListByCardId(id: string) {
    const card = await this.database.cards.get(id);
    if (!card) return null;
    return this.database.lists.get(card.listId);
  }

  async getLists() {
    return this.database.lists.toArray();
  }

  /** board */

  async getBoards() {
    return this.database.boards.toArray();
  }

  async getBoardById(id: string) {
    return this.database.boards.get(id);
  }

  async getBoardByCardId(id: string) {
    const card = await this.database.cards.get(id);
    if (!card) return;
    const list = await this.database.lists.get(card.listId);
    if (!list) return;
    return this.database.boards.get(list.boardId);
  }

  /** activities */

  getActivitiesByCardId(cardId: string) {
    return this.database.activities
      .where("cardId")
      .equals(cardId)
      .sortBy("createdAt");
  }
}
