import { Api } from "./api";
import { Card_Schema } from "src/database/schemas/new/card.schema";
import { generateDate } from "./generate-date";
import { generateId } from "./generate-id";
import { generateDiff } from "./generate-diff";

export class ApiCard {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async create(props: Pick<Card_Schema, "title" | "listId" | "position">) {
    const cardId = generateId();
    const commitId = generateId();
    const card: Card_Schema = {
      id: cardId,
      authorId: this.api.userId,
      createdAt: generateDate(),
      commitId,
      ...props,
    };
    await Promise.all([
      this.api.database.cards.add(card),
      this.api.database.cardsCommits.add({
        type: "card_update_commit",
        authorId: this.api.userId,
        cardId: cardId,
        createdAt: generateDate(),
        id: commitId,
        diff: generateDiff(props),
      }),
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
    const updated: Partial<Pick<Card_Schema, "listId" | "position" | "title">> =
      Object.fromEntries(
        Object.entries(props).filter(
          ([key, value]) => card[key as keyof Card_Schema] !== value,
        ),
      );
    if (Object.keys(updated).length === 0) return;
    console.log(generateDiff(props));
    await Promise.all([
      this.api.database.cards.update(id, {
        commitId,
        ...updated,
      }),
      this.api.database.cardsCommits.add({
        type: "card_update_commit",
        authorId: this.api.userId,
        cardId: id,
        createdAt: generateDate(),
        id: commitId,
        diff: generateDiff(props, card),
      }),
    ]);
    return this.api.database.cards.get(id);
  }

  async delete(id: string) {
    await Promise.all([
      this.api.database.cards.delete(id),
      this.api.database.cardsCommits.where("cardId").equals(id).delete(),
      this.api.database.comments.where("cardId").equals(id).delete(),
      this.api.database.commentsCommits.where("cardId").equals(id).delete(),
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

  // async create(props: { title: string; listId: string }) {
  //   const payload = {
  //     id: generateId(),
  //     createdAt: generateDate(),
  //     authorId: this.api.userId,
  //     position: 1,
  //     ...props,
  //   };
  //   const activity: Activity_Schema = {
  //     activityType: "card_create",
  //     authorId: payload.authorId,
  //     cardId: payload.id,
  //     createdAt: payload.createdAt,
  //     id: generateId(),
  //     payload,
  //   };
  //   const promises = Promise.all([
  //     this.api.database.cards.add(activity.payload),
  //     this.api.database.activities.add(activity),
  //   ]);
  //   await promises;
  //   return payload;
  // }

  // async update(props: { id: string; title?: string; listId?: string }) {
  //   const card = await this.getById(props.id);
  //   if (!card) return;
  //   const updateDiff = generateUpdateDiff(card, props);
  //   if (!updateDiff.hasUpdate) return;
  //   const payload = updateDiff.diffPatch;

  //   const activity: Activity_Schema = {
  //     activityType: "card_update",
  //     authorId: this.api.userId,
  //     cardId: props.id,
  //     createdAt: generateDate(),
  //     id: generateId(),
  //     payload,
  //   };

  //   await Promise.all([
  //     this.api.database.cards.update(activity.cardId, updateDiff.uniqueValues),
  //     this.api.database.activities.add(activity),
  //   ]);
  //   return payload;
  // }

  // async delete(cardId: string) {
  //   const card = await this.getById(cardId);
  //   if (!card) return;
  //   const activity: Activity_Schema = {
  //     activityType: "card_delete",
  //     authorId: this.api.userId,
  //     cardId,
  //     createdAt: generateDate(),
  //     id: generateId(),
  //   };
  //   await Promise.all([
  //     this.api.database.cards.delete(cardId),
  //     this.api.database.activities.add(activity),
  //   ]);
  //   return card;
  // }

  // async getById(id: string): Promise<Card_Schema | null> {
  //   const card = await this.api.database.cards.get(id);
  //   return card ?? null;
  // }
  // async getByListId(listId: string) {
  //   return this.api.database.cards
  //     .where("listId")
  //     .equals(listId)
  //     .sortBy("position");
  // }
}
