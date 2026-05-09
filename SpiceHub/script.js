const STORAGE_KEY = "spicehub-cart";
const DEMO_NOTICE = {
  title: "Portfolio demo only",
  message:
    "SpiceHub is a fictional restaurant website made for portfolio presentation. No real WhatsApp message, order, payment, map route, call, or email will be sent."
};

const menuItems = [
  {
    id: "masala-dosa",
    category: "Breakfast",
    name: "Masala Dosa",
    price: 4.99,
    description: "Crispy South Indian dosa served with chutney and sambar.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80",
    alt: "Masala dosa served with chutney and sambar"
  },
  {
    id: "idli-sambar",
    category: "Breakfast",
    name: "Idli Sambar",
    price: 3.99,
    description: "Soft steamed rice cakes served with hot sambar and coconut chutney.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80",
    alt: "Idli served with sambar and chutney"
  },
  {
    id: "veg-sandwich",
    category: "Breakfast",
    name: "Veg Sandwich",
    price: 5.49,
    description: "Fresh vegetable sandwich with cheese, herbs, and grilled bread.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    alt: "Grilled vegetable sandwich cut in half"
  },
  {
    id: "pancake-stack",
    category: "Breakfast",
    name: "Pancake Stack",
    price: 6.99,
    description: "Fluffy pancakes topped with maple syrup and fresh berries.",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=80",
    alt: "Pancake stack with syrup and berries"
  },
  {
    id: "chicken-biryani",
    category: "Lunch",
    name: "Chicken Biryani",
    price: 9.99,
    description: "Aromatic basmati rice cooked with spices and tender chicken pieces.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80",
    alt: "Chicken biryani in a serving bowl"
  },
  {
    id: "veg-fried-rice",
    category: "Lunch",
    name: "Veg Fried Rice",
    price: 7.49,
    description: "Stir-fried rice with fresh vegetables, sauces, and mild spices.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
    alt: "Vegetable fried rice in a bowl"
  },
  {
    id: "paneer-butter-masala",
    category: "Lunch",
    name: "Paneer Butter Masala",
    price: 8.99,
    description: "Soft paneer cubes cooked in creamy tomato-based gravy.",
    image: "https://images.unsplash.com/photo-1630409351217-bc4fa6422075?auto=format&fit=crop&w=900&q=80",
    alt: "Paneer butter masala with naan"
  },
  {
    id: "grilled-chicken-meal",
    category: "Lunch",
    name: "Grilled Chicken Meal",
    price: 11.99,
    description: "Juicy grilled chicken served with rice, salad, and sauce.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80",
    alt: "Grilled chicken served with sides"
  },
  {
    id: "butter-naan-curry",
    category: "Dinner",
    name: "Butter Naan with Curry",
    price: 8.49,
    description: "Soft butter naan served with your choice of rich Indian curry.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80",
    alt: "Naan bread served with Indian curry"
  },
  {
    id: "tandoori-chicken",
    category: "Dinner",
    name: "Tandoori Chicken",
    price: 12.99,
    description: "Spicy grilled chicken marinated with yogurt and Indian spices.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80",
    alt: "Tandoori chicken platter"
  },
  {
    id: "veg-noodles",
    category: "Dinner",
    name: "Veg Noodles",
    price: 7.99,
    description: "Wok-tossed noodles with vegetables and house-made sauce.",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=80",
    alt: "Vegetable noodles in a bowl"
  },
  {
    id: "fish-curry-rice",
    category: "Dinner",
    name: "Fish Curry Rice",
    price: 10.99,
    description: "Traditional fish curry served with steamed rice.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=900&q=80",
    alt: "Fish curry served with rice"
  },
  {
    id: "mango-lassi",
    category: "Drinks",
    name: "Mango Lassi",
    price: 3.99,
    description: "Sweet yogurt-based mango drink served chilled.",
    image: "https://cdn.pixabay.com/photo/2024/01/29/12/56/smoothie-8539791_1280.jpg",
    alt: "Mango lassi in a glass"
  },
  {
    id: "cold-coffee",
    category: "Drinks",
    name: "Cold Coffee",
    price: 4.49,
    description: "Creamy iced coffee blended with milk and chocolate syrup.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    alt: "Iced coffee with cream"
  },
  {
    id: "fresh-lime-soda",
    category: "Drinks",
    name: "Fresh Lime Soda",
    price: 2.99,
    description: "Refreshing lime soda with mint and crushed ice.",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh lime soda with mint"
  },
  {
    id: "masala-chai",
    category: "Drinks",
    name: "Masala Chai",
    price: 2.49,
    description: "Indian tea brewed with milk, ginger, and aromatic spices.",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=80",
    alt: "Cup of masala chai on a table"
  }
];

let cart = loadCart();

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function findMenuItem(id) {
  return menuItems.find((item) => item.id === id);
}

function addToCart(id) {
  const item = findMenuItem(id);
  if (!item) return;

  const existingItem = cart.find((cartItem) => cartItem.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
}

function updateQuantity(id, amount) {
  const item = cart.find((cartItem) => cartItem.id === id);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart();
  renderCart();
}

function getCartTotal() {
  return cart.reduce((total, cartItem) => {
    const item = findMenuItem(cartItem.id);
    return item ? total + item.price * cartItem.quantity : total;
  }, 0);
}

function buildSingleOrderMessage(item) {
  return `Hello SpiceHub, I want to order ${item.name} - ${formatCurrency(item.price)}.`;
}

function buildCartOrderMessage() {
  const orderLines = cart
    .map((cartItem, index) => {
      const item = findMenuItem(cartItem.id);
      if (!item) return "";
      const quantityLabel = cartItem.quantity > 1 ? ` x ${cartItem.quantity}` : "";
      return `${index + 1}. ${item.name}${quantityLabel} - ${formatCurrency(item.price * cartItem.quantity)}`;
    })
    .filter(Boolean)
    .join("\n");

  return `Hello SpiceHub, I want to place this order:\n\n${orderLines}\n\nTotal: ${formatCurrency(
    getCartTotal()
  )}\n\nPlease confirm availability.`;
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
      <button class="icon-button demo-dialog-close" type="button" title="Close notice" data-close-demo>
        <i data-lucide="x"></i>
        <span class="sr-only">Close notice</span>
      </button>
      <span class="demo-dialog-kicker">Portfolio Website</span>
      <h2 id="demo-dialog-title">${DEMO_NOTICE.title}</h2>
      <p data-demo-dialog-message>${DEMO_NOTICE.message}</p>
      <div class="demo-message-preview" data-demo-preview hidden></div>
      <button class="button button-primary" type="button" data-close-demo>I understand</button>
    </div>
  `;
  document.body.appendChild(dialog);
  refreshIcons();
  return dialog;
}

function showDemoNotice(previewMessage = "") {
  const dialog = getDemoDialog();
  const preview = dialog.querySelector("[data-demo-preview]");
  const message = dialog.querySelector("[data-demo-dialog-message]");

  message.textContent = DEMO_NOTICE.message;
  if (previewMessage) {
    preview.hidden = false;
    preview.textContent = `Demo preview message:\n${previewMessage}`;
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

function openWhatsApp(message) {
  showDemoNotice(message);
}

function renderMenu(category = "all") {
  const menuGrid = document.querySelector("[data-menu-grid]");
  if (!menuGrid) return;

  const filteredItems =
    category === "all" ? menuItems : menuItems.filter((item) => item.category === category);

  menuGrid.innerHTML = filteredItems
    .map(
      (item) => `
        <article class="food-card menu-card" data-menu-item="${item.id}">
          <img src="${item.image}" alt="${item.alt}" loading="lazy" />
          <div class="menu-card-body">
            <span class="tag">${item.category}</span>
            <div class="menu-card-top">
              <h3>${item.name}</h3>
              <strong>${formatCurrency(item.price)}</strong>
            </div>
            <p>${item.description}</p>
            <div class="menu-actions">
              <button class="button button-dark" type="button" data-add-item="${item.id}">
                <i data-lucide="plus"></i>
                Add to Cart
              </button>
              <button class="button button-outline" type="button" data-whatsapp-item="${item.id}">
                <i data-lucide="message-circle"></i>
                Preview WhatsApp
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  refreshIcons();
}

function renderCart() {
  const cartItemsContainer = document.querySelector("[data-cart-items]");
  const emptyCart = document.querySelector("[data-empty-cart]");
  const totalElement = document.querySelector("[data-cart-total]");
  const sendCartButton = document.querySelector("[data-send-cart]");

  if (!cartItemsContainer || !emptyCart || !totalElement || !sendCartButton) return;

  const visibleCartItems = cart
    .map((cartItem) => ({
      ...cartItem,
      menuItem: findMenuItem(cartItem.id)
    }))
    .filter((cartItem) => cartItem.menuItem);

  emptyCart.hidden = visibleCartItems.length > 0;
  sendCartButton.disabled = visibleCartItems.length === 0;

  cartItemsContainer.innerHTML = visibleCartItems
    .map(
      ({ id, quantity, menuItem }) => `
        <article class="cart-item">
          <div class="cart-item-title">
            <strong>${menuItem.name}</strong>
            <span>${formatCurrency(menuItem.price * quantity)}</span>
          </div>
          <div class="cart-controls">
            <div class="quantity-control" aria-label="${menuItem.name} quantity">
              <button type="button" data-decrease="${id}" aria-label="Decrease ${menuItem.name} quantity">&minus;</button>
              <span>${quantity}</span>
              <button type="button" data-increase="${id}" aria-label="Increase ${menuItem.name} quantity">+</button>
            </div>
            <button class="remove-button" type="button" data-remove="${id}">Remove</button>
          </div>
        </article>
      `
    )
    .join("");

  totalElement.textContent = formatCurrency(getCartTotal());
}

function setupMenuFilters() {
  const filterTabs = document.querySelector("[data-filter-tabs]");
  if (!filterTabs) return;

  filterTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    filterTabs.querySelectorAll(".filter-tab").forEach((tab) => {
      const isSelected = tab === button;
      tab.classList.toggle("active", isSelected);
      tab.setAttribute("aria-selected", String(isSelected));
    });
    renderMenu(button.dataset.category);
  });
}

function setupCartActions() {
  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add-item]");
    const whatsappButton = event.target.closest("[data-whatsapp-item]");
    const increaseButton = event.target.closest("[data-increase]");
    const decreaseButton = event.target.closest("[data-decrease]");
    const removeButton = event.target.closest("[data-remove]");
    const clearButton = event.target.closest("[data-clear-cart]");
    const sendCartButton = event.target.closest("[data-send-cart]");
    const demoAction = event.target.closest("[data-demo-action]");
    const closeDemoButton = event.target.closest("[data-close-demo]");

    if (closeDemoButton) {
      closeDemoNotice();
      return;
    }

    if (demoAction) {
      event.preventDefault();
      showDemoNotice();
      return;
    }

    if (addButton) {
      addToCart(addButton.dataset.addItem);
      const item = findMenuItem(addButton.dataset.addItem);
      showDemoNotice(item ? `${item.name} was added to the sample cart.` : "");
    }

    if (whatsappButton) {
      const item = findMenuItem(whatsappButton.dataset.whatsappItem);
      if (item) openWhatsApp(buildSingleOrderMessage(item));
    }

    if (increaseButton) {
      updateQuantity(increaseButton.dataset.increase, 1);
    }

    if (decreaseButton) {
      updateQuantity(decreaseButton.dataset.decrease, -1);
    }

    if (removeButton) {
      removeFromCart(removeButton.dataset.remove);
    }

    if (clearButton) {
      cart = [];
      saveCart();
      renderCart();
    }

    if (sendCartButton) {
      if (cart.length === 0) return;
      openWhatsApp(buildCartOrderMessage());
    }
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
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML =
      '<i data-lucide="menu"></i><span class="nav-bars" aria-hidden="true"></span><span class="sr-only">Menu</span>';
    refreshIcons();
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
    const contact = String(formData.get("contact") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const hasPhone = /^[+()\d\s-]{7,}$/.test(contact);

    status.className = "form-status";

    if (name.length < 2) {
      status.textContent = "Please enter your name.";
      status.classList.add("error");
      return;
    }

    if (!hasEmail && !hasPhone) {
      status.textContent = "Please enter a valid phone number or email.";
      status.classList.add("error");
      return;
    }

    if (message.length < 10) {
      status.textContent = "Please add a short message.";
      status.classList.add("error");
      return;
    }

    status.textContent = "Demo only. This form does not send messages.";
    status.classList.add("success");
    showDemoNotice(`Name: ${name}\nContact: ${contact}\nMessage: ${message}`);
  });
}

function setupDemoNotice() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDemoNotice();
    }
  });
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupMenuFilters();
  setupCartActions();
  setupContactForm();
  setupDemoNotice();
  renderMenu();
  renderCart();
  refreshIcons();
});
