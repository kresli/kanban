import { Api } from "./api";
import { generateDate } from "./generate-date";
import { generateId } from "./generate-id";
import { generateDiff } from "./generate-diff";
import { CommitType } from "src/database/schemas/commit-type";
import { Commit_Schema } from "src/database/schemas/commit.schema";
import { Comment_Schema } from "src/database/schemas/comment.schema";

export class ApiComment {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async create(props: { cardId: string; comment: string }) {
    const commitId = generateId();
    const commentId = generateId();
    const createdAt = generateDate();

    const commit: Commit_Schema = {
      type: CommitType.COMMENT_CREATE,
      authorId: this.api.userId,
      createdAt,
      id: commitId,
      commentId,
      cardId: props.cardId,
      data: {
        text: props.comment,
      },
    };
    const comment: Comment_Schema = {
      authorId: this.api.userId,
      createdAt,
      id: commentId,
      text: props.comment,
      cardId: props.cardId,
      type: CommitType.COMMENT,
    };
    await Promise.all([
      this.api.database.comments.add(comment),
      this.api.database.commits.add(commit),
    ]);
  }

  async getByCardId(cardId: string) {
    return this.api.database.comments
      .where("cardId")
      .equals(cardId)
      .sortBy("createdAt");
  }
}
