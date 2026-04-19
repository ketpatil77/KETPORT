# KETPORT

Professional portfolio website for Ketan Patil, focused on full-stack product engineering, AI systems integration, secure platform delivery, and production-grade user experiences.

## Overview

KETPORT is a React and Vite-based portfolio application built to present professional work with a polished interface, strong motion design, and clear technical positioning. The site highlights project case studies, engineering services, technical stack, experience, and contact pathways in a format suitable for recruiters, collaborators, and hiring teams.

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
