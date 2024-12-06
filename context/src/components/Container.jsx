import React from "react";
import { useThemeContext } from "../contexts/ThemeContextProvider";

const Container = ({ children }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`flex justify-center items-center h-screen w-screen ${
        theme === "light" ? "bg-white" : "bg-gray-800"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
