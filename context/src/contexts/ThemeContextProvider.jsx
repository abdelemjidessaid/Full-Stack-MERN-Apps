import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  return context;
};
