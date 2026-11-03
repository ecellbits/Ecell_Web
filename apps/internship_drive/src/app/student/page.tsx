import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge, ApplicationStatusBadge } from "@/components/ui/badge";
import { formatDate, formatStipend, truncate } from "@/lib/utils";
import {
  Briefcase,
  FileText,
  User,
  ArrowRight,
  Clock,
  Building2,
  MapPin,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default async function StudentDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch student profile
  const { data: profile } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Fetch current season
  const { data: season } = await supabase
    .from("drive_seasons")
    .select("*")
    .eq("is_current", true)
    .single();

  // Fetch recent applications
  const { data: recentApps } = await supabase
    .from("applications")
    .select("*, listing:listings(*, company:companies(name, logo_url))")
    .eq("student_id", user.id)
    .order("applied_at", { ascending: false })
    .limit(5);

  // Fetch application counts by status
  const { data: allApps } = await supabase
    .from("applications")
    .select("status")
    .eq("student_id", user.id);

  const appCounts = {
    total: allApps?.length || 0,
    applied: allApps?.filter((a) => a.status === "applied").length || 0,
    shortlisted: allApps?.filter((a) => a.status === "shortlisted").length || 0,
    interview: allApps?.filter((a) => a.status === "interview_scheduled").length || 0,
    selected: allApps?.filter((a) => a.status === "selected").length || 0,
  };

  // Fetch some listings for recommendations
  const { data: featuredListings } = await supabase
    .from("listings")
    .select("*, company:companies(name, logo_url)")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(3);

  const profileComplete = profile?.profile_complete;

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">
            Welcome{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}!
          </h1>
          <p className="text-text-secondary mt-1">
            {season?.name || "Internship Drive"} — your dashboard
          </p>
        </div>
        <Link href="/student/listings">
          <Button variant="primary" size="md" iconRight={<ArrowRight className="w-4 h-4" />}>
            Browse Listings
          </Button>
        </Link>
      </div>

      {/* Profile Completion Alert */}
      {!profileComplete && (
        <Card variant="outlined" padding="md" className="border-warning/30 bg-warning/5">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-text-primary text-sm">Complete your profile to apply</p>
              <p className="text-xs text-text-secondary mt-1">
                Upload your resume and fill in your details to unlock the ability to apply for internships.
              </p>
            </div>
            <Link href="/student/profile">
              <Button variant="outline" size="sm">Complete Profile</Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Applied", value: appCounts.total, icon: <FileText className="w-4 h-4" />, color: "text-info" },
          { label: "Applied", value: appCounts.applied, icon: <Clock className="w-4 h-4" />, color: "text-info" },
          { label: "Shortlisted", value: appCounts.shortlisted, icon: <Sparkles className="w-4 h-4" />, color: "text-accent-purple" },
          { label: "Interviews", value: appCounts.interview, icon: <Briefcase className="w-4 h-4" />, color: "text-warning" },
          { label: "Selected", value: appCounts.selected, icon: <User className="w-4 h-4" />, color: "text-success" },
        ].map((stat) => (
          <Card key={stat.label} variant="solid" padding="md">
            <div className="flex items-center gap-3">
              <div className={`${stat.color}`}>{stat.icon}</div>
              <div>
                <p className="text-2xl font-bold font-[family-name:var(--font-heading)]">{stat.value}</p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)]">Recent Applications</h2>
            <Link href="/student/applications" className="text-sm text-accent-lime hover:underline">
              View all →
            </Link>
          </div>

          {recentApps && recentApps.length > 0 ? (
            <div className="space-y-3">
              {recentApps.map((app: any) => (
                <Card key={app.id} variant="solid" padding="md" hover>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary text-sm truncate">
                        {app.listing?.title || "Untitled Listing"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Building2 className="w-3 h-3 text-text-muted" />
                        <span className="text-xs text-text-secondary">
                          {app.listing?.company?.name || "Unknown Company"}
                        </span>
                        <span className="text-xs text-text-muted">•</span>
                        <span className="text-xs text-text-muted">
                          {formatDate(app.applied_at)}
                        </span>
                      </div>
                    </div>
                    <ApplicationStatusBadge status={app.status} />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="outlined" padding="lg" className="text-center">
              <Briefcase className="w-8 h-8 text-text-muted mx-auto mb-3" />
              <p className="text-sm text-text-secondary">No applications yet</p>
              <Link href="/student/listings" className="text-sm text-accent-lime hover:underline mt-2 block">
                Browse available internships →
              </Link>
            </Card>
          )}
        </div>

        {/* Recommended Listings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)]">Latest Listings</h2>
            <Link href="/student/listings" className="text-sm text-accent-lime hover:underline">
              See all →
            </Link>
          </div>

          {featuredListings && featuredListings.length > 0 ? (
            <div className="space-y-3">
              {featuredListings.map((listing: any) => (
                <Link key={listing.id} href={`/student/listings/${listing.id}`}>
                  <Card variant="solid" padding="sm" hover className="mb-3">
                    <p className="font-medium text-text-primary text-sm truncate">{listing.title}</p>
                    <p className="text-xs text-text-secondary mt-1">{listing.company?.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="lime">{listing.mode}</Badge>
                      {listing.ppo_possible && <Badge variant="purple">PPO</Badge>}
                    </div>
                    <p className="text-xs text-accent-lime mt-2">
                      {formatStipend(listing.stipend_min, listing.stipend_max)}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card variant="outlined" padding="md" className="text-center">
              <p className="text-sm text-text-secondary">No listings available yet</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
