# Env Banner — Claude Code Instructions

## Project Overview

Lightweight, SSR-safe React component for displaying environment banners. Identifies development, staging, and preview environments at a glance. Zero dependencies, fully typed.

**Package:** `@creo/env-banner` (TypeScript, published to npm)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Component | React (SSR-safe, no client hooks) |
| Build | TypeScript compiler |
| Testing | Vitest |
| Linting | ESLint (`@creo-team/eslint-config`) |
| Styling | Inline styles (zero dependencies) |

## Key Conventions

- **Never nest** — early returns, flat code. If you're indenting more than once, refactor
- **No narration comments** — code speaks for itself. Only comment non-obvious intent or trade-offs
- **SSR-safe** — no `useEffect`, `useState`, or browser APIs in the component
- **Zero dependencies** — pure React with inline styles
- **Simple over clever** — readable beats terse
- **TypeScript only** — no `.js`/`.jsx` in application code. Strict mode enabled
- **Turbopack** — use `--turbopack` flag for Next.js dev and build (where applicable)
- **Latest stable versions** — stay current with Next.js, React, and dependencies. Adopt new features early
- **Skeleton loading** — every async boundary needs a loading state. Use `loading.tsx`, `Suspense` fallbacks, and skeleton UI. No blank screens
- **Verb-driven function names** — prefer `get`, `remove`, `create`, `list`, `put`, `update` over `fetch`, `delete`, `post`
- **Types in dedicated files** — interfaces, enums, and types live in `types.ts`
- **Named imports** — prefer `{ thing } from 'thing'` over `import *`. Never use `import *` when named imports exist
- **Named exports** — prefer named exports over `export default`. Exception: framework-convention files where default is required
- **Defensive guards** — double-check assumptions with `if` checks and logging before proceeding
- Functions under 50 lines — if it's longer, extract
- No `any` — use proper TypeScript types
- Version bumps — increment `package.json` version with every commit. Patch for fixes, minor for features, major for breaking changes
- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`

### Documentation Standards

- **Concise docs** — markdown files should be scannable, not walls of text. Link to code rather than duplicating it. State tenets, not tutorials
- **Single source of truth** — every fact lives in one place. Don't repeat info across README, CLAUDE.md, and AGENTS.md — reference it
- **Inline links liberally** — link to files, other docs, and sections. README opens with what it is and how to use it; details come after

## File Structure

```
src/
├── index.ts           # Component and exports
└── test/
    └── setup.ts       # Vitest setup
examples/
└── standalone/        # Next.js example app
```

## Release Flow

1. Bump `version` in `package.json`, push to `main`
2. `github-release.yaml` creates tag + GitHub Release (uses `GH_PAT`)
3. `release: created` triggers `npm-publish.yaml` → publishes to npm

## Verification

```bash
npm test
npm run build
```
