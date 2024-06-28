import React from "react";
import useTheme from "../contexts/theme";

const themeButton = () => {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const onChangeBtn = () => {
    themeMode === "dark" ? lightTheme() : darkTheme();
  };
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={themeMode === "dark"}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
      <span className="ml-3 text-sm font-medium dark:text-[#B4B4B4]">
        {themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
      </span>
    </label>
  );
};

export default themeButton;
