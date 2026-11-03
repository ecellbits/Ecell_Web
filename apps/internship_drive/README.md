# E-Cell BPHC Internship Drive Portal

The Internship Drive Portal is a dedicated recruitment and matchmaking platform built for the **Launchpad** initiative by **E-Cell, BITS Pilani Hyderabad Campus**. It connects students from across India with startups and companies offering high-quality internships.

## Features

The platform is designed with three distinct role-scoped experiences:

1. **Student Portal (`/student`)**
   - Profile creation (Resume, LinkedIn, Skills).
   - Browse and filter approved internship listings.
   - One-click apply.
   - Application status tracking & interview scheduling view.
   - Real-time in-app notifications.

2. **Company Portal (`/company`)**
   - Company profile management.
   - Create and post internship listings (pending Admin approval).
   - View applicants via a dedicated funnel and data table.
   - Status tracking (Shortlist, Interview, Selected, Rejected).
   - Schedule interviews and provide feedback notes.

3. **Admin Portal (`/admin`)**
   - Dashboard statistics for the entire drive.
   - Approve/Reject company registrations and internship listings.
   - Student directory and filtering.
   - Season settings management (open/close applications).
   - Broadcast announcements to all users.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Auth, Storage, Realtime)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Emails:** [Resend](https://resend.com/)
- **Anti-Spam:** [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)

## Local Development

### Prerequisites
- Node.js 18.x or later
- npm or pnpm
- A Supabase Project (Free Tier)
- Resend Account (Optional, for emails)
- Cloudflare Account (Optional, for Turnstile)

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in the variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project settings.
   - `SUPABASE_SERVICE_ROLE_KEY` (required for admin server actions).
   - `RESEND_API_KEY` (use `placeholder` to mock emails in console).
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` (use `placeholder` to bypass).

### Database Setup

Run the SQL migration scripts in your Supabase SQL Editor in this order:
1. `supabase/migrations/001_schema.sql` (Creates tables, triggers, functions)
2. `supabase/migrations/002_rls_policies.sql` (Enables Row Level Security)
3. `supabase/migrations/003_seed_admin.sql` (Creates the initial 'Internship Drive 2027' season and inserts a super-admin)
4. (Optional) `supabase/migrations/004_seed_demo_data.sql` (Populates dummy students, companies, and listings for testing)

### Running the App

Install dependencies and start the development server:
```bash
npm install
npm run dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

The project is optimized for deployment on **Vercel**. 
1. Connect your GitHub repository to Vercel.
2. Add all the environment variables from `.env.local` to the Vercel project settings.
3. Deploy!

The `vercel.json` file includes security headers and enforces the Mumbai region (`bom1`) for proximity to the Supabase database (if deployed in `ap-south-1`).

## License
Proprietary / Internal Use Only - E-Cell BITS Pilani Hyderabad Campus.
