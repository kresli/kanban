import ReactMarkdown from "react-markdown";

interface Props {
  children: string | undefined | null;
  className?: string;
}

export function Markdown({ children, className }: Props) {
  return (
    <div className={`prose ${className}`}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
