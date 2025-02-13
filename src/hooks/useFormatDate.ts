import { useEffect, useState } from "react";
import { formatDate } from "src/utils/format-date";

export function useFormatDate(isoDate: string): string {
  const [date, setDate] = useState(() => formatDate(isoDate));
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(formatDate(isoDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [isoDate]);
  return date;
}
