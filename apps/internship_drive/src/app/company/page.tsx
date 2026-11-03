import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ApprovalStatusBadge, ListingStatusBadge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import {
  Briefcase,
  Users,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2,
  BarChart3,
} from "lucide-react";

export default async function CompanyDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch company
  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!company) redirect("/login");

  // Pending approval state
  if (company.approval_status === "pending") {
    return (
      <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-warning" />
        </div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-3">
          Registration Under Review
        </h1>
        <p className="text-text-secondary mb-6 max-w-sm mx-auto">
          Your company registration for <strong className="text-text-primary">{company.name}</strong> is being reviewed by the E-Cell team. You&apos;ll be notified once approved.
        </p>
        <ApprovalStatusBadge status="pending" />
      </div>
    );
  }

  if (company.approval_status === "rejected") {
    return (
      <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-error" />
        </div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-3">
          Registration Rejected
        </h1>
        <p className="text-text-secondary mb-4">
          Unfortunately, your registration was not approved.
        </p>
        {company.rejection_reason && (
          <Card variant="solid" padding="md" className="text-left mb-4">
            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Reason</p>
            <p className="text-sm text-text-secondary">{company.rejection_reason}</p>
          </Card>
        )}
        <p className="text-xs text-text-muted">
          Contact ecell@hyderabad.bits-pilani.ac.in if you believe this is an error.
        </p>
      </div>
    );
  }

  // Approved — show dashboard
  const { data: listings } = await supabase
    .from("listings")
    .select("id, title, status, created_at")
    .eq("company_id", company.id)
    .order("created_at", { ascending: false });

  const listingIds = (listings || []).map((l) => l.id);

  let totalApplicants = 0;
  if (listingIds.length > 0) {
    const { count } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .in("listing_id", listingIds);
    totalApplicants = count || 0;
  }

  const activeListings = (listings || []).filter((l) => l.status === "approved").length;
  const pendingListings = (listings || []).filter((l) => l.status === "pending_approval").length;

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">
            {company.name}
          </h1>
          <p className="text-text-secondary mt-1">Company Dashboard</p>
        </div>
        <Link href="/company/listings/new">
          <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
            Post New Listing
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Listings", value: activeListings, icon: <Briefcase className="w-5 h-5 text-accent-lime" /> },
          { label: "Pending Approval", value: pendingListings, icon: <Clock className="w-5 h-5 text-warning" /> },
          { label: "Total Applicants", value: totalApplicants, icon: <Users className="w-5 h-5 text-accent-purple" /> },
          { label: "Total Listings", value: (listings || []).length, icon: <BarChart3 className="w-5 h-5 text-info" /> },
        ].map((stat) => (
          <Card key={stat.label} variant="solid" padding="md">
            <div className="flex items-center gap-3">
              {stat.icon}
              <div>
                <p className="text-2xl font-bold font-[family-name:var(--font-heading)]">{stat.value}</p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)]">Your Listings</h2>
          <Link href="/company/listings" className="text-sm text-accent-lime hover:underline">
            View all →
          </Link>
        </div>

        {(listings || []).length === 0 ? (
          <Card variant="outlined" padding="lg" className="text-center py-12">
            <Briefcase className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-secondary mb-4">No listings yet. Post your first internship!</p>
            <Link href="/company/listings/new">
              <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
                Create Listing
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {(listings || []).slice(0, 5).map((listing) => (
              <Link key={listing.id} href={`/company/listings/${listing.id}`}>
                <Card variant="solid" hover padding="md" className="mb-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-text-primary truncate">{listing.title}</p>
                      <p className="text-xs text-text-muted mt-1">Created {formatDate(listing.created_at)}</p>
                    </div>
                    <ListingStatusBadge status={listing.status} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
