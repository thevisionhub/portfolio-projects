const http = require("http");
const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 4200);
const DATA_DIR = path.join(__dirname, "data");
const MESSAGES_FILE = path.join(DATA_DIR, "contact-messages.json");

const profile = {
  name: "Alex Carter",
  role: "Frontend Developer & Creative Freelancer",
  headline: "Building Modern Websites, Clean Interfaces, and Digital Experiences",
  availability: "Available for freelance projects, internships, and remote work.",
  email: "alex.carter@example.com",
  location: "Remote / Available Worldwide"
};

const skills = {
  developer: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Git", "GitHub", "Firebase", "Node.js", "Figma"],
  designer: ["UI Design", "UX Design", "Wireframing", "Branding", "Figma", "Canva", "Adobe Photoshop", "Adobe Illustrator"],
  editor: [
    "Adobe Premiere Pro",
    "After Effects",
    "Color Correction",
    "Motion Graphics",
    "Sound Editing",
    "YouTube Editing",
    "Short-form Reels",
    "Storytelling"
  ],
  ai: ["ChatGPT", "Gemini", "Prompt Engineering", "AI Automation", "n8n", "Zapier", "Python Basics"]
};

const versions = [
  {
    id: "developer",
    title: "Developer Version",
    audience: "Coders, software students, frontend developers, full-stack developers, and AI/ML learners.",
    sections: ["Skills", "Projects", "GitHub", "Resume", "Contact"]
  },
  {
    id: "designer",
    title: "Designer Version",
    audience: "UI/UX designers, graphic designers, brand designers, and product designers.",
    sections: ["Design tools", "Case studies", "Creative work", "Testimonials", "Contact"]
  },
  {
    id: "video-editor",
    title: "Video Editor Version",
    audience: "Video editors, motion designers, YouTube editors, and short-form content creators.",
    sections: ["Showreel", "Editing services", "Software skills", "Client projects", "Contact"]
  }
];

const projects = [
  {
    id: "spicehub",
    title: "SpiceHub Restaurant Website",
    category: "web",
    description:
      "A responsive restaurant ordering website where customers can browse food items, add them to an order summary, and preview WhatsApp ordering.",
    stack: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: "taskflow",
    title: "TaskFlow SaaS Landing Page",
    category: "saas",
    description:
      "A modern SaaS landing page built for startup founders to showcase product features, pricing plans, testimonials, FAQ, and contact details.",
    stack: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: "devfolio-pro",
    title: "Creator Portfolio Template",
    category: "web",
    description:
      "A personal portfolio website template for developers, designers, freelancers, students, and digital creators.",
    stack: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: "editpro",
    title: "EditPro Video Editor Portfolio",
    category: "creative",
    description:
      "A portfolio layout designed for video editors to showcase showreels, editing services, client work, and contact details.",
    stack: ["HTML", "CSS", "JavaScript"]
  }
];

const articles = [
  {
    id: "first-freelance-website",
    title: "How I Built My First Freelance Website",
    category: "Web Development",
    description: "A simple breakdown of how I planned, designed, and built my first client-ready website."
  },
  {
    id: "student-portfolio",
    title: "Why Every Student Needs a Portfolio Website",
    category: "Career",
    description: "A portfolio website can help students showcase skills, projects, resume, and learning progress in one place."
  },
  {
    id: "present-projects",
    title: "How to Present Projects Like a Professional",
    category: "Portfolio Tips",
    description: "A guide to writing better project descriptions, case studies, and portfolio content."
  }
];

const messages = readStore(MESSAGES_FILE, []);

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

function createContactMessage(body) {
  const name = requireText(body.name, "Full name");
  const email = String(body.email || "").trim();
  const subject = requireText(body.subject, "Subject", 3);
  const message = requireText(body.message, "Message", 10);

  if (!isValidEmail(email)) {
    throw new Error("A valid email address is required.");
  }

  const contactMessage = {
    id: `message-${randomUUID()}`,
    name,
    email,
    subject,
    message,
    status: "new-demo-message",
    createdAt: new Date().toISOString()
  };

  messages.push(contactMessage);
  writeStore(MESSAGES_FILE, messages);
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
      project: "DevFolio Pro",
      mode: "portfolio-backend-demo"
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/profile") {
    sendJson(response, 200, { profile });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/skills") {
    const category = url.searchParams.get("category");
    if (category) {
      sendJson(response, 200, {
        category,
        skills: skills[category] || []
      });
      return;
    }

    sendJson(response, 200, { skills });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/versions") {
    sendJson(response, 200, { versions });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/projects") {
    const category = url.searchParams.get("category");
    const search = String(url.searchParams.get("search") || "").trim().toLowerCase();
    const filteredProjects = projects.filter((project) => {
      const matchesCategory = !category || category === "all" || project.category === category;
      const matchesSearch = !search || project.title.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });

    sendJson(response, 200, {
      count: filteredProjects.length,
      projects: filteredProjects
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/articles") {
    sendJson(response, 200, { articles });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/contact") {
    sendJson(response, 200, {
      count: messages.length,
      messages
    });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/contact") {
    try {
      const body = await readJson(request);
      const contactMessage = createContactMessage(body);
      sendJson(response, 201, {
        status: "demo",
        message: "Portfolio backend demo. Message was validated and stored in memory only.",
        contactMessage
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
      "GET /api/profile",
      "GET /api/skills",
      "GET /api/skills?category=developer",
      "GET /api/versions",
      "GET /api/projects",
      "GET /api/projects?category=web",
      "GET /api/articles",
      "GET /api/contact",
      "POST /api/contact"
    ]
  });
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`DevFolio Pro backend demo running at http://localhost:${PORT}`);
});
