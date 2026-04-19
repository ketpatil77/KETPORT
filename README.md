# KETPORT

Professional portfolio website for Ketan Patil, built to present full-stack engineering, AI systems work, secure platform delivery, and production-grade user experience design.

## Overview

KETPORT is a React and Vite-based portfolio application designed as a polished recruiter-facing and collaborator-facing presentation layer for projects, services, technical depth, and engineering identity. The project emphasizes clear content structure, refined motion systems, modern frontend architecture, and deployable production hosting.

## Why This Project Exists

A portfolio should do more than list technologies. KETPORT was built to communicate technical credibility, product taste, and implementation discipline through a real application rather than a static profile page. It serves as a central professional surface for showcasing project case studies, engineering capabilities, and contact pathways.

## Key Features

- Modern portfolio experience built with React, TypeScript, and Vite
- Recruiter-friendly project and experience presentation
- Motion-enhanced interface using Framer Motion
- Structured content configuration for easier iteration and maintenance
- Deployment-ready setup for production hosting on Vercel
- Clear separation of application code, assets, and configuration

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Vercel

## Project Structure

- `app/src/` application source code
- `app/public/` static assets, images, and resume files
- `app/src/config.ts` portfolio content and section configuration
- `vercel.json` deployment configuration for production hosting

## Local Development

This repository uses Node.js 20.

```bash
npm run install:app
npm run dev
npm run build
npm run preview
```

## Deployment

The project is configured for deployment on Vercel. The root workspace delegates application build and development commands to the `app/` package, and `vercel.json` provides the SPA rewrite configuration required for production hosting.

## Engineering Notes

- The root workspace keeps application commands centralized for simpler local and hosted workflows.
- Content-driven configuration makes portfolio updates easier without deep structural changes.
- The setup is intended to balance presentation quality with maintainability and deployment simplicity.

## Recommended Next Improvements

- Add screenshots or a live demo URL
- Add Lighthouse or performance notes if measured
- Add a section describing major UI/UX decisions
- Add testing and linting workflow details if available
