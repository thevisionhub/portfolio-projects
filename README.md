# SneakVault - Mini E-commerce Store

SneakVault is a modern mini e-commerce website built for sneaker stores and small product businesses. It includes product listing, filters, product details, cart functionality, checkout form UI, and WhatsApp checkout.

## Project Overview

SneakVault is a responsive mini e-commerce store built for sneaker brands and small product businesses. It includes product listing, search and filters, product details, cart functionality, checkout form UI, and WhatsApp order integration.

## Problem

Small businesses often want to sell products online but do not need a complex e-commerce platform with payment gateways, user accounts, and backend systems. They need a simple, affordable, and professional store that allows customers to browse products and place orders easily.

## Solution

This project lets customers browse sneakers, filter products, view details, select sizes, add items to cart, fill a checkout form, and generate a complete WhatsApp order summary.

## Features

- Responsive product listing
- 10 sneaker products
- Local brand-free product photos
- Product search
- Category filter
- Price filter
- Product sorting
- Product details modal
- Size selection
- Add to cart
- Remove from cart
- Update quantity
- Cart saved in localStorage
- Checkout form UI
- WhatsApp order summary
- Premium dark UI
- Featured collection
- Trust badges
- Size guide
- FAQ section
- Newsletter UI
- Mobile-friendly design
- Backend demo API

## Tech Stack

Current demo:

- HTML
- CSS
- JavaScript
- Node.js backend demo
- Local JSON file storage

Recommended production upgrade:

- React
- Tailwind CSS
- JavaScript
- Vite

## Backend Routes

Live API demo:

- `https://sneakvault-backend-uu6b.onrender.com/api/health`

Routes:

- `GET /api/health`
- `GET /api/products`
- `GET /api/products?category=Running&price=80-120&sort=low-high`
- `GET /api/products/:id`
- `GET /api/orders`
- `GET /api/orders/:id`
- `POST /api/orders/whatsapp`
- `GET /api/newsletter`
- `POST /api/newsletter`

## Run Backend

```bash
npm start
```

The backend demo runs on port `4300`.

Demo orders and newsletter subscribers are validated and saved in local JSON files inside the `data` folder.

The hosted GitHub Pages frontend is connected to the Render backend URL in `script.js` through `API_BASE_URL`.

## Purpose

This project is designed for small businesses that want a simple online store without building a complex backend or payment gateway system.

## Future Improvements

- React version
- Tailwind CSS version
- Payment gateway integration
- Admin dashboard
- Inventory management
- User accounts
- Wishlist
- Order tracking
- Backend database
- Supabase or PostgreSQL storage
