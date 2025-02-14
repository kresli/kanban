import { Api } from "./api";
import { generateDate } from "./generate-date";
import { generateId } from "./generate-id";
import { generateDiff } from "./generate-diff";
import {
  Card_Commit_Schema,
  Card_Schema,
  CardData,
} from "src/database/schemas/card.schema";
import { RecordType } from "src/database/schemas/record-type";
import { Commit_Schema } from "src/database/schemas/commit.schema";

export class ApiCard {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async create(
    props: Pick<Card_Schema, "title" | "listId" | "position"> & { id?: string },
  ) {
    const cardId = props.id || generateId();
    const card: Card_Schema = {
      type: RecordType.CARD,
      id: cardId,
      authorId: this.api.userId,
      createdAt: generateDate(),
      ...props,
    };
    const commit: Commit_Schema = {
      type: RecordType.CARD_CREATE,
      authorId: this.api.userId,
      cardId,
      createdAt: generateDate(),
      data: card,
      id: generateId(),
    };
    await Promise.all([
      this.api.database.cards.add(card),
      this.api.database.commits.add(commit),
    ]);
    return this.api.database.cards.get(cardId);
  }

  async update(
    id: string,
    props: Partial<Pick<Card_Schema, "title" | "listId" | "position">>,
  ) {
    const card = await this.getById(id);
    if (!card) return;
    const commitId = generateId();
    const updated: Partial<CardData> = Object.fromEntries(
      Object.entries(props).filter(
        ([key, value]) => card[key as keyof Card_Schema] !== value,
      ),
    );
    if (Object.keys(updated).length === 0) return;

    const commit: Commit_Schema = {
      type: RecordType.CARD_UPDATE,
      authorId: this.api.userId,
      cardId: id,
      createdAt: generateDate(),
      id: commitId,
      diff: generateDiff(props, card),
    };

    await Promise.all([
      this.api.database.cards.update(id, updated),
      this.api.database.commits.add(commit),
    ]);
    return this.api.database.cards.get(id);
  }

  async delete(id: string) {
    const commit: Commit_Schema = {
      type: RecordType.CARD_DELETE,
      authorId: this.api.userId,
      cardId: id,
      createdAt: generateDate(),
      id: generateId(),
    };
    await Promise.all([
      this.api.database.cards.delete(id),
      this.api.database.commits.add(commit),
    ]);
  }

  async getById(cardId: string): Promise<Card_Schema | null> {
    const card = await this.api.database.cards.get(cardId);
    return card ?? null;
  }

  async getByListId(listId: string) {
    return this.api.database.cards
      .where("listId")
      .equals(listId)
      .sortBy("position");
  }

  async getByBoardId(boardId: string) {
    const lists = await this.api.database.lists
      .where("boardId")
      .equals(boardId)
      .toArray();
    const listIds = lists.map((list) => list.id);
    const cards = await this.api.database.cards
      .where("listId")
      .anyOf(listIds)
      .toArray();
    return cards;
  }

  async deleteByBoardId(boardId: string) {
    const cards = await this.getByBoardId(boardId);
    const cardIds = cards.map((card) => card.id);
    await this.api.database.cards.bulkDelete(cardIds);
  }

  async cloneById(id: string, props: Partial<CardData>) {
    const originalCard = await this.getById(id);
    if (!originalCard) return;

    const cardId = await this.api.database.cards.add({
      ...originalCard,
      ...props,
      id: generateId(),
    });

    const originalComments = await this.api.comment.getByCardId(id);

    await Promise.all(
      originalComments.map((comment) =>
        this.api.comment.cloneById(comment.id, { cardId }),
      ),
    );

    const originalNonCommentCommits = (
      await this.api.commit.getByCardId(id)
    ).filter(
      (commit) =>
        commit.type !== RecordType.COMMENT_CREATE &&
        commit.type !== RecordType.COMMENT_UPDATE &&
        commit.type !== RecordType.COMMENT_DELETE,
    );

    await Promise.all(
      originalNonCommentCommits.map((commit) =>
        this.api.commit.cloneById(commit.id, { cardId }),
      ),
    );

    return cardId;
  }
}
