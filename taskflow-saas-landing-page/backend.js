const http = require("http");
const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 4100);
const DATA_DIR = path.join(__dirname, "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const TRIALS_FILE = path.join(DATA_DIR, "trial-requests.json");

const features = [
  {
    id: "smart-task-management",
    title: "Smart Task Management",
    description: "Create, assign, and organize tasks with clear deadlines, priorities, and progress status."
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "Automate repetitive steps like task assignment, reminders, status updates, and follow-ups."
  },
  {
    id: "team-collaboration",
    title: "Team Collaboration",
    description: "Keep your team aligned with comments, file sharing, mentions, and real-time project updates."
  },
  {
    id: "project-analytics",
    title: "Project Analytics",
    description: "Track progress, team performance, completion rate, and bottlenecks using simple analytics."
  },
  {
    id: "calendar-timeline",
    title: "Calendar & Timeline View",
    description: "Plan work visually using calendar, timeline, and weekly planning views."
  },
  {
    id: "secure-cloud-workspace",
    title: "Secure Cloud Workspace",
    description: "Protect your workspace with secure access, role-based permissions, and cloud-based data storage."
  }
];

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    billing: "month",
    bestFor: "Solo users and students testing the product.",
    features: ["Up to 3 projects", "Basic task management", "Calendar view", "Limited automation", "Community support"]
  },
  {
    id: "pro",
    name: "Pro",
    price: 12,
    billing: "month per user",
    badge: "Most Popular",
    bestFor: "Freelancers, small teams, and early-stage startups.",
    features: [
      "Unlimited projects",
      "Advanced task management",
      "Workflow automation",
      "Project analytics",
      "Priority support",
      "Team collaboration tools"
    ]
  },
  {
    id: "business",
    name: "Business",
    price: 29,
    billing: "month per user",
    bestFor: "Growing companies and professional teams.",
    features: [
      "Everything in Pro",
      "Advanced analytics",
      "Role-based access",
      "Custom workflows",
      "Admin dashboard",
      "Dedicated support",
      "Team performance reports"
    ]
  }
];

const faqs = [
  {
    question: "Is TaskFlow free to use?",
    answer: "Yes. TaskFlow includes a free plan for individuals and small teams who want to manage basic projects."
  },
  {
    question: "Do I need a credit card to start?",
    answer: "No. Users can start with the free plan without entering card details."
  },
  {
    question: "Can I invite my team members?",
    answer: "Yes. Pro and Business plans allow team collaboration with multiple members."
  },
  {
    question: "Does TaskFlow support automation?",
    answer: "Yes. TaskFlow includes workflow automation for reminders, task assignments, status updates, and recurring tasks."
  },
  {
    question: "Can I upgrade or cancel anytime?",
    answer: "Yes. Users can upgrade, downgrade, or cancel their plan anytime."
  }
];

const leads = readStore(LEADS_FILE, []);
const trialRequests = readStore(TRIALS_FILE, []);

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

function createLead(body) {
  const fullName = requireText(body.fullName || body.name, "Full name");
  const workEmail = String(body.workEmail || body.email || "").trim();
  const companyName = requireText(body.companyName || body.company, "Company name");
  const message = requireText(body.message, "Message", 10);

  if (!isValidEmail(workEmail)) {
    throw new Error("A valid work email is required.");
  }

  const lead = {
    id: `lead-${randomUUID()}`,
    fullName,
    workEmail,
    companyName,
    message,
    status: "new-demo-lead",
    createdAt: new Date().toISOString()
  };

  leads.push(lead);
  writeStore(LEADS_FILE, leads);
  return lead;
}

function createTrialRequest(body) {
  const planId = String(body.planId || "free").trim().toLowerCase();
  const plan = pricingPlans.find((item) => item.id === planId);

  if (!plan) {
    throw new Error("Unknown pricing plan.");
  }

  const email = String(body.email || "").trim();
  if (email && !isValidEmail(email)) {
    throw new Error("A valid email is required.");
  }

  const request = {
    id: `trial-${randomUUID()}`,
    planId: plan.id,
    planName: plan.name,
    email: email || null,
    status: "demo-requested",
    createdAt: new Date().toISOString()
  };

  trialRequests.push(request);
  writeStore(TRIALS_FILE, trialRequests);
  return request;
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
      project: "TaskFlow SaaS Landing Page",
      mode: "portfolio-backend-demo"
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/features") {
    sendJson(response, 200, { features });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/pricing") {
    sendJson(response, 200, { plans: pricingPlans });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/faqs") {
    sendJson(response, 200, { faqs });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/leads") {
    sendJson(response, 200, {
      count: leads.length,
      leads
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/trials") {
    sendJson(response, 200, {
      count: trialRequests.length,
      trialRequests
    });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/leads") {
    try {
      const body = await readJson(request);
      const lead = createLead(body);
      sendJson(response, 201, {
        status: "demo",
        message: "Portfolio backend demo. Lead was validated and stored in memory only.",
        lead
      });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/trials") {
    try {
      const body = await readJson(request);
      const trialRequest = createTrialRequest(body);
      sendJson(response, 201, {
        status: "demo",
        message: "Portfolio backend demo. No real account, payment, or subscription is created.",
        trialRequest
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
      "GET /api/features",
      "GET /api/pricing",
      "GET /api/faqs",
      "GET /api/leads",
      "GET /api/trials",
      "POST /api/leads",
      "POST /api/trials"
    ]
  });
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`TaskFlow backend demo running at http://localhost:${PORT}`);
});
