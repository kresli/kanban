import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { MenuContextValue } from "./MenuContextValue";

export function useFloatingMenu(props: {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}): MenuContextValue {
  const { x, y, refs, strategy, context } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
    onOpenChange: props.onOpenChange,
    open: props.isOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);
  return {
    refs,
    isOpen: props.isOpen,
    setIsOpen: props.onOpenChange,
    x,
    y,
    getReferenceProps,
    getFloatingProps,
    strategy,
  };
}
