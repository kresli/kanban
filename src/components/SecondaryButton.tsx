export function SecondaryButton(props: { onClick: () => void; text: string }) {
  return (
    <button
      className="cursor-pointer rounded border border-rim px-3 py-1 text-sm hover:bg-gray-100"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
