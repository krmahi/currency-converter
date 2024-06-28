import { useState, useEffect } from "react";

import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter";
import ThemeButton from "./components/themeButton";
import { ThemeProvider } from "./contexts/theme";

function App() {
  const [themeMode, setThemeMode] = useState("dark");

  const darkTheme = () => {
    setThemeMode("dark");
  };
  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <div className="select-none">
        <div className="p-4 absolute right-0">
          <ThemeButton />
        </div>
        <div className="min-h-screen dark:bg-[#1F1F1F] flex flex-col items-center justify-center ">
          <div className="container p-5">
            <CurrencyConverter />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
