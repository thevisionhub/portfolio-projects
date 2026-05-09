import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ theme, onClick }) {
  return (
    <button className="theme-button" type="button" onClick={onClick}>
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
