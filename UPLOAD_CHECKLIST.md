# Upload Checklist

Use this checklist to publish the portfolio correctly.

## 1. Create A GitHub Repository

Suggested repository name:

```text
portfolio-projects
```

Make it public so clients can view the code.

## 2. Push This Folder To GitHub

Run these commands from this folder:

```bash
git init
git add .
git commit -m "Add full-stack portfolio projects"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-projects.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## 3. Enable GitHub Pages

In GitHub:

```text
Repository > Settings > Pages
```

Use:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

After GitHub builds the site, your main portfolio URL will look like:

```text
https://YOUR_USERNAME.github.io/portfolio-projects/
```

## 4. Test All Frontend Links

Open the main portfolio URL and test:

- SpiceHub
- TaskFlow
- DevFolio Pro
- SneakVault
- MetricFlow

## 5. Deploy One Backend First

Recommended first backend:

```text
sneakvault-mini-ecommerce
```

Why:

- Product API
- Cart order validation
- WhatsApp checkout API
- Newsletter API
- Strong freelance value

Deploy it on Render or Koyeb with:

```text
Root Directory: sneakvault-mini-ecommerce
Start Command: npm start
```

Test:

```text
https://YOUR_BACKEND_URL/api/health
```

## 6. Best Client Presentation

For each project card in your personal portfolio, show:

- Live Demo
- View Code
- Backend API Included
- Tech Stack
- Problem
- Solution
- Result

## 7. Honest Full-Stack Wording

Use this wording:

```text
Full-stack portfolio project with responsive frontend, deployable Node.js backend API, validation, demo storage, and production upgrade path.
```

Avoid saying:

```text
Production-ready app with real database and authentication.
```

unless you connect a real database, authentication, and production security.

