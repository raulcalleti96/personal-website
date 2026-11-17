import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ className = "" }) {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((v) => !v)}
      aria-label="Toggle day/night theme"
      className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-semibold text-tinta/70 hover:text-tinta transition-colors ${className}`}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
}
