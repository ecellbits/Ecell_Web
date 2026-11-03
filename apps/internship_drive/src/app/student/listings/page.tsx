"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkeletonCard } from "@/components/ui/skeleton";
import { formatStipend, formatDuration, DEPARTMENT_TAGS } from "@/lib/utils";
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  Building2,
  Filter,
  X,
  ChevronRight,
  Award,
} from "lucide-react";
import type { Listing, Company } from "@/types/database";

type ListingWithCompany = Listing & { company: Pick<Company, "name" | "logo_url"> };

const MODE_OPTIONS = [
  { value: "", label: "All Modes" },
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
];

const DEPT_OPTIONS = [
  { value: "", label: "All Departments" },
  ...DEPARTMENT_TAGS.map((d) => ({ value: d, label: d })),
];

export default function StudentListingsPage() {
  const [listings, setListings] = useState<ListingWithCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");
  const [department, setDepartment] = useState("");
  const [ppoOnly, setPpoOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const supabase = createClient();

  const fetchListings = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("listings")
      .select("*, company:companies(name, logo_url)")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (mode) query = query.eq("mode", mode);
    if (department) query = query.eq("department_tag", department);
    if (ppoOnly) query = query.eq("ppo_possible", true);
    if (search) query = query.ilike("title", `%${search}%`);

    const { data } = await query;
    setListings((data as ListingWithCompany[]) || []);
    setLoading(false);
  }, [supabase, search, mode, department, ppoOnly]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const clearFilters = () => {
    setSearch("");
    setMode("");
    setDepartment("");
    setPpoOnly(false);
  };

  const hasFilters = search || mode || department || ppoOnly;

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">
          Browse Internships
        </h1>
        <p className="text-text-secondary mt-1">
          {listings.length} {listings.length === 1 ? "opportunity" : "opportunities"} available
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by title, company, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <Button
            variant={showFilters ? "primary" : "outline"}
            size="md"
            onClick={() => setShowFilters(!showFilters)}
            icon={<Filter className="w-4 h-4" />}
          >
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>

        {showFilters && (
          <Card variant="solid" padding="md" className="animate-[slide-down_0.2s_ease-out]">
            <div className="grid sm:grid-cols-3 gap-4">
              <Select
                label="Work Mode"
                options={MODE_OPTIONS}
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              />
              <Select
                label="Department"
                options={DEPT_OPTIONS}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer p-2.5">
                  <input
                    type="checkbox"
                    checked={ppoOnly}
                    onChange={(e) => setPpoOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-border-default bg-bg-card accent-accent-lime"
                  />
                  <span className="text-sm text-text-secondary">PPO possible only</span>
                </label>
              </div>
            </div>
            {hasFilters && (
              <div className="mt-3 pt-3 border-t border-border-default flex justify-end">
                <Button variant="ghost" size="sm" onClick={clearFilters} icon={<X className="w-3 h-3" />}>
                  Clear filters
                </Button>
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Listing Cards */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <Card variant="outlined" padding="lg" className="text-center py-20">
          <Briefcase className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2">
            No listings found
          </h3>
          <p className="text-sm text-text-secondary max-w-sm mx-auto">
            {hasFilters
              ? "Try adjusting your filters to see more results."
              : "No internships are available right now. Check back soon!"}
          </p>
          {hasFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">
              Clear all filters
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <Link key={listing.id} href={`/student/listings/${listing.id}`}>
              <Card variant="solid" hover padding="md" className="h-full flex flex-col group">
                {/* Company */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-[var(--radius-md)] bg-accent-purple/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-accent-purple" />
                  </div>
                  <span className="text-sm text-text-secondary truncate">
                    {listing.company?.name || "Unknown"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-text-primary font-[family-name:var(--font-heading)] group-hover:text-accent-lime transition-colors mb-2 line-clamp-2">
                  {listing.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Badge variant="default">
                    <MapPin className="w-3 h-3 mr-1" />
                    {listing.mode}
                  </Badge>
                  {listing.department_tag && (
                    <Badge variant="default">{listing.department_tag}</Badge>
                  )}
                  {listing.ppo_possible && (
                    <Badge variant="purple">
                      <Award className="w-3 h-3 mr-1" />
                      PPO
                    </Badge>
                  )}
                </div>

                {/* Details */}
                <div className="mt-auto space-y-1.5 pt-3 border-t border-border-default">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <IndianRupee className="w-3 h-3 text-accent-lime" />
                    <span>{formatStipend(listing.stipend_min, listing.stipend_max)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Clock className="w-3 h-3 text-accent-lime" />
                    <span>{formatDuration(listing.min_duration_months, listing.max_duration_months)}</span>
                  </div>
                  {listing.location && (
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <MapPin className="w-3 h-3 text-accent-lime" />
                      <span>{listing.location}</span>
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div className="mt-3 flex justify-end">
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent-lime transition-colors" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
