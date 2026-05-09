const CART_KEY = "sneakvault-cart";
const WHATSAPP_NUMBER = "12345678900";
const API_BASE_URL = "https://sneakvault-backend-uu6b.onrender.com";

const products = [
  {
    id: "airflex-runner-x1",
    name: "AirFlex Runner X1",
    category: "Running",
    price: 89,
    description: "Lightweight running sneakers with breathable mesh and cushioned sole.",
    longDescription:
      "AirFlex Runner X1 is designed for people who need lightweight comfort and everyday performance. Its breathable upper, soft cushioning, and flexible sole make it suitable for running, walking, travel, and daily use.",
    rating: 4.8,
    tag: "Best Seller",
    image: "assets/airflex-runner-x1.jpg"
  },
  {
    id: "streetcore-high-tops",
    name: "StreetCore High Tops",
    category: "Streetwear",
    price: 119,
    description: "Premium high-top sneakers designed for bold streetwear outfits.",
    longDescription:
      "StreetCore High Tops bring a structured silhouette, padded ankle support, and premium finish for bold streetwear outfits.",
    rating: 4.7,
    tag: "New Arrival",
    image: "assets/streetcore-high-tops.jpg"
  },
  {
    id: "cloudstep-everyday",
    name: "CloudStep Everyday",
    category: "Casual",
    price: 74,
    description: "Soft everyday sneakers built for comfort, walking, and daily use.",
    longDescription:
      "CloudStep Everyday is a simple, soft sneaker made for walking, travel, college outfits, and daily city movement.",
    rating: 4.6,
    tag: "Comfort Pick",
    image: "assets/cloudstep-everyday.jpg"
  },
  {
    id: "velocity-pro-knit",
    name: "Velocity Pro Knit",
    category: "Running",
    price: 135,
    description: "Performance sneakers with flexible knit upper and energy-return sole.",
    longDescription:
      "Velocity Pro Knit combines flexible knit support with an energy-return sole for runners who want a sharper performance feel.",
    rating: 4.9,
    tag: "Premium",
    image: "assets/velocity-pro-knit.jpg"
  },
  {
    id: "retro-court-classic",
    name: "Retro Court Classic",
    category: "Casual",
    price: 99,
    description: "Vintage-inspired sneakers with clean leather finish and classic court style.",
    longDescription:
      "Retro Court Classic brings a vintage court shape, clean leather finish, and easy styling for casual outfits.",
    rating: 4.5,
    tag: "Trending",
    image: "assets/retro-court-classic.jpg"
  },
  {
    id: "urban-black-edition",
    name: "Urban Black Edition",
    category: "Streetwear",
    price: 149,
    description: "Minimal black sneakers with premium details for modern outfits.",
    longDescription:
      "Urban Black Edition is a minimal black sneaker with premium detailing, made for clean fits and evening streetwear looks.",
    rating: 4.8,
    tag: "Limited",
    image: "assets/urban-black-edition.jpg"
  },
  {
    id: "flexlite-sports-max",
    name: "FlexLite Sports Max",
    category: "Sports",
    price: 109,
    description: "Durable sports sneakers designed for training, gym, and active movement.",
    longDescription:
      "FlexLite Sports Max is made for training, gym sessions, and active movement with a stable grip and durable build.",
    rating: 4.6,
    tag: "Sport Pick",
    image: "assets/flexlite-sports-max.jpg"
  },
  {
    id: "whitemode-essential",
    name: "WhiteMode Essential",
    category: "Casual",
    price: 79,
    description: "Clean white sneakers suitable for casual, college, and smart outfits.",
    longDescription:
      "WhiteMode Essential is a clean white sneaker for casual, college, and smart outfits that need a simple polished finish.",
    rating: 4.7,
    tag: "Popular",
    image: "assets/whitemode-essential.jpg"
  },
  {
    id: "trailgrip-outdoor",
    name: "TrailGrip Outdoor",
    category: "Outdoor",
    price: 129,
    description: "Rugged sneakers with strong grip for outdoor walking and travel.",
    longDescription:
      "TrailGrip Outdoor has a rugged outsole and strong grip for outdoor walking, travel days, and uneven city routes.",
    rating: 4.5,
    tag: "Outdoor",
    image: "assets/trailgrip-outdoor.jpg"
  },
  {
    id: "luxury-suede-runner",
    name: "Luxury Suede Runner",
    category: "Premium",
    price: 159,
    description: "Premium suede sneakers with elegant finish and soft inner comfort.",
    longDescription:
      "Luxury Suede Runner uses a soft suede finish, elegant profile, and cushioned inner build for a more premium sneaker look.",
    rating: 4.9,
    tag: "Luxury",
    image: "assets/luxury-suede-runner.jpg"
  }
];

const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11"];
let cart = loadCart();
let modalProduct = null;
let modalSize = "US 9";
let modalQuantity = 1;

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function formatPrice(price) {
  return `$${Number(price).toFixed(0)}`;
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);
}

function renderFeatured() {
  const featuredGrid = document.querySelector("[data-featured-grid]");
  if (!featuredGrid) return;

  const featured = products.filter((product) => ["Best Seller", "Limited", "Luxury"].includes(product.tag));
  featuredGrid.innerHTML = featured
    .map(
      (product) => `
        <article class="featured-card">
          <img src="${product.image}" alt="${product.name}" />
          <div>
            <span>${product.tag}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button class="button button-primary" type="button" data-view-details="${product.id}">View Details</button>
          </div>
        </article>
      `
    )
    .join("");
}

function getFilteredProducts() {
  const search = String(document.querySelector("[data-search]")?.value || "").trim().toLowerCase();
  const category = document.querySelector("[data-category-filter]")?.value || "All";
  const price = document.querySelector("[data-price-filter]")?.value || "All";
  const sort = document.querySelector("[data-sort-filter]")?.value || "featured";

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

function renderProducts() {
  const productGrid = document.querySelector("[data-product-grid]");
  const emptyState = document.querySelector("[data-empty-state]");
  if (!productGrid) return;

  const visibleProducts = getFilteredProducts();
  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
            <span class="product-badge">${product.tag}</span>
          </div>
          <div class="product-body">
            <div class="product-meta">
              <span>${product.category}</span>
              <span class="product-price">${formatPrice(product.price)}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-rating">
              <i data-lucide="star"></i>
              <span>${product.rating}</span>
            </div>
            <div class="product-actions">
              <button type="button" data-add-cart="${product.id}">Add to Cart</button>
              <button type="button" data-view-details="${product.id}">View Details</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  if (emptyState) {
    emptyState.hidden = visibleProducts.length > 0;
  }

  refreshIcons();
}

function addToCart(productId, size = "US 9", quantity = 1) {
  const existing = cart.find((item) => item.id === productId && item.size === size);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, size, quantity });
  }

  saveCart();
  renderCart();
  pulseCartButton();
}

function removeFromCart(productId, size) {
  cart = cart.filter((item) => !(item.id === productId && item.size === size));
  saveCart();
  renderCart();
}

function updateQuantity(productId, size, change) {
  const item = cart.find((cartItem) => cartItem.id === productId && cartItem.size === size);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(productId, size);
    return;
  }

  saveCart();
  renderCart();
}

function renderCart() {
  const count = getCartCount();
  const total = getCartTotal();
  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = count;
  });

  const panelCount = document.querySelector("[data-cart-panel-count]");
  if (panelCount) {
    panelCount.textContent = `${count} ${count === 1 ? "item" : "items"}`;
  }

  const totalElement = document.querySelector("[data-cart-total]");
  if (totalElement) {
    totalElement.textContent = formatPrice(total);
  }

  const cartItems = document.querySelector("[data-cart-items]");
  if (!cartItems) return;

  if (!cart.length) {
    cartItems.innerHTML = '<div class="cart-empty">Your cart is empty. Add premium sneakers from the collection.</div>';
    return;
  }

  cartItems.innerHTML = cart
    .map((item) => {
      const product = getProduct(item.id);
      if (!product) return "";
      return `
        <article class="cart-item">
          <img src="${product.image}" alt="${product.name}" />
          <div>
            <h3>${product.name}</h3>
            <div class="cart-item-meta">
              <span>${item.size}</span>
              <span>${formatPrice(product.price * item.quantity)}</span>
            </div>
            <div class="quantity-controls">
              <div>
                <button type="button" data-quantity-minus="${product.id}" data-size="${item.size}">-</button>
                <strong>${item.quantity}</strong>
                <button type="button" data-quantity-plus="${product.id}" data-size="${item.size}">+</button>
              </div>
              <button type="button" data-remove-item="${product.id}" data-size="${item.size}">Remove</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  refreshIcons();
}

function pulseCartButton() {
  const cartButton = document.querySelector("[data-cart-open]");
  if (!cartButton) return;
  cartButton.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.06)" },
      { transform: "scale(1)" }
    ],
    { duration: 260, easing: "ease-out" }
  );
}

function openCart() {
  const drawer = document.querySelector("[data-cart-drawer]");
  if (!drawer) return;
  drawer.hidden = false;
  document.body.classList.add("cart-open");
}

function closeCart() {
  const drawer = document.querySelector("[data-cart-drawer]");
  if (!drawer) return;
  drawer.hidden = true;
  document.body.classList.remove("cart-open");
}

function openProductModal(productId) {
  const product = getProduct(productId);
  const modal = document.querySelector("[data-product-modal]");
  if (!product || !modal) return;

  modalProduct = product;
  modalSize = "US 9";
  modalQuantity = 1;

  modal.innerHTML = `
    <div class="modal-backdrop" data-close-modal></div>
    <section class="modal-panel" role="dialog" aria-modal="true" aria-label="${product.name} product details">
      <div class="modal-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="modal-content">
        <button class="modal-close" type="button" data-close-modal aria-label="Close product details">
          <i data-lucide="x"></i>
        </button>
        <p class="eyebrow">${product.category} - ${product.tag}</p>
        <h2>${product.name}</h2>
        <div class="modal-price">${formatPrice(product.price)}</div>
        <div class="product-rating">
          <i data-lucide="star"></i>
          <span>${product.rating} customer rating</span>
        </div>
        <p>${product.longDescription}</p>
        <h3>Available Sizes</h3>
        <div class="size-picker" data-size-picker>
          ${sizes
            .map((size) => `<button class="${size === modalSize ? "active" : ""}" type="button" data-size-choice="${size}">${size}</button>`)
            .join("")}
        </div>
        <h3>Quantity</h3>
        <div class="quantity-controls">
          <div>
            <button type="button" data-modal-minus>-</button>
            <strong data-modal-quantity>${modalQuantity}</strong>
            <button type="button" data-modal-plus>+</button>
          </div>
        </div>
        <div class="detail-note">
          <span>Delivery available within 3-5 business days.</span>
          <span>Free size exchange available within 7 days.</span>
        </div>
        <div class="modal-actions">
          <button class="button button-primary" type="button" data-modal-add>Add to Cart</button>
          <button class="button button-secondary" type="button" data-modal-whatsapp>Order on WhatsApp</button>
        </div>
      </div>
    </section>
  `;

  modal.hidden = false;
  document.body.classList.add("modal-open");
  refreshIcons();
}

function closeProductModal() {
  const modal = document.querySelector("[data-product-modal]");
  if (!modal) return;
  modal.hidden = true;
  modal.innerHTML = "";
  document.body.classList.remove("modal-open");
}

function updateModalQuantity(change) {
  modalQuantity = Math.max(1, modalQuantity + change);
  const quantity = document.querySelector("[data-modal-quantity]");
  if (quantity) {
    quantity.textContent = modalQuantity;
  }
}

function validateCheckoutForm() {
  const form = document.querySelector("[data-checkout-form]");
  const status = document.querySelector("[data-form-status]");
  if (!form || !status) return null;

  const formData = new FormData(form);
  const customer = {
    name: String(formData.get("name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    address: String(formData.get("address") || "").trim(),
    city: String(formData.get("city") || "").trim(),
    postal: String(formData.get("postal") || "").trim(),
    deliveryTime: String(formData.get("deliveryTime") || "").trim(),
    notes: String(formData.get("notes") || "").trim()
  };

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email);
  status.className = "form-status";

  if (!cart.length) {
    status.textContent = "Your cart is empty. Add sneakers before checkout.";
    status.classList.add("error");
    return null;
  }

  if (customer.name.length < 2) {
    status.textContent = "Please enter your full name.";
    status.classList.add("error");
    return null;
  }

  if (customer.phone.length < 7) {
    status.textContent = "Please enter a valid phone number.";
    status.classList.add("error");
    return null;
  }

  if (!validEmail) {
    status.textContent = "Please enter a valid email address.";
    status.classList.add("error");
    return null;
  }

  if (customer.address.length < 8) {
    status.textContent = "Please enter your delivery address.";
    status.classList.add("error");
    return null;
  }

  if (customer.city.length < 2) {
    status.textContent = "Please enter your city.";
    status.classList.add("error");
    return null;
  }

  if (customer.postal.length < 3) {
    status.textContent = "Please enter your postal code.";
    status.classList.add("error");
    return null;
  }

  if (!customer.deliveryTime) {
    status.textContent = "Please select a preferred delivery time.";
    status.classList.add("error");
    return null;
  }

  status.textContent = "Demo order generated. Review the WhatsApp message preview.";
  status.classList.add("success");
  return customer;
}

function buildWhatsAppMessage(customer) {
  const lines = [
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

  cart.forEach((item, index) => {
    const product = getProduct(item.id);
    if (!product) return;
    lines.push(
      `${index + 1}. ${product.name}`,
      `Size: ${item.size}`,
      `Qty: ${item.quantity}`,
      `Price: ${formatPrice(product.price * item.quantity)}`,
      ""
    );
  });

  lines.push(`Total: ${formatPrice(getCartTotal())}`, "", "Please confirm availability and delivery time.");
  return lines.join("\n");
}

function getBackendCartItems() {
  return cart.map((item) => ({
    id: item.id,
    size: item.size,
    quantity: item.quantity
  }));
}

async function sendOrderToBackend(customer) {
  const response = await fetch(`${API_BASE_URL}/api/orders/whatsapp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      customer,
      items: getBackendCartItems()
    })
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Backend order request failed.");
  }

  return payload.order;
}

async function sendNewsletterToBackend(email) {
  const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Newsletter request failed.");
  }

  return payload.subscriber;
}

function showWhatsAppModal(message) {
  const modal = document.querySelector("[data-whatsapp-modal]");
  if (!modal) return;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  modal.innerHTML = `
    <div class="modal-backdrop" data-close-whatsapp></div>
    <section class="whatsapp-panel" role="dialog" aria-modal="true" aria-label="WhatsApp order preview">
      <button class="modal-close" type="button" data-close-whatsapp aria-label="Close WhatsApp preview">
        <i data-lucide="x"></i>
      </button>
      <p class="eyebrow">WhatsApp Checkout Preview</p>
      <h2>Order summary generated</h2>
      <p>This portfolio demo shows the exact message that would be sent to WhatsApp. Replace the demo number before using this for a real store.</p>
      <div class="whatsapp-message">${message}</div>
      <div class="whatsapp-actions">
        <a class="button button-primary" href="${whatsappUrl}" target="_blank" rel="noreferrer">Open WhatsApp Demo Link</a>
        <button class="button button-secondary" type="button" data-copy-message>Copy Message</button>
      </div>
    </section>
  `;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  refreshIcons();
}

function closeWhatsAppModal() {
  const modal = document.querySelector("[data-whatsapp-modal]");
  if (!modal) return;
  modal.hidden = true;
  modal.innerHTML = "";
  document.body.classList.remove("modal-open");
}

function setupEvents() {
  document.addEventListener("click", (event) => {
    const navToggle = event.target.closest("[data-nav-toggle]");
    if (navToggle) {
      const isOpen = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.innerHTML = isOpen
        ? '<i data-lucide="x"></i><span class="sr-only">Close menu</span>'
        : '<i data-lucide="menu"></i><span class="sr-only">Menu</span>';
      refreshIcons();
      return;
    }

    if (event.target.closest(".site-nav a")) {
      document.body.classList.remove("nav-open");
      const toggle = document.querySelector("[data-nav-toggle]");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    const addButton = event.target.closest("[data-add-cart]");
    if (addButton) {
      addToCart(addButton.dataset.addCart, "US 9", 1);
      return;
    }

    const detailButton = event.target.closest("[data-view-details]");
    if (detailButton) {
      openProductModal(detailButton.dataset.viewDetails);
      return;
    }

    if (event.target.closest("[data-cart-open]")) {
      openCart();
      return;
    }

    if (event.target.closest("[data-cart-close]")) {
      closeCart();
      return;
    }

    const checkoutLink = event.target.closest("[data-cart-checkout]");
    if (checkoutLink) {
      closeCart();
      return;
    }

    if (event.target.closest("[data-clear-cart]")) {
      cart = [];
      saveCart();
      renderCart();
      return;
    }

    const minusButton = event.target.closest("[data-quantity-minus]");
    if (minusButton) {
      updateQuantity(minusButton.dataset.quantityMinus, minusButton.dataset.size, -1);
      return;
    }

    const plusButton = event.target.closest("[data-quantity-plus]");
    if (plusButton) {
      updateQuantity(plusButton.dataset.quantityPlus, plusButton.dataset.size, 1);
      return;
    }

    const removeButton = event.target.closest("[data-remove-item]");
    if (removeButton) {
      removeFromCart(removeButton.dataset.removeItem, removeButton.dataset.size);
      return;
    }

    if (event.target.closest("[data-close-modal]")) {
      closeProductModal();
      return;
    }

    const sizeChoice = event.target.closest("[data-size-choice]");
    if (sizeChoice) {
      modalSize = sizeChoice.dataset.sizeChoice;
      document.querySelectorAll("[data-size-choice]").forEach((button) => {
        button.classList.toggle("active", button === sizeChoice);
      });
      return;
    }

    if (event.target.closest("[data-modal-minus]")) {
      updateModalQuantity(-1);
      return;
    }

    if (event.target.closest("[data-modal-plus]")) {
      updateModalQuantity(1);
      return;
    }

    if (event.target.closest("[data-modal-add]") && modalProduct) {
      addToCart(modalProduct.id, modalSize, modalQuantity);
      closeProductModal();
      openCart();
      return;
    }

    if (event.target.closest("[data-modal-whatsapp]") && modalProduct) {
      addToCart(modalProduct.id, modalSize, modalQuantity);
      closeProductModal();
      document.querySelector("#checkout")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (event.target.closest("[data-close-whatsapp]")) {
      closeWhatsAppModal();
      return;
    }

    if (event.target.closest("[data-copy-message]")) {
      const message = document.querySelector(".whatsapp-message")?.textContent || "";
      navigator.clipboard?.writeText(message);
      event.target.closest("[data-copy-message]").textContent = "Copied";
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCart();
      closeProductModal();
      closeWhatsAppModal();
    }
  });

  document.querySelectorAll("[data-search], [data-category-filter], [data-price-filter], [data-sort-filter]").forEach((input) => {
    input.addEventListener("input", renderProducts);
    input.addEventListener("change", renderProducts);
  });

  document.querySelector("[data-checkout-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.querySelector("[data-form-status]");
    const submitButton = form.querySelector("button[type='submit']");
    const customer = validateCheckoutForm();
    if (!customer) return;

    if (submitButton) submitButton.disabled = true;
    if (status) {
      status.className = "form-status";
      status.textContent = "Sending demo order to the live backend...";
    }

    try {
      const order = await sendOrderToBackend(customer);
      if (status) {
        status.textContent = "Backend order saved. Review the WhatsApp checkout message.";
        status.classList.add("success");
      }
      showWhatsAppModal(order.whatsappMessage || buildWhatsAppMessage(customer));
    } catch (error) {
      if (status) {
        status.textContent = `Backend did not respond yet. Showing local preview instead. ${error.message}`;
        status.classList.add("error");
      }
      showWhatsAppModal(buildWhatsAppMessage(customer));
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });

  document.querySelector("[data-newsletter-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.querySelector("[data-newsletter-status]");
    const submitButton = form.querySelector("button[type='submit']");
    const email = String(new FormData(form).get("email") || "").trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    status.className = "";
    if (!validEmail) {
      status.textContent = "Please enter a valid email address.";
      status.classList.add("error");
      return;
    }

    if (submitButton) submitButton.disabled = true;
    status.textContent = "Sending email to the live backend...";

    try {
      await sendNewsletterToBackend(email);
      status.textContent = "Email saved by the live backend demo.";
      status.classList.add("success");
      form.reset();
    } catch (error) {
      status.textContent = `Backend did not respond yet. Please try again after Render wakes up. ${error.message}`;
      status.classList.add("error");
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("active");
        faqItem.querySelector("button").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeatured();
  renderProducts();
  renderCart();
  setupEvents();
  refreshIcons();
});
