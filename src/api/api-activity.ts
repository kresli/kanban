import { Api } from "./api";

export class ApiActivity {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async getByCardId(cardId: string) {
    return [];
    // return this.api.database.activities
    //   .where("cardId")
    //   .equals(cardId)
    //   .sortBy("createdAt");
  }
}
