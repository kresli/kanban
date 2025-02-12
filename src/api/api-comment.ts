import { Api } from "./api";
import { generateDate } from "./generate-date";
import { generateId } from "./generate-id";
import { generateDiff } from "./generate-diff";

export class ApiComment {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async create(props: { cardId: string; comment: string }) {
    const commitId = generateId();
    const commentId = generateId();
    const createdAt = generateDate();
    const diff = generateDiff({ text: props.comment });
    await Promise.all([
      this.api.database.commentsCommits.add({
        type: "comment_update_commit",
        authorId: this.api.userId,
        cardId: props.cardId,
        createdAt,
        id: commitId,
        commentId,
        diff,
      }),
    ]);
    this.api.database.comments.add({
      type: "comment",
      id: commentId,
      cardId: props.cardId,
      authorId: this.api.userId,
      createdAt,
      commitId,
      text: props.comment,
    });
  }

  async getByCardId(cardId: string) {
    return this.api.database.comments
      .where("cardId")
      .equals(cardId)
      .sortBy("createdAt");
  }
}
