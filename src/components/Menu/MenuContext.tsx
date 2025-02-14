import { createContext } from "react";
import { MenuContextValue } from "./MenuContextValue";

export const MenuContext = createContext<MenuContextValue>(null!);
