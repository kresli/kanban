export function PrimaryButton(props: { onClick: () => void; text: string }) {
  return (
    <button
      className="cursor-pointer rounded bg-secondary-500 px-3 py-1 text-sm text-white hover:bg-secondary-600"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
