import { BASE_URL } from "src/contants";

export const ROUTE_URL = {
  card: (cardId: string) => `${BASE_URL}/card/${cardId}`,
  board: (boardId: string) => `${BASE_URL}/board/${boardId}`,
  home: () => BASE_URL,
};
