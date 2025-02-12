import { Api } from "./api";

export class ApiCardCommits {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async getByCardId(cardId: string) {
    return this.api.database.commits
      .where("cardId")
      .equals(cardId)
      .sortBy("createdAt");
  }
}
