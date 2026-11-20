# Berkah Media Gemilang (BMG) Website

Company profile site for **Berkah Media Gemilang (BMG)**, an event planning agency and creative partner based in Bandung, Indonesia. The site is trilingual (Indonesian, English, Chinese) and deployed to GitHub Pages.

## Tech stack

- **React 19** with **React Router 7** for routing
- **Vite 8** for dev and build, with Rolldown vendor chunk splitting
- **Tailwind CSS 4** for styling, plus a hand-written stylesheet layer under `src/assets/css/`
- **VitePress 1.6** for documentation
- **Oxlint** for linting

Runtime libraries: `motion`, `lucide-react`, `simple-icons`, `react-phone-number-input`, `react-countup`, `react-fast-marquee`.

## Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run preview      # preview the build
npm run lint         # lint with oxlint

npm run docs:dev     # docs dev server
npm run docs:build   # build docs
npm run docs:preview # preview docs
```

`tunnel` wraps the dev server in ngrok. The Vite config already allows `*.ngrok-free.app`, `*.ngrok.app`, `*.ngrok.dev`, and `*.ngrok.io` hosts; add your own reserved domain to `allowedHosts` in `vite.config.js` if needed.

## Project layout

```
src/
├── app/router.jsx      # createBrowserRouter + lazy routes
├── assets/css/         # design tokens, base, and per-domain component styles
├── components/         # shared UI: header, footer, logo, stepper
├── data/               # services and events catalogues
├── i18n/               # LanguageProvider, useStrings, locale/id|en|zh
├── layouts/            # MainLayout (header, footer, scroll reset)
├── pages/              # one file per route
└── index.css           # Tailwind entry, imports every stylesheet
```

Each page is a lazy route, so it ships as its own chunk and is fetched only when a visitor lands on that URL.

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about-us` | About Us |
| `/about-us/our-team` | Our Team |
| `/services` | Services |
| `/services/:slug` | Service detail |
| `/event` | Event archive |
| `/event/:slug` | Event detail |
| `/contact` | Contact |
| `/privacy` | Privacy policy |
| `/terms` | Terms and conditions |
| `/help` | Help centre |
| `/faq` | FAQ |
| `*` | Not found |

`/portfolio` redirects to `/event`.

## Internationalisation

Three locales live in `src/i18n/locale/`: `id`, `en`, `zh`. The active language is kept in `LanguageProvider` and persisted under the `bmg-language` key in `localStorage`. Pages pull their own bundle through `useStrings`, so strings land in the page chunk rather than the entry bundle.

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` builds and deploys on every push to `main`, and can also be run manually from **Actions → Deploy to GitHub Pages → Run workflow**.

The base path is derived from the repository name at build time:

- a repository whose name ends in `.github.io` is served from `/`
- any other repository is served from `/<repo>/`

The current remote is `berkahmediagemilang/berkahmediagemilang.github.io`, so the site builds with `BASE_PATH=/` and is served at `https://berkahmediagemilang.github.io/`.

Pages needs to be enabled once: **Settings → Pages → Source: GitHub Actions**.

Deep links such as `/about-us` keep working because the workflow copies `dist/index.html` to `dist/404.html`, which GitHub Pages serves for unknown paths as an SPA fallback.

## Documentation

Docs live in `docs/` and are split into Indonesian (root) and English (`docs/en/`). Build and preview with:

```bash
npm run docs:dev
```

Docs are not part of the production build; the deploy workflow only builds the site.

## Notes

- `dist/`, `docs/.vitepress/cache`, and `docs/.vitepress/dist` are gitignored build output.
- Installed agent skills under `.agents/` are managed read-only by the Skills CLI; `skills-lock.json` pins their sources for reinstall.
- See `AGENTS.md` for project conventions.
- `docs/` still documents the pre-redesign structure in places (for example `docs/architecture.md` describes manual routing). Treat it as a work in progress rather than the source of truth.