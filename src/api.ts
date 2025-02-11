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
    const activity: Activity_Schema = {
      activityType: "board_create",
      authorId: payload.authorId,
      boardId: payload.id,
      createdAt: payload.createdAt,
      id: this.generateId(),
      payload,
    };
    await Promise.all([
      this.database.boards.add(activity.payload),
      this.database.activities.add(activity),
    ]);
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
    const activity: Activity_Schema = {
      activityType: "list_create",
      authorId: payload.authorId,
      createdAt: payload.createdAt,
      id: this.generateId(),
      payload,
    };
    await Promise.all([
      this.database.lists.add(activity.payload),
      this.database.activities.add(activity),
    ]);

    return payload;
  }

  async createCard(props: { title: string; listId: string }) {
    const payload = {
      id: this.generateId(),
      createdAt: this.generateDate(),
      authorId: this.userId,
      position: 1,
      ...props,
    };
    const activity: Activity_Schema = {
      activityType: "card_create",
      authorId: payload.authorId,
      cardId: payload.id,
      createdAt: payload.createdAt,
      id: this.generateId(),
      payload,
    };
    const promises = Promise.all([
      this.database.cards.add(activity.payload),
      this.database.activities.add(activity),
    ]);
    await promises;
    return payload;
  }

  async updateCard(props: { id: string; title?: string; listId?: string }) {
    const card = await this.getCardById(props.id);
    if (!card) return;
    const updateDiff = generateUpdateDiff(card, props);
    if (!updateDiff.hasUpdate) return;
    const payload = updateDiff.diffPatch;

    const activity: Activity_Schema = {
      activityType: "card_update",
      authorId: this.userId,
      cardId: props.id,
      createdAt: this.generateDate(),
      id: this.generateId(),
      payload,
    };

    await Promise.all([
      this.database.cards.update(activity.cardId, updateDiff.uniqueValues),
      this.database.activities.add(activity),
    ]);
    return payload;
  }

  async deleteCard(cardId: string) {
    const card = await this.getCardById(cardId);
    if (!card) return;
    const activity: Activity_Schema = {
      activityType: "card_delete",
      authorId: this.userId,
      cardId,
      createdAt: this.generateDate(),
      id: this.generateId(),
    };
    await Promise.all([
      this.database.cards.delete(cardId),
      this.database.activities.add(activity),
    ]);
    return card;
  }

  async createCardComment(props: { cardId: string; comment: string }) {
    const activity: Activity_Schema = {
      activityType: "card_comment_create",
      authorId: this.userId,
      cardId: props.cardId,
      createdAt: this.generateDate(),
      id: this.generateId(),
      payload: {
        comment: props.comment,
      },
    };
    await this.database.activities.add(activity);
  }

  async updateBoard(props: {
    id: string;
    title?: string;
    description?: string;
  }) {
    const board = await this.getBoardById(props.id);
    if (!board) return;
    const updateDiff = generateUpdateDiff(board, props);
    if (!updateDiff.hasUpdate) return;
    const payload = updateDiff.diffPatch;
    const activity: Activity_Schema = {
      activityType: "board_update",
      authorId: this.userId,
      boardId: props.id,
      createdAt: this.generateDate(),
      id: this.generateId(),
      payload,
    };
    await Promise.all([
      this.database.boards.update(props.id, updateDiff.uniqueValues),
      this.database.activities.add(activity),
    ]);
    return this.database.boards.get(props.id);
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

type DiffPatchValue<T> = {
  oldValue: T;
  newValue: T;
};

type DiffPatch<T> = {
  [K in keyof T]?: DiffPatchValue<T[K]>;
};

interface UpdateDiff<T> {
  uniqueValues: Partial<T>;
  diffPatch: DiffPatch<T>;
  hasUpdate: boolean;
}

function generateUpdateDiff<T>(
  original: T,
  updated: Partial<T>,
): UpdateDiff<T> {
  const diffEntries = Object.entries(updated).filter(([key, value]) => {
    return original[key as keyof T] !== value;
  });
  const uniqueValues = Object.fromEntries(
    diffEntries.map(([key, value]) => [key, value]),
  ) as Partial<T>;
  const diffPatch = Object.fromEntries(
    diffEntries.map(([key, value]) => {
      return [
        key,
        {
          oldValue: original[key as keyof T],
          newValue: value,
        },
      ];
    }),
  ) as DiffPatch<T>;
  const hasUpdate = Object.keys(diffPatch).length > 0;
  return { uniqueValues, diffPatch, hasUpdate };
}
