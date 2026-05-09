import { Bell, Menu, Moon, Search, Sun } from "lucide-react";

export default function Topbar({ search, setSearch, dateRange, setDateRange, onMenuClick, onThemeToggle, theme }) {
  return (
    <header className="topbar" id="top">
      <button className="icon-button mobile-menu" type="button" aria-label="Open sidebar" onClick={onMenuClick}>
        <Menu size={18} />
      </button>

      <label className="search-wrap">
        <Search size={18} />
        <span className="sr-only">Search dashboard</span>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search orders, customers, or products..." />
      </label>

      <div className="topbar-actions">
        <select className="select" value={dateRange} onChange={(event) => setDateRange(event.target.value)} aria-label="Date range">
          {["Today", "Last 7 days", "Last 30 days", "This year"].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <button className="icon-button" type="button" aria-label="Toggle theme" onClick={onThemeToggle}>
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-dot" />
        </button>
        <span className="top-avatar">SC</span>
      </div>
    </header>
  );
}
