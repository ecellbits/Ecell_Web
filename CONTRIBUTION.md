# Contributing

## Set up the repository

Install Node.js and the pnpm version in the root `package.json`. Run `pnpm install` at the repository root. Use `pnpm dev` for the marketing site or `pnpm dev:internship-drive` for the internship portal. The portal requires additional environment and database setup described in its README.

## Make a change

1. Create a branch for your change.
2. Edit the app or shared package that owns the behavior. Keep credentials and `.env.local` files out of Git.
3. Run the relevant app locally and check the affected pages or flows. Run `pnpm --filter @ecell/marketing build` for marketing changes or `pnpm --filter internship-drive build` for portal changes.
4. Review `git diff` and open a pull request. Describe the change, how you checked it, and any setup or deployment changes. Include screenshots or a recording for visual changes when useful.

If you change a shared package, check each app that uses it. Document any new environment variables without committing their values.
