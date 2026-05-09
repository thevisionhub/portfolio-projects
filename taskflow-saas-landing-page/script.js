const THEME_KEY = "taskflow-theme";

const demoMessages = {
  trial: "This would start a free trial in a real SaaS website. In this portfolio demo, no account is created.",
  free: "This would activate the Free plan in a real product. This project is only a UI/UX portfolio demo.",
  pro: "This would start the Pro trial in a real SaaS checkout flow. No subscription is created here.",
  business: "This would open a sales contact flow for a real company. This demo does not send requests.",
  footer: "This footer CTA is included to show conversion-focused SaaS navigation.",
  form: "This form validates input and previews a lead-capture interaction, but it does not send messages."
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
    button.innerHTML = `<i data-lucide="${icon}"></i><span>Mode</span>`;
  });
  refreshIcons();
}

function closeMobileNav() {
  const navToggle = document.querySelector("[data-nav-toggle]");
  document.body.classList.remove("nav-open");
  if (!navToggle) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.innerHTML =
    '<i data-lucide="menu"></i><span class="nav-bars" aria-hidden="true"></span><span class="sr-only">Menu</span>';
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
      ? '<i data-lucide="x"></i><span class="nav-bars" aria-hidden="true"></span><span class="sr-only">Close menu</span>'
      : '<i data-lucide="menu"></i><span class="nav-bars" aria-hidden="true"></span><span class="sr-only">Menu</span>';
    refreshIcons();
  });

  nav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    closeMobileNav();
  });
}

function setupFaq() {
  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const currentItem = button.closest(".faq-item");
      const isOpen = currentItem.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
        item.querySelector("button").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        currentItem.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function setupPricingHighlight() {
  const pricingGrid = document.querySelector("[data-pricing-grid]");
  if (!pricingGrid) return;

  pricingGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-plan-card]");
    if (!card) return;

    pricingGrid.querySelectorAll("[data-plan-card]").forEach((planCard) => {
      planCard.classList.toggle("active", planCard === card);
    });
  });
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
      <span class="demo-dialog-kicker">Portfolio Website</span>
      <h2 id="demo-dialog-title">Demo interaction only</h2>
      <p>
        TaskFlow is a fictional SaaS landing page built for portfolio presentation.
        No real account, payment, booking, or message will be created.
      </p>
      <div class="demo-preview" data-demo-preview hidden></div>
      <button class="button button-primary" type="button" data-close-demo>I understand</button>
    </div>
  `;
  document.body.appendChild(dialog);
  refreshIcons();
  return dialog;
}

function showDemoNotice(message = "") {
  const dialog = getDemoDialog();
  const preview = dialog.querySelector("[data-demo-preview]");

  if (message) {
    preview.hidden = false;
    preview.textContent = message;
  } else {
    preview.hidden = true;
    preview.textContent = "";
  }

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
    closeMobileNav();
    showDemoNotice(demoMessages[demoAction.dataset.demoAction] || "");
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
    const company = String(formData.get("company") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    status.className = "form-status";

    if (name.length < 2) {
      status.textContent = "Please enter your full name.";
      status.classList.add("error");
      return;
    }

    if (!validEmail) {
      status.textContent = "Please enter a valid work email.";
      status.classList.add("error");
      return;
    }

    if (company.length < 2) {
      status.textContent = "Please enter your company name.";
      status.classList.add("error");
      return;
    }

    if (message.length < 10) {
      status.textContent = "Please add a short message.";
      status.classList.add("error");
      return;
    }

    status.textContent = "Demo only. This form validates input but does not send messages.";
    status.classList.add("success");
    showDemoNotice(`${demoMessages.form}\n\nLead preview:\n${name}\n${email}\n${company}\n${message}`);
  });
}

function setupCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    const duration = 900;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = Math.round(target * progress);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.animated) return;
        entry.target.dataset.animated = "true";
        animateCounter(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupMobileNav();
  setupFaq();
  setupPricingHighlight();
  setupDemoActions();
  setupContactForm();
  setupCounters();
  refreshIcons();
});
