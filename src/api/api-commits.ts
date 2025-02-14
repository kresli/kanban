import { Api } from "./api";

export class ApiCommits {
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
    const cardIds = cards.map((card) => card.id);
    return this.api.database.commits
      .where("cardId")
      .anyOf(cardIds)
      .sortBy("createdAt");
  }

  async deleteByBoardId(boardId: string) {
    const commits = await this.getByBoardId(boardId);
    const commitIds = commits.map((commit) => commit.id);
    await this.api.database.commits.bulkDelete(commitIds);
  }

  async deleteByCommentId(commentId: string) {
    const commits = await this.api.database.commits
      .where("commentId")
      .equals(commentId)
      .toArray();
    const commitIds = commits.map((commit) => commit.id);
    await this.api.database.commits.bulkDelete(commitIds);
  }
}
