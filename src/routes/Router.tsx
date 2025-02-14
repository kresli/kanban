import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { BoardRoute } from "./Board.route";
import { BASE_URL } from "src/contants";
import { Page } from "../components/Page";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={BASE_URL} element={<Page />}>
          <Route path="board/:board-id" element={<BoardRoute />} />
          <Route path="card/:card-id" element={<BoardRoute />} />
          <Route
            path=""
            element={<Navigate replace to="board/kanban-demo" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
