import { IconTag } from "@tabler/icons-react";
import { FormatedDate } from "./FormatedDate";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import { Commit_Schema } from "src/database/schemas/commit.schema";

export function ActivityCard(
  props: PropsWithChildren<{
    activity: Commit_Schema;
    testid?: string;
  }>,
) {
  return (
    <div className="flex items-center space-x-2" data-testid={props.testid}>
      <div className="flex items-center justify-center rounded-full border border-rim bg-primary-100 p-1.5 text-primary-400">
        <IconTag size={16} />
      </div>
      <span className="text-sm font-semibold">{props.activity.authorId}</span>
      <span className="flex flex-row items-center justify-center space-x-2 text-sm text-primary-400">
        {props.children}
      </span>
      <FormatedDate isoDate={props.activity.createdAt} />
    </div>
  );
}

export function ActivityTag(
  props: PropsWithChildren<{
    color?: "red" | "green" | "neutral";
  }>,
) {
  const { color = "neutral" } = props;
  return (
    <span
      className={classNames(
        "flex h-6 items-center justify-center rounded-md border px-2 text-sm",
        color === "neutral" && "bg-gray-50 text-gray-500",
        color === "green" && "bg-green-50 text-green-600",
        color === "red" && "bg-red-50 text-red-600",
      )}
    >
      {props.children}
    </span>
  );
}
