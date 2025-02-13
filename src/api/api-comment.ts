import { Api } from "./api";
import { generateDate } from "./generate-date";
import { generateId } from "./generate-id";
import { generateDiff } from "./generate-diff";
import { RecordType } from "src/database/schemas/record-type";
import { Commit_Schema } from "src/database/schemas/commit.schema";
import {
  Comment_Commit_Create_Schema,
  Comment_Commit_Update_Schema,
  Comment_Schema,
  CommentData,
} from "src/database/schemas/comment.schema";

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
      type: RecordType.COMMENT_CREATE,
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
      type: RecordType.COMMENT,
    };
    await Promise.all([
      this.api.database.comments.add(comment),
      this.api.database.commits.add(commit),
    ]);
  }

  async update(id: string, props: Partial<CommentData>) {
    const comment = await this.api.database.comments.get(id);
    if (!comment) return;
    const diff = generateDiff(props, comment);
    if (Object.keys(diff).length === 0) return;

    const commit: Comment_Commit_Update_Schema = {
      type: RecordType.COMMENT_UPDATE,
      authorId: this.api.userId,
      createdAt: generateDate(),
      id: generateId(),
      cardId: comment.cardId,
      commentId: id,
      diff,
    };
    await Promise.all([
      this.api.database.comments.update(id, props),
      this.api.database.commits.add(commit),
    ]);
  }

  async getVersions(
    commentId: string,
  ): Promise<(Comment_Commit_Update_Schema | Comment_Commit_Create_Schema)[]> {
    return this.api.database.commits
      .where("commentId")
      .equals(commentId)
      .filter(
        (commit) =>
          commit.type === RecordType.COMMENT_UPDATE ||
          commit.type === RecordType.COMMENT_CREATE,
      )
      .sortBy("createdAt");
  }

  async getByCardId(cardId: string) {
    return this.api.database.comments
      .where("cardId")
      .equals(cardId)
      .sortBy("createdAt");
  }
}
