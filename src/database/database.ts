import Dexie, { EntityTable } from "dexie";
import { List_Schema } from "./schemas/list.schema";
import { Board_Schema } from "./schemas/board.schema";
import { Card_Schema } from "./schemas/card.schema";
import { Comment_Schema } from "./schemas/comment.schema";
import { Commit_Schema } from "./schemas/commit.schema";

export class Database extends Dexie {
  cards!: EntityTable<Card_Schema, "id">;
  lists!: EntityTable<List_Schema, "id">;
  boards!: EntityTable<Board_Schema, "id">;
  comments!: EntityTable<Comment_Schema, "id">;

  commits!: EntityTable<Commit_Schema, "id">;

  constructor(databaseName: string) {
    super(databaseName);
    this.version(1).stores({
      cards: createStoreKeys<Card_Schema>({
        type: true,
        id: "index",
        listId: true,
        authorId: true,
        createdAt: true,
        position: true,
        title: false,
      }),
      lists: createStoreKeys<List_Schema>({
        type: true,
        id: "index",
        boardId: true,
        authorId: true,
        createdAt: true,
        position: true,
        title: false,
      }),
      boards: createStoreKeys<Board_Schema>({
        type: true,
        id: "index",
        authorId: true,
        createdAt: true,
        title: false,
        description: false,
      }),
      commits: createStoreKeys<Commit_Schema>({
        id: "index",
        authorId: true,
        createdAt: true,
        type: true,
        boardId: true,
        cardId: true,
        listId: true,
        commentId: true,
        data: false,
        diff: false,
      }),
      comments: createStoreKeys<Comment_Schema>({
        id: "index",
        type: true,
        authorId: true,
        createdAt: true,
        text: false,
        cardId: true,
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
