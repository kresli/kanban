import { format, parseISO } from "date-fns";

export function formatDate(isoDate: string) {
  return format(parseISO(isoDate), "'on' MMM dd, yyyy");
}
