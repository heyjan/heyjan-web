# heyjan-web

Personal website of Jan Mayer, built with [Nuxt 4](https://nuxt.com).

## Tech stack

- **[Nuxt 4](https://nuxt.com)** (Vue 3, Nitro) with hybrid rendering — SEO-critical
  pages are prerendered, the app/auth areas are client-rendered.
- **[Nuxt Content](https://content.nuxt.com)** for the blog and case studies.
- **[Tailwind CSS 4](https://tailwindcss.com)** via `@tailwindcss/vite`.
- **[@nuxtjs/seo](https://nuxtseo.com)** (sitemap, robots, schema.org, OG images,
  link checking).
- **[@nuxt/image](https://image.nuxt.com)**, **[@nuxt/fonts](https://fonts.nuxt.com)**,
  **[@nuxt/scripts](https://scripts.nuxt.com)**, **GSAP** (`v-gsap-nuxt`).
- **SQLite/MySQL** (`better-sqlite3`, `mysql2`) with `bcrypt` auth.
- **[Playwright](https://playwright.dev)** for end-to-end tests.

## Requirements

- **Node** 24.13.0 (see `engines` in `package.json`)
- **pnpm** — this project uses pnpm (pinned via `packageManager`). Enable it with:
  ```bash
  corepack enable pnpm
  ```

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build (runs build-time link checking) |
| `pnpm preview` / `pnpm start` | Run the built server |
| `pnpm generate` | Static site generation |
| `pnpm lint` / `pnpm lint:fix` | Lint (and auto-fix) with ESLint |
| `pnpm test:e2e` | Run Playwright end-to-end tests |

## Tooling

This project uses pnpm, ESLint, Husky, and build-time link checking. The full
setup and the pnpm 11.9 gotchas are documented in
[`docs/pnpm-eslint-husky-migration.md`](docs/pnpm-eslint-husky-migration.md).

### Package management — pnpm

pnpm is pinned in `package.json` (`packageManager`). Native build scripts
(`bcrypt`, `better-sqlite3`, `sharp`, …) are approved in `pnpm-workspace.yaml`
so they compile on a clean install. Transitive `tar` is pinned to a patched
release via `overrides` to clear known advisories.

### Linting — ESLint

Flat config via the [`@nuxt/eslint`](https://eslint.nuxt.com) module. The
generated config (`.nuxt/eslint.config.mjs`) is consumed by `eslint.config.mjs`
and also carries the link-checker rules (below).

```bash
pnpm lint
```

### Git hooks — Husky

A `pre-commit` hook runs a security audit before every commit:

```sh
pnpm audit --audit-level critical
```

It blocks commits only on **critical** advisories, so unfixable transitive
lower-severity issues don't make the repo uncommittable. Hooks install
automatically after `pnpm install` via the `prepare` script.

### Link checking

Broken internal-link detection powered by
[nuxt-link-checker](https://nuxtseo.com/link-checker) (bundled with
`@nuxtjs/seo`), configured in `nuxt.config.ts` under `linkChecker`:

- **Build time** — `pnpm build` crawls prerendered routes and reports broken
  links (`runOnBuild`).
- **ESLint** — `link-checker/valid-route` (error) and
  `link-checker/valid-sitemap-link` (warning) flag links in `.vue`/`.ts`/`.md`
  that don't match a known route or the sitemap. Rules read the route list
  Nuxt writes to `.nuxt/link-checker/routes.json`, so run `pnpm dev` or
  `nuxi prepare` first to populate it.
- **DevTools** — a "Link Checker" tab in Nuxt DevTools shows live inspections
  in development.

> Note: `nuxt-link-checker` is registered explicitly in `nuxt.config.ts`
> `modules` (before `@nuxt/eslint`). It also ships inside `@nuxtjs/seo`, but the
> explicit registration is required so it sets up early enough to hook route
> resolution and inject its ESLint rules.
