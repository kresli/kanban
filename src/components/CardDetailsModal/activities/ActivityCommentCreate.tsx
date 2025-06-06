import { format, parseISO } from "date-fns";
import { Markdown } from "src/components/Markdown";
import { Comment_Schema } from "src/database/schemas/comment.schema";

interface Props {
  activity: Comment_Schema;
}

export function ActivityCommentCreate(props: Props) {
  return (
    <div
      data-testid="activity-comment-create"
      className="overflow-hidden rounded-lg border border-rim bg-white"
    >
      <div>
        <div className="flex items-center space-x-2 border-b border-rim bg-gray-100 px-4 py-2">
          <span className="text-base font-medium">
            {props.activity.authorId}
          </span>
          <FormatedDate activity={props.activity} />
        </div>
        <div className="p-4">
          <Markdown>{props.activity.text}</Markdown>
        </div>
      </div>
    </div>
  );
}

function FormatedDate(props: Props) {
  const friendlyDate = format(
    parseISO(props.activity.createdAt),
    "'on' MMM dd, yyyy",
  );
  return <span className="text-sm text-gray-500">{friendlyDate}</span>;
}
