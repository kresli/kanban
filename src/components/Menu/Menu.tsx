import {
  FloatingPortal,
  UseFloatingReturn,
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { createContext, useContext } from "react";

const MenuContext = createContext<MenuContextValue>(null!);

export function Menu(props: {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const value = useFloatingMenu({
    isOpen: props.isOpen,
    onOpenChange: props.onOpenChange,
  });
  return (
    <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>
  );
}
Menu.Trigger = function MenuTrigger(props: {
  children: React.ReactNode;
  className?: string;
}) {
  const { refs, getReferenceProps } = useContext(MenuContext);
  return (
    <button
      ref={refs.setReference}
      {...getReferenceProps()}
      className={props.className}
    >
      {props.children}
    </button>
  );
};
Menu.Content = function MenuContent(props: { children: React.ReactNode }) {
  const { refs, isOpen, x, y, getFloatingProps, strategy } =
    useContext(MenuContext);
  if (!isOpen) return null;
  return (
    <FloatingPortal>
      <menu
        ref={refs.setFloating}
        {...getFloatingProps()}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          zIndex: 50,
        }}
        className="absolute min-w-[120px] rounded-lg border border-rim bg-white p-2 shadow-lg"
      >
        {props.children}
      </menu>
    </FloatingPortal>
  );
};

interface MenuContextValue {
  refs: UseFloatingReturn["refs"];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  x: number | null;
  y: number | null;
  getReferenceProps: () => Record<string, unknown>;
  getFloatingProps: () => Record<string, unknown>;
  strategy: "fixed" | "absolute";
}

function useFloatingMenu(props: {
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
