import { format, parseISO } from "date-fns";

export function FormatedDate(props: { isoDate: string }) {
  const friendlyDate = format(parseISO(props.isoDate), "'on' MMM dd, yyyy");
  return <span className="text-sm text-gray-500">{friendlyDate}</span>;
}
