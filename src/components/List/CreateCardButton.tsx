import { IconPlus } from "@tabler/icons-react";

interface Props {
  onClick: () => void;
}

export function CreateCardButton(props: Props) {
  return (
    <div className="flex justify-center p-2">
      <button
        onClick={props.onClick}
        className="flex flex-1 cursor-pointer items-center space-x-2 rounded border border-transparent p-2 text-sm text-secondary hover:border-primary-200 hover:bg-gray-100"
      >
        <IconPlus size={16} />
        <span>Add Card</span>
      </button>
    </div>
  );
}
