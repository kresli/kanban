import { UseFloatingReturn } from "@floating-ui/react";

export interface MenuContextValue {
  refs: UseFloatingReturn["refs"];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  x: number | null;
  y: number | null;
  getReferenceProps: () => Record<string, unknown>;
  getFloatingProps: () => Record<string, unknown>;
  strategy: "fixed" | "absolute";
}
