/* ============================================================
   Database Types — matches Supabase schema 001_schema.sql
   ============================================================ */

export type UserRole = "student" | "company" | "admin";
export type AdminLevel = "super" | "oc_member";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type ListingStatus = "draft" | "pending_approval" | "approved" | "rejected" | "closed";
export type ApplicationStatus = "applied" | "shortlisted" | "interview_scheduled" | "selected" | "rejected" | "withdrawn";
export type WorkMode = "remote" | "onsite" | "hybrid";
export type InterviewMode = "online" | "offline";
export type CompanySize = "1-10" | "11-50" | "51-200" | "201-500" | "500+";
export type NotificationType = "info" | "success" | "warning" | "error" | "application" | "interview" | "approval" | "broadcast";

// ---- Core Tables ----

export interface User {
  id: string;
  email: string;
  role: UserRole;
  admin_level: AdminLevel | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string | null;
  college_name: string;
  degree: string;
  branch: string;
  graduation_year: number | null;
  resume_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  skills: string[];
  bio: string;
  profile_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  user_id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  industry: string | null;
  company_size: CompanySize | null;
  hr_contact_name: string;
  hr_contact_email: string;
  hr_contact_phone: string | null;
  about: string;
  approval_status: ApprovalStatus;
  rejection_reason: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DriveSeason {
  id: string;
  name: string;
  registration_open_at: string | null;
  registration_close_at: string | null;
  application_deadline: string | null;
  is_current: boolean;
  banner_message: string;
  landing_hero_title: string;
  landing_hero_subtitle: string;
  landing_stats: LandingStat[];
  landing_testimonials: LandingTestimonial[];
  landing_faq: LandingFAQ[];
  max_active_applications: number;
  applications_open: boolean;
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id: string;
  company_id: string;
  season_id: string;
  title: string;
  department_tag: string | null;
  description: string;
  responsibilities: string;
  required_skills: string[];
  eligibility_notes: string;
  min_duration_months: number;
  max_duration_months: number;
  stipend_min: number;
  stipend_max: number;
  stipend_currency: string;
  mode: WorkMode;
  location: string;
  openings_count: number;
  application_deadline: string | null;
  ppo_possible: boolean;
  status: ListingStatus;
  rejection_reason: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  company?: Company;
  applications_count?: number;
}

export interface Application {
  id: string;
  listing_id: string;
  student_id: string;
  cover_note: string;
  resume_url_snapshot: string | null;
  status: ApplicationStatus;
  interview_datetime: string | null;
  interview_mode: InterviewMode | null;
  interview_link: string | null;
  interview_notes: string | null;
  applied_at: string;
  updated_at: string;
  // Joined fields
  listing?: Listing;
  student_profile?: StudentProfile;
}

export interface ApplicationStatusHistory {
  id: string;
  application_id: string;
  old_status: string | null;
  new_status: string;
  changed_by: string | null;
  changed_at: string;
  note: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  is_read: boolean;
  related_entity_type: string | null;
  related_entity_id: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

// ---- JSON sub-types for DriveSeason ----

export interface LandingStat {
  label: string;
  value: string;
  description: string;
}

export interface LandingTestimonial {
  name: string;
  college: string;
  quote: string;
  role: string;
  year: string;
}

export interface LandingFAQ {
  question: string;
  answer: string;
}

// ---- View/Form Types ----

export interface ListingFilters {
  search?: string;
  department?: string;
  mode?: WorkMode;
  ppo_possible?: boolean;
  stipend_min?: number;
  stipend_max?: number;
  min_duration?: number;
  max_duration?: number;
}

export interface DashboardStats {
  total_students: number;
  total_companies: number;
  total_listings: number;
  total_applications: number;
  pending_companies: number;
  pending_listings: number;
  selected_count: number;
}
