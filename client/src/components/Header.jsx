import React from "react";
import { useTheme } from "../context/ThemeProvider.jsx";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
      <h1 className="text-xl font-bold">CRUD App</h1>
      <button
        onClick={() => {
          toggleTheme();
        }}
        className="p-2 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}
