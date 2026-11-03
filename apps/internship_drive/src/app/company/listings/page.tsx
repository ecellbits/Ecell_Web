import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ListingStatusBadge } from "@/components/ui/badge";
import { formatDate, formatStipend } from "@/lib/utils";
import { Plus, Briefcase, Users, MapPin } from "lucide-react";

export default async function CompanyListingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: company } = await supabase
    .from("companies")
    .select("id, approval_status")
    .eq("user_id", user.id)
    .single();

  if (!company || company.approval_status !== "approved") redirect("/company");

  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("company_id", company.id)
    .order("created_at", { ascending: false });

  // Fetch applicant counts per listing
  const listingIds = (listings || []).map((l) => l.id);
  let applicantCounts: Record<string, number> = {};
  if (listingIds.length > 0) {
    const { data: apps } = await supabase
      .from("applications")
      .select("listing_id")
      .in("listing_id", listingIds);
    if (apps) {
      apps.forEach((a) => {
        applicantCounts[a.listing_id] = (applicantCounts[a.listing_id] || 0) + 1;
      });
    }
  }

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">My Listings</h1>
          <p className="text-text-secondary text-sm mt-1">{(listings || []).length} total</p>
        </div>
        <Link href="/company/listings/new">
          <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
            New Listing
          </Button>
        </Link>
      </div>

      {(listings || []).length === 0 ? (
        <Card variant="outlined" padding="lg" className="text-center py-16">
          <Briefcase className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2">No listings yet</h3>
          <p className="text-sm text-text-secondary mb-4">Post your first internship to start receiving applications.</p>
          <Link href="/company/listings/new">
            <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>Create Listing</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {(listings || []).map((listing) => (
            <Link key={listing.id} href={`/company/listings/${listing.id}`}>
              <Card variant="solid" hover padding="md" className="mb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-text-primary font-[family-name:var(--font-heading)] truncate">
                      {listing.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {listing.mode}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {applicantCounts[listing.id] || 0} applicants
                      </span>
                      <span>{formatStipend(listing.stipend_min, listing.stipend_max)}</span>
                      <span>Created {formatDate(listing.created_at)}</span>
                    </div>
                  </div>
                  <ListingStatusBadge status={listing.status} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
