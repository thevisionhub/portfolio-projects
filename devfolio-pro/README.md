# DevFolio Pro - Personal Portfolio Website

DevFolio Pro is a modern and responsive personal portfolio website template built for developers, students, freelancers, designers, video editors, and digital creators.

## Project Overview

DevFolio Pro helps users showcase their skills, projects, resume, articles, and contact information in a professional way. It is designed as a reusable template that can be adapted for different professions.

## Problem

Many beginners and freelancers have skills and projects, but they struggle to present them clearly to clients, recruiters, or collaborators.

## Solution

This project provides a clean portfolio template with a strong hero section, about section, skill badges, project cards, resume actions, blog cards, contact form, dark mode, and backend demo API.

## Features

- Responsive hero section
- About section
- Developer, designer, and video editor versions
- Skills and tools badges
- Project showcase cards
- Project category filter
- Project search
- Resume view and download buttons
- Contact form UI with validation
- Optional blog/articles section
- Dark mode toggle
- Smooth scroll navigation
- Active navbar highlight
- Back-to-top button
- Mobile-friendly layout
- Backend demo API

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js backend demo
- Local JSON file storage

## Backend Routes

- `GET /api/health`
- `GET /api/profile`
- `GET /api/skills`
- `GET /api/skills?category=developer`
- `GET /api/versions`
- `GET /api/projects`
- `GET /api/projects?category=web`
- `GET /api/articles`
- `POST /api/contact`

## Run Backend

```bash
npm start
```

The backend demo runs on port `4200`.

Contact messages are validated and saved in local JSON files inside the `data` folder.

## Suitable For

- Developers
- Students
- Freelancers
- UI/UX designers
- Graphic designers
- Video editors
- Content creators
- Digital marketers

## Result

The final template gives students, freelancers, developers, designers, and creators a professional portfolio website that can be customized quickly and used for job applications, freelance work, internships, and personal branding.

## Future Improvements

- React version
- Tailwind CSS version
- Framer Motion animations
- CMS/blog integration
- Email form integration
- Multiple template themes
- PDF resume upload
- Supabase or PostgreSQL database
