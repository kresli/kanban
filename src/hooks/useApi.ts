import { useContext } from "react";
import { ApiContext } from "src/contexts/api.context";

export function useApi() {
  const ctx = useContext(ApiContext);
  if (!ctx) {
    throw new Error("useApi must be used within a DBProvider");
  }
  return ctx;
}
