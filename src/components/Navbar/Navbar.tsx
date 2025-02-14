import { BoardsGroup } from "./BoardsGroup";
import { Divider } from "./Divider";
import { ExtraGroup } from "./ExtraGroup";
import { LogoButton } from "./LogoButton";

export function Navbar() {
  return (
    <div className="w-min-w-56 max-w-min-w-56 flex h-full min-w-56 flex-col border-r border-rim bg-bg-main backdrop-blur">
      <LogoButton />
      <Divider />
      <BoardsGroup />
      <Divider />
      <ExtraGroup />
    </div>
  );
}
