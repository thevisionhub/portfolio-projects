import {
  BarChart3,
  FileBarChart,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  UsersRound
} from "lucide-react";

const items = [
  [LayoutDashboard, "Dashboard"],
  [ShoppingBag, "Orders"],
  [UsersRound, "Customers"],
  [BarChart3, "Analytics"],
  [Package, "Products"],
  [FileBarChart, "Reports"],
  [Settings, "Settings"]
];

export default function Sidebar({ open }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <a className="brand" href="#top">
        <span className="brand-mark">MF</span>
        <span>
          <strong>MetricFlow</strong>
          <small>Business Dashboard</small>
        </span>
      </a>

      <nav className="nav-list" aria-label="Primary navigation">
        {items.map(([Icon, label], index) => (
          <button className={`nav-item ${index === 0 ? "active" : ""}`} type="button" key={label}>
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="profile">
          <span className="avatar">SC</span>
          <span>
            <strong>Sarah Chen</strong>
            <small>Admin user</small>
          </span>
        </div>
        <button className="logout-button" type="button">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
