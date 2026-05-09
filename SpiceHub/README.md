# SpiceHub Restaurant Website

SpiceHub is a fictional restaurant ordering website built for portfolio presentation. It includes a premium restaurant homepage, menu page, cart-like order summary, WhatsApp order preview, contact form UI, and a Node.js backend demo.

## Features

- Responsive restaurant homepage
- Menu categories for breakfast, lunch, dinner, and drinks
- Food cards with pricing and descriptions
- Add to order cart flow
- Quantity update and remove item controls
- WhatsApp order message generation
- Portfolio demo safeguards so visitors know it is not a real restaurant
- Contact form UI with validation
- Backend API for menu, offers, demo orders, and contact messages
- Local JSON demo storage

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js backend
- Local JSON file storage

## Backend Routes

- `GET /api/health`
- `GET /api/menu`
- `GET /api/menu?category=Breakfast`
- `GET /api/offers`
- `GET /api/orders`
- `GET /api/orders/:orderId`
- `POST /api/orders/whatsapp`
- `POST /api/contact`

## Run Backend

```bash
npm start
```

The backend runs on port `4000` by default.

## Backend Storage

Demo orders and contact messages are saved in local JSON files inside the `data` folder. This keeps the project free and easy to review on GitHub.

## Production Upgrade Ideas

- Replace local JSON with Supabase or PostgreSQL
- Add real admin login
- Add restaurant owner order dashboard
- Add real WhatsApp Business API integration
- Add email notifications
- Add payment gateway

