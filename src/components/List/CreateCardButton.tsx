import { IconPlus } from "@tabler/icons-react";

interface Props {
  onClick: () => void;
}

export function CreateCardButton(props: Props) {
  return (
    <div>
      <button
        onClick={props.onClick}
        className="flex items-center space-x-2 rounded p-2 text-blue-500 hover:bg-gray-100"
      >
        <IconPlus size={16} />
        <span>Add Card</span>
      </button>
    </div>
  );
}
