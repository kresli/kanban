import { Activity_Schema } from "src/database/schemas/activity.schema";
import { Api } from "./api";
import { generateDate } from "./generate-date";
import { generateId } from "./generate-id";

export class ApiComment {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async create(props: { cardId: string; comment: string }) {
    const activity: Activity_Schema = {
      activityType: "card_comment_create",
      authorId: this.api.userId,
      cardId: props.cardId,
      createdAt: generateDate(),
      id: generateId(),
      payload: {
        comment: props.comment,
      },
    };
    await this.api.database.activities.add(activity);
  }
}
