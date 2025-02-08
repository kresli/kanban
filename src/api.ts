import { Card_Schema } from "./database/schemas/card.schema";
import { Activity_Schema } from "./database/schemas/activity.schema";
import { Database } from "./database/database";

export class Api {
  database = new Database();

  generateId() {
    return crypto.randomUUID();
  }

  generateDate() {
    return new Date().toISOString();
  }

  async emitActivity(activity: Activity_Schema) {
    switch (activity.activityType) {
      case "card_create": {
        this.database.cards.add(activity.payload);
        this.database.activities.add(activity);
        break;
      }
      case "card_update": {
        const updatedEntries = Object.entries(activity.payload).map(
          ([key, value]) => [key, value.newValue]
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
          ([key, value]) => [key, value.newValue]
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
