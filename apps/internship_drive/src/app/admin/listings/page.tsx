import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge, ListingStatusBadge } from "@/components/ui/badge";
import { formatDate, formatStipend } from "@/lib/utils";
import { Briefcase, Building2, MapPin } from "lucide-react";
import { ListingApprovalActions } from "./approval-actions";

export default async function AdminListingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: listings } = await supabase
    .from("listings")
    .select("*, company:companies(name)")
    .order("created_at", { ascending: false });

  const items = listings || [];
  const pending = items.filter((l) => l.status === "pending_approval");
  const others = items.filter((l) => l.status !== "pending_approval");

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Listing Approvals</h1>
        <p className="text-text-secondary text-sm mt-1">{items.length} total — {pending.length} pending</p>
      </div>

      {pending.length > 0 && (
        <section>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
            Pending Review ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((listing: any) => (
              <Card key={listing.id} variant="solid" padding="md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-text-primary font-[family-name:var(--font-heading)]">{listing.title}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {listing.company?.name}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {listing.mode}</span>
                      <span>{formatStipend(listing.stipend_min, listing.stipend_max)}</span>
                      <span>Posted {formatDate(listing.created_at)}</span>
                    </div>
                    {listing.description && <p className="text-xs text-text-secondary mt-2 line-clamp-2">{listing.description}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <ListingStatusBadge status={listing.status} />
                    <ListingApprovalActions listingId={listing.id} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-text-secondary">All Listings ({others.length})</h2>
          <div className="space-y-3">
            {others.map((listing: any) => (
              <Card key={listing.id} variant="solid" padding="md">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-text-primary text-sm truncate">{listing.title}</p>
                    <p className="text-xs text-text-muted mt-1">{listing.company?.name} • {listing.mode} • {formatDate(listing.created_at)}</p>
                  </div>
                  <ListingStatusBadge status={listing.status} />
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
