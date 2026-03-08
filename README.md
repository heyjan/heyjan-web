---
title: NuxtJS
description: A basic NuxtJS app
tags:
  - nuxt
  - typescript
---

# NuxtJS Example

This example starts a basic [NuxtJS](https://nuxtjs.org/) app.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/lQQgLR)

## ✨ Features

- NuxtJS
- TypeScript

## 💁‍♀️ How to use

- Click the Railway button to deploy the app
- Clone the project and connect to it using `railway link`
- Run your NuxtJS app locally using `railway run yarn dev`

## Local devcontainer with Podman

This repo now includes a Podman-friendly devcontainer stack in [`.devcontainer/devcontainer.json`](/var/home/heyjan/projects/heyjan-web/.devcontainer/devcontainer.json) and [`.devcontainer/docker-compose.yml`](/var/home/heyjan/projects/heyjan-web/.devcontainer/docker-compose.yml).

What it does:

- Runs the app and MySQL in isolated containers
- Keeps `node_modules`, `.nuxt`, and Nuxt Content's local DB inside named volumes so native modules are rebuilt inside the container instead of leaking from the host
- Bootstraps the MySQL schema from [`.devcontainer/mysql/init/01-schema.sql`](/var/home/heyjan/projects/heyjan-web/.devcontainer/mysql/init/01-schema.sql)
- Supports both plain `podman compose up` and devcontainer attach workflows

Standalone Podman flow:

1. Run `podman compose -f .devcontainer/docker-compose.yml down -v` the first time if you want a clean DB.
2. Run `podman compose -f .devcontainer/docker-compose.yml up --build`.
3. Open `http://localhost:3000`.

Expected local flow:

1. Start your Podman socket on the host.
2. Open the folder in a devcontainer using Podman as the container engine.
3. Let `postCreateCommand` finish `npm ci` and Playwright browser installation.
4. Inside the container, run `npm run dev`.
5. Open the forwarded app on port `3000`.

Notes:

- Registration currently requires the token hardcoded in [`server/api/auth/register.post.ts`](/var/home/heyjan/projects/heyjan-web/server/api/auth/register.post.ts).
- Contact form delivery still needs `RESEND_API_KEY`. Turnstile validation is skipped when `TURNSTILE_SECRET_KEY` is unset.
- If you need a clean database reset, remove the `mysql-data` volume before rebuilding the container.
- The devcontainer seeds a demo account automatically via `npm run seed:dev`: `demo@heyjan.local` / `demo12345`.
