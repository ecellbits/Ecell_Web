"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import toast from "react-hot-toast";

export function CompanyMarkReadButton() {
  const router = useRouter();
  const supabase = createClient();

  const markAllRead = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
    if (error) toast.error("Failed to mark as read");
    else { toast.success("All marked as read"); router.refresh(); }
  };

  return <Button variant="ghost" size="sm" onClick={markAllRead} icon={<CheckCheck className="w-4 h-4" />}>Mark all read</Button>;
}
