import { Activity_Schema } from "src/database/schemas/activity.schema";
import { Api } from "./api";
import { generateDate } from "./generate-date";
import { generateId } from "./generate-id";

export class ApiList {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async create(props: { title: string; boardId: string }) {
    const payload = {
      id: generateId(),
      createdAt: generateDate(),
      authorId: this.api.userId,
      position: 1,
      ...props,
    };
    const activity: Activity_Schema = {
      activityType: "list_create",
      authorId: payload.authorId,
      createdAt: payload.createdAt,
      id: generateId(),
      payload,
    };
    await Promise.all([
      this.api.database.lists.add(activity.payload),
      // this.api.database.activities.add(activity),
    ]);

    return payload;
  }

  async getByBoardId(boardId: string) {
    return this.api.database.lists
      .where("boardId")
      .equals(boardId)
      .sortBy("position");
  }

  async getById(id: string) {
    const list = await this.api.database.lists.get(id);
    return list ?? null;
  }

  async getByCardId(id: string) {
    const card = await this.api.database.cards.get(id);
    if (!card) return null;
    return this.api.database.lists.get(card.listId);
  }

  async getAll() {
    return this.api.database.lists.toArray();
  }
}
