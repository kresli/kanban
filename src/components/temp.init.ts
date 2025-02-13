/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockedDbData } from "./mocked-db-data";
import { Api } from "src/api";

export function initDB(db: Api, enabled: boolean) {
  if (!enabled) return;
  db.database.tables.forEach((table) => table.clear());

  const { boards, lists, activities, cards } = mockedDbData;
  db.database.boards.bulkAdd(boards);
  db.database.lists.bulkAdd(lists);
  db.database.commits.bulkAdd(activities);
  db.database.cards.bulkAdd(cards);
}
