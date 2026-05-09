const THEME_KEY = "devfolio-pro-theme";

const personas = {
  developer: {
    role: "Frontend Developer & Creative Freelancer",
    label: "Frontend Developer",
    tools: ["HTML", "CSS", "JavaScript", "React"]
  },
  designer: {
    role: "UI/UX Designer & Brand Creative",
    label: "UI/UX Designer",
    tools: ["Figma", "Wireframes", "Branding", "Canva"]
  },
  editor: {
    role: "Video Editor & Motion Designer",
    label: "Video Editor",
    tools: ["Premiere Pro", "After Effects", "Reels", "Storytelling"]
  }
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

const demoMessages = {
  code: "This source link is a portfolio template placeholder. Replace it with your GitHub repository URL before publishing.",
  demo: "This demo button is included to show how project cards work. Replace it with a real live project link.",
  "case-study": "This case study button is a placeholder for a future project write-up.",
  social: "This social link is a template placeholder. Replace it with your real profile URL.",
  contact:
    "This contact form validates input and previews a message, but it does not send email in the static demo."
};

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  const icon = theme === "dark" ? "sun" : "moon";
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.innerHTML = `<i data-lucide="${icon}"></i><span>Theme</span>`;
  });
  refreshIcons();
}

function closeMobileNav() {
  const navToggle = document.querySelector("[data-nav-toggle]");
  document.body.classList.remove("nav-open");
  if (!navToggle) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.innerHTML = '<i data-lucide="menu"></i><span class="sr-only">Menu</span>';
  refreshIcons();
}

function setupThemeToggle() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(savedTheme || preferredTheme);

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-theme-toggle]");
    if (!toggle) return;
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

function setupMobileNav() {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!navToggle || !nav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.innerHTML = isOpen
      ? '<i data-lucide="x"></i><span class="sr-only">Close menu</span>'
      : '<i data-lucide="menu"></i><span class="sr-only">Menu</span>';
    refreshIcons();
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMobileNav();
  });
}

function renderSkills(category = "developer") {
  const skillsGrid = document.querySelector("[data-skills-grid]");
  if (!skillsGrid) return;

  skillsGrid.innerHTML = skills[category].map((skill) => `<span>${skill}</span>`).join("");
}

function setupSkillTabs() {
  const buttons = document.querySelectorAll("[data-skill-filter]");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      renderSkills(button.dataset.skillFilter);
    });
  });
}

function setupPersonaSwitcher() {
  const buttons = document.querySelectorAll("[data-persona]");
  const role = document.querySelector("[data-typing-role]");
  const profileLabel = document.querySelector("[data-profile-label]");
  const heroTools = document.querySelector("[data-hero-tools]");
  if (!buttons.length || !role || !profileLabel || !heroTools) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const persona = personas[button.dataset.persona] || personas.developer;
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      role.textContent = persona.role;
      profileLabel.textContent = persona.label;
      heroTools.innerHTML = persona.tools.map((tool) => `<span>${tool}</span>`).join("");
      refreshIcons();
    });
  });
}

function filterProjects() {
  const activeFilter = document.querySelector("[data-project-filter].active")?.dataset.projectFilter || "all";
  const searchValue = String(document.querySelector("[data-project-search]")?.value || "").trim().toLowerCase();
  const cards = document.querySelectorAll("[data-category]");
  const emptyState = document.querySelector("[data-empty-state]");
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = !searchValue || card.dataset.title.includes(searchValue);
    const isVisible = matchesFilter && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (emptyState) {
    emptyState.hidden = visibleCount > 0;
  }
}

function setupProjectFilters() {
  document.querySelectorAll("[data-project-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-project-filter]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      filterProjects();
    });
  });

  document.querySelector("[data-project-search]")?.addEventListener("input", filterProjects);
}

function getDemoDialog() {
  let dialog = document.querySelector("[data-demo-dialog]");
  if (dialog) return dialog;

  dialog = document.createElement("div");
  dialog.className = "demo-dialog";
  dialog.setAttribute("data-demo-dialog", "");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", "demo-dialog-title");
  dialog.hidden = true;
  dialog.innerHTML = `
    <div class="demo-dialog-backdrop" data-close-demo></div>
    <div class="demo-dialog-panel">
      <button class="demo-dialog-close" type="button" title="Close notice" data-close-demo>
        <i data-lucide="x"></i>
        <span class="sr-only">Close notice</span>
      </button>
      <p class="eyebrow">Template Placeholder</p>
      <h2 id="demo-dialog-title">Replace this with your real link</h2>
      <p data-demo-message></p>
      <button class="button button-primary" type="button" data-close-demo>I understand</button>
    </div>
  `;
  document.body.appendChild(dialog);
  refreshIcons();
  return dialog;
}

function showDemoNotice(message) {
  const dialog = getDemoDialog();
  dialog.querySelector("[data-demo-message]").textContent = message;
  dialog.hidden = false;
  document.body.classList.add("modal-open");
  dialog.querySelector(".demo-dialog-close").focus();
}

function closeDemoNotice() {
  const dialog = document.querySelector("[data-demo-dialog]");
  if (!dialog) return;
  dialog.hidden = true;
  document.body.classList.remove("modal-open");
}

function setupDemoActions() {
  document.addEventListener("click", (event) => {
    const closeButton = event.target.closest("[data-close-demo]");
    if (closeButton) {
      closeDemoNotice();
      return;
    }

    const demoAction = event.target.closest("[data-demo-action]");
    if (!demoAction) return;
    event.preventDefault();
    showDemoNotice(demoMessages[demoAction.dataset.demoAction] || "This is a template placeholder.");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDemoNotice();
  });
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    status.className = "form-status";

    if (name.length < 2) {
      status.textContent = "Please enter your full name.";
      status.classList.add("error");
      return;
    }

    if (!validEmail) {
      status.textContent = "Please enter a valid email address.";
      status.classList.add("error");
      return;
    }

    if (subject.length < 3) {
      status.textContent = "Please add a subject.";
      status.classList.add("error");
      return;
    }

    if (message.length < 10) {
      status.textContent = "Please add a message with at least 10 characters.";
      status.classList.add("error");
      return;
    }

    status.textContent = "Demo only. The form is valid, but no email is sent from this static template.";
    status.classList.add("success");
    showDemoNotice(`${demoMessages.contact}\n\nMessage preview:\n${name}\n${email}\n${subject}\n${message}`);
  });
}

function setupScrollReveal() {
  const targets = document.querySelectorAll(".section-heading, .project-card, .blog-card, .about-copy, .contact-form");
  targets.forEach((target) => target.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((target) => observer.observe(target));
}

function setupActiveNav() {
  const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const updateActiveNav = () => {
    const currentSection = sections
      .slice()
      .reverse()
      .find((section) => section.getBoundingClientRect().top <= 120);

    navLinks.forEach((link) => {
      link.classList.toggle("active", currentSection && link.getAttribute("href") === `#${currentSection.id}`);
    });
  };

  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav, { passive: true });
}

function setupBackToTop() {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) return;

  const updateVisibility = () => {
    button.classList.toggle("visible", window.scrollY > 650);
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupMobileNav();
  renderSkills();
  setupSkillTabs();
  setupPersonaSwitcher();
  setupProjectFilters();
  setupDemoActions();
  setupContactForm();
  setupScrollReveal();
  setupActiveNav();
  setupBackToTop();
  refreshIcons();
});
