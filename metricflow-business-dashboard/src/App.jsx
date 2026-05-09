import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatsCard from "./components/StatsCard";
import SalesChart from "./components/SalesChart";
import CategoryChart from "./components/CategoryChart";
import RecentOrdersTable from "./components/RecentOrdersTable";
import CustomersTable from "./components/CustomersTable";
import { orders, stats } from "./data/dashboardData";
import "./index.css";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [dateRange, setDateRange] = useState("Last 30 days");

  const filteredOrders = useMemo(() => {
    const keyword = search.toLowerCase().trim();
    return orders.filter((order) => {
      const text = [order.id, order.customer, order.product, order.category].join(" ").toLowerCase();
      return (!keyword || text.includes(keyword)) && (status === "All" || order.status === status) && (category === "All" || order.category === category);
    });
  }, [search, status, category]);

  return (
    <div className="dashboard" data-theme={theme}>
      <Sidebar open={sidebarOpen} />
      <main className="main">
        <Topbar
          search={search}
          setSearch={setSearch}
          dateRange={dateRange}
          setDateRange={setDateRange}
          onMenuClick={() => setSidebarOpen(true)}
          onThemeToggle={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          theme={theme}
        />
        <section className="hero-row">
          <div>
            <p className="eyebrow">Business Overview</p>
            <h1>Dashboard Overview</h1>
            <p>Track your revenue, orders, customers, and business growth in one place.</p>
          </div>
        </section>
        <section className="metric-grid">{stats.map((item) => <StatsCard item={item} key={item.label} />)}</section>
        <section className="content-grid">
          <SalesChart theme={theme} />
          <CategoryChart />
        </section>
        <section className="bottom-grid">
          <RecentOrdersTable orders={filteredOrders} search={search} setSearch={setSearch} status={status} setStatus={setStatus} category={category} setCategory={setCategory} />
          <CustomersTable />
        </section>
      </main>
    </div>
  );
}
