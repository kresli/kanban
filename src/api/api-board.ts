import { Board_Schema } from "src/database/schemas/board.schema";
import { Api } from "./api";
import { Activity_Board_Create_Schema } from "src/database/schemas/activity-board-create.schema";
import { Activity_Schema } from "src/database/schemas/activity.schema";
import { generateId } from "./generate-id";
import { generateDate } from "./generate-date";
import { generateUpdateDiff } from "./generate-update-diff";

export class ApiBoard {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async create(props: {
    title: string;
    description: string;
  }): Promise<Board_Schema> {
    const payload: Activity_Board_Create_Schema["payload"] = {
      id: generateId(),
      createdAt: generateDate(),
      authorId: this.api.userId,
      ...props,
    };

    const activity: Activity_Schema = {
      activityType: "board_create",
      authorId: payload.authorId,
      boardId: payload.id,
      createdAt: payload.createdAt,
      id: generateId(),
      payload,
    };

    await Promise.all([
      this.api.database.boards.add(activity.payload),
      // this.api.database.activities.add(activity),
    ]);

    return payload;
  }

  async update(props: { id: string; title?: string; description?: string }) {
    const board = await this.getById(props.id);
    if (!board) return;
    const updateDiff = generateUpdateDiff(board, props);
    if (!updateDiff.hasUpdate) return;
    const payload = updateDiff.diffPatch;
    const activity: Activity_Schema = {
      activityType: "board_update",
      authorId: this.api.userId,
      boardId: props.id,
      createdAt: generateDate(),
      id: generateId(),
      payload,
    };
    await Promise.all([
      this.api.database.boards.update(props.id, updateDiff.uniqueValues),
      // this.api.database.activities.add(activity),
    ]);
    return this.api.database.boards.get(props.id);
  }

  async getAll() {
    return this.api.database.boards.toArray();
  }

  async getById(id: string) {
    return this.api.database.boards.get(id);
  }

  async getByCardId(id: string) {
    const card = await this.api.database.cards.get(id);
    if (!card) return;
    const list = await this.api.database.lists.get(card.listId);
    if (!list) return;
    return this.api.database.boards.get(list.boardId);
  }
}
