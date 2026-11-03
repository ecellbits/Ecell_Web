"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEPARTMENT_TAGS } from "@/lib/utils";
import { Save, ArrowLeft, X, Plus } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

const MODE_OPTIONS = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
];

const DEPT_OPTIONS = DEPARTMENT_TAGS.map((d) => ({ value: d, label: d }));

export default function NewListingPage() {
  const [form, setForm] = useState({
    title: "",
    department_tag: "",
    description: "",
    responsibilities: "",
    required_skills: [] as string[],
    eligibility_notes: "",
    min_duration_months: 2,
    max_duration_months: 6,
    stipend_min: 0,
    stipend_max: 0,
    mode: "remote",
    location: "",
    openings_count: 1,
    application_deadline: "",
    ppo_possible: false,
  });
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [seasonId, setSeasonId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: company } = await supabase.from("companies").select("id").eq("user_id", user.id).single();
      if (company) setCompanyId(company.id);
      const { data: season } = await supabase.from("drive_seasons").select("id").eq("is_current", true).single();
      if (season) setSeasonId(season.id);
    }
    loadData();
  }, [supabase]);

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !form.required_skills.includes(skill)) {
      updateField("required_skills", [...form.required_skills, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    updateField("required_skills", form.required_skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId || !seasonId) {
      toast.error("Company or season not found");
      return;
    }
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("listings").insert({
        company_id: companyId,
        season_id: seasonId,
        title: form.title,
        department_tag: form.department_tag || null,
        description: form.description,
        responsibilities: form.responsibilities,
        required_skills: form.required_skills,
        eligibility_notes: form.eligibility_notes,
        min_duration_months: form.min_duration_months,
        max_duration_months: form.max_duration_months,
        stipend_min: form.stipend_min,
        stipend_max: form.stipend_max,
        mode: form.mode,
        location: form.location || null,
        openings_count: form.openings_count,
        application_deadline: form.application_deadline || null,
        ppo_possible: form.ppo_possible,
        status: "pending_approval",
      });

      if (error) throw error;

      toast.success("Listing submitted for approval!");
      router.push("/company/listings");
    } catch (err) {
      toast.error("Failed to create listing");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] max-w-3xl mx-auto space-y-6">
      <Link href="/company/listings" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-lime transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to listings
      </Link>

      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Post New Internship</h1>
        <p className="text-text-secondary text-sm mt-1">Your listing will be reviewed before going live.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card variant="solid" padding="lg">
          <CardTitle className="mb-5">Basic Information</CardTitle>
          <div className="space-y-4">
            <Input label="Title" value={form.title} onChange={(e) => updateField("title", e.target.value)} required placeholder="e.g. Frontend Developer Intern" />
            <Select label="Department" options={DEPT_OPTIONS} value={form.department_tag} onChange={(e) => updateField("department_tag", e.target.value)} placeholder="Select department" />
            <Textarea label="Description" value={form.description} onChange={(e) => updateField("description", e.target.value)} required placeholder="Describe the role, team, and what the intern will work on..." />
            <Textarea label="Responsibilities" value={form.responsibilities} onChange={(e) => updateField("responsibilities", e.target.value)} placeholder="List the key responsibilities..." />
          </div>
        </Card>

        {/* Skills */}
        <Card variant="solid" padding="lg">
          <CardTitle className="mb-5">Required Skills</CardTitle>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} className="flex-1" />
              <Button type="button" variant="outline" size="md" onClick={addSkill} icon={<Plus className="w-4 h-4" />}>Add</Button>
            </div>
            {form.required_skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.required_skills.map((skill) => (
                  <Badge key={skill} variant="lime" className="gap-1">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}><X className="w-3 h-3" /></button>
                  </Badge>
                ))}
              </div>
            )}
            <Textarea label="Eligibility Notes" value={form.eligibility_notes} onChange={(e) => updateField("eligibility_notes", e.target.value)} placeholder="Any specific eligibility criteria..." />
          </div>
        </Card>

        {/* Details */}
        <Card variant="solid" padding="lg">
          <CardTitle className="mb-5">Internship Details</CardTitle>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Min Duration (months)" type="number" min={1} max={12} value={form.min_duration_months} onChange={(e) => updateField("min_duration_months", parseInt(e.target.value))} />
              <Input label="Max Duration (months)" type="number" min={1} max={12} value={form.max_duration_months} onChange={(e) => updateField("max_duration_months", parseInt(e.target.value))} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Stipend Min (₹/month)" type="number" min={0} value={form.stipend_min} onChange={(e) => updateField("stipend_min", parseInt(e.target.value))} />
              <Input label="Stipend Max (₹/month)" type="number" min={0} value={form.stipend_max} onChange={(e) => updateField("stipend_max", parseInt(e.target.value))} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Select label="Work Mode" options={MODE_OPTIONS} value={form.mode} onChange={(e) => updateField("mode", e.target.value)} required />
              <Input label="Location" value={form.location} onChange={(e) => updateField("location", e.target.value)} placeholder="e.g. Bangalore, India" hint="Required for on-site/hybrid" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Number of Openings" type="number" min={1} value={form.openings_count} onChange={(e) => updateField("openings_count", parseInt(e.target.value))} />
              <Input label="Application Deadline" type="date" value={form.application_deadline} onChange={(e) => updateField("application_deadline", e.target.value)} />
            </div>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-[var(--radius-lg)] hover:bg-white/5 transition-colors">
              <input type="checkbox" checked={form.ppo_possible} onChange={(e) => updateField("ppo_possible", e.target.checked)} className="w-4 h-4 rounded accent-accent-lime" />
              <div>
                <span className="text-sm text-text-primary font-medium">PPO Possible</span>
                <p className="text-xs text-text-muted">Strong performers may receive a Pre-Placement Offer</p>
              </div>
            </label>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/company/listings">
            <Button type="button" variant="ghost" size="md">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary" size="lg" loading={loading} icon={<Save className="w-4 h-4" />}>
            Submit for Approval
          </Button>
        </div>
      </form>
    </div>
  );
}
