import { FloatingPortal } from "@floating-ui/react";
import { useContext } from "react";
import { useFloatingMenu } from "./useFloatingMenu";
import { MenuContext } from "./MenuContext";

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
