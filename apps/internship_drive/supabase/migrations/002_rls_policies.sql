-- ============================================================
-- E-Cell BPHC Internship Drive Portal — Row Level Security
-- Migration 002: RLS policies for all tables
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drive_seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Helper function: check user role
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin' AND is_active = true);
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ============================================================
-- USERS
-- ============================================================
CREATE POLICY "Users can read own record"
  ON public.users FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Admins can read all users"
  ON public.users FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Users can update own record"
  ON public.users FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Admins can update any user"
  ON public.users FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Service role insert users"
  ON public.users FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- STUDENT PROFILES
-- ============================================================
CREATE POLICY "Students can read own profile"
  ON public.student_profiles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Students can update own profile"
  ON public.student_profiles FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Students can insert own profile"
  ON public.student_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all student profiles"
  ON public.student_profiles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Companies can read student profiles for their applicants"
  ON public.student_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.applications a
      JOIN public.listings l ON a.listing_id = l.id
      JOIN public.companies c ON l.company_id = c.id
      WHERE a.student_id = student_profiles.user_id
      AND c.user_id = auth.uid()
    )
  );

-- ============================================================
-- COMPANIES
-- ============================================================
CREATE POLICY "Companies can read own record"
  ON public.companies FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Companies can update own record"
  ON public.companies FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Companies can insert own record"
  ON public.companies FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all companies"
  ON public.companies FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update any company"
  ON public.companies FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Anyone can read approved company names"
  ON public.companies FOR SELECT
  USING (approval_status = 'approved');

-- ============================================================
-- DRIVE SEASONS
-- ============================================================
CREATE POLICY "Anyone can read current season"
  ON public.drive_seasons FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage seasons"
  ON public.drive_seasons FOR ALL
  USING (public.is_admin());

-- ============================================================
-- LISTINGS
-- ============================================================
CREATE POLICY "Anyone can read approved listings"
  ON public.listings FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Companies can read own listings"
  ON public.listings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.companies c
      WHERE c.id = listings.company_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Companies can insert listings"
  ON public.listings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.companies c
      WHERE c.id = company_id AND c.user_id = auth.uid() AND c.approval_status = 'approved'
    )
  );

CREATE POLICY "Companies can update own listings"
  ON public.listings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.companies c
      WHERE c.id = listings.company_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all listings"
  ON public.listings FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update any listing"
  ON public.listings FOR UPDATE
  USING (public.is_admin());

-- ============================================================
-- APPLICATIONS
-- ============================================================
CREATE POLICY "Students can read own applications"
  ON public.applications FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Students can insert applications"
  ON public.applications FOR INSERT
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update own applications (withdraw)"
  ON public.applications FOR UPDATE
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Companies can read applications to their listings"
  ON public.applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.listings l
      JOIN public.companies c ON l.company_id = c.id
      WHERE l.id = applications.listing_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Companies can update application status"
  ON public.applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.listings l
      JOIN public.companies c ON l.company_id = c.id
      WHERE l.id = applications.listing_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all applications"
  ON public.applications FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update any application"
  ON public.applications FOR UPDATE
  USING (public.is_admin());

-- ============================================================
-- APPLICATION STATUS HISTORY
-- ============================================================
CREATE POLICY "Users can read history for their applications"
  ON public.application_status_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.applications a
      WHERE a.id = application_status_history.application_id
      AND (a.student_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.listings l
        JOIN public.companies c ON l.company_id = c.id
        WHERE l.id = a.listing_id AND c.user_id = auth.uid()
      ))
    )
  );

CREATE POLICY "Admins can read all history"
  ON public.application_status_history FOR SELECT
  USING (public.is_admin());

CREATE POLICY "System can insert history"
  ON public.application_status_history FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE POLICY "Users can read own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications (mark read)"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "System can insert notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read all notifications"
  ON public.notifications FOR SELECT
  USING (public.is_admin());

-- ============================================================
-- AUDIT LOG
-- ============================================================
CREATE POLICY "Admins can read audit log"
  ON public.audit_log FOR SELECT
  USING (public.is_admin());

CREATE POLICY "System can insert audit log"
  ON public.audit_log FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- STORAGE POLICIES
-- ============================================================
-- Resumes: students upload own, companies/admins read for their applicants
CREATE POLICY "Students can upload resumes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes' AND (auth.uid())::text = (storage.foldername(name))[1]);

CREATE POLICY "Students can read own resumes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes' AND (auth.uid())::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users can read resumes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- Logos: companies upload own, anyone can read (public bucket)
CREATE POLICY "Companies can upload logos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'logos' AND (auth.uid())::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can read logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'logos');
