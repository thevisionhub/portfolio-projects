const http = require("http");
const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 4000);
const RESTAURANT_NAME = "SpiceHub";
const WHATSAPP_NUMBER = "12345678900";
const DATA_DIR = path.join(__dirname, "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const MESSAGES_FILE = path.join(DATA_DIR, "contact-messages.json");

const menuItems = [
  {
    id: "masala-dosa",
    category: "Breakfast",
    name: "Masala Dosa",
    price: 4.99,
    description: "Crispy South Indian dosa served with chutney and sambar."
  },
  {
    id: "idli-sambar",
    category: "Breakfast",
    name: "Idli Sambar",
    price: 3.99,
    description: "Soft steamed rice cakes served with hot sambar and coconut chutney."
  },
  {
    id: "veg-sandwich",
    category: "Breakfast",
    name: "Veg Sandwich",
    price: 5.49,
    description: "Fresh vegetable sandwich with cheese, herbs, and grilled bread."
  },
  {
    id: "pancake-stack",
    category: "Breakfast",
    name: "Pancake Stack",
    price: 6.99,
    description: "Fluffy pancakes topped with maple syrup and fresh berries."
  },
  {
    id: "chicken-biryani",
    category: "Lunch",
    name: "Chicken Biryani",
    price: 9.99,
    description: "Aromatic basmati rice cooked with spices and tender chicken pieces."
  },
  {
    id: "veg-fried-rice",
    category: "Lunch",
    name: "Veg Fried Rice",
    price: 7.49,
    description: "Stir-fried rice with fresh vegetables, sauces, and mild spices."
  },
  {
    id: "paneer-butter-masala",
    category: "Lunch",
    name: "Paneer Butter Masala",
    price: 8.99,
    description: "Soft paneer cubes cooked in creamy tomato-based gravy."
  },
  {
    id: "grilled-chicken-meal",
    category: "Lunch",
    name: "Grilled Chicken Meal",
    price: 11.99,
    description: "Juicy grilled chicken served with rice, salad, and sauce."
  },
  {
    id: "butter-naan-with-curry",
    category: "Dinner",
    name: "Butter Naan with Curry",
    price: 8.49,
    description: "Soft butter naan served with your choice of rich Indian curry."
  },
  {
    id: "tandoori-chicken",
    category: "Dinner",
    name: "Tandoori Chicken",
    price: 12.99,
    description: "Spicy grilled chicken marinated with yogurt and Indian spices."
  },
  {
    id: "veg-noodles",
    category: "Dinner",
    name: "Veg Noodles",
    price: 7.99,
    description: "Wok-tossed noodles with vegetables and house-made sauce."
  },
  {
    id: "fish-curry-rice",
    category: "Dinner",
    name: "Fish Curry Rice",
    price: 10.99,
    description: "Traditional fish curry served with steamed rice."
  },
  {
    id: "mango-lassi",
    category: "Drinks",
    name: "Mango Lassi",
    price: 3.99,
    description: "Sweet yogurt-based mango drink served chilled."
  },
  {
    id: "cold-coffee",
    category: "Drinks",
    name: "Cold Coffee",
    price: 4.49,
    description: "Creamy iced coffee blended with milk and chocolate syrup."
  },
  {
    id: "fresh-lime-soda",
    category: "Drinks",
    name: "Fresh Lime Soda",
    price: 2.99,
    description: "Refreshing lime soda with mint and crushed ice."
  },
  {
    id: "masala-chai",
    category: "Drinks",
    name: "Masala Chai",
    price: 2.49,
    description: "Indian tea brewed with milk, ginger, and aromatic spices."
  }
];

const offers = [
  {
    id: "family-biryani-combo",
    name: "Family Biryani Combo",
    price: 24.99,
    description: "Get 2 Chicken Biryanis, 2 drinks, and 1 dessert at a special price."
  },
  {
    id: "breakfast-saver-combo",
    name: "Breakfast Saver Combo",
    price: 9.99,
    description: "Masala Dosa, Idli Sambar, and Masala Chai."
  },
  {
    id: "dinner-delight",
    name: "Dinner Delight",
    price: 14.99,
    description: "Butter Naan, Paneer Butter Masala, and Fresh Lime Soda."
  }
];

const demoOrders = readStore(ORDERS_FILE, []);
const contactMessages = readStore(MESSAGES_FILE, []);

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

function isValidContact(value) {
  const text = String(value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) || /^[+()\d\s-]{7,}$/.test(text);
}

function requireText(value, fieldName, minLength = 2) {
  const text = String(value || "").trim();
  if (text.length < minLength) {
    throw new Error(`${fieldName} is required.`);
  }

  return text;
}

function getMenuItem(itemId) {
  return menuItems.find((item) => item.id === itemId);
}

function normalizeQuantity(value) {
  const quantity = Number(value || 1);
  return Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
}

function buildOrder(items) {
  if (!Array.isArray(items) || !items.length) {
    throw new Error("Order must include at least one item.");
  }

  const lines = items.map((entry) => {
    const menuItem = getMenuItem(entry.id);
    if (!menuItem) {
      throw new Error(`Unknown menu item: ${entry.id}`);
    }

    const quantity = normalizeQuantity(entry.quantity);
    return {
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
      lineTotal: Number((menuItem.price * quantity).toFixed(2))
    };
  });

  const total = Number(lines.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
  const messageLines = [
    `Hello ${RESTAURANT_NAME}, I want to place this order:`,
    "",
    ...lines.map((item, index) => `${index + 1}. ${item.name} x ${item.quantity} - $${item.lineTotal.toFixed(2)}`),
    "",
    `Total: $${total.toFixed(2)}`,
    "",
    "Please confirm availability."
  ];
  const whatsappMessage = messageLines.join("\n");

  const order = {
    orderId: `spicehub-${randomUUID()}`,
    status: "demo",
    message: "Portfolio backend demo. No real order or WhatsApp message is sent by this API.",
    items: lines,
    total,
    whatsappMessage,
    whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`,
    createdAt: new Date().toISOString()
  };

  demoOrders.push(order);
  writeStore(ORDERS_FILE, demoOrders);

  return order;
}

function createContactMessage(body) {
  const name = requireText(body.name, "Name");
  const contact = requireText(body.contact || body.email || body.phone, "Contact");
  const message = requireText(body.message, "Message", 8);

  if (!isValidContact(contact)) {
    throw new Error("Enter a valid email address or phone number.");
  }

  const contactMessage = {
    id: `spicehub-contact-${randomUUID()}`,
    name,
    contact,
    message,
    status: "new-demo-message",
    createdAt: new Date().toISOString()
  };

  contactMessages.push(contactMessage);
  writeStore(MESSAGES_FILE, contactMessages);

  return contactMessage;
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
      project: "SpiceHub Restaurant Website",
      mode: "portfolio-backend-demo"
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/menu") {
    const category = url.searchParams.get("category");
    const filteredItems = category
      ? menuItems.filter((item) => item.category.toLowerCase() === category.toLowerCase())
      : menuItems;

    sendJson(response, 200, {
      count: filteredItems.length,
      categories: [...new Set(menuItems.map((item) => item.category))],
      items: filteredItems
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/offers") {
    sendJson(response, 200, { offers });
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
    const order = demoOrders.find((item) => item.orderId === orderId);
    if (!order) {
      sendJson(response, 404, { error: "Order not found." });
      return;
    }

    sendJson(response, 200, { order });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/orders/whatsapp") {
    try {
      const body = await readJson(request);
      sendJson(response, 201, buildOrder(body.items));
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/contact") {
    try {
      const body = await readJson(request);
      sendJson(response, 201, {
        status: "demo",
        message: "Portfolio backend demo. Contact message was validated and stored in a local JSON file.",
        contactMessage: createContactMessage(body)
      });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }

  sendJson(response, 404, {
    error: "Route not found.",
    availableRoutes: [
      "GET /api/health",
      "GET /api/menu",
      "GET /api/menu?category=Breakfast",
      "GET /api/offers",
      "GET /api/orders",
      "GET /api/orders/:orderId",
      "POST /api/orders/whatsapp",
      "POST /api/contact"
    ]
  });
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`SpiceHub backend demo running at http://localhost:${PORT}`);
});
