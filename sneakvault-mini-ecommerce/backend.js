const http = require("http");
const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 4300);
const WHATSAPP_NUMBER = "12345678900";
const DATA_DIR = path.join(__dirname, "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "newsletter-subscribers.json");

const products = [
  {
    id: "airflex-runner-x1",
    name: "AirFlex Runner X1",
    category: "Running",
    price: 89,
    description: "Lightweight running sneakers with breathable mesh and cushioned sole.",
    rating: 4.8,
    tag: "Best Seller",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    id: "streetcore-high-tops",
    name: "StreetCore High Tops",
    category: "Streetwear",
    price: 119,
    description: "Premium high-top sneakers designed for bold streetwear outfits.",
    rating: 4.7,
    tag: "New Arrival",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    id: "cloudstep-everyday",
    name: "CloudStep Everyday",
    category: "Casual",
    price: 74,
    description: "Soft everyday sneakers built for comfort, walking, and daily use.",
    rating: 4.6,
    tag: "Comfort Pick",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    id: "velocity-pro-knit",
    name: "Velocity Pro Knit",
    category: "Running",
    price: 135,
    description: "Performance sneakers with flexible knit upper and energy-return sole.",
    rating: 4.9,
    tag: "Premium",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    id: "retro-court-classic",
    name: "Retro Court Classic",
    category: "Casual",
    price: 99,
    description: "Vintage-inspired sneakers with clean leather finish and classic court style.",
    rating: 4.5,
    tag: "Trending",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    id: "urban-black-edition",
    name: "Urban Black Edition",
    category: "Streetwear",
    price: 149,
    description: "Minimal black sneakers with premium details for modern outfits.",
    rating: 4.8,
    tag: "Limited",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    id: "flexlite-sports-max",
    name: "FlexLite Sports Max",
    category: "Sports",
    price: 109,
    description: "Durable sports sneakers designed for training, gym, and active movement.",
    rating: 4.6,
    tag: "Sport Pick",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    id: "whitemode-essential",
    name: "WhiteMode Essential",
    category: "Casual",
    price: 79,
    description: "Clean white sneakers suitable for casual, college, and smart outfits.",
    rating: 4.7,
    tag: "Popular",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    id: "trailgrip-outdoor",
    name: "TrailGrip Outdoor",
    category: "Outdoor",
    price: 129,
    description: "Rugged sneakers with strong grip for outdoor walking and travel.",
    rating: 4.5,
    tag: "Outdoor",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    id: "luxury-suede-runner",
    name: "Luxury Suede Runner",
    category: "Premium",
    price: 159,
    description: "Premium suede sneakers with elegant finish and soft inner comfort.",
    rating: 4.9,
    tag: "Luxury",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  }
];

const categories = ["All", "Running", "Casual", "Streetwear", "Sports", "Outdoor", "Premium"];
const newsletterSubscribers = readStore(SUBSCRIBERS_FILE, []);
const demoOrders = readStore(ORDERS_FILE, []);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function requireText(value, fieldName, minLength = 2) {
  const text = String(value || "").trim();
  if (text.length < minLength) {
    throw new Error(`${fieldName} is required.`);
  }
  return text;
}

function normalizeQuantity(quantity) {
  const parsed = Number(quantity || 1);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

function filterProducts(url) {
  const search = String(url.searchParams.get("search") || "").trim().toLowerCase();
  const category = url.searchParams.get("category") || "All";
  const price = url.searchParams.get("price") || "All";
  const sort = url.searchParams.get("sort") || "featured";

  let filtered = products.filter((product) => {
    const matchesSearch = !search || product.name.toLowerCase().includes(search);
    const matchesCategory = category === "All" || product.category === category;
    const matchesPrice =
      price === "All" ||
      (price === "under-80" && product.price < 80) ||
      (price === "80-120" && product.price >= 80 && product.price <= 120) ||
      (price === "120-150" && product.price > 120 && product.price <= 150) ||
      (price === "above-150" && product.price > 150);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (sort === "low-high") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high-low") {
    filtered = filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
}

function buildOrder(body) {
  const customer = {
    name: requireText(body.customer?.name, "Full name"),
    phone: requireText(body.customer?.phone, "Phone number", 7),
    email: String(body.customer?.email || "").trim(),
    address: requireText(body.customer?.address, "Delivery address", 8),
    city: requireText(body.customer?.city, "City"),
    postal: requireText(body.customer?.postal, "Postal code", 3),
    deliveryTime: requireText(body.customer?.deliveryTime, "Preferred delivery time"),
    notes: String(body.customer?.notes || "").trim()
  };

  if (!isValidEmail(customer.email)) {
    throw new Error("A valid email address is required.");
  }

  if (!Array.isArray(body.items) || !body.items.length) {
    throw new Error("Order must include at least one cart item.");
  }

  const items = body.items.map((entry) => {
    const product = getProduct(entry.id);
    if (!product) {
      throw new Error(`Unknown product: ${entry.id}`);
    }

    const size = String(entry.size || "").trim();
    if (!product.sizes.includes(size)) {
      throw new Error(`Invalid size for ${product.name}.`);
    }

    const quantity = normalizeQuantity(entry.quantity);
    return {
      id: product.id,
      name: product.name,
      size,
      quantity,
      price: product.price,
      lineTotal: product.price * quantity
    };
  });

  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const messageLines = [
    "Hello SneakVault, I want to place this order:",
    "",
    "Customer Details:",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Email: ${customer.email}`,
    `Address: ${customer.address}, ${customer.city} - ${customer.postal}`,
    `Preferred Delivery Time: ${customer.deliveryTime}`,
    customer.notes ? `Order Notes: ${customer.notes}` : "",
    "",
    "Order Summary:"
  ].filter(Boolean);

  items.forEach((item, index) => {
    messageLines.push(
      `${index + 1}. ${item.name}`,
      `Size: ${item.size}`,
      `Qty: ${item.quantity}`,
      `Price: $${item.lineTotal}`,
      ""
    );
  });

  messageLines.push(`Total: $${total}`, "", "Please confirm availability and delivery time.");
  const whatsappMessage = messageLines.join("\n");

  const order = {
    id: `sneakvault-${randomUUID()}`,
    status: "demo",
    customer,
    items,
    total,
    whatsappMessage,
    whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`,
    createdAt: new Date().toISOString()
  };

  demoOrders.push(order);
  writeStore(ORDERS_FILE, demoOrders);
  return order;
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "OPTIONS") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      project: "SneakVault Mini E-commerce",
      mode: "portfolio-backend-demo"
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/products") {
    const filteredProducts = filterProducts(url);
    sendJson(response, 200, {
      count: filteredProducts.length,
      categories,
      products: filteredProducts
    });
    return;
  }

  if (request.method === "GET" && url.pathname.startsWith("/api/products/")) {
    const productId = url.pathname.replace("/api/products/", "");
    const product = getProduct(productId);
    if (!product) {
      sendJson(response, 404, { error: "Product not found." });
      return;
    }

    sendJson(response, 200, { product });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/orders/whatsapp") {
    try {
      const body = await readJson(request);
      const order = buildOrder(body);
      sendJson(response, 201, {
        message: "Portfolio backend demo. No real payment or order is processed.",
        order
      });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/orders") {
    sendJson(response, 200, {
      count: demoOrders.length,
      orders: demoOrders
    });
    return;
  }

  if (request.method === "GET" && url.pathname.startsWith("/api/orders/")) {
    const orderId = decodeURIComponent(url.pathname.replace("/api/orders/", ""));
    const order = demoOrders.find((item) => item.id === orderId);
    if (!order) {
      sendJson(response, 404, { error: "Order not found." });
      return;
    }

    sendJson(response, 200, { order });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/newsletter") {
    try {
      const body = await readJson(request);
      const email = String(body.email || "").trim();
      if (!isValidEmail(email)) {
        throw new Error("A valid email address is required.");
      }

      const subscriber = {
        id: `subscriber-${randomUUID()}`,
        email,
        createdAt: new Date().toISOString()
      };
      newsletterSubscribers.push(subscriber);
      writeStore(SUBSCRIBERS_FILE, newsletterSubscribers);
      sendJson(response, 201, {
        message: "Portfolio backend demo. Subscriber was validated and stored in a local JSON file.",
        subscriber
      });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/newsletter") {
    sendJson(response, 200, {
      count: newsletterSubscribers.length,
      subscribers: newsletterSubscribers
    });
    return;
  }

  sendJson(response, 404, {
    error: "Route not found.",
    availableRoutes: [
      "GET /api/health",
      "GET /api/products",
      "GET /api/products?category=Running&price=80-120&sort=low-high",
      "GET /api/products/:id",
      "GET /api/orders",
      "GET /api/orders/:id",
      "POST /api/orders/whatsapp",
      "GET /api/newsletter",
      "POST /api/newsletter"
    ]
  });
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`SneakVault backend demo running at http://localhost:${PORT}`);
});
