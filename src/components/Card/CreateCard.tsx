import { CardPaper } from "./CardPaper";
import { Card_Schema } from "src/database/schemas/card.schema";

interface Props {
  cardDraft: Card_Schema;
  onChange: (card: Card_Schema) => void;
  onSubmit: () => void;
}

export function CreateCard(props: Props) {
  if (!props.cardDraft) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    props.onSubmit();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({ ...props.cardDraft, title: e.target.value });
  };

  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length);
  };

  return (
    <CardPaper>
      <div className="flex flex-col">
        <input
          autoFocus
          onFocus={onFocus}
          value={props.cardDraft.title}
          onChange={onChange}
          className="w-full border-none bg-transparent p-0 leading-snug focus:outline-none"
          onKeyDown={onKeyDown}
          onBlur={props.onSubmit}
        />
      </div>
    </CardPaper>
  );
}
