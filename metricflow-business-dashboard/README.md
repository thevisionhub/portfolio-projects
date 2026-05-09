# MetricFlow - Sales Dashboard UI

MetricFlow is a responsive business analytics dashboard built for companies that need a clean interface to track revenue, orders, customers, and growth.

## Project Overview

MetricFlow includes sidebar navigation, revenue stats, order analytics, sales charts, category charts, recent orders, top customer data, search/filter functionality, responsive layout, and dark mode.

## Problem

Businesses need dashboards that make important metrics easy to understand. Many dashboards are visually messy, too complex, or not responsive enough for modern business teams.

## Solution

I designed and built a premium admin dashboard UI focused on readability, clear hierarchy, reusable components, practical sample data, and responsive dashboard behavior.

## Features

- Responsive dashboard layout
- Working sidebar navigation
- Top search with suggestions
- Date range filter with changing metrics and chart data
- Revenue, orders, customers, and growth stats
- Sales performance area chart
- Category revenue chart
- Recent orders table
- Customer list
- Search and filter functionality
- Dark mode support
- Profile modal and logout demo flow
- Tablet and desktop responsive design
- Mobile drawer sidebar
- Backend demo API

## Tech Stack

- React
- Tailwind CSS
- Recharts
- JavaScript
- Vite
- Node.js backend demo
- Local JSON file storage

## Backend Routes

- `GET /api/health`
- `GET /api/metrics?range=Today`
- `GET /api/sales?range=Last%207%20days`
- `GET /api/categories?range=Last%2030%20days`
- `GET /api/orders`
- `GET /api/orders?search=emily&status=Completed&category=Sneakers`
- `POST /api/orders/:id/status`
- `GET /api/customers`
- `GET /api/search?q=emily`
- `GET /api/settings`
- `POST /api/settings`
- `GET /api/activity`
- `POST /api/auth/logout`
- `GET /api/reports/summary`

## Run Backend

```bash
npm run backend
```

The backend demo runs on port `4400`.

Orders, settings, and admin activity are saved in local JSON files inside the `data` folder.

## Purpose

This project demonstrates a professional dashboard UI that can be adapted for e-commerce businesses, SaaS platforms, CRM systems, sales teams, and internal admin panels.

## Future Improvements

- Authentication
- Real backend API
- Export reports
- Advanced filters
- User roles
- Notifications
- Real-time analytics
- Supabase or PostgreSQL storage
