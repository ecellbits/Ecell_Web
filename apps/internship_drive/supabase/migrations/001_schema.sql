-- ============================================================
-- E-Cell BPHC Internship Drive Portal — Database Schema
-- Migration 001: Core tables, indexes, constraints, triggers
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for text search

-- ============================================================
-- 1. USERS (extends Supabase auth.users)
-- ============================================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'company', 'admin')),
  admin_level TEXT CHECK (
    (role = 'admin' AND admin_level IN ('super', 'oc_member'))
    OR (role != 'admin' AND admin_level IS NULL)
  ),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_email ON public.users(email);

-- ============================================================
-- 2. STUDENT PROFILES (1:1 with users WHERE role = 'student')
-- ============================================================
CREATE TABLE public.student_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT,
  college_name TEXT NOT NULL DEFAULT '',
  degree TEXT NOT NULL DEFAULT '',
  branch TEXT NOT NULL DEFAULT '',
  graduation_year INTEGER,
  resume_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  skills TEXT[] DEFAULT '{}',
  bio TEXT DEFAULT '',
  profile_complete BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_student_profiles_user_id ON public.student_profiles(user_id);
CREATE INDEX idx_student_profiles_college ON public.student_profiles(college_name);
CREATE INDEX idx_student_profiles_skills ON public.student_profiles USING GIN(skills);

-- ============================================================
-- 3. COMPANIES (1:1 with users WHERE role = 'company')
-- ============================================================
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  industry TEXT,
  company_size TEXT CHECK (company_size IN ('1-10', '11-50', '51-200', '201-500', '500+')),
  hr_contact_name TEXT NOT NULL,
  hr_contact_email TEXT NOT NULL,
  hr_contact_phone TEXT,
  about TEXT DEFAULT '',
  approval_status TEXT NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  approved_by UUID REFERENCES public.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_companies_user_id ON public.companies(user_id);
CREATE INDEX idx_companies_approval_status ON public.companies(approval_status);
CREATE INDEX idx_companies_name ON public.companies USING GIN(name gin_trgm_ops);

-- ============================================================
-- 4. DRIVE SEASONS
-- ============================================================
CREATE TABLE public.drive_seasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  registration_open_at TIMESTAMPTZ,
  registration_close_at TIMESTAMPTZ,
  application_deadline TIMESTAMPTZ,
  is_current BOOLEAN NOT NULL DEFAULT false,
  banner_message TEXT DEFAULT '',
  landing_hero_title TEXT DEFAULT 'Internship Drive',
  landing_hero_subtitle TEXT DEFAULT 'Bridging Academics and Industry',
  landing_stats JSONB DEFAULT '[]'::jsonb,
  landing_testimonials JSONB DEFAULT '[]'::jsonb,
  landing_faq JSONB DEFAULT '[]'::jsonb,
  max_active_applications INTEGER NOT NULL DEFAULT 10,
  applications_open BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure only one current season at a time
CREATE UNIQUE INDEX idx_drive_seasons_current ON public.drive_seasons(is_current) WHERE is_current = true;

-- ============================================================
-- 5. LISTINGS
-- ============================================================
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  season_id UUID NOT NULL REFERENCES public.drive_seasons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  department_tag TEXT,
  description TEXT NOT NULL DEFAULT '',
  responsibilities TEXT DEFAULT '',
  required_skills TEXT[] DEFAULT '{}',
  eligibility_notes TEXT DEFAULT '',
  min_duration_months INTEGER DEFAULT 2,
  max_duration_months INTEGER DEFAULT 6,
  stipend_min INTEGER DEFAULT 0,
  stipend_max INTEGER DEFAULT 0,
  stipend_currency TEXT NOT NULL DEFAULT 'INR',
  mode TEXT NOT NULL DEFAULT 'remote' CHECK (mode IN ('remote', 'onsite', 'hybrid')),
  location TEXT DEFAULT '',
  openings_count INTEGER NOT NULL DEFAULT 1,
  application_deadline TIMESTAMPTZ,
  ppo_possible BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_approval', 'approved', 'rejected', 'closed')),
  rejection_reason TEXT,
  approved_by UUID REFERENCES public.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_listings_company_id ON public.listings(company_id);
CREATE INDEX idx_listings_season_status ON public.listings(season_id, status);
CREATE INDEX idx_listings_department ON public.listings(department_tag);
CREATE INDEX idx_listings_mode ON public.listings(mode);
CREATE INDEX idx_listings_title ON public.listings USING GIN(title gin_trgm_ops);
CREATE INDEX idx_listings_skills ON public.listings USING GIN(required_skills);

-- ============================================================
-- 6. APPLICATIONS
-- ============================================================
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  cover_note TEXT DEFAULT '',
  resume_url_snapshot TEXT,
  status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('applied', 'shortlisted', 'interview_scheduled', 'selected', 'rejected', 'withdrawn')),
  interview_datetime TIMESTAMPTZ,
  interview_mode TEXT CHECK (interview_mode IN ('online', 'offline', NULL)),
  interview_link TEXT,
  interview_notes TEXT,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(listing_id, student_id)
);

CREATE INDEX idx_applications_listing_id ON public.applications(listing_id);
CREATE INDEX idx_applications_student_id ON public.applications(student_id);
CREATE INDEX idx_applications_status ON public.applications(status);

-- ============================================================
-- 7. APPLICATION STATUS HISTORY
-- ============================================================
CREATE TABLE public.application_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID REFERENCES public.users(id),
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  note TEXT DEFAULT ''
);

CREATE INDEX idx_app_status_history_app_id ON public.application_status_history(application_id);

-- ============================================================
-- 8. NOTIFICATIONS
-- ============================================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error', 'application', 'interview', 'approval', 'broadcast')),
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  is_read BOOLEAN NOT NULL DEFAULT false,
  related_entity_type TEXT,
  related_entity_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read) WHERE is_read = false;

-- ============================================================
-- 9. AUDIT LOG
-- ============================================================
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES public.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_log_actor ON public.audit_log(actor_id);
CREATE INDEX idx_audit_log_entity ON public.audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created ON public.audit_log(created_at DESC);

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('resumes', 'resumes', false, 2097152, ARRAY['application/pdf']),
  ('logos', 'logos', true, 524288, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- TRIGGERS: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_users BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_student_profiles BEFORE UPDATE ON public.student_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_companies BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_drive_seasons BEFORE UPDATE ON public.drive_seasons
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_listings BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_applications BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- TRIGGER: auto-create user profile on auth.users insert
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );

  -- Auto-create student profile if role is student
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'student') = 'student' THEN
    INSERT INTO public.student_profiles (user_id)
    VALUES (NEW.id);
  END IF;

  -- Auto-create company record if role is company
  IF NEW.raw_user_meta_data->>'role' = 'company' THEN
    INSERT INTO public.companies (
      user_id, name, hr_contact_name, hr_contact_email
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'company_name', ''),
      COALESCE(NEW.raw_user_meta_data->>'hr_contact_name', ''),
      NEW.email
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TRIGGER: log application status changes
-- ============================================================
CREATE OR REPLACE FUNCTION public.log_application_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.application_status_history (
      application_id, old_status, new_status, changed_by
    ) VALUES (
      NEW.id, OLD.status, NEW.status, auth.uid()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_application_status_change
  AFTER UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.log_application_status_change();

-- ============================================================
-- GRANTS for PostgREST (required for Supabase projects after May 2026)
-- ============================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
