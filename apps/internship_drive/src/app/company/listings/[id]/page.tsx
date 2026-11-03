import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge, ListingStatusBadge, ApplicationStatusBadge } from "@/components/ui/badge";
import { formatDate, formatStipend, formatDuration } from "@/lib/utils";
import { ArrowLeft, Users, Eye, MapPin, Clock, IndianRupee } from "lucide-react";
import { ApplicantActions } from "./applicant-actions";

export default async function CompanyListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: company } = await supabase
    .from("companies")
    .select("id")
    .eq("user_id", user.id)
    .single();
  if (!company) redirect("/company");

  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .eq("company_id", company.id)
    .single();

  if (!listing) notFound();

  // Fetch applicants with profiles
  const { data: applications } = await supabase
    .from("applications")
    .select("*, student_profile:student_profiles!applications_student_id_fkey(*)")
    .eq("listing_id", id)
    .order("applied_at", { ascending: false });

  const applicants = applications || [];

  // Funnel stats
  const funnel = {
    applied: applicants.filter((a) => a.status === "applied").length,
    shortlisted: applicants.filter((a) => a.status === "shortlisted").length,
    interview: applicants.filter((a) => a.status === "interview_scheduled").length,
    selected: applicants.filter((a) => a.status === "selected").length,
    rejected: applicants.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] space-y-6">
      <Link href="/company/listings" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-lime transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to listings
      </Link>

      {/* Listing Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">{listing.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-text-secondary">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {listing.mode}</span>
            <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" /> {formatStipend(listing.stipend_min, listing.stipend_max)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatDuration(listing.min_duration_months, listing.max_duration_months)}</span>
          </div>
        </div>
        <ListingStatusBadge status={listing.status} />
      </div>

      {/* Funnel */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: "Applied", value: funnel.applied, color: "text-info" },
          { label: "Shortlisted", value: funnel.shortlisted, color: "text-accent-purple" },
          { label: "Interview", value: funnel.interview, color: "text-warning" },
          { label: "Selected", value: funnel.selected, color: "text-success" },
          { label: "Rejected", value: funnel.rejected, color: "text-error" },
        ].map((stage) => (
          <Card key={stage.label} variant="solid" padding="sm" className="text-center">
            <p className={`text-xl font-bold font-[family-name:var(--font-heading)] ${stage.color}`}>{stage.value}</p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">{stage.label}</p>
          </Card>
        ))}
      </div>

      {/* Applicants */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)]">
            Applicants ({applicants.length})
          </h2>
        </div>

        {applicants.length === 0 ? (
          <Card variant="outlined" padding="lg" className="text-center py-12">
            <Users className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-secondary">No applications received yet.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {applicants.map((app: any) => {
              const profile = app.student_profile;
              return (
                <Card key={app.id} variant="solid" padding="md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-accent-purple/10 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-accent-purple">
                            {(profile?.full_name || "?")[0].toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-text-primary text-sm truncate">
                            {profile?.full_name || "Unknown Student"}
                          </p>
                          <p className="text-xs text-text-muted">
                            {profile?.college_name} • {profile?.branch} • {profile?.graduation_year}
                          </p>
                        </div>
                      </div>
                      {(profile?.skills || []).length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2 ml-12">
                          {(profile?.skills || []).slice(0, 5).map((skill: string) => (
                            <Badge key={skill} variant="default" className="text-[10px]">{skill}</Badge>
                          ))}
                          {(profile?.skills || []).length > 5 && (
                            <Badge variant="default" className="text-[10px]">+{(profile?.skills || []).length - 5}</Badge>
                          )}
                        </div>
                      )}
                      <div className="flex items-center gap-3 mt-2 ml-12 text-xs text-text-muted">
                        <span>Applied {formatDate(app.applied_at)}</span>
                        {profile?.resume_url && (
                          <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Resume
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <ApplicationStatusBadge status={app.status} />
                      <ApplicantActions applicationId={app.id} currentStatus={app.status} />
                    </div>
                  </div>

                  {app.cover_note && (
                    <div className="mt-3 ml-12 p-3 rounded-[var(--radius-lg)] bg-white/3 border border-border-default">
                      <p className="text-xs text-text-muted mb-1">Cover note:</p>
                      <p className="text-sm text-text-secondary italic">&ldquo;{app.cover_note}&rdquo;</p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
