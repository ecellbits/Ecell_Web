import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge, ApplicationStatusBadge } from "@/components/ui/badge";
import { formatDate, formatDateTime } from "@/lib/utils";
import {
  Briefcase,
  Building2,
  Calendar,
  Video,
  MapPin,
  Clock,
  FileText,
  ExternalLink,
} from "lucide-react";
import type { Application, Listing, Company } from "@/types/database";

export default async function StudentApplicationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: applications } = await supabase
    .from("applications")
    .select("*, listing:listings(*, company:companies(name, logo_url))")
    .eq("student_id", user.id)
    .order("applied_at", { ascending: false });

  const apps = (applications || []) as (Application & {
    listing: Listing & { company: Pick<Company, "name" | "logo_url"> };
  })[];

  const statusGroups = {
    active: apps.filter((a) =>
      ["applied", "shortlisted", "interview_scheduled"].includes(a.status)
    ),
    completed: apps.filter((a) => ["selected", "rejected", "withdrawn"].includes(a.status)),
  };

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">
          My Applications
        </h1>
        <p className="text-text-secondary mt-1">
          {apps.length} total — {statusGroups.active.length} active
        </p>
      </div>

      {apps.length === 0 ? (
        <Card variant="outlined" padding="lg" className="text-center py-16">
          <FileText className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2">
            No applications yet
          </h3>
          <p className="text-sm text-text-secondary max-w-sm mx-auto mb-4">
            Start exploring internships and submit your first application.
          </p>
          <Link
            href="/student/listings"
            className="text-sm text-accent-lime hover:underline font-medium"
          >
            Browse Listings →
          </Link>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Active Applications */}
          {statusGroups.active.length > 0 && (
            <section>
              <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                Active Applications
              </h2>
              <div className="space-y-3">
                {statusGroups.active.map((app) => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          )}

          {/* Completed Applications */}
          {statusGroups.completed.length > 0 && (
            <section>
              <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-text-secondary">
                Past Applications
              </h2>
              <div className="space-y-3">
                {statusGroups.completed.map((app) => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function ApplicationCard({
  app,
}: {
  app: Application & {
    listing: Listing & { company: Pick<Company, "name" | "logo_url"> };
  };
}) {
  return (
    <Card variant="solid" padding="md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-text-muted" />
            <span className="text-sm text-text-secondary">{app.listing?.company?.name}</span>
          </div>
          <Link
            href={`/student/listings/${app.listing_id}`}
            className="font-bold text-text-primary font-[family-name:var(--font-heading)] hover:text-accent-lime transition-colors"
          >
            {app.listing?.title}
          </Link>
          <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Applied {formatDate(app.applied_at)}
            </span>
            {app.listing?.mode && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {app.listing.mode}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ApplicationStatusBadge status={app.status} />
        </div>
      </div>

      {/* Interview details */}
      {app.status === "interview_scheduled" && app.interview_datetime && (
        <div className="mt-4 p-3 rounded-[var(--radius-lg)] bg-warning/5 border border-warning/20">
          <p className="text-xs font-medium text-warning mb-2 uppercase tracking-wider">
            Interview Scheduled
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {formatDateTime(app.interview_datetime)}
            </span>
            {app.interview_mode && (
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                {app.interview_mode}
              </span>
            )}
            {app.interview_link && (
              <a
                href={app.interview_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-accent-lime hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Join Link
              </a>
            )}
          </div>
          {app.interview_notes && (
            <p className="text-xs text-text-muted mt-2">{app.interview_notes}</p>
          )}
        </div>
      )}

      {/* Cover note */}
      {app.cover_note && (
        <div className="mt-3 pt-3 border-t border-border-default">
          <p className="text-xs text-text-muted mb-1">Your cover note:</p>
          <p className="text-sm text-text-secondary italic">&ldquo;{app.cover_note}&rdquo;</p>
        </div>
      )}
    </Card>
  );
}
