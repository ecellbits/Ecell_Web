import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ApprovalStatusBadge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Building2, Globe, Users } from "lucide-react";
import { CompanyApprovalActions } from "./approval-actions";

export default async function AdminCompaniesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: companies } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  const items = companies || [];
  const pending = items.filter((c) => c.approval_status === "pending");
  const others = items.filter((c) => c.approval_status !== "pending");

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Company Approvals</h1>
        <p className="text-text-secondary text-sm mt-1">{items.length} total — {pending.length} pending</p>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <section>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
            Pending Review ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((company) => (
              <CompanyCard key={company.id} company={company} showActions />
            ))}
          </div>
        </section>
      )}

      {/* All Others */}
      {others.length > 0 && (
        <section>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-text-secondary">
            All Companies ({others.length})
          </h2>
          <div className="space-y-3">
            {others.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function CompanyCard({ company, showActions }: { company: any; showActions?: boolean }) {
  return (
    <Card variant="solid" padding="md">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-accent-purple/10 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-accent-purple" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-text-primary font-[family-name:var(--font-heading)]">{company.name}</p>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-text-muted">
              <span>{company.hr_contact_name} ({company.hr_contact_email})</span>
              {company.industry && <span>• {company.industry}</span>}
              {company.company_size && <span>• {company.company_size}</span>}
              {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:underline flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Website
                </a>
              )}
            </div>
            {company.about && (
              <p className="text-xs text-text-secondary mt-2 line-clamp-2">{company.about}</p>
            )}
            <p className="text-xs text-text-muted mt-2">Registered {formatDate(company.created_at)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ApprovalStatusBadge status={company.approval_status} />
          {showActions && <CompanyApprovalActions companyId={company.id} />}
        </div>
      </div>
    </Card>
  );
}
