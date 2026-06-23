# Architecture Overview

## Purpose

KETPORT is the public portfolio layer for Ketan Patil. It turns project work, research, services, and resume material into a fast, polished frontend experience.

## System Shape

```text
User
  -> React/Vite application
  -> routed sections and motion components
  -> static assets, resume PDF, project copy
  -> deployed portfolio surface
```

## Frontend Layers

- `app/`: Vite application source and public assets.
- UI sections: portfolio, research, services, contact, and resume presentation.
- Motion layer: animation and interaction patterns used to create a premium feel.
- Public assets: resume PDF and supporting media.

## Design Goals

- Fast load and smooth interaction on desktop and mobile.
- Evidence-first project storytelling.
- Clear paths to resume, LinkedIn, GitHub, and contact.
- Maintainable copy and project sections for frequent updates.

## Operational Notes

- Root scripts proxy into the app workspace.
- Resume links should be checked after every resume asset update.
- Profile content should stay factual, concise, and tied to visible work.
