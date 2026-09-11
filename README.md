# KETPORT

A professional portfolio website for Ketan Patil, focused on presenting engineering projects, research, services, and product work through a fast, responsive frontend.

## Live Links

- Portfolio: <https://ketpatil77.github.io>
- GitHub: <https://github.com/ketpatil77>
- Resume: <https://ketpatil77.github.io/resume/KET-RESUME-NEW.pdf>

## Overview

KETPORT brings projects, experience, publications, contact information, and a downloadable resume into one public-facing portfolio. The site emphasizes responsive layouts, clear project storytelling, and lightweight frontend delivery.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Motion-focused UI components

## Repository Layout

```text
KETPORT/
├── app/         # Vite frontend application
├── docs/        # Project documentation
├── README.md    # Repository overview
└── package.json # Root workspace scripts
```

## Local Development

### Requirements

- Node.js 20.x
- npm

### Install dependencies

```bash
npm run install:app
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Content Quality Guidelines

- Keep project descriptions factual and evidence-based.
- Remove stale placeholders before publishing.
- Keep resume links synchronized with the current published resume.
- Verify responsive behavior on mobile and desktop before release.

## Documentation

- [Architecture overview](docs/architecture.md)

## Notes

The main frontend source is under `app/`. Root-level scripts provide the primary developer commands, while public assets and the published resume are maintained inside the frontend application.
