import Dexie, { EntityTable } from "dexie";
import { Card_Schema } from "./schemas/card.schema";
import { List_Schema } from "./schemas/list.schema";
import { Board_Schema } from "./schemas/board.schema";
import { Activity_Schema } from "./schemas/activity.schema";

export class Database extends Dexie {
  cards!: EntityTable<Card_Schema, "id">;
  activities!: EntityTable<Activity_Schema, "id">;
  lists!: EntityTable<List_Schema, "id">;
  boards!: EntityTable<Board_Schema, "id">;
  constructor() {
    super("kresli-kanban");
    this.version(1).stores({
      cards: createStoreKeys<Card_Schema>({
        authorId: true,
        description: true,
        listId: true,
        position: true,
        title: true,
        id: "index",
      }),
      activities: createStoreKeys<Activity_Schema>({
        activityType: true,
        id: "index",
        authorId: true,
        createdAt: true,
        cardId: true,
        boardId: true,
      }),
      lists: createStoreKeys<List_Schema>({
        title: true,
        id: "index",
        authorId: true,
        createdAt: true,
        position: true,
        boardId: true,
      }),
      boards: createStoreKeys<Board_Schema>({
        title: true,
        description: true,
        id: "index",
        authorId: true,
        createdAt: true,
      }),
    });
  }
}

function createStoreKeys<T>(indexes: {
  [K in keyof T]: boolean | "index";
}): string {
  const keys: string[] = [];
  for (const key in indexes) {
    if (!indexes[key]) continue;
    if (indexes[key] === "index") keys.unshift(key);
    else keys.push(key);
  }
  return keys.join(", ");
}
