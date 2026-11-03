import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  Briefcase,
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Counts
  const [
    { count: totalStudents },
    { count: totalCompanies },
    { count: pendingCompanies },
    { count: totalListings },
    { count: pendingListings },
    { count: totalApplications },
    { count: selectedCount },
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }).eq("role", "student"),
    supabase.from("companies").select("*", { count: "exact", head: true }),
    supabase.from("companies").select("*", { count: "exact", head: true }).eq("approval_status", "pending"),
    supabase.from("listings").select("*", { count: "exact", head: true }),
    supabase.from("listings").select("*", { count: "exact", head: true }).eq("status", "pending_approval"),
    supabase.from("applications").select("*", { count: "exact", head: true }),
    supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "selected"),
  ]);

  // Season
  const { data: season } = await supabase
    .from("drive_seasons")
    .select("name, applications_open")
    .eq("is_current", true)
    .single();

  const stats = [
    { label: "Students", value: totalStudents || 0, icon: <Users className="w-5 h-5" />, color: "text-accent-lime", href: "/admin/students" },
    { label: "Companies", value: totalCompanies || 0, icon: <Building2 className="w-5 h-5" />, color: "text-accent-purple", href: "/admin/companies" },
    { label: "Listings", value: totalListings || 0, icon: <Briefcase className="w-5 h-5" />, color: "text-info", href: "/admin/listings" },
    { label: "Applications", value: totalApplications || 0, icon: <FileText className="w-5 h-5" />, color: "text-warning" },
    { label: "Selected", value: selectedCount || 0, icon: <CheckCircle className="w-5 h-5" />, color: "text-success" },
    { label: "Placement Rate", value: totalApplications ? `${Math.round(((selectedCount || 0) / (totalApplications || 1)) * 100)}%` : "—", icon: <TrendingUp className="w-5 h-5" />, color: "text-accent-lime" },
  ];

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">Admin Dashboard</h1>
          <p className="text-text-secondary mt-1">{season?.name || "Internship Drive"}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${season?.applications_open ? "bg-success animate-pulse" : "bg-error"}`} />
          <span className="text-xs text-text-muted">{season?.applications_open ? "Applications Open" : "Applications Closed"}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href || "#"}>
            <Card variant="solid" hover padding="md">
              <div className="flex items-center gap-3">
                <div className={stat.color}>{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold font-[family-name:var(--font-heading)]">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Action Queue */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Companies */}
        <Card variant="solid" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] flex items-center gap-2">
              {(pendingCompanies || 0) > 0 && <AlertCircle className="w-4 h-4 text-warning" />}
              Pending Companies
            </h2>
            <Link href="/admin/companies" className="text-sm text-accent-lime hover:underline">
              View all →
            </Link>
          </div>
          {(pendingCompanies || 0) === 0 ? (
            <p className="text-sm text-text-muted py-4 text-center">No pending approvals 🎉</p>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-[var(--radius-xl)] bg-warning/5 border border-warning/20">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-warning" />
                <p className="text-sm font-medium">{pendingCompanies} companies need review</p>
              </div>
              <Link href="/admin/companies">
                <Button variant="outline" size="sm" iconRight={<ArrowRight className="w-3 h-3" />}>Review</Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Pending Listings */}
        <Card variant="solid" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] flex items-center gap-2">
              {(pendingListings || 0) > 0 && <AlertCircle className="w-4 h-4 text-warning" />}
              Pending Listings
            </h2>
            <Link href="/admin/listings" className="text-sm text-accent-lime hover:underline">
              View all →
            </Link>
          </div>
          {(pendingListings || 0) === 0 ? (
            <p className="text-sm text-text-muted py-4 text-center">No pending approvals 🎉</p>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-[var(--radius-xl)] bg-warning/5 border border-warning/20">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-warning" />
                <p className="text-sm font-medium">{pendingListings} listings need review</p>
              </div>
              <Link href="/admin/listings">
                <Button variant="outline" size="sm" iconRight={<ArrowRight className="w-3 h-3" />}>Review</Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
