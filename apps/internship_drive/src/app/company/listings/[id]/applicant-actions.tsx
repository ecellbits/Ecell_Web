"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";
import { ChevronDown, Calendar, UserCheck } from "lucide-react";
import toast from "react-hot-toast";
import type { ApplicationStatus } from "@/types/database";
import { updateApplicationStatus } from "@/app/actions/company";

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "applied", label: "Applied" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview_scheduled", label: "Interview Scheduled" },
  { value: "selected", label: "Selected" },
  { value: "rejected", label: "Rejected" },
];

interface ApplicantActionsProps {
  applicationId: string;
  currentStatus: ApplicationStatus;
}

export function ApplicantActions({ applicationId, currentStatus }: ApplicantActionsProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ApplicationStatus>(currentStatus);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewMode, setInterviewMode] = useState("online");
  const [interviewLink, setInterviewLink] = useState("");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (status === "interview_scheduled" && !interviewDate) {
        toast.error("Please set an interview date");
        setLoading(false);
        return;
      }

      await updateApplicationStatus(
        applicationId, 
        status, 
        status === "interview_scheduled" ? {
          date: interviewDate,
          mode: interviewMode,
          link: interviewLink,
          notes: interviewNotes
        } : undefined
      );

      toast.success(`Status updated to ${status.replace("_", " ")}`);
      setOpen(false);
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Quick action buttons
  const quickActions = [];
  if (currentStatus === "applied") {
    quickActions.push(
      <Button key="shortlist" variant="outline" size="sm" onClick={() => { setStatus("shortlisted"); setOpen(true); }} icon={<UserCheck className="w-3 h-3" />}>
        Shortlist
      </Button>
    );
  }
  if (currentStatus === "shortlisted") {
    quickActions.push(
      <Button key="interview" variant="outline" size="sm" onClick={() => { setStatus("interview_scheduled"); setOpen(true); }} icon={<Calendar className="w-3 h-3" />}>
        Schedule
      </Button>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {quickActions}
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)} icon={<ChevronDown className="w-3 h-3" />}>
          Update
        </Button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} title="Update Application Status" size="md">
        <div className="space-y-4">
          <Select
            label="New Status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
          />

          {status === "interview_scheduled" && (
            <div className="space-y-4 p-4 rounded-[var(--radius-lg)] bg-warning/5 border border-warning/20">
              <p className="text-xs font-medium text-warning uppercase tracking-wider">Interview Details</p>
              <Input label="Date & Time" type="datetime-local" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} required />
              <Select label="Mode" options={[{ value: "online", label: "Online" }, { value: "offline", label: "Offline" }]} value={interviewMode} onChange={(e) => setInterviewMode(e.target.value)} />
              <Input label="Meeting Link" type="url" value={interviewLink} onChange={(e) => setInterviewLink(e.target.value)} placeholder="https://meet.google.com/..." />
              <Textarea label="Notes for Student" value={interviewNotes} onChange={(e) => setInterviewNotes(e.target.value)} placeholder="Any preparation instructions or details..." />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" size="md" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="md" loading={loading} onClick={handleUpdate}>Update Status</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
