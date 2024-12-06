import { useThemeContext } from "../contexts/ThemeContextProvider";

const Box = () => {
  const { theme, setTheme } = useThemeContext();

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      onClick={changeTheme}
      className={`flex justify-center items-center w-[350px] h-[350px] text-2xl border border-gray-400 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {theme}
    </div>
  );
};

export default Box;
