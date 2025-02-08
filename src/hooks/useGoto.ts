import { useNavigate } from "react-router";
import { ROUTE_URL } from "src/utils/route-url";
export function useGoto() {
  const navigate = useNavigate();
  return {
    board: (id: string) => navigate(ROUTE_URL.board(id)),
    card: (id: string) => navigate(ROUTE_URL.card(id)),
    home: () => navigate(ROUTE_URL.home()),
  };
}
