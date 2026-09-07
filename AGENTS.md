<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in the
> editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Base44 Dev Environment

This is a **TanStack Start** (React 19) + **Vite 8** SSR app, originally built with Lovable.
It uses the `@lovable.dev/vite-tanstack-config` meta-framework plugin which bundles
TanStack Start, React, Tailwind CSS, Nitro, and sandbox detection.

### Stack
- **Runtime**: Node 22 (via `docker-compose.base44.yml`)
- **Package manager**: npm (no lockfile is committed; `npm install` runs on container start)
- **Dev server**: `vite dev` (TanStack Start dev mode with SSR + HMR)
- **Port**: 3000 (mapped to host)
- **No database, no external secrets** — the app calls public Roblox REST APIs
  (`users.roblox.com`, `thumbnails.roblox.com`) from server functions and stores
  user settings in `localStorage`.

### Running
```sh
docker compose -f docker-compose.base44.yml up -d
```
Deps install automatically on first boot (~60s). Vite dev server binds `0.0.0.0:3000`
and accepts the preview origin via `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`.

### Routes
- `/` — Blox Hub mobile game feed (home)
- `/robux` — Robux purchase page

### Verifying it works
```sh
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/  # expect 200
```
