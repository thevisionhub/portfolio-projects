const { useEffect, useMemo, useState } = React;
const h = React.createElement;

const STORAGE_KEY = "metricflow-theme";

const navItems = [
  { icon: "layout-dashboard", label: "Dashboard" },
  { icon: "shopping-bag", label: "Orders" },
  { icon: "users-round", label: "Customers" },
  { icon: "line-chart", label: "Analytics" },
  { icon: "package", label: "Products" },
  { icon: "file-bar-chart", label: "Reports" },
  { icon: "settings", label: "Settings" }
];

const rangeProfiles = {
  Today: {
    period: "today",
    stats: [
      { label: "Total Revenue", value: "$8,420", trend: "+3.2% vs yesterday", icon: "dollar-sign" },
      { label: "Total Orders", value: "186", trend: "+2.4% vs yesterday", icon: "shopping-cart" },
      { label: "Active Customers", value: "92", trend: "+1.8% vs yesterday", icon: "users" },
      { label: "Growth Rate", value: "4.8%", trend: "+0.7% vs yesterday", icon: "trending-up" }
    ],
    sales: [
      { label: "8 AM", sales: 640, orders: 14 },
      { label: "10 AM", sales: 1180, orders: 24 },
      { label: "12 PM", sales: 1640, orders: 38 },
      { label: "2 PM", sales: 1380, orders: 31 },
      { label: "4 PM", sales: 1820, orders: 42 },
      { label: "6 PM", sales: 2380, orders: 54 },
      { label: "8 PM", sales: 3120, orders: 68 }
    ],
    categories: [
      { name: "Sneakers", value: 3180, color: "#2563eb" },
      { name: "Clothing", value: 1860, color: "#16a34a" },
      { name: "Accessories", value: 1240, color: "#f59e0b" },
      { name: "Watches", value: 920, color: "#64748b" },
      { name: "Bags", value: 640, color: "#dc2626" }
    ]
  },
  "Last 7 days": {
    period: "last 7 days",
    stats: [
      { label: "Total Revenue", value: "$42,680", trend: "+7.8% vs previous week", icon: "dollar-sign" },
      { label: "Total Orders", value: "914", trend: "+6.1% vs previous week", icon: "shopping-cart" },
      { label: "Active Customers", value: "386", trend: "+4.4% vs previous week", icon: "users" },
      { label: "Growth Rate", value: "9.6%", trend: "+1.2% vs previous week", icon: "trending-up" }
    ],
    sales: [
      { label: "Thu", sales: 4800, orders: 94 },
      { label: "Fri", sales: 5600, orders: 108 },
      { label: "Sat", sales: 7100, orders: 136 },
      { label: "Sun", sales: 6400, orders: 124 },
      { label: "Mon", sales: 5900, orders: 116 },
      { label: "Tue", sales: 6900, orders: 132 },
      { label: "Wed", sales: 8380, orders: 164 }
    ],
    categories: [
      { name: "Sneakers", value: 16900, color: "#2563eb" },
      { name: "Clothing", value: 10400, color: "#16a34a" },
      { name: "Accessories", value: 6800, color: "#f59e0b" },
      { name: "Watches", value: 5100, color: "#64748b" },
      { name: "Bags", value: 3480, color: "#dc2626" }
    ]
  },
  "Last 30 days": {
    period: "last 30 days",
    stats: [
      { label: "Total Revenue", value: "$128,450", trend: "+12.5% vs last month", icon: "dollar-sign" },
      { label: "Total Orders", value: "3,482", trend: "+8.2% vs last month", icon: "shopping-cart" },
      { label: "Active Customers", value: "1,248", trend: "+5.7% vs last month", icon: "users" },
      { label: "Growth Rate", value: "18.4%", trend: "+3.1% vs last month", icon: "trending-up" }
    ],
    sales: [
      { label: "Week 1", sales: 24600, orders: 642 },
      { label: "Week 2", sales: 29200, orders: 748 },
      { label: "Week 3", sales: 33700, orders: 912 },
      { label: "Week 4", sales: 40950, orders: 1180 }
    ],
    categories: [
      { name: "Sneakers", value: 42000, color: "#2563eb" },
      { name: "Clothing", value: 28500, color: "#16a34a" },
      { name: "Accessories", value: 18200, color: "#f59e0b" },
      { name: "Watches", value: 12400, color: "#64748b" },
      { name: "Bags", value: 9200, color: "#dc2626" }
    ]
  },
  "This year": {
    period: "this year",
    stats: [
      { label: "Total Revenue", value: "$392,700", trend: "+21.9% vs last year", icon: "dollar-sign" },
      { label: "Total Orders", value: "9,846", trend: "+17.4% vs last year", icon: "shopping-cart" },
      { label: "Active Customers", value: "3,840", trend: "+13.8% vs last year", icon: "users" },
      { label: "Growth Rate", value: "24.6%", trend: "+5.6% vs last year", icon: "trending-up" }
    ],
    sales: [
      { label: "Jan", sales: 12000, orders: 248 },
      { label: "Feb", sales: 18500, orders: 326 },
      { label: "Mar", sales: 16200, orders: 312 },
      { label: "Apr", sales: 22000, orders: 398 },
      { label: "May", sales: 24800, orders: 421 },
      { label: "Jun", sales: 31000, orders: 508 },
      { label: "Jul", sales: 28500, orders: 486 },
      { label: "Aug", sales: 35500, orders: 562 },
      { label: "Sep", sales: 39200, orders: 624 },
      { label: "Oct", sales: 42000, orders: 682 },
      { label: "Nov", sales: 46800, orders: 734 },
      { label: "Dec", sales: 52000, orders: 810 }
    ],
    categories: [
      { name: "Sneakers", value: 142000, color: "#2563eb" },
      { name: "Clothing", value: 96500, color: "#16a34a" },
      { name: "Accessories", value: 64200, color: "#f59e0b" },
      { name: "Watches", value: 52400, color: "#64748b" },
      { name: "Bags", value: 37600, color: "#dc2626" }
    ]
  }
};

const orders = [
  { id: "#ORD-1048", customer: "Emily Carter", product: "AirFlex Runner X1", status: "Completed", amount: "$89", date: "May 7, 2026", category: "Sneakers" },
  { id: "#ORD-1047", customer: "Daniel Brooks", product: "Urban Black Edition", status: "Pending", amount: "$149", date: "May 7, 2026", category: "Sneakers" },
  { id: "#ORD-1046", customer: "Sophia Johnson", product: "CloudStep Everyday", status: "Completed", amount: "$74", date: "May 6, 2026", category: "Sneakers" },
  { id: "#ORD-1045", customer: "Michael Reed", product: "Retro Court Classic", status: "Cancelled", amount: "$99", date: "May 6, 2026", category: "Sneakers" },
  { id: "#ORD-1044", customer: "Olivia Brown", product: "Velocity Pro Knit", status: "Completed", amount: "$135", date: "May 5, 2026", category: "Sneakers" },
  { id: "#ORD-1043", customer: "Noah Wilson", product: "Everyday Hoodie", status: "Pending", amount: "$62", date: "May 5, 2026", category: "Clothing" },
  { id: "#ORD-1042", customer: "Ava Martinez", product: "Minimal Watch Pro", status: "Completed", amount: "$210", date: "May 4, 2026", category: "Watches" },
  { id: "#ORD-1041", customer: "Ethan Miller", product: "City Backpack", status: "Completed", amount: "$118", date: "May 4, 2026", category: "Bags" }
];

const customers = [
  { name: "Emily Carter", email: "emily@example.com", orders: 12, spent: "$1,240", status: "VIP", city: "New York" },
  { name: "Daniel Brooks", email: "daniel@example.com", orders: 9, spent: "$980", status: "Returning", city: "Boston" },
  { name: "Sophia Johnson", email: "sophia@example.com", orders: 7, spent: "$760", status: "Returning", city: "Chicago" },
  { name: "Michael Reed", email: "michael@example.com", orders: 6, spent: "$640", status: "New", city: "Austin" }
];

const products = [
  { name: "AirFlex Runner X1", category: "Sneakers", stock: 42, revenue: "$18,900", status: "Best Seller" },
  { name: "Urban Black Edition", category: "Sneakers", stock: 18, revenue: "$16,390", status: "Low Stock" },
  { name: "CloudStep Everyday", category: "Sneakers", stock: 64, revenue: "$12,580", status: "Active" },
  { name: "Everyday Hoodie", category: "Clothing", stock: 38, revenue: "$8,420", status: "Active" },
  { name: "Minimal Watch Pro", category: "Watches", stock: 12, revenue: "$10,290", status: "Premium" },
  { name: "City Backpack", category: "Bags", stock: 25, revenue: "$7,840", status: "Active" }
];

const reports = [
  { title: "Revenue Summary", metric: "$128.4k", detail: "Monthly revenue with category contribution and growth notes.", icon: "bar-chart-3" },
  { title: "Order Fulfillment", metric: "91.2%", detail: "Completed orders compared with pending and cancelled orders.", icon: "clipboard-check" },
  { title: "Customer Retention", metric: "68.5%", detail: "Returning customer rate for the selected reporting period.", icon: "repeat-2" },
  { title: "Inventory Watch", metric: "7 SKUs", detail: "Products that need restock attention in the next sales cycle.", icon: "warehouse" }
];

const activities = [
  ["circle-dollar-sign", "Revenue target reached", "Revenue is trending above the selected period benchmark."],
  ["shopping-bag", "12 new orders queued", "Pending orders are waiting for confirmation and fulfillment."],
  ["users", "Customer segment improved", "Returning customer rate increased for the current period."]
];

const viewCopy = {
  Dashboard: ["Dashboard Overview", "Track your revenue, orders, customers, and business growth in one place."],
  Orders: ["Orders Management", "Search, filter, and review recent customer orders."],
  Customers: ["Customer Insights", "Monitor top customers, order count, spending, and account health."],
  Analytics: ["Analytics Overview", "Explore sales trends, revenue categories, and performance signals."],
  Products: ["Product Performance", "Review product stock, sales contribution, and category status."],
  Reports: ["Reports Center", "Preview business reports that could be connected to exports later."],
  Settings: ["Dashboard Settings", "Manage demo preferences, profile details, and workspace controls."]
};

function Icon({ name }) {
  return h("i", { "data-lucide": name, "aria-hidden": "true" });
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "dark";
  } catch {
    return "dark";
  }
}

function matchesDateRange(order, dateRange) {
  if (dateRange === "Today") {
    return order.date === "May 7, 2026";
  }
  if (dateRange === "Last 7 days" || dateRange === "Last 30 days" || dateRange === "This year") {
    return true;
  }
  return true;
}

function App() {
  const [theme, setTheme] = useState(getStoredTheme);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("Dashboard");
  const [globalSearch, setGlobalSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [toast, setToast] = useState("");

  const range = rangeProfiles[dateRange];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      return;
    }
  }, [theme]);

  useEffect(() => {
    refreshIcons();
  });

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const filteredOrders = useMemo(() => {
    const keyword = orderSearch.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesSearch = [order.id, order.customer, order.product, order.category].join(" ").toLowerCase().includes(keyword);
      const matchesStatus = status === "All" || order.status === status;
      const matchesCategory = category === "All" || order.category === category;
      return matchesDateRange(order, dateRange) && matchesSearch && matchesStatus && matchesCategory;
    });
  }, [orderSearch, status, category, dateRange]);

  const suggestions = useMemo(() => buildSuggestions(globalSearch), [globalSearch]);

  const navigate = (view) => {
    setActiveView(view);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  const handleTopSearch = (value) => {
    setGlobalSearch(value);
    if (activeView === "Orders") {
      setOrderSearch(value);
    }
  };

  const handleSuggestion = (suggestion) => {
    setGlobalSearch(suggestion.label);
    if (suggestion.view === "Orders") {
      setOrderSearch(suggestion.value || suggestion.label);
    }
    navigate(suggestion.view);
  };

  const confirmLogout = () => {
    setLogoutOpen(false);
    setToast("Demo logout complete. In a real app this would end the admin session.");
  };

  return h(
    "div",
    { className: "dashboard" },
    sidebarOpen && h("button", { className: "sidebar-backdrop", "aria-label": "Close sidebar", onClick: () => setSidebarOpen(false) }),
    h(Sidebar, {
      open: sidebarOpen,
      activeView,
      onNavigate: navigate,
      onThemeToggle: toggleTheme,
      onProfileClick: () => setProfileOpen(true),
      onLogout: () => setLogoutOpen(true),
      theme
    }),
    h(
      "main",
      { className: "main" },
      h(Topbar, {
        search: globalSearch,
        setSearch: handleTopSearch,
        suggestions,
        onSuggestion: handleSuggestion,
        dateRange,
        setDateRange,
        onMenuClick: () => setSidebarOpen(true),
        onThemeToggle: toggleTheme,
        onProfileClick: () => setProfileOpen(true),
        onNotify: () => setToast("3 demo notifications: new order, low stock, revenue target reached."),
        theme
      }),
      h(HeroRow, { activeView, dateRange }),
      h(ViewRenderer, {
        activeView,
        theme,
        range,
        dateRange,
        filteredOrders,
        orderSearch,
        setOrderSearch,
        status,
        setStatus,
        category,
        setCategory,
        setToast
      }),
      h(PortfolioFooter)
    ),
    profileOpen && h(ProfileModal, { onClose: () => setProfileOpen(false), onNavigate: navigate }),
    logoutOpen && h(LogoutModal, { onClose: () => setLogoutOpen(false), onConfirm: confirmLogout }),
    toast && h("div", { className: "toast", role: "status" }, toast)
  );
}

function buildSuggestions(query) {
  const keyword = query.trim().toLowerCase();
  if (!keyword) {
    return [];
  }

  const navSuggestions = navItems.map((item) => ({ type: "Section", label: item.label, view: item.label }));
  const orderSuggestions = orders.map((order) => ({ type: "Order", label: `${order.id} - ${order.customer}`, value: order.id, view: "Orders" }));
  const customerSuggestions = customers.map((customer) => ({ type: "Customer", label: customer.name, value: customer.name, view: "Customers" }));
  const productSuggestions = products.map((product) => ({ type: "Product", label: product.name, value: product.name, view: "Products" }));

  return [...navSuggestions, ...orderSuggestions, ...customerSuggestions, ...productSuggestions]
    .filter((item) => `${item.type} ${item.label}`.toLowerCase().includes(keyword))
    .slice(0, 7);
}

function Sidebar({ open, activeView, onNavigate, onThemeToggle, onProfileClick, onLogout, theme }) {
  return h(
    "aside",
    { className: `sidebar ${open ? "open" : ""}`, "aria-label": "Dashboard sidebar" },
    h(
      "button",
      { className: "brand brand-button", type: "button", onClick: () => onNavigate("Dashboard") },
      h("span", { className: "brand-mark" }, "MF"),
      h("span", null, h("strong", null, "MetricFlow"), h("span", null, "Business Dashboard"))
    ),
    h(
      "nav",
      { className: "nav-list", "aria-label": "Primary navigation" },
      navItems.map((item) =>
        h(
          "button",
          {
            key: item.label,
            className: `nav-item ${activeView === item.label ? "active" : ""}`,
            type: "button",
            onClick: () => onNavigate(item.label)
          },
          h(Icon, { name: item.icon }),
          h("span", null, item.label)
        )
      )
    ),
    h(
      "div",
      { className: "sidebar-bottom" },
      h(
        "button",
        { className: "profile profile-button", type: "button", onClick: onProfileClick },
        h("div", { className: "avatar" }, "SC"),
        h("div", null, h("strong", null, "Sarah Chen"), h("span", null, "Admin user"))
      ),
      h(
        "div",
        { className: "sidebar-actions" },
        h(
          "button",
          { className: "theme-button", type: "button", onClick: onThemeToggle },
          h(Icon, { name: theme === "dark" ? "sun" : "moon" }),
          h("span", null, theme === "dark" ? "Light" : "Dark")
        ),
        h(
          "button",
          { className: "logout-button", type: "button", onClick: onLogout },
          h(Icon, { name: "log-out" }),
          h("span", null, "Logout")
        )
      )
    )
  );
}

function Topbar({ search, setSearch, suggestions, onSuggestion, dateRange, setDateRange, onMenuClick, onThemeToggle, onProfileClick, onNotify, theme }) {
  const [focused, setFocused] = useState(false);
  const showSuggestions = focused && suggestions.length > 0;

  return h(
    "header",
    { className: "topbar", id: "top" },
    h(
      "button",
      { className: "icon-button mobile-menu", type: "button", "aria-label": "Open sidebar", onClick: onMenuClick },
      h(Icon, { name: "menu" })
    ),
    h(
      "div",
      { className: "top-search" },
      h(
        "label",
        { className: "search-wrap" },
        h(Icon, { name: "search" }),
        h("span", { className: "sr-only" }, "Search dashboard"),
        h("input", {
          value: search,
          onChange: (event) => setSearch(event.target.value),
          onInput: (event) => setSearch(event.target.value),
          onFocus: () => setFocused(true),
          onBlur: () => setTimeout(() => setFocused(false), 140),
          placeholder: "Search orders, customers, or products..."
        })
      ),
      showSuggestions &&
        h(
          "div",
          { className: "search-suggestions" },
          suggestions.map((suggestion) =>
            h(
              "button",
              { className: "suggestion-button", type: "button", key: `${suggestion.type}-${suggestion.label}`, onMouseDown: () => onSuggestion(suggestion) },
              h("span", { className: "suggestion-icon" }, h(Icon, { name: suggestion.type === "Order" ? "receipt-text" : suggestion.type === "Customer" ? "user" : suggestion.type === "Product" ? "package" : "arrow-right" })),
              h("span", null, h("strong", null, suggestion.label), h("small", null, suggestion.type)),
              h(Icon, { name: "corner-down-left" })
            )
          )
        )
    ),
    h(
      "div",
      { className: "topbar-actions" },
      h(
        "select",
        { className: "select", value: dateRange, onChange: (event) => setDateRange(event.target.value), "aria-label": "Date range" },
        Object.keys(rangeProfiles).map((option) => h("option", { key: option }, option))
      ),
      h(
        "button",
        { className: "icon-button", type: "button", "aria-label": "Toggle theme", onClick: onThemeToggle },
        h(Icon, { name: theme === "dark" ? "sun" : "moon" })
      ),
      h(
        "button",
        { className: "icon-button", type: "button", "aria-label": "Notifications", onClick: onNotify },
        h(Icon, { name: "bell" }),
        h("span", { className: "notification-dot" })
      ),
      h("button", { className: "top-avatar", type: "button", "aria-label": "Open admin profile", onClick: onProfileClick }, "SC")
    )
  );
}

function HeroRow({ activeView, dateRange }) {
  const [title, subtitle] = viewCopy[activeView] || viewCopy.Dashboard;
  return h(
    "section",
    { className: "hero-row", "aria-labelledby": "dashboard-title" },
    h(
      "div",
      null,
      h("p", { className: "eyebrow" }, activeView === "Dashboard" ? "Business Overview" : activeView),
      h("h1", { id: "dashboard-title" }, title),
      h("p", null, subtitle)
    ),
    h("div", { className: "demo-chip" }, h(Icon, { name: "calendar-days" }), h("span", null, `Showing ${dateRange.toLowerCase()}`))
  );
}

function ViewRenderer(props) {
  if (props.activeView === "Orders") {
    return h(OrdersView, props);
  }
  if (props.activeView === "Customers") {
    return h(CustomersView, props);
  }
  if (props.activeView === "Analytics") {
    return h(AnalyticsView, props);
  }
  if (props.activeView === "Products") {
    return h(ProductsView, props);
  }
  if (props.activeView === "Reports") {
    return h(ReportsView, props);
  }
  if (props.activeView === "Settings") {
    return h(SettingsView, props);
  }
  return h(DashboardView, props);
}

function DashboardView({ theme, range, dateRange, filteredOrders, orderSearch, setOrderSearch, status, setStatus, category, setCategory }) {
  return h(
    React.Fragment,
    null,
    h(StatsGrid, { stats: range.stats }),
    h(
      "section",
      { className: "content-grid", "aria-label": "Analytics charts" },
      h(SalesChart, { theme, data: range.sales, dateRange }),
      h(CategoryChart, { data: range.categories })
    ),
    h(
      "section",
      { className: "bottom-grid", "aria-label": "Orders and customers" },
      h(RecentOrdersTable, { orders: filteredOrders, orderSearch, setOrderSearch, status, setStatus, category, setCategory, dateRange }),
      h(CustomersPanel)
    ),
    h(ActivityPanel)
  );
}

function OrdersView(props) {
  return h(
    React.Fragment,
    null,
    h(StatsGrid, { stats: props.range.stats }),
    h(RecentOrdersTable, {
      orders: props.filteredOrders,
      orderSearch: props.orderSearch,
      setOrderSearch: props.setOrderSearch,
      status: props.status,
      setStatus: props.setStatus,
      category: props.category,
      setCategory: props.setCategory,
      dateRange: props.dateRange,
      full: true
    }),
    h(OrderSummaryStrip, { orders: props.filteredOrders })
  );
}

function CustomersView() {
  return h(
    React.Fragment,
    null,
    h(
      "section",
      { className: "summary-grid" },
      h(MiniCard, { icon: "users", label: "Total Customers", value: "1,248", detail: "+5.7% selected period" }),
      h(MiniCard, { icon: "repeat-2", label: "Repeat Rate", value: "68.5%", detail: "Healthy retention" }),
      h(MiniCard, { icon: "star", label: "VIP Customers", value: "86", detail: "High value segment" })
    ),
    h(CustomersPanel, { full: true })
  );
}

function AnalyticsView({ theme, range, dateRange }) {
  return h(
    React.Fragment,
    null,
    h(
      "section",
      { className: "content-grid", "aria-label": "Analytics charts" },
      h(SalesChart, { theme, data: range.sales, dateRange }),
      h(CategoryChart, { data: range.categories })
    ),
    h(ActivityPanel)
  );
}

function ProductsView() {
  return h(
    "section",
    { className: "product-grid" },
    products.map((product) =>
      h(
        "article",
        { className: "card product-card", key: product.name },
        h("div", { className: "product-icon" }, h(Icon, { name: "package" })),
        h("div", null, h("p", { className: "eyebrow" }, product.category), h("h2", null, product.name), h("p", { className: "section-subtitle" }, `${product.stock} units in stock`)),
        h("div", { className: "product-meta" }, h("strong", null, product.revenue), h("span", { className: "badge completed" }, product.status))
      )
    )
  );
}

function ReportsView({ setToast }) {
  return h(
    "section",
    { className: "product-grid" },
    reports.map((report) =>
      h(
        "article",
        { className: "card product-card", key: report.title },
        h("div", { className: "product-icon" }, h(Icon, { name: report.icon })),
        h("div", null, h("h2", null, report.title), h("p", { className: "section-subtitle" }, report.detail)),
        h("div", { className: "product-meta" }, h("strong", null, report.metric), h("button", { className: "table-action action-pill", type: "button", onClick: () => setToast(`${report.title} preview opened in this demo.`) }, "Preview"))
      )
    )
  );
}

function SettingsView({ theme, setToast }) {
  return h(
    "section",
    { className: "settings-grid" },
    h(SettingsCard, { icon: "palette", title: "Appearance", body: `Current theme: ${theme}. Use the theme button to switch dark and light mode.` }),
    h(SettingsCard, { icon: "database", title: "Data Source", body: "Demo data is stored in JavaScript arrays and can later connect to a real API." }),
    h(SettingsCard, { icon: "bell", title: "Notifications", body: "Revenue, order, and inventory notifications are represented as UI demo actions." }),
    h(
      "article",
      { className: "card panel" },
      h(PanelHeader, { title: "Workspace Controls", subtitle: "These controls show how real admin settings would behave.", tag: "Demo" }),
      h(
        "div",
        { className: "modal-actions inline-actions" },
        h("button", { className: "button-primary", type: "button", onClick: () => setToast("Demo settings saved successfully.") }, "Save Settings"),
        h("button", { className: "button-secondary", type: "button", onClick: () => setToast("Demo workspace synced with latest analytics data.") }, "Sync Data")
      )
    )
  );
}

function StatsGrid({ stats }) {
  return h("section", { className: "metric-grid", "aria-label": "Business overview" }, stats.map((item) => h(StatsCard, { key: item.label, item })));
}

function StatsCard({ item }) {
  return h(
    "article",
    { className: "card metric-card" },
    h("div", { className: "metric-top" }, h("p", { className: "metric-label" }, item.label), h("span", { className: "metric-icon" }, h(Icon, { name: item.icon }))),
    h("p", { className: "metric-value" }, item.value),
    h("p", { className: "metric-trend" }, h(Icon, { name: "arrow-up-right" }), h("span", { className: "trend-up" }, item.trend))
  );
}

function SalesChart({ theme, data, dateRange }) {
  const R = window.Recharts;
  const axisColor = theme === "dark" ? "#a1a1aa" : "#64748b";
  if (!R || !R.ResponsiveContainer) {
    return h(
      "article",
      { className: "card panel" },
      h(PanelHeader, { title: "Revenue Performance", subtitle: `Sales trend for ${dateRange.toLowerCase()}.`, tag: "Chart" }),
      h(
        "div",
        { className: "chart-fallback" },
        data.map((point) =>
          h("span", {
            key: point.label,
            className: "fallback-bar",
            title: `${point.label}: $${point.sales}`,
            style: { height: `${Math.max(18, point.sales / 560)}%` }
          })
        )
      )
    );
  }

  return h(
    "article",
    { className: "card panel" },
    h(PanelHeader, { title: "Revenue Performance", subtitle: `Sales trend for ${dateRange.toLowerCase()}.`, tag: "Area Chart" }),
    h(
      "div",
      { className: "chart-box" },
      h(
        R.ResponsiveContainer,
        { width: "100%", height: "100%" },
        h(
          R.AreaChart,
          { data, margin: { top: 12, right: 10, left: -8, bottom: 0 } },
          h(
            "defs",
            null,
            h(
              "linearGradient",
              { id: "salesGradient", x1: "0", y1: "0", x2: "0", y2: "1" },
              h("stop", { offset: "5%", stopColor: "#2563eb", stopOpacity: 0.34 }),
              h("stop", { offset: "95%", stopColor: "#2563eb", stopOpacity: 0.02 })
            )
          ),
          h(R.CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: theme === "dark" ? "#27272a" : "#e5e7eb" }),
          h(R.XAxis, { dataKey: "label", axisLine: false, tickLine: false, tick: { fill: axisColor, fontSize: 12 } }),
          h(R.YAxis, {
            axisLine: false,
            tickLine: false,
            tick: { fill: axisColor, fontSize: 12 },
            tickFormatter: (value) => `$${Math.round(value / 1000)}k`
          }),
          h(R.Tooltip, { content: ChartTooltip }),
          h(R.Area, { type: "monotone", dataKey: "sales", stroke: "#2563eb", strokeWidth: 3, fill: "url(#salesGradient)", activeDot: { r: 5 } })
        )
      )
    )
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }
  return h(
    "div",
    { className: "card", style: { padding: "10px 12px", boxShadow: "var(--shadow)" } },
    h("strong", null, label),
    h("div", { className: "muted" }, `$${Number(payload[0].value).toLocaleString()} revenue`)
  );
}

function CategoryChart({ data }) {
  const R = window.Recharts;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return h(
    "article",
    { className: "card panel" },
    h(PanelHeader, { title: "Sales by Category", subtitle: "Revenue distribution across product categories.", tag: `$${(total / 1000).toFixed(1)}k` }),
    R && R.ResponsiveContainer
      ? h(
          "div",
          { className: "chart-box small" },
          h(
            R.ResponsiveContainer,
            { width: "100%", height: "100%" },
            h(
              R.PieChart,
              null,
              h(R.Tooltip, { content: ChartTooltip }),
              h(
                R.Pie,
                { data, dataKey: "value", nameKey: "name", innerRadius: 68, outerRadius: 98, paddingAngle: 4, stroke: "transparent" },
                data.map((entry) => h(R.Cell, { key: entry.name, fill: entry.color }))
              )
            )
          )
        )
      : null,
    h(
      "div",
      { className: "category-list" },
      data.map((item) =>
        h(
          "div",
          { className: "category-row", key: item.name },
          h("span", null, item.name),
          h("span", { className: "progress-track" }, h("span", { className: "progress-fill", style: { width: `${(item.value / total) * 100}%`, background: item.color } })),
          h("strong", null, `$${(item.value / 1000).toFixed(1)}k`)
        )
      )
    )
  );
}

function PanelHeader({ title, subtitle, tag }) {
  return h("div", { className: "panel-header" }, h("div", null, h("h2", { className: "panel-title" }, title), h("p", { className: "section-subtitle" }, subtitle)), tag && h("span", { className: "panel-tag" }, tag));
}

function RecentOrdersTable({ orders, orderSearch, setOrderSearch, status, setStatus, category, setCategory, dateRange, full }) {
  return h(
    "article",
    { className: `card panel ${full ? "full-panel" : ""}` },
    h(PanelHeader, { title: "Recent Orders", subtitle: `Latest customer orders for ${dateRange.toLowerCase()}.`, tag: `${orders.length} visible` }),
    h(FilterBar, { orderSearch, setOrderSearch, status, setStatus, category, setCategory }),
    orders.length
      ? h(
          "div",
          { className: "table-wrap" },
          h(
            "table",
            null,
            h("thead", null, h("tr", null, ["Order ID", "Customer", "Product", "Status", "Amount", "Date"].map((heading) => h("th", { key: heading }, heading)))),
            h(
              "tbody",
              null,
              orders.map((order) =>
                h(
                  "tr",
                  { key: order.id },
                  h("td", null, order.id),
                  h("td", null, order.customer),
                  h("td", null, h("span", null, order.product), h("div", { className: "muted" }, order.category)),
                  h("td", null, h("span", { className: `badge ${order.status.toLowerCase()}` }, order.status)),
                  h("td", null, order.amount),
                  h("td", null, order.date)
                )
              )
            )
          )
        )
      : h("div", { className: "empty-state" }, "No orders match the current search and filters.")
  );
}

function FilterBar({ orderSearch, setOrderSearch, status, setStatus, category, setCategory }) {
  return h(
    "div",
    { className: "filter-bar" },
    h(
      "label",
      { className: "search-wrap filter-search" },
      h(Icon, { name: "search" }),
      h("span", { className: "sr-only" }, "Search recent orders"),
      h("input", {
        value: orderSearch,
        onChange: (event) => setOrderSearch(event.target.value),
        onInput: (event) => setOrderSearch(event.target.value),
        placeholder: "Search recent orders..."
      })
    ),
    h(FilterSelect, { value: status, onChange: setStatus, label: "Status filter", options: ["All", "Completed", "Pending", "Cancelled"] }),
    h(FilterSelect, { value: category, onChange: setCategory, label: "Category filter", options: ["All", "Sneakers", "Clothing", "Accessories", "Watches", "Bags"] })
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return h("select", { className: "filter-select", value, onChange: (event) => onChange(event.target.value), "aria-label": label }, options.map((option) => h("option", { key: option }, option)));
}

function CustomersPanel({ full }) {
  return h(
    "article",
    { className: `card panel ${full ? "full-panel" : ""}` },
    h(PanelHeader, { title: "Top Customers", subtitle: "Highest value customers this month.", tag: "CRM" }),
    h(
      "div",
      { className: full ? "customer-table-grid" : "customers-list" },
      customers.map((customer) =>
        h(
          "div",
          { className: "customer-card", key: customer.email },
          h("div", { className: "avatar" }, customer.name.split(" ").map((part) => part[0]).join("")),
          h("div", null, h("strong", null, customer.name), h("span", null, customer.email), h("span", null, ` - ${customer.city} - ${customer.status}`)),
          h("div", { className: "customer-total" }, customer.spent)
        )
      )
    )
  );
}

function ActivityPanel() {
  return h(
    "section",
    { className: "card panel", "aria-label": "Dashboard activity" },
    h(PanelHeader, { title: "Business Signals", subtitle: "Quick operational notes for the selected dashboard period.", tag: "Live UI" }),
    h(
      "div",
      { className: "activity-list" },
      activities.map(([icon, title, body]) =>
        h("div", { className: "activity-item", key: title }, h("span", { className: "activity-dot" }, h(Icon, { name: icon })), h("div", null, h("strong", null, title), h("span", null, body)))
      )
    )
  );
}

function OrderSummaryStrip({ orders }) {
  const completed = orders.filter((order) => order.status === "Completed").length;
  const pending = orders.filter((order) => order.status === "Pending").length;
  const cancelled = orders.filter((order) => order.status === "Cancelled").length;
  return h(
    "section",
    { className: "summary-grid" },
    h(MiniCard, { icon: "check-circle-2", label: "Completed", value: completed, detail: "Ready for fulfillment" }),
    h(MiniCard, { icon: "clock-3", label: "Pending", value: pending, detail: "Needs confirmation" }),
    h(MiniCard, { icon: "x-circle", label: "Cancelled", value: cancelled, detail: "Review customer friction" })
  );
}

function MiniCard({ icon, label, value, detail }) {
  return h("article", { className: "card mini-card" }, h("span", { className: "metric-icon" }, h(Icon, { name: icon })), h("div", null, h("p", { className: "metric-label" }, label), h("strong", null, value), h("span", null, detail)));
}

function SettingsCard({ icon, title, body }) {
  return h("article", { className: "card panel" }, h("span", { className: "metric-icon" }, h(Icon, { name: icon })), h("h2", { className: "panel-title" }, title), h("p", { className: "section-subtitle" }, body));
}

function ProfileModal({ onClose, onNavigate }) {
  return h(
    "div",
    { className: "modal-backdrop", role: "dialog", "aria-modal": "true", "aria-label": "Admin profile" },
    h(
      "div",
      { className: "modal" },
      h("button", { className: "icon-button modal-close", type: "button", "aria-label": "Close profile", onClick: onClose }, h(Icon, { name: "x" })),
      h("div", { className: "avatar modal-avatar" }, "SC"),
      h("h2", null, "Sarah Chen"),
      h("p", { className: "section-subtitle" }, "Admin user for the MetricFlow portfolio demo."),
      h(
        "div",
        { className: "profile-detail" },
        h("span", null, "Role", h("strong", null, "Workspace Admin")),
        h("span", null, "Email", h("strong", null, "sarah@metricflowdemo.com")),
        h("span", null, "Access", h("strong", null, "Dashboard, reports, settings"))
      ),
      h(
        "div",
        { className: "modal-actions" },
        h("button", { className: "button-primary", type: "button", onClick: () => { onClose(); onNavigate("Settings"); } }, "Open Settings"),
        h("button", { className: "button-secondary", type: "button", onClick: onClose }, "Close")
      )
    )
  );
}

function LogoutModal({ onClose, onConfirm }) {
  return h(
    "div",
    { className: "modal-backdrop", role: "dialog", "aria-modal": "true", "aria-label": "Logout confirmation" },
    h(
      "div",
      { className: "modal" },
      h("span", { className: "metric-icon" }, h(Icon, { name: "log-out" })),
      h("h2", null, "Logout from demo?"),
      h("p", { className: "section-subtitle" }, "This is a portfolio dashboard, so logout shows the user flow without connecting to real authentication."),
      h("div", { className: "modal-actions" }, h("button", { className: "button-primary", type: "button", onClick: onConfirm }, "Logout Demo"), h("button", { className: "button-secondary", type: "button", onClick: onClose }, "Cancel"))
    )
  );
}

function PortfolioFooter() {
  return h(
    "footer",
    { className: "portfolio-footer" },
    h("span", null, h("strong", null, "2026 MetricFlow"), " - Responsive Admin Dashboard for Business Analytics"),
    h("span", null, "Portfolio project built for SaaS, CRM, e-commerce, and internal admin panels.")
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
