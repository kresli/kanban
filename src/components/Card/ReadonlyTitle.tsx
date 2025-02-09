import { UseBoolean } from "src/hooks/useBoolean";
import { UseText } from "src/hooks/useText";
import { Card_Schema } from "src/database/schemas/card.schema";
import { IconEdit } from "@tabler/icons-react";

interface Props {
  card: Card_Schema;
  draftTitle: UseText;
  isEdit: UseBoolean;
}

export function ReadonlyTitle(props: Props) {
  if (props.isEdit.value) return null;
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.isEdit.setTrue();
    props.draftTitle.setValue(props.card.title);
  };
  return (
    <div className="relative flex">
      <span className="text-start text-sm font-normal">{props.card.title}</span>
      <button
        onClick={onClick}
        className="absolute top-1 right-1 hidden rounded bg-white p-1 group-hover:block hover:bg-gray-100"
      >
        <IconEdit size={16} />
      </button>
    </div>
  );
}
