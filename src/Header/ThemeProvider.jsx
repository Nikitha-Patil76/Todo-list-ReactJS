import React from 'react'
import {Sun , Moon} from "lucide-react";
import {useState, useEffect } from "react";


export function ThemeProvider()
{
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  return (
    <div className='header'>
          <button id="m" onClick={() => setDarkMode(!darkMode)} className='mode'>
      {darkMode ?<Moon size={24} /> : <Sun size={24} /> }
    </button>
    </div>
  );
}


