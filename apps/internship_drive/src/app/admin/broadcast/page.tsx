"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { Send, Megaphone } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminBroadcastPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [targetRole, setTargetRole] = useState("all");
  const [sending, setSending] = useState(false);
  const supabase = createClient();

  const handleBroadcast = async () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Title and body are required");
      return;
    }

    setSending(true);
    try {
      // Fetch target users
      let query = supabase.from("users").select("id").eq("is_active", true);
      if (targetRole !== "all") query = query.eq("role", targetRole);
      const { data: users } = await query;

      if (!users || users.length === 0) {
        toast.error("No users match the target criteria");
        setSending(false);
        return;
      }

      // Insert notifications for all target users
      const notifications = users.map((u) => ({
        user_id: u.id,
        type: "broadcast" as const,
        title,
        body,
      }));

      // Insert in batches of 100
      for (let i = 0; i < notifications.length; i += 100) {
        const batch = notifications.slice(i, i + 100);
        const { error } = await supabase.from("notifications").insert(batch);
        if (error) throw error;
      }

      toast.success(`Broadcast sent to ${users.length} users!`);
      setTitle("");
      setBody("");
    } catch (err) {
      toast.error("Failed to send broadcast");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Broadcast Message</h1>
        <p className="text-text-secondary text-sm mt-1">Send an in-app notification to all users</p>
      </div>

      <Card variant="solid" padding="lg">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-secondary font-[family-name:var(--font-ui)] mb-2">
              Target Audience
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "All Users" },
                { value: "student", label: "Students Only" },
                { value: "company", label: "Companies Only" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTargetRole(opt.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    targetRole === opt.value
                      ? "bg-accent-lime text-black"
                      : "bg-white/5 text-text-secondary border border-border-default hover:border-accent-lime/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. New companies have joined the drive!"
          />

          <Textarea
            label="Message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            placeholder="Write your announcement here..."
          />

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              loading={sending}
              onClick={handleBroadcast}
              icon={<Send className="w-4 h-4" />}
            >
              Send Broadcast
            </Button>
            <p className="text-xs text-text-muted text-center mt-2">
              This will send an in-app notification to all matching users.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
