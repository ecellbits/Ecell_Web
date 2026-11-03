-- ==========================================
-- 004_seed_demo_data.sql
-- ==========================================
-- Run this in your Supabase SQL Editor to populate the database with realistic demo data.

DO $$
DECLARE
  student1_id UUID := gen_random_uuid();
  student2_id UUID := gen_random_uuid();
  company1_id UUID := gen_random_uuid();
  company2_id UUID := gen_random_uuid();
  
  comp_record1_id UUID;
  comp_record2_id UUID;
  listing1_id UUID;
  listing2_id UUID;
  listing3_id UUID;
BEGIN

  -- 1. Create Auth Users (password for all is: password123)
  -- Student 1
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role)
  VALUES (student1_id, 'student1@demo.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"role":"student","full_name":"Alice Sharma"}', now(), now(), 'authenticated');

  -- Student 2
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role)
  VALUES (student2_id, 'student2@demo.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"role":"student","full_name":"Rahul Verma"}', now(), now(), 'authenticated');

  -- Company 1 (FinTech)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role)
  VALUES (company1_id, 'hr@fintechstartup.demo', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"role":"company","company_name":"FinTech Innovators","hr_contact_name":"Neha Gupta"}', now(), now(), 'authenticated');

  -- Company 2 (AI)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role)
  VALUES (company2_id, 'careers@aivision.demo', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"role":"company","company_name":"AI Vision","hr_contact_name":"Rohan Mehta"}', now(), now(), 'authenticated');


  -- 2. Wait a moment for triggers to run (though PostgreSQL triggers execute in the same transaction)
  
  -- 3. Update Student Profiles (Triggers created these, we just update them)
  UPDATE public.student_profiles
  SET 
    college = 'BITS Pilani Hyderabad Campus',
    degree = 'B.E. Computer Science',
    graduation_year = 2026,
    cgpa = 8.5,
    skills = '["React", "Node.js", "TypeScript"]',
    github_url = 'https://github.com/alicesharma',
    linkedin_url = 'https://linkedin.com/in/alicesharma'
  WHERE id = student1_id;

  UPDATE public.student_profiles
  SET 
    college = 'IIT Bombay',
    degree = 'B.Tech Electrical Engineering',
    graduation_year = 2025,
    cgpa = 9.1,
    skills = '["Python", "Machine Learning", "C++"]',
    github_url = 'https://github.com/rahulverma',
    portfolio_url = 'https://rahulverma.dev'
  WHERE id = student2_id;


  -- 4. Update Company Profiles and Approve them
  UPDATE public.companies
  SET 
    name = 'FinTech Innovators',
    website = 'https://fintechinnovators.demo',
    industry = 'FinTech',
    company_size = '51-200',
    about = 'We are disrupting the payments space in India with blazingly fast APIs.',
    approval_status = 'approved',
    approved_at = now()
  WHERE user_id = company1_id
  RETURNING id INTO comp_record1_id;

  UPDATE public.companies
  SET 
    name = 'AI Vision',
    website = 'https://aivision.demo',
    industry = 'AI / ML',
    company_size = '11-50',
    about = 'Building state-of-the-art computer vision models for edge devices.',
    approval_status = 'approved',
    approved_at = now()
  WHERE user_id = company2_id
  RETURNING id INTO comp_record2_id;


  -- 5. Create Listings
  INSERT INTO public.listings (company_id, title, role_type, location, stipend, duration, description, requirements, status)
  VALUES (
    comp_record1_id,
    'Frontend Developer Intern',
    'Tech',
    'Bangalore / Remote',
    '₹30,000 / month',
    '6 Months',
    'Join our core team to build the next generation merchant dashboard using Next.js and Tailwind.',
    '- Strong React.js skills\n- Experience with Tailwind CSS\n- Available for 6 months full-time',
    'approved'
  ) RETURNING id INTO listing1_id;

  INSERT INTO public.listings (company_id, title, role_type, location, stipend, duration, description, requirements, status)
  VALUES (
    comp_record1_id,
    'Product Management Intern',
    'Non-Tech',
    'Bangalore',
    '₹25,000 / month',
    '3 Months',
    'Work closely with founders to define product roadmap and conduct user research.',
    '- Great communication skills\n- Understanding of payment gateways\n- Analytical mindset',
    'pending' -- Leave one as pending to show in admin dashboard
  ) RETURNING id INTO listing2_id;

  INSERT INTO public.listings (company_id, title, role_type, location, stipend, duration, description, requirements, status)
  VALUES (
    comp_record2_id,
    'Machine Learning Engineer Intern',
    'Tech',
    'Remote',
    '₹45,000 / month',
    '6 Months',
    'Train and optimize computer vision models for low-power edge deployment.',
    '- Proficiency in Python and PyTorch\n- Basic knowledge of C++\n- Experience with ONNX is a plus',
    'approved'
  ) RETURNING id INTO listing3_id;


  -- 6. Create Applications
  -- Alice applies to FinTech Frontend (Shortlisted)
  INSERT INTO public.applications (listing_id, student_id, status)
  VALUES (listing1_id, student1_id, 'shortlisted');

  -- Rahul applies to FinTech Frontend (Applied)
  INSERT INTO public.applications (listing_id, student_id, status)
  VALUES (listing1_id, student2_id, 'applied');

  -- Rahul applies to AI Vision (Interview Scheduled)
  INSERT INTO public.applications (listing_id, student_id, status, interview_datetime, interview_mode, interview_link)
  VALUES (listing3_id, student2_id, 'interview_scheduled', (now() + interval '2 days')::text, 'online', 'https://meet.google.com/abc-defg-hij');

END $$;
