import ReactMarkdown from "react-markdown";

interface Props {
  children: string | undefined | null;
}

export function Markdown({ children }: Props) {
  return (
    <div className="text-primary-900">
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
