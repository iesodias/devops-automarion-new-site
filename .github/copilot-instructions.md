# Copilot Instructions

This is a DevOps portfolio website built with React, Vite, and Tailwind CSS. It features static site prerendering with dynamic metadata injection per project page.

## Build, Test, and Lint

**Development Server**
```bash
npm run dev
```
Starts Vite dev server with HMR on `http://localhost:5173`.

**Build for Production**
```bash
npm run build
```
Vites and prerender static routes using Puppeteer. Output goes to `dist/`.

**Lint**
```bash
npm run lint
```
Runs ESLint on all `.js` and `.jsx` files.

**Preview Build**
```bash
npm run preview
```
Serves the dist folder locally to test the production build.

## Architecture

### High-Level Structure

**Routing & Layout**
- Routes defined in `src/App.jsx` using React Router v7
- Three main routes: home (`/`), project detail (`/projeto/:slug`), and 404 page
- Layout component (`src/components/layout/Layout`) wraps all pages
- HelmetAsync provider for dynamic meta tags (title, description)

**Static Site Prerendering**
- Vite plugin in `vite.config.js` (`prerenderPlugin`) handles SSG
- Puppeteer launches browser, navigates each route, captures HTML
- Routes are defined in `prerenderRoutes` array (home + all project pages)
- For each project detail page, the plugin extracts slug, finds project data, and injects meta tags
- Output: each route gets its own `index.html` in `dist/`

**Component Organization**
- `src/components/layout/` — Layout wrapper
- `src/components/sections/` — Feature sections used across pages
- `src/components/ui/` — Reusable UI components
- `src/components/seo/` — SEO-specific components (e.g., meta tags)

**Pages**
- `Home.jsx` — Landing page with project listings
- `ProjectDetail.jsx` — Individual project details (fetches project by slug)
- `NotFound.jsx` — 404 page

**Data & Contexts**
- `src/data/projects.js` — Central project data; includes all metadata needed for listing, detail pages, and meta tags
- `src/contexts/ThemeContext.jsx` — Light/dark/system theme management with localStorage persistence
- `src/hooks/` — Custom hooks (useInView, useMediaQuery, useScrollSpy)

### Data Flow

Projects are defined once in `src/data/projects.js` and used across:
1. Home page listing
2. Prerendering (slug → lookup → meta injection)
3. Project detail page (route param `:slug` → lookup via `projects.find()`)

This single source of truth prevents metadata mismatches between routes.

## Key Conventions

### ESLint Rules
- Configured in `eslint.config.js`
- Enforces React Hooks best practices
- Allows unused variables that start with uppercase (e.g., `_Component`)
- No TypeScript; plain JavaScript/JSX

### Tailwind CSS
- Integrated via `@tailwindcss/vite` (v4.2.2)
- Imported in `src/index.css`
- Utility-first; no custom CSS components unless necessary

### Project Data Schema
Every project object in `src/data/projects.js` must have:
- `id` (unique, kebab-case)
- `slug` (URL-friendly, used in routes)
- `title` (for page title and listings)
- `description` (meta description tag)
- `shortDescription` (listing preview)
- `technologies` (tag list)
- `github` (GitHub repo link)
- `demo` (live demo link or null)
- `featured` (boolean, affects listing order)
- `highlights` (bullet-point summary)

Optional fields: `labs` (for labs-based projects with nested structure).

### Prerendering Behavior
- `prerenderRoutes` must be updated when adding new project routes
- Meta tag injection happens in `applyRouteMetadata()` function
- Routes ending with `/` resolve to `index.html`
- Fallback: non-existent routes serve `index.html` (SPA behavior)

### Theme Context
- Initialized in `src/main.jsx` as a provider
- Three modes: 'light', 'dark', 'system' (default)
- Theme preference stored in `localStorage` with key `'theme'`
- System theme falls back to `prefers-color-scheme` media query

### Custom Hooks
- `useInView` — Intersection Observer for visibility detection
- `useMediaQuery` — Responsive design helper (watches media queries)
- `useScrollSpy` — Tracks which section is in view during scroll

## Common Tasks

**Add a New Project**
1. Add entry to `src/data/projects.js` with all required fields
2. Update `projectRoutes` in `vite.config.js` automatically picks it up (based on `projects.map()`)
3. Route will prerender automatically on next build

**Update Project Details**
- Edit `src/data/projects.js`; changes reflect on home and detail pages automatically

**Add a New Page (Not Project Detail)**
1. Create `.jsx` file in `src/pages/`
2. Add route to router config in `src/App.jsx`
3. If it should be prerendered, add route path to `prerenderRoutes` in `vite.config.js`

**Styling**
- Use Tailwind utility classes in JSX
- For component-scoped styles, use Tailwind or create `.css` files in component folder
- `src/index.css` imports Tailwind and defines global styles

**Theme Support**
- Use `useTheme()` hook (from ThemeContext) in components
- Access `theme` and `setTheme('light' | 'dark' | 'system')`
- Tailwind respects `dark:` prefix; theme context updates `data-theme` attribute on `<html>`
