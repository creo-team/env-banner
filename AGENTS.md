# Agent Instructions

Instructions for AI coding agents working in this codebase. For full context, see [CLAUDE.md](CLAUDE.md).

## Project

**@creo/env-banner** — SSR-safe React component for environment banners. Zero dependencies, TypeScript, inline styles. Published to npm.

## Core Rules

- **Never nest** — early returns, flat code
- **No narration comments** — only comment non-obvious intent or trade-offs
- **SSR-safe** — no client hooks or browser APIs
- **Zero dependencies** — pure React with inline styles
- **Simple over clever** — readable beats terse
- **TypeScript only** — no `.js`/`.jsx` in application code. Strict mode enabled
- **Turbopack** — use `--turbopack` flag for Next.js dev and build (where applicable)
- **Latest stable versions** — stay current with Next.js, React, and dependencies. Adopt new features early
- **Skeleton loading** — every async boundary needs a loading state. Use `loading.tsx`, `Suspense` fallbacks, and skeleton UI. No blank screens
- **Verb-driven names** — `get`, `remove`, `create`, `list` over `fetch`, `delete`, `post`
- **Types in `types.ts`** — never scatter type definitions across implementation files
- **Defensive guards** — verify assumptions with `if` checks and logging
- No `any` — use proper TypeScript types
- Version bumps — increment `package.json` version with every push to `main`. Feature branches: one bump before merge
- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`

## Commands

```bash
npm test             # Vitest
npm run build        # TypeScript compile
npm run lint         # ESLint
```

## Verification

```bash
npm test
npm run build
```
