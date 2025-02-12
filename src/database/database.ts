import Dexie, { EntityTable } from "dexie";
import { Card_Schema } from "./schemas/new/card.schema";
import { List_Schema } from "./schemas/list.schema";
import { Board_Schema } from "./schemas/board.schema";
import { Activity_Schema } from "./schemas/activity.schema";
import { Card_Commit_Schema } from "./schemas/new/card-commit.schema";
import { Comment_Schema } from "./schemas/new/comment.schema";
import { Comment_Commit_Schema } from "./schemas/new/comment-commit.schema";

export class Database extends Dexie {
  // cards!: EntityTable<Card_Schema, "id">;
  // activities!: EntityTable<Activity_Schema, "id">;
  lists!: EntityTable<List_Schema, "id">;
  boards!: EntityTable<Board_Schema, "id">;

  cards!: EntityTable<Card_Schema, "id">;
  cardsCommits!: EntityTable<Card_Commit_Schema, "id">;

  comments!: EntityTable<Comment_Schema, "id">;
  commentsCommits!: EntityTable<Comment_Commit_Schema, "id">;

  constructor(databaseName: string) {
    super(databaseName);
    this.version(1).stores({
      // cards: createStoreKeys<Card_Schema>({
      //   authorId: true,
      //   listId: true,
      //   position: true,
      //   title: true,
      //   id: "index",
      // }),
      // activities: createStoreKeys<Activity_Schema>({
      //   activityType: true,
      //   id: "index",
      //   authorId: true,
      //   createdAt: true,
      //   cardId: true,
      //   boardId: true,
      // }),
      cards: createStoreKeys<Card_Schema>({
        authorId: true,
        listId: true,
        position: true,
        title: true,
        createdAt: true,
        commitId: true,
        id: "index",
      }),
      cardsCommits: createStoreKeys<Card_Commit_Schema>({
        cardId: true,
        authorId: true,
        createdAt: true,
        id: "index",
        diff: false,
        type: true,
      }),
      comments: createStoreKeys<Comment_Schema>({
        authorId: true,
        cardId: true,
        createdAt: true,
        id: "index",
        text: true,
        commitId: true,
        type: true,
      }),
      commentsCommits: createStoreKeys<Comment_Commit_Schema>({
        commentId: true,
        authorId: true,
        createdAt: true,
        id: "index",
        diff: false,
        cardId: true,
        type: true,
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
