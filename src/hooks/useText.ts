import { useState } from "react";

export interface UseText {
  value: string;
  setValue: (value: string) => void;
}

export function useText(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  return { value, setValue };
}
