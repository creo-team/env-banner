# Agent Instructions

Instructions for AI coding agents working in this codebase. For full context, see [CLAUDE.md](CLAUDE.md).

## Project

**@creo/env-banner** — SSR-safe React component for environment banners. Zero dependencies, TypeScript, inline styles. Published to npm.

## Core Rules

- **SSR-safe** — no client hooks or browser APIs
- **Zero dependencies** — pure React with inline styles
- No `any` — use proper TypeScript types
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
