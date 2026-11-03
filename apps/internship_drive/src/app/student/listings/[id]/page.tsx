import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatStipend, formatDuration, formatDate } from "@/lib/utils";
import { ApplyButton } from "./apply-button";
import {
  Building2,
  MapPin,
  Clock,
  IndianRupee,
  Users,
  Award,
  Calendar,
  ArrowLeft,
  Globe,
  ExternalLink,
} from "lucide-react";
import type { Listing, Company } from "@/types/database";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch listing with company
  const { data: listing } = await supabase
    .from("listings")
    .select("*, company:companies(*)")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (!listing) notFound();

  // Check if already applied
  const { data: existingApp } = await supabase
    .from("applications")
    .select("id, status")
    .eq("listing_id", id)
    .eq("student_id", user.id)
    .single();

  // Check profile completeness
  const { data: profile } = await supabase
    .from("student_profiles")
    .select("profile_complete, resume_url")
    .eq("user_id", user.id)
    .single();

  // Count active applications
  const { count: activeAppsCount } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("student_id", user.id)
    .in("status", ["applied", "shortlisted", "interview_scheduled"]);

  // Get max applications cap from current season
  const { data: season } = await supabase
    .from("drive_seasons")
    .select("max_active_applications, applications_open")
    .eq("is_current", true)
    .single();

  const company = listing.company as Company;
  const canApply =
    profile?.profile_complete &&
    !existingApp &&
    (activeAppsCount || 0) < (season?.max_active_applications || 10) &&
    season?.applications_open !== false;

  const skills = listing.required_skills || [];

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] max-w-4xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/student/listings"
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-lime transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to listings
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="w-14 h-14 rounded-[var(--radius-xl)] bg-accent-purple/10 flex items-center justify-center shrink-0">
          <Building2 className="w-7 h-7 text-accent-purple" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-text-secondary">{company?.name}</span>
            {company?.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent-lime"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">
            {listing.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="lime">
              <MapPin className="w-3 h-3 mr-1" />
              {listing.mode}
            </Badge>
            {listing.department_tag && <Badge variant="default">{listing.department_tag}</Badge>}
            {listing.ppo_possible && (
              <Badge variant="purple">
                <Award className="w-3 h-3 mr-1" />
                PPO Possible
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card variant="solid" padding="lg">
            <CardTitle className="mb-4">About the Role</CardTitle>
            <div className="prose prose-invert prose-sm max-w-none text-text-secondary whitespace-pre-wrap leading-relaxed">
              {listing.description || "No description provided."}
            </div>
          </Card>

          {/* Responsibilities */}
          {listing.responsibilities && (
            <Card variant="solid" padding="lg">
              <CardTitle className="mb-4">Responsibilities</CardTitle>
              <div className="prose prose-invert prose-sm max-w-none text-text-secondary whitespace-pre-wrap leading-relaxed">
                {listing.responsibilities}
              </div>
            </Card>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <Card variant="solid" padding="lg">
              <CardTitle className="mb-4">Required Skills</CardTitle>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string) => (
                  <Badge key={skill} variant="lime">{skill}</Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Eligibility */}
          {listing.eligibility_notes && (
            <Card variant="solid" padding="lg">
              <CardTitle className="mb-4">Eligibility</CardTitle>
              <p className="text-sm text-text-secondary whitespace-pre-wrap">
                {listing.eligibility_notes}
              </p>
            </Card>
          )}

          {/* Company About */}
          {company?.about && (
            <Card variant="solid" padding="lg">
              <CardTitle className="mb-4">About {company.name}</CardTitle>
              <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">
                {company.about}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {company.industry && <Badge variant="default">{company.industry}</Badge>}
                {company.company_size && <Badge variant="default">{company.company_size} employees</Badge>}
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent-lime hover:underline"
                  >
                    <Globe className="w-3 h-3" />
                    Website
                  </a>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Key Details */}
          <Card variant="glass" padding="lg">
            <CardTitle className="mb-4">Details</CardTitle>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <IndianRupee className="w-4 h-4 text-accent-lime mt-0.5" />
                <div>
                  <p className="text-xs text-text-muted">Stipend</p>
                  <p className="text-sm font-medium">
                    {formatStipend(listing.stipend_min, listing.stipend_max)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent-lime mt-0.5" />
                <div>
                  <p className="text-xs text-text-muted">Duration</p>
                  <p className="text-sm font-medium">
                    {formatDuration(listing.min_duration_months, listing.max_duration_months)}
                  </p>
                </div>
              </div>
              {listing.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent-lime mt-0.5" />
                  <div>
                    <p className="text-xs text-text-muted">Location</p>
                    <p className="text-sm font-medium">{listing.location}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-accent-lime mt-0.5" />
                <div>
                  <p className="text-xs text-text-muted">Openings</p>
                  <p className="text-sm font-medium">{listing.openings_count}</p>
                </div>
              </div>
              {listing.application_deadline && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-accent-lime mt-0.5" />
                  <div>
                    <p className="text-xs text-text-muted">Deadline</p>
                    <p className="text-sm font-medium">{formatDate(listing.application_deadline)}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Apply Section */}
          <ApplyButton
            listingId={listing.id}
            existingApp={existingApp}
            canApply={canApply}
            profileComplete={profile?.profile_complete || false}
            resumeUrl={profile?.resume_url || null}
            applicationsOpen={season?.applications_open !== false}
            activeAppsCount={activeAppsCount || 0}
            maxApps={season?.max_active_applications || 10}
          />
        </div>
      </div>
    </div>
  );
}
