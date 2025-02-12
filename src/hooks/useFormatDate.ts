import { useMemo } from "react";
import { formatDate } from "src/utils/format-date";

export function useFormatDate(isoDate: string): string {
  return useMemo(() => formatDate(isoDate), [isoDate]);
}
