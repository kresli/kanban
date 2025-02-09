import { PropsWithChildren } from "react";

export function ScrollContainer(props: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col overflow-auto text-center">
      <div>{props.children}</div>
    </div>
  );
}
