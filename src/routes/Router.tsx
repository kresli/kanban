import { BrowserRouter, Route, Routes } from "react-router";
import { HomeRoute } from "./Home.route";
import { BoardRoute } from "./Board.route";
import { BASE_URL } from "src/contants";
import { Page } from "../components/Page";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={BASE_URL} element={<Page />}>
          <Route index element={<HomeRoute />} />
          <Route path="board/:board-id" element={<BoardRoute />} />
          <Route path="card/:card-id" element={<BoardRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
