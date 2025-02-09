import { IconTag } from "@tabler/icons-react";
import { FormatedDate } from "./FormatedDate";
import { Activity_Schema } from "src/database/schemas/activity.schema";
import { PropsWithChildren } from "react";

export function ActivityCard(
  props: PropsWithChildren<{
    activity: Activity_Schema;
    activityType?: string;
  }>,
) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center justify-center rounded-full bg-gray-100 p-2 text-gray-500">
        <IconTag size={16} />
      </div>
      <span className="text-base font-medium">{props.activity.authorId}</span>
      <span className="text-sm text-gray-500">
        {props.activityType ?? props.activity.activityType}
      </span>
      {props.children}
      <FormatedDate isoDate={props.activity.createdAt} />
    </div>
  );
}
