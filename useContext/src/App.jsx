import  { useState } from "react";
import { ThemeContext } from "./context/ThemeContext.jsx";
import A from "./components/A";

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <h1>useContext Folder Structure</h1>
      <A />
    </ThemeContext.Provider>
  );
}


// n React, prop drilling happens when we pass data from a parent component 
// to deeply nested child components through multiple intermediate components.
//  To solve this, we use useContext,
// which allows us to share data globally without passing props manually.