import { useFormatDate } from "src/hooks/useFormatDate";

export function FormatedDate(props: { isoDate: string }) {
  const friendlyDate = useFormatDate(props.isoDate);
  return (
    <span className="text-sm text-nowrap text-gray-500">{friendlyDate}</span>
  );
}
