import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function C() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <h2>Component C</h2>
      <button
        onClick={() =>
          setTheme(theme === "dark" ? "light" : "dark")
        }
      >
        Toggle Theme ({theme})
      </button>
    </div>
  );
}