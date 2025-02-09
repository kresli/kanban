import classNames from "classnames";
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
      className={classNames(
        "px-2 py-1",
        props.isDragging ? "opacity-50" : "opacity-100",
      )}
      onDragOver={props.onDragOver}
      onClick={props.onClick}
    >
      <div
        className="relative z-0 cursor-pointer overflow-hidden rounded border border-rim bg-white p-2 shadow-sm hover:border-secondary-300"
        draggable={true}
        onDragStart={props.onDragStart}
      >
        {props.children}
      </div>
    </div>
  );
}
