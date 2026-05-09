# Free Full-Stack Deployment Guide

This guide explains how to publish the five portfolio projects with visible code, live frontend URLs, and deployable backend APIs while keeping the cost at zero.

## Best Free Setup

Use this setup first:

- GitHub for public source code
- GitHub Pages for static frontend demos
- Render Free or Koyeb Free for one or more Node.js backend APIs
- Local JSON storage for demo persistence
- Supabase Free later if you want a real hosted database

This is the best path for a low-budget freelance portfolio because clients can see both the live website and the backend code.

## Your Current Projects

Each project now has a deployable `backend.js` file:

- `SpiceHub/backend.js`
- `taskflow-saas-landing-page/backend.js`
- `devfolio-pro/backend.js`
- `sneakvault-mini-ecommerce/backend.js`
- `metricflow-business-dashboard/backend.js`

Each backend can run with:

```bash
npm start
```

The backends use Node.js and local JSON files, so they do not need paid packages, paid databases, or paid servers for the portfolio version.

## Free Frontend Hosting

Good free choices:

- GitHub Pages: best for simple HTML/CSS/JS projects and public portfolio URLs.
- Vercel: good for React/Vite frontend projects.
- Netlify: simple static site deploys and form-friendly workflows.
- Cloudflare Pages: fast static hosting with a generous free tier.

Recommended now:

```text
GitHub Pages for the frontend
```

## Free Backend Hosting

Good free choices:

- Render Free Web Service: can run Node.js backends. Free services have limits and should not be treated as production hosting.
- Koyeb Free Instance: can run a web service for free with limits.
- Cloudflare Workers: good for serverless APIs, but the backend needs to be converted from Node server style to Worker style.
- Supabase Free: good for database, auth, and storage when you are ready to replace local JSON files.

Recommended now:

```text
Deploy only 1 or 2 backend APIs first.
```

Deploying all five separately is possible on some free tiers, but it can become harder to maintain. For freelance proof, one strong backend like SneakVault or MetricFlow is enough to show full-stack ability.

## Best Project To Deploy As Full-Stack First

Start with:

```text
SneakVault Mini E-commerce
```

Reason:

- Product API
- Product details API
- Cart checkout validation
- WhatsApp order generation
- Newsletter API
- Stored demo orders

Then deploy:

```text
MetricFlow Business Dashboard
```

Reason:

- Metrics API
- Search API
- Order filters
- Settings API
- Logout API
- Activity log

These two look strongest for freelancing.

## How To Deploy A Backend For Free

Example for Render:

1. Push the project to GitHub.
2. Open Render.
3. Create a new Web Service.
4. Connect your GitHub repository.
5. Set the root directory to the project folder, for example:

```text
sneakvault-mini-ecommerce
```

6. Set the start command:

```bash
npm start
```

7. Deploy.

Render will provide a backend URL like:

```text
https://your-project-name.onrender.com
```

Then test:

```text
https://your-project-name.onrender.com/api/health
```

## Important Note About Local JSON Storage

Local JSON storage is excellent for portfolio code because it is free and easy to understand.

For real client production, use a real database:

- Supabase PostgreSQL
- Neon PostgreSQL
- Render PostgreSQL
- MongoDB Atlas

Local JSON files may reset on some free hosts because free hosting filesystems can be temporary. That is fine for a demo, but not for a real client project.

## How To Describe These Projects Honestly

Use this wording:

```text
Full-stack portfolio project with a live frontend, deployable Node.js backend API, demo validation, and local JSON storage. The backend can be upgraded to Supabase, PostgreSQL, or MongoDB for production.
```

Avoid saying:

```text
Production-ready full-stack app with real database and authentication.
```

That would be too much unless you actually connect a hosted database, auth, and production security.

## Free Upgrade Path

Step 1:

```text
GitHub Pages frontend + backend code visible on GitHub
```

Step 2:

```text
Deploy one backend on Render or Koyeb
```

Step 3:

```text
Connect Supabase Free for real database tables
```

Step 4:

```text
Add auth only to dashboard or e-commerce admin
```

Step 5:

```text
Buy a custom domain later when budget allows
```

## Suggested Portfolio Label

Add this to each project card:

```text
Live Demo | Source Code | Backend API Included
```

For the backend API link, use:

```text
/api/health
```

For example:

```text
https://your-backend.onrender.com/api/health
```

## Free Services To Check

- GitHub Pages: https://docs.github.com/en/pages
- Render Free: https://render.com/docs/free
- Koyeb Free Instance: https://www.koyeb.com/docs/reference/instances
- Supabase Free: https://supabase.com/pricing
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com/

