"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

interface ThemeContextProps {
  mode: string;
  setmode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setmode] = useState("");

  const handleThemeChange = () => {
    if (mode === "dark") {
      setmode("light");
      document.documentElement.classList.add("light");
    } else {
      setmode("dark");
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setmode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
