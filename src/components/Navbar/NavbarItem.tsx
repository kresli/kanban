import { NavLink } from "react-router";
import classNames from "classnames";

interface Props {
  to: string;
  title: string;
  actions?: React.ReactNode;
}

export function NavbarItem(props: Props) {
  return (
    <NavLink to={props.to} className="w-full no-underline">
      {({ isActive }) => (
        <div
          className={classNames(
            "flex cursor-pointer items-center rounded px-4 py-2 transition-colors",
            isActive
              ? "bg-gray-300 text-gray-900"
              : "bg-transparent text-gray-900 hover:bg-gray-300",
          )}
        >
          <span className="flex-1 text-base">{props.title}</span>
          <div
            className="actions invisible group-hover:visible"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {props.actions}
          </div>
        </div>
      )}
    </NavLink>
  );
}
