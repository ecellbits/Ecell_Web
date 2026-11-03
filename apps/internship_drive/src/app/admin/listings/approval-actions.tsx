"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { approveListing, rejectListing } from "@/app/actions/admin";

export function ListingApprovalActions({ listingId }: { listingId: string }) {
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleApprove = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      
      await approveListing(listingId, user.id);
      
      toast.success("Listing approved and now live!");
    } catch { toast.error("Failed to approve"); }
    finally { setLoading(false); }
  };

  const handleReject = async () => {
    if (!reason.trim()) { toast.error("Please provide a reason"); return; }
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      await rejectListing(listingId, user.id, reason);

      toast.success("Listing rejected");
      setRejectOpen(false);
    } catch { toast.error("Failed to reject"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="primary" size="sm" loading={loading} onClick={handleApprove} icon={<CheckCircle className="w-3 h-3" />}>Approve</Button>
        <Button variant="danger" size="sm" onClick={() => setRejectOpen(true)} icon={<XCircle className="w-3 h-3" />}>Reject</Button>
      </div>
      <Dialog open={rejectOpen} onClose={() => setRejectOpen(false)} title="Reject Listing" size="sm">
        <div className="space-y-4">
          <Textarea label="Reason" value={reason} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)} required placeholder="Why is this listing being rejected?" />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="md" onClick={() => setRejectOpen(false)}>Cancel</Button>
            <Button variant="danger" size="md" loading={loading} onClick={handleReject}>Reject</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
