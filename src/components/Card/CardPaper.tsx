import { PropsWithChildren } from "react";

export function CardPaper(
  props: PropsWithChildren<{
    onDragOver?: (e: React.DragEvent) => void;
    isDragging?: boolean;
    onDragStart?: (event: React.DragEvent) => void;
    onClick?: () => void;
  }>,
) {
  return (
    <div
      className={`px-1 py-0.5 ${props.isDragging ? "opacity-50" : "opacity-100"}`}
      onDragOver={props.onDragOver}
      onClick={props.onClick}
    >
      <div
        className="hover:outline-primary-500 relative z-0 cursor-pointer overflow-hidden rounded bg-white p-1 shadow-md hover:outline hover:outline-2 hover:outline-offset-1"
        draggable={true}
        onDragStart={props.onDragStart}
      >
        {props.children}
      </div>
    </div>
  );
}
