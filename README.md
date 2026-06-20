# KETPORT

Professional portfolio platform for Ketan Patil. Built to present engineering work, research, services, and product thinking through fast, modern frontend delivery.

## Live Surface

- Portfolio: [ketpatil77.github.io](https://ketpatil77.github.io)
- GitHub Profile: [github.com/ketpatil77](https://github.com/ketpatil77)
- Resume: [KET-RESUME-NEW.pdf](https://ketpatil77.github.io/resume/KET-RESUME-NEW.pdf?v=20260620)

## What This Project Does

- Presents flagship work, research, experience, and technical depth in one polished site.
- Ships smooth motion, premium UI treatment, and responsive layouts across desktop and mobile.
- Includes contact paths, downloadable resume, publication section, and curated project storytelling.
- Acts as public proof layer for profile, hiring, networking, and client conversations.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Motion-focused UI components

## Workspace Layout

This repository uses root workspace scripts and an app subproject:

```text
port/
  app/        # actual Vite frontend
  README.md   # repo overview
  package.json
```

## Local Development

Requirements:

- Node.js `20.x`
- npm

Install:

```bash
npm run install:app
```

Start development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Quality Bar

- Responsive on mobile and desktop
- Resume link must resolve to current PDF
- Project copy must stay evidence-first, not buzzword-first
- No stale placeholder content

## Notes

- Main frontend source lives under `app/`
- Root scripts proxy into `app/`
- Public resume asset lives under `app/public/resume/`
