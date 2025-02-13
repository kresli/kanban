import { format, formatDistanceToNow, parseISO } from "date-fns";

export function formatDate(isoDate: string) {
  return formatFriendlyDate(parseISO(isoDate));
}
export function formatFriendlyDate(date: Date): string {
  const now = new Date();
  const diffInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  if (diffInDays < 1) {
    return formatDistanceToNow(date, { addSuffix: true }); // "5 minutes ago"
  } else if (diffInDays < 7) {
    return formatDistanceToNow(date, { addSuffix: true }); // "2 days ago"
  } else {
    return `on ${format(date, "MMM d, yyyy")}`; // "on May 25, 2024"
  }
}
