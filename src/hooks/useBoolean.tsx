import { useState, useCallback } from "react";

export interface UseBoolean {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
}

export function useBoolean(initialValue = false): UseBoolean {
  const [value, setValue] = useState(initialValue);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, setTrue, setFalse, setValue };
}
