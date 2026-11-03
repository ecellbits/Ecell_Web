"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { ApplicationStatusBadge } from "@/components/ui/badge";
import { Send, AlertCircle, CheckCircle, FileText } from "lucide-react";
import toast from "react-hot-toast";
import type { ApplicationStatus } from "@/types/database";

interface ApplyButtonProps {
  listingId: string;
  existingApp: { id: string; status: ApplicationStatus } | null;
  canApply: boolean;
  profileComplete: boolean;
  resumeUrl: string | null;
  applicationsOpen: boolean;
  activeAppsCount: number;
  maxApps: number;
}

export function ApplyButton({
  listingId,
  existingApp,
  canApply,
  profileComplete,
  resumeUrl,
  applicationsOpen,
  activeAppsCount,
  maxApps,
}: ApplyButtonProps) {
  const [coverNote, setCoverNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(!!existingApp);
  const router = useRouter();
  const supabase = createClient();

  const handleApply = async () => {
    if (!canApply) return;
    setLoading(true);

    try {
      const { error } = await supabase.from("applications").insert({
        listing_id: listingId,
        student_id: (await supabase.auth.getUser()).data.user!.id,
        cover_note: coverNote,
        resume_url_snapshot: resumeUrl,
        status: "applied",
      });

      if (error) {
        if (error.code === "23505") {
          toast.error("You have already applied to this listing.");
        } else {
          throw error;
        }
        return;
      }

      setApplied(true);
      toast.success("Application submitted successfully!");
      router.refresh();
    } catch (err) {
      toast.error("Failed to submit application. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (existingApp || applied) {
    return (
      <Card variant="solid" padding="lg" className="border-success/20">
        <div className="text-center space-y-3">
          <CheckCircle className="w-8 h-8 text-success mx-auto" />
          <p className="font-medium text-text-primary text-sm">You&apos;ve applied!</p>
          <ApplicationStatusBadge status={existingApp?.status || "applied"} />
          <a
            href="/student/applications"
            className="block text-xs text-accent-lime hover:underline mt-2"
          >
            View in My Applications →
          </a>
        </div>
      </Card>
    );
  }

  if (!applicationsOpen) {
    return (
      <Card variant="solid" padding="lg" className="border-warning/20">
        <div className="text-center space-y-2">
          <AlertCircle className="w-6 h-6 text-warning mx-auto" />
          <p className="text-sm text-text-secondary">Applications are currently closed.</p>
        </div>
      </Card>
    );
  }

  if (!profileComplete) {
    return (
      <Card variant="solid" padding="lg" className="border-warning/20">
        <div className="text-center space-y-3">
          <AlertCircle className="w-6 h-6 text-warning mx-auto" />
          <p className="text-sm text-text-secondary">
            Complete your profile to apply.
          </p>
          <a href="/student/profile">
            <Button variant="outline" size="sm">Complete Profile</Button>
          </a>
        </div>
      </Card>
    );
  }

  if (activeAppsCount >= maxApps) {
    return (
      <Card variant="solid" padding="lg" className="border-warning/20">
        <div className="text-center space-y-2">
          <AlertCircle className="w-6 h-6 text-warning mx-auto" />
          <p className="text-sm text-text-secondary">
            You&apos;ve reached the maximum of {maxApps} active applications.
          </p>
          <p className="text-xs text-text-muted">
            Withdraw an existing application to apply here.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="solid" padding="lg">
      <CardTitle className="mb-4">Apply Now</CardTitle>
      <div className="space-y-4">
        <Textarea
          label="Cover Note (Optional)"
          value={coverNote}
          onChange={(e) => setCoverNote(e.target.value)}
          placeholder="Why are you interested in this role? Highlight relevant experience..."
          hint="Keep it brief — 2-3 sentences is ideal"
        />

        {resumeUrl && (
          <div className="flex items-center gap-2 p-3 rounded-[var(--radius-lg)] bg-success/5 border border-success/20">
            <FileText className="w-4 h-4 text-success" />
            <span className="text-xs text-text-secondary">Your current resume will be attached</span>
          </div>
        )}

        <p className="text-xs text-text-muted">
          {activeAppsCount}/{maxApps} active applications used
        </p>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          loading={loading}
          onClick={handleApply}
          icon={<Send className="w-4 h-4" />}
        >
          Submit Application
        </Button>
      </div>
    </Card>
  );
}
