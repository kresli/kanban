import { Board_Schema, BoardData } from "src/database/schemas/board.schema";
import { Api } from "./api";
import { generateId } from "./generate-id";
import { generateDate } from "./generate-date";
import { generateUpdateDiff } from "./generate-update-diff";
import { RecordType } from "src/database/schemas/record-type";
import { Commit_Schema } from "src/database/schemas/commit.schema";
import { generateDiff } from "./generate-diff";

export class ApiBoard {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async create(props: { title: string; description: string }) {
    const board: Board_Schema = {
      type: RecordType.BOARD,
      id: generateId(),
      createdAt: generateDate(),
      authorId: this.api.userId,
      ...props,
    };
    const commit: Commit_Schema = {
      type: RecordType.BOARD_CREATE,
      authorId: this.api.userId,
      boardId: board.id,
      createdAt: generateDate(),
      data: board,
      id: generateId(),
    };

    await Promise.all([
      this.api.database.boards.add(board),
      this.api.database.commits.add(commit),
    ]);

    return this.api.database.boards.get(board.id);
  }

  async update(props: { id: string; title?: string; description?: string }) {
    const board = await this.getById(props.id);
    if (!board) return;
    const updateDiff = generateUpdateDiff(board, props);
    if (!updateDiff.hasUpdate) return;

    const commit: Commit_Schema = {
      type: RecordType.BOARD_UPDATE,
      authorId: this.api.userId,
      boardId: props.id,
      createdAt: generateDate(),
      id: generateId(),
      diff: generateDiff(props, board),
    };
    const updatedBoard: Partial<BoardData> = props;
    await Promise.all([
      this.api.database.boards.update(props.id, updatedBoard),
      this.api.database.commits.add(commit),
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
