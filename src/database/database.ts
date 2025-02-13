import Dexie, { EntityTable } from "dexie";
import { List_Schema } from "./schemas/list.schema";
import { Board_Schema } from "./schemas/board.schema";
import { Card_Schema } from "./schemas/card.schema";
import { Comment_Schema } from "./schemas/comment.schema";
import { Commit_Schema } from "./schemas/commit.schema";
import { exportDB, importDB } from "dexie-export-import";

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
  async download() {
    const blob = await exportDB(this, { prettyJson: true });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "indexeddb_backup.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }

  async upload() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await Promise.all(this.tables.map((table) => table.clear()));
        const db = await importDB(file);
        console.log("Database restored:", db.name);
        window.location.reload();
      }
    };
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
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
