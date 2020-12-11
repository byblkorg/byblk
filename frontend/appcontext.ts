import { createContext, Dispatch } from "react";
import { createTheme } from "theme";

export interface AppContextInterface {
  darkmode: boolean;
  setDarkMode: Dispatch<boolean>;
  theme: ReturnType<typeof createTheme>;
}

export default createContext<AppContextInterface | null>(null);
