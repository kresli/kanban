import { useGoto } from "src/hooks/useGoto";

export function LogoButton() {
  const goto = useGoto();
  const onClick = () => goto.home();
  return (
    <div
      className="flex h-12 w-full cursor-pointer items-center justify-center font-semibold text-brand-primary hover:bg-white"
      onClick={onClick}
    >
      <p>Kanban</p>
    </div>
  );
}
