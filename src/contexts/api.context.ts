import { createContext } from "react";
import { Api } from "src/api";

export const ApiContext = createContext<Api | null>(null);
