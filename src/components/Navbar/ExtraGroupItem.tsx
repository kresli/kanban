import classNames from "classnames";
import { NavLink } from "react-router";

export function ExtraGroupItem(props: {
  to: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <NavLink to={props.to} className="group w-full no-underline">
      {({ isActive }) => (
        <div
          className={classNames(
            "px4 box-border flex cursor-pointer items-center space-x-1 rounded-md border border-transparent px-2 py-1 font-light",
            isActive && "gradient-border",
            !isActive &&
              "text-gray-600 hover:border-secondary-100! hover:bg-white",
          )}
        >
          {props.icon}
          <span className="flex-1 text-base">{props.title}</span>
        </div>
      )}
    </NavLink>
  );
}
