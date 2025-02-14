import { Commit_Schema } from "src/database/schemas/commit.schema";
import { Api } from "./api";
import { generateDate } from "./generate-date";
import { generateId } from "./generate-id";
import { RecordType } from "src/database/schemas/record-type";
import { List_Schema } from "src/database/schemas/list.schema";

export class ApiList {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async create(props: { title: string; boardId: string }) {
    const payload: List_Schema = {
      type: RecordType.LIST,
      id: generateId(),
      createdAt: generateDate(),
      authorId: this.api.userId,
      position: 1,
      ...props,
    };
    const commit: Commit_Schema = {
      type: RecordType.LIST_CREATE,
      authorId: this.api.userId,
      createdAt: generateDate(),
      data: payload,
      id: generateId(),
      listId: payload.id,
    };
    await Promise.all([
      this.api.database.lists.add(payload),
      this.api.database.commits.add(commit),
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

  async deleteByBoardId(boardId: string) {
    const lists = await this.api.database.lists
      .where("boardId")
      .equals(boardId)
      .toArray();
    const listIds = lists.map((list) => list.id);
    await this.api.database.lists.bulkDelete(listIds);
  }
}
