# Marketing site

The E-Cell and Launchpad website uses React, TanStack Start, Vite, and Tailwind CSS 4.

From the repository root:

```sh
pnpm install
pnpm --filter @ecell/marketing dev
pnpm --filter @ecell/marketing build
```

The dev server defaults to http://localhost:3000. The production build is written to `dist/`. The deployable SPA files are in `dist/client/`, including the TanStack Start shell at `_shell.html`.

Routes live in `src/routes/`; TanStack generates `src/routeTree.gen.ts`. Page components live in `src/components/`, and imported media lives in `src/assets/`. Files in `public/` are served by URL.

Use Tailwind utilities for component styling. `src/index.css` contains shared theme tokens, font loading, base styles, reduced-motion rules, and shared keyframes. Runtime measurements, pointer positions, and animation values can use inline styles or CSS custom properties. Use refs and data attributes for animation targets rather than styling classes.

Keep asset backups and one-off conversion output outside the repository. Before deleting assets, check static and dynamic imports, CSS URLs, and public URL references.

## Component organization

Use lowercase, kebab-case feature directories and PascalCase `.tsx` component filenames. Give page components a `Page` suffix and use descriptive names instead of abbreviations. Non-component data modules use lowercase names, such as `magazine/data.ts`.

- `common/`: reusable visuals, loading, navigation scroll handling, error handling, and SEO.
- `layout/`: shared navigation, menu, and footer.
- `home/`, `contact/`, `gallery/`, `magazine/`, `programs/`, `startup-connect/`, `team/`: E-Cell features and pages.
- `launchpad/`: Launchpad utilities and pages, with `home/`, `events/`, `passes/`, `payments/`, `speakers/`, `sponsors/`, and `team/` subdirectories.

Keep direct relative imports within a component folder. Use `@/components/...` across features and `@/assets/...` for imported media. Keep route filenames in `src/routes/` under TanStack Router's file-routing conventions.

## Vercel deployment

Link this working directory with the Vercel CLI, without a Git repository connection. Set the Vercel project's Root Directory to `apps/marketing` and enable files outside the Root Directory so workspace packages are available. Run `vercel --prod` from the repository root after linking it.

The marketing `vercel.json` builds only `@ecell/marketing` and publishes `dist/client/`. Files are served before the fallback to `/_shell.html`, so deep links work without intercepting assets. This deploys the app's existing SPA mode; no server functions are used.

For local/prebuilt deployment, run the marketing build, copy `dist/client/` into `.vercel/output/static/`, and create a Build Output API `config.json` that serves the filesystem before falling back to `/_shell.html`. Deploy it with `vercel --prebuilt --prod` from the linked repository root. This allows local build environment variables to be used without uploading `.env.local`.

The blog (`/blog`), Founder’s First program (`/startup-mentorship`), and application (`/mentor-connect`) are adapted from the published E-Cell website. The application uses the existing `mentorship_applications` Supabase table and its original column contract. Set valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` build variables; do not commit local environment files.

Scrolling uses browser-native wheel, touch, and keyboard behavior. `NavigationScroll` resets only before a pathname navigation. Content does not wait for viewport entrance animations; optional historical content and event recaps use disclosure controls.
