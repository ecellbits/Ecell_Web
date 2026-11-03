-- ============================================================
-- E-Cell BPHC Internship Drive Portal — Seed Super Admin
-- Migration 003: Create the initial super-admin user
-- ============================================================
-- NOTE: This creates a record in public.users for an admin.
-- You must FIRST create this user via the Supabase Auth dashboard
-- or Auth API with the email below, then run this migration.
-- Replace the UUID and email with your actual super-admin values.

-- Example: seed a super-admin (run AFTER creating the auth user)
-- INSERT INTO public.users (id, email, role, admin_level, is_active)
-- VALUES (
--   'YOUR-AUTH-USER-UUID-HERE',
--   'admin@ecellbphc.in',
--   'admin',
--   'super',
--   true
-- );

-- Also seed a default drive season
INSERT INTO public.drive_seasons (
  name, 
  is_current, 
  banner_message,
  landing_hero_title,
  landing_hero_subtitle,
  landing_stats,
  landing_testimonials,
  landing_faq,
  max_active_applications,
  applications_open
) VALUES (
  'Internship Drive 2027',
  true,
  'Registration is now open!',
  'Internship Drive',
  'Bridging Academics and Industry',
  '[
    {"label": "Startups", "value": "50+", "description": "Partner companies"},
    {"label": "Stipend", "value": "₹1.25L", "description": "Up to per month"},
    {"label": "Remote", "value": "75%", "description": "Opportunities"},
    {"label": "Students", "value": "500+", "description": "Applications received"}
  ]'::jsonb,
  '[
    {"name": "Student Name", "college": "BITS Pilani Hyderabad", "quote": "The Internship Drive connected me with an amazing startup where I got hands-on experience and a PPO!", "role": "SDE Intern", "year": "2026"}
  ]'::jsonb,
  '[
    {"question": "Who can apply?", "answer": "Students from any college across India can apply. The drive is not restricted to BITS Hyderabad students."},
    {"question": "What kind of internships are available?", "answer": "Mostly startup internships across tech, business, design, and more. Durations range from 2-6 months with stipends up to ₹1.25L/month."},
    {"question": "Is there a fee to participate?", "answer": "No, the Internship Drive is completely free for students."},
    {"question": "Can I apply to multiple internships?", "answer": "Yes, but there is a cap on simultaneous active applications (default 10) to encourage thoughtful applications."},
    {"question": "What happens after I apply?", "answer": "Companies review your application, may shortlist you for interviews, and ultimately extend offers to selected candidates."},
    {"question": "Is there a chance of getting a PPO?", "answer": "Many companies offer Pre-Placement Offers to strong performers. Listings will indicate if PPO is possible."}
  ]'::jsonb,
  10,
  true
) ON CONFLICT DO NOTHING;
