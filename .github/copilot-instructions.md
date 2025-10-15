## AT Store – AI Agent Guide

- **Monorepo**: Root `package.json` runs `client/` (Next.js 15, React 19, TS) and `server/` (Strapi 5, TS, PostgreSQL) via `concurrently`; husky + lint-staged configured at root.
- **Bootstrapping**: `npm run setup` installs both workspaces; `npm run dev` starts Next.js (3000) and Strapi (1337). Prod flow is `npm run build` → `npm run start`; `npm run deploy` launches both with PM2.
- **Other scripts**: `npm run seed` loads Strapi data from `seed-data.tar.gz`; `npm run lint` covers both; prefer workspace-specific script targets (`npm run client`, `npm run server`) for isolated debugging.

## Client (client/)

- **Routing & i18n**: Pages live under `src/app/[locale]/`; update `src/i18n/page-names.ts` and `src/i18n/routing.ts` together. Middleware `src/middleware.ts` injects locale + guards `PROTECTED_PREFIXES` (e.g., `/racun`).
- **Data Access**: Always call Strapi through `src/lib/fetch-api.ts`; it injects JWT cookies, distinguishes `response.data` vs `response.error`, and auto-handles FormData headers. Base URLs come from `STRAPI_BASE_URL` and `getStrapiURL()` in `src/lib/utils/utils.ts`.
- **Auth**: Server Actions in `src/app/actions.ts` set/clear the `jwt` HttpOnly cookie; `src/lib/services/get-auth-token.ts` and `get-user.ts` are the approved helpers for server components.
- **State & UI**: `src/app/providers/CartProvider` + `CartSynchronizer` keep cart in sync. Prefer server components; only mark `'use client'` where hooks or interactions are required. Dynamic Strapi content flows through `src/components/global-renderer.tsx` and the specialized renderers in `src/components/strapi/`.
- **Forms & Validation**: Zod schemas under `src/lib/schemas/` receive a translation function (`t`) for localized messages; stay away from `react-hook-form` per repo convention.
- **Styling & Media**: Tailwind tokens live in `app/globals.css` with custom breakpoint `md: 840px` and SF Pro Display font. Next Image remote patterns are in `next.config.ts`; always prefix Strapi media with `STRAPI_BASE_URL`.

## Server (server/)

- **API Modules**: Each Strapi collection under `src/api/{name}/` includes `controllers`, `services`, `routes`, `content-types`. Extend behavior with `factories.createCoreController`/`Service` (see `product/controllers/product.ts` for default inventory filtering).
- **Auth & Security**: Custom logic sits in `src/extensions/users-permissions/`; `config/plugins.ts` sets JWT lifespan and registration `allowedFields`. Ownership enforcement happens via `src/middlewares/is-owner.ts`.
- **Lifecycle Hooks & Notifications**: Email workflows (orders, complaints, jobs) are wired in `.../content-types/**/lifecycles.ts`; Nodemailer SMTP details live in `config/plugins.ts`.
- **Environment**: Database settings are in `config/database.ts` (PostgreSQL, `runMigrations: true`). Keep `APP_KEYS`, `JWT_SECRET`, `NEXT_PUBLIC_*` in sync between workspaces.

## Integration & Tooling Notes

- **Client ↔ Server**: Authenticated requests must flow through `fetchAPI`; server components often fetch metadata endpoints like `/api/products/{slug}/metadata` for SEO.
- **Payments & Third Parties**: Monri URLs provided via helpers in `src/lib/utils/utils.ts`; analytics scripts use `@next/third-parties/google`; Strapi rich text renders through `@strapi/blocks-react-renderer`.
- **UI Patterns**: Carousels share the wrapper in `src/components/ui/carousel.tsx` with Embla plugins. Shared utilities and types live in `src/lib/` (client) and `server/src/utils/`.
- **Debugging**: Diagnose API issues by checking `response.error.details` from `fetchAPI`; JWT problems typically trace back to `createJwtCookie`. Start services independently (`npm run client` / `npm run server`) when isolating bugs.
