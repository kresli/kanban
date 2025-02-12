import { format, parseISO } from "date-fns";
import { Markdown } from "src/components/Markdown";
import {
  Comment_Schema,
  CommentData,
} from "src/database/schemas/comment.schema";

interface Props {
  comment: Comment_Schema;
}

export function Comment(props: Props) {
  return (
    <div
      data-testid="activity-comment-create"
      className="overflow-hidden rounded-lg border border-rim bg-white"
    >
      <div>
        <div className="flex items-center space-x-2 border-b border-rim bg-gray-100 px-4 py-2">
          <span className="text-base font-medium">
            {props.comment.authorId}
          </span>
          <FormatedDate comment={props.comment} />
        </div>
        <div className="p-4">
          <Markdown>{props.comment.text}</Markdown>
        </div>
      </div>
    </div>
  );
}

function FormatedDate(props: Props) {
  const friendlyDate = format(
    parseISO(props.comment.createdAt),
    "'on' MMM dd, yyyy",
  );
  return <span className="text-sm text-gray-500">{friendlyDate}</span>;
}
