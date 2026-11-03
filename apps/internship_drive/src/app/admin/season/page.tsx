"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { Save, Settings } from "lucide-react";
import toast from "react-hot-toast";
import type { DriveSeason } from "@/types/database";

export default function AdminSeasonPage() {
  const [season, setSeason] = useState<Partial<DriveSeason>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from("drive_seasons").select("*").eq("is_current", true).single();
      if (data) setSeason(data);
      setLoading(false);
    }
    fetch();
  }, [supabase]);

  const updateField = (field: string, value: any) => {
    setSeason((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!season.id) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("drive_seasons").update({
        name: season.name,
        banner_message: season.banner_message,
        landing_hero_title: season.landing_hero_title,
        landing_hero_subtitle: season.landing_hero_subtitle,
        max_active_applications: season.max_active_applications,
        applications_open: season.applications_open,
        registration_open_at: season.registration_open_at || null,
        registration_close_at: season.registration_close_at || null,
        application_deadline: season.application_deadline || null,
      }).eq("id", season.id);
      if (error) throw error;
      toast.success("Season settings saved!");
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20">
      <div className="animate-spin w-8 h-8 border-2 border-accent-lime border-t-transparent rounded-full" />
    </div>;
  }

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Season Settings</h1>
          <p className="text-text-secondary text-sm mt-1">Manage the current drive season</p>
        </div>
        <Button variant="primary" size="md" loading={saving} onClick={handleSave} icon={<Save className="w-4 h-4" />}>
          Save Changes
        </Button>
      </div>

      {/* General */}
      <Card variant="solid" padding="lg">
        <CardTitle className="mb-5">General</CardTitle>
        <div className="space-y-4">
          <Input label="Season Name" value={season.name || ""} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g. Internship Drive 2027" />
          <Input label="Banner Message" value={season.banner_message || ""} onChange={(e) => updateField("banner_message", e.target.value)} placeholder="Shown on the landing page" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Max Active Applications per Student" type="number" min={1} max={50} value={season.max_active_applications || 10} onChange={(e) => updateField("max_active_applications", parseInt(e.target.value))} />
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer p-2.5">
                <input type="checkbox" checked={season.applications_open || false} onChange={(e) => updateField("applications_open", e.target.checked)} className="w-4 h-4 rounded accent-accent-lime" />
                <div>
                  <span className="text-sm text-text-primary font-medium">Applications Open</span>
                  <p className="text-xs text-text-muted">Toggle to open/close applications</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Landing Page */}
      <Card variant="solid" padding="lg">
        <CardTitle className="mb-5">Landing Page Content</CardTitle>
        <div className="space-y-4">
          <Input label="Hero Title" value={season.landing_hero_title || ""} onChange={(e) => updateField("landing_hero_title", e.target.value)} />
          <Input label="Hero Subtitle" value={season.landing_hero_subtitle || ""} onChange={(e) => updateField("landing_hero_subtitle", e.target.value)} />
        </div>
      </Card>

      {/* Timeline */}
      <Card variant="solid" padding="lg">
        <CardTitle className="mb-5">Important Dates</CardTitle>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Registration Opens" type="datetime-local" value={season.registration_open_at?.slice(0, 16) || ""} onChange={(e) => updateField("registration_open_at", e.target.value)} />
            <Input label="Registration Closes" type="datetime-local" value={season.registration_close_at?.slice(0, 16) || ""} onChange={(e) => updateField("registration_close_at", e.target.value)} />
          </div>
          <Input label="Application Deadline" type="datetime-local" value={season.application_deadline?.slice(0, 16) || ""} onChange={(e) => updateField("application_deadline", e.target.value)} />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" size="lg" loading={saving} onClick={handleSave} icon={<Save className="w-4 h-4" />}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
