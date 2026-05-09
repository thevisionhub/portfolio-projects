const http = require("http");
const { URL } = require("url");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 4400;
const DATA_DIR = path.join(__dirname, "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const ACTIVITY_FILE = path.join(DATA_DIR, "activity.json");

const salesData = [
  { month: "Jan", sales: 12000, orders: 248 },
  { month: "Feb", sales: 18500, orders: 326 },
  { month: "Mar", sales: 16200, orders: 312 },
  { month: "Apr", sales: 22000, orders: 398 },
  { month: "May", sales: 24800, orders: 421 },
  { month: "Jun", sales: 31000, orders: 508 },
  { month: "Jul", sales: 28500, orders: 486 },
  { month: "Aug", sales: 35500, orders: 562 },
  { month: "Sep", sales: 39200, orders: 624 },
  { month: "Oct", sales: 42000, orders: 682 },
  { month: "Nov", sales: 46800, orders: 734 },
  { month: "Dec", sales: 52000, orders: 810 }
];

const categoryData = [
  { name: "Sneakers", revenue: 42000 },
  { name: "Clothing", revenue: 28500 },
  { name: "Accessories", revenue: 18200 },
  { name: "Watches", revenue: 12400 },
  { name: "Bags", revenue: 9200 }
];

const rangeProfiles = {
  Today: {
    metrics: {
      totalRevenue: 8420,
      totalOrders: 164,
      activeCustomers: 72,
      growthRate: 6.8,
      deltas: { revenue: 4.1, orders: 3.2, customers: 2.4, growth: 1.1 }
    },
    sales: [
      { month: "8 AM", sales: 640, orders: 14 },
      { month: "10 AM", sales: 1180, orders: 24 },
      { month: "12 PM", sales: 1640, orders: 38 },
      { month: "2 PM", sales: 1380, orders: 31 },
      { month: "4 PM", sales: 1820, orders: 42 },
      { month: "6 PM", sales: 2380, orders: 54 },
      { month: "8 PM", sales: 3120, orders: 68 }
    ],
    categories: [
      { name: "Sneakers", revenue: 3240 },
      { name: "Clothing", revenue: 1860 },
      { name: "Accessories", revenue: 1280 },
      { name: "Watches", revenue: 960 },
      { name: "Bags", revenue: 740 }
    ]
  },
  "Last 7 days": {
    metrics: {
      totalRevenue: 44780,
      totalOrders: 774,
      activeCustomers: 318,
      growthRate: 10.6,
      deltas: { revenue: 7.5, orders: 6.4, customers: 4.2, growth: 2.2 }
    },
    sales: [
      { month: "Thu", sales: 4800, orders: 94 },
      { month: "Fri", sales: 5600, orders: 108 },
      { month: "Sat", sales: 7100, orders: 136 },
      { month: "Sun", sales: 6400, orders: 124 },
      { month: "Mon", sales: 5900, orders: 116 },
      { month: "Tue", sales: 6900, orders: 132 },
      { month: "Wed", sales: 8380, orders: 164 }
    ],
    categories: [
      { name: "Sneakers", revenue: 16800 },
      { name: "Clothing", revenue: 9400 },
      { name: "Accessories", revenue: 7200 },
      { name: "Watches", revenue: 6100 },
      { name: "Bags", revenue: 5280 }
    ]
  },
  "Last 30 days": {
    metrics: {
      totalRevenue: 128450,
      totalOrders: 3482,
      activeCustomers: 1248,
      growthRate: 18.4,
      deltas: { revenue: 12.5, orders: 8.2, customers: 5.7, growth: 3.1 }
    },
    sales: [
      { month: "Week 1", sales: 24600, orders: 642 },
      { month: "Week 2", sales: 29200, orders: 748 },
      { month: "Week 3", sales: 33700, orders: 912 },
      { month: "Week 4", sales: 40950, orders: 1180 }
    ],
    categories: categoryData
  },
  "This year": {
    metrics: {
      totalRevenue: 426300,
      totalOrders: 6111,
      activeCustomers: 2740,
      growthRate: 24.8,
      deltas: { revenue: 18.9, orders: 11.4, customers: 9.6, growth: 5.2 }
    },
    sales: salesData,
    categories: categoryData
  }
};

const orders = [
  { id: "#ORD-1048", customer: "Emily Carter", product: "AirFlex Runner X1", status: "Completed", amount: 89, date: "May 7, 2026", category: "Sneakers" },
  { id: "#ORD-1047", customer: "Daniel Brooks", product: "Urban Black Edition", status: "Pending", amount: 149, date: "May 7, 2026", category: "Sneakers" },
  { id: "#ORD-1046", customer: "Sophia Johnson", product: "CloudStep Everyday", status: "Completed", amount: 74, date: "May 6, 2026", category: "Sneakers" },
  { id: "#ORD-1045", customer: "Michael Reed", product: "Retro Court Classic", status: "Cancelled", amount: 99, date: "May 6, 2026", category: "Sneakers" },
  { id: "#ORD-1044", customer: "Olivia Brown", product: "Velocity Pro Knit", status: "Completed", amount: 135, date: "May 5, 2026", category: "Sneakers" },
  { id: "#ORD-1043", customer: "Noah Wilson", product: "Everyday Hoodie", status: "Pending", amount: 62, date: "May 5, 2026", category: "Clothing" },
  { id: "#ORD-1042", customer: "Ava Martinez", product: "Minimal Watch Pro", status: "Completed", amount: 210, date: "May 4, 2026", category: "Watches" },
  { id: "#ORD-1041", customer: "Ethan Miller", product: "City Backpack", status: "Completed", amount: 118, date: "May 4, 2026", category: "Bags" }
];

const customers = [
  { name: "Emily Carter", email: "emily@example.com", orders: 12, spent: 1240 },
  { name: "Daniel Brooks", email: "daniel@example.com", orders: 9, spent: 980 },
  { name: "Sophia Johnson", email: "sophia@example.com", orders: 7, spent: 760 },
  { name: "Michael Reed", email: "michael@example.com", orders: 6, spent: 640 }
];

const defaultSettings = {
  workspaceName: "MetricFlow Demo Workspace",
  defaultRange: "Last 30 days",
  emailReports: true,
  lowStockAlerts: true,
  dashboardDensity: "comfortable",
  updatedAt: null
};

const storedOrders = readStore(ORDERS_FILE, orders);
orders.splice(0, orders.length, ...storedOrders);

const settings = readStore(SETTINGS_FILE, defaultSettings);
const activityLog = readStore(ACTIVITY_FILE, []);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  response.end(JSON.stringify(payload, null, 2));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1000000) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });

    request.on("end", () => {
      if (!body.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });
  });
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readStore(filePath, fallback) {
  try {
    ensureDataDir();
    if (!fs.existsSync(filePath)) {
      writeStore(filePath, fallback);
      return fallback;
    }

    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeStore(filePath, data) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getRangeProfile(searchParams) {
  const range = searchParams.get("range") || settings.defaultRange || "Last 30 days";
  return rangeProfiles[range] || rangeProfiles["Last 30 days"];
}

function logActivity(type, detail) {
  const event = {
    id: `activity-${Date.now()}-${activityLog.length + 1}`,
    type,
    detail,
    createdAt: new Date().toISOString()
  };

  activityLog.unshift(event);
  writeStore(ACTIVITY_FILE, activityLog.slice(0, 100));
  return event;
}

function filterOrders(searchParams) {
  const search = (searchParams.get("search") || "").trim().toLowerCase();
  const status = searchParams.get("status") || "All";
  const category = searchParams.get("category") || "All";

  return orders.filter((order) => {
    const text = [order.id, order.customer, order.product, order.category].join(" ").toLowerCase();
    const matchesSearch = !search || text.includes(search);
    const matchesStatus = status === "All" || order.status === status;
    const matchesCategory = category === "All" || order.category === category;
    return matchesSearch && matchesStatus && matchesCategory;
  });
}

function buildSearchSuggestions(query) {
  const normalizedQuery = String(query || "").trim().toLowerCase();
  if (!normalizedQuery) {
    return [];
  }

  const orderSuggestions = orders.map((order) => ({
    type: "order",
    label: `${order.id} - ${order.customer}`,
    value: order.id,
    view: "Orders"
  }));

  const customerSuggestions = customers.map((customer) => ({
    type: "customer",
    label: customer.name,
    value: customer.email,
    view: "Customers"
  }));

  const productSuggestions = [...new Set(orders.map((order) => order.product))].map((product) => ({
    type: "product",
    label: product,
    value: product,
    view: "Products"
  }));

  return [...orderSuggestions, ...customerSuggestions, ...productSuggestions]
    .filter((item) => [item.label, item.value, item.type].join(" ").toLowerCase().includes(normalizedQuery))
    .slice(0, 8);
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "OPTIONS") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (!["GET", "POST", "PUT"].includes(request.method)) {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, { status: "ok", service: "MetricFlow dashboard API demo" });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/metrics") {
    sendJson(response, 200, getRangeProfile(url.searchParams).metrics);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/sales") {
    sendJson(response, 200, getRangeProfile(url.searchParams).sales);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/categories") {
    sendJson(response, 200, getRangeProfile(url.searchParams).categories);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/orders") {
    sendJson(response, 200, filterOrders(url.searchParams));
    return;
  }

  if (request.method === "POST" && url.pathname.startsWith("/api/orders/") && url.pathname.endsWith("/status")) {
    try {
      const orderId = decodeURIComponent(url.pathname.replace("/api/orders/", "").replace("/status", ""));
      const body = await readJson(request);
      const nextStatus = String(body.status || "").trim();
      const allowedStatuses = ["Completed", "Pending", "Cancelled", "Processing"];

      if (!allowedStatuses.includes(nextStatus)) {
        throw new Error("Invalid order status.");
      }

      const order = orders.find((item) => item.id === orderId);
      if (!order) {
        sendJson(response, 404, { error: "Order not found." });
        return;
      }

      order.status = nextStatus;
      writeStore(ORDERS_FILE, orders);
      logActivity("order-status", `${order.id} changed to ${nextStatus}`);
      sendJson(response, 200, {
        message: "Order status updated in the local JSON demo store.",
        order
      });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/customers") {
    sendJson(response, 200, customers);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/search") {
    sendJson(response, 200, {
      query: url.searchParams.get("q") || "",
      suggestions: buildSearchSuggestions(url.searchParams.get("q"))
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/settings") {
    sendJson(response, 200, { settings });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/settings") {
    try {
      const body = await readJson(request);
      Object.assign(settings, {
        workspaceName: String(body.workspaceName || settings.workspaceName).trim(),
        defaultRange: rangeProfiles[body.defaultRange] ? body.defaultRange : settings.defaultRange,
        emailReports: body.emailReports === undefined ? settings.emailReports : Boolean(body.emailReports),
        lowStockAlerts: body.lowStockAlerts === undefined ? settings.lowStockAlerts : Boolean(body.lowStockAlerts),
        dashboardDensity: ["compact", "comfortable"].includes(body.dashboardDensity) ? body.dashboardDensity : settings.dashboardDensity,
        updatedAt: new Date().toISOString()
      });

      writeStore(SETTINGS_FILE, settings);
      logActivity("settings", "Dashboard settings were updated");
      sendJson(response, 200, {
        message: "Settings saved in the local JSON demo store.",
        settings
      });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/activity") {
    sendJson(response, 200, {
      count: activityLog.length,
      activity: activityLog
    });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/auth/logout") {
    const event = logActivity("auth", "Demo admin logout requested");
    sendJson(response, 200, {
      status: "demo-logout",
      message: "Demo logout complete. In production this would destroy the session or JWT.",
      event
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/reports/summary") {
    sendJson(response, 200, {
      period: url.searchParams.get("range") || "Last 30 days",
      summary: "Revenue, orders, and customer growth are trending upward for the selected period.",
      recommendations: [
        "Prioritize pending orders for faster fulfillment.",
        "Promote high-performing sneaker products.",
        "Review cancelled orders for customer friction."
      ]
    });
    return;
  }

  sendJson(response, 404, {
    error: "Route not found",
    availableRoutes: [
      "GET /api/health",
      "GET /api/metrics?range=Today",
      "GET /api/sales?range=Last%207%20days",
      "GET /api/categories?range=Last%2030%20days",
      "GET /api/orders?search=emily&status=Completed&category=Sneakers",
      "POST /api/orders/:id/status",
      "GET /api/customers",
      "GET /api/search?q=emily",
      "GET /api/settings",
      "POST /api/settings",
      "GET /api/activity",
      "POST /api/auth/logout",
      "GET /api/reports/summary"
    ]
  });
}

const server = http.createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    sendJson(response, 500, { error: error.message });
  });
});

server.listen(PORT, () => {
  console.log(`MetricFlow backend demo running at http://localhost:${PORT}`);
});
