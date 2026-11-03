"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INDIAN_COLLEGES, DEGREE_OPTIONS } from "@/lib/utils";
import { Save, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import type { StudentProfile } from "@/types/database";

export default function StudentProfilePage() {
  const { user, supabase } = useAuth();
  const [profile, setProfile] = useState<Partial<StudentProfile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    async function fetchProfile() {
      const { data } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      if (data) setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, [user, supabase]);

  const updateField = (field: string, value: string | number | string[]) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !(profile.skills || []).includes(skill)) {
      updateField("skills", [...(profile.skills || []), skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    updateField("skills", (profile.skills || []).filter((s) => s !== skill));
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    setUploading(true);
    try {
      const fileName = `${user!.id}/${Date.now()}_resume.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("resumes")
        .getPublicUrl(fileName);

      updateField("resume_url", urlData.publicUrl);
      toast.success("Resume uploaded successfully!");
    } catch (err) {
      toast.error("Failed to upload resume");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      const isComplete = !!(
        profile.full_name &&
        profile.college_name &&
        profile.degree &&
        profile.branch &&
        profile.graduation_year &&
        profile.resume_url
      );

      const { error } = await supabase
        .from("student_profiles")
        .update({
          full_name: profile.full_name || "",
          phone: profile.phone || null,
          college_name: profile.college_name || "",
          degree: profile.degree || "",
          branch: profile.branch || "",
          graduation_year: profile.graduation_year || null,
          resume_url: profile.resume_url || null,
          linkedin_url: profile.linkedin_url || null,
          github_url: profile.github_url || null,
          portfolio_url: profile.portfolio_url || null,
          skills: profile.skills || [],
          bio: profile.bio || "",
          profile_complete: isComplete,
        })
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Profile saved!");
    } catch (err) {
      toast.error("Failed to save profile");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Calculate completion percentage
  const fields = [
    profile.full_name, profile.college_name, profile.degree,
    profile.branch, profile.graduation_year, profile.resume_url,
  ];
  const completedFields = fields.filter(Boolean).length;
  const completionPct = Math.round((completedFields / fields.length) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-accent-lime border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">My Profile</h1>
          <p className="text-text-secondary text-sm mt-1">
            Complete your profile to start applying
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          loading={saving}
          onClick={handleSave}
          icon={<Save className="w-4 h-4" />}
        >
          Save Changes
        </Button>
      </div>

      {/* Completion Indicator */}
      <Card variant="solid" padding="md">
        <div className="flex items-center gap-4">
          {completionPct === 100 ? (
            <CheckCircle className="w-5 h-5 text-success shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-warning shrink-0" />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">
                Profile {completionPct === 100 ? "Complete" : `${completionPct}% Complete`}
              </span>
              <span className="text-xs text-text-muted">{completedFields}/{fields.length} required fields</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-lime to-accent-lime-soft transition-all duration-500"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Basic Info */}
      <Card variant="solid" padding="lg">
        <CardTitle className="mb-5">Basic Information</CardTitle>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={profile.full_name || ""}
              onChange={(e) => updateField("full_name", e.target.value)}
              required
              placeholder="Your full name"
            />
            <Input
              label="Phone"
              type="tel"
              value={profile.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label="College/University"
              options={INDIAN_COLLEGES.map((c) => ({ value: c, label: c }))}
              value={profile.college_name || ""}
              onChange={(e) => updateField("college_name", e.target.value)}
              required
              placeholder="Select your college"
            />
            <Select
              label="Degree"
              options={DEGREE_OPTIONS.map((d) => ({ value: d, label: d }))}
              value={profile.degree || ""}
              onChange={(e) => updateField("degree", e.target.value)}
              required
              placeholder="Select degree"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Branch/Department"
              value={profile.branch || ""}
              onChange={(e) => updateField("branch", e.target.value)}
              required
              placeholder="e.g. Computer Science"
            />
            <Input
              label="Graduation Year"
              type="number"
              min={2024}
              max={2032}
              value={profile.graduation_year || ""}
              onChange={(e) => updateField("graduation_year", parseInt(e.target.value))}
              required
              placeholder="e.g. 2027"
            />
          </div>

          <Textarea
            label="Bio"
            value={profile.bio || ""}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="A short bio about yourself, your interests, and what you're looking for..."
            hint="Max 300 characters"
          />
        </div>
      </Card>

      {/* Resume */}
      <Card variant="solid" padding="lg">
        <CardTitle className="mb-5">Resume</CardTitle>
        <div className="space-y-4">
          {profile.resume_url ? (
            <div className="flex items-center gap-3 p-4 rounded-[var(--radius-xl)] bg-success/5 border border-success/20">
              <CheckCircle className="w-5 h-5 text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">Resume uploaded</p>
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent-lime hover:underline"
                >
                  View resume →
                </a>
              </div>
              <label className="cursor-pointer">
                <Button variant="outline" size="sm" loading={uploading}>
                  Replace
                </Button>
                <input type="file" accept=".pdf" className="hidden" onChange={handleResumeUpload} />
              </label>
            </div>
          ) : (
            <label className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-border-default rounded-[var(--radius-xl)] hover:border-accent-lime/30 cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-text-muted" />
              <div className="text-center">
                <p className="text-sm font-medium text-text-primary">
                  {uploading ? "Uploading..." : "Click to upload your resume"}
                </p>
                <p className="text-xs text-text-muted mt-1">PDF only, max 2MB</p>
              </div>
              <input type="file" accept=".pdf" className="hidden" onChange={handleResumeUpload} />
            </label>
          )}
        </div>
      </Card>

      {/* Skills */}
      <Card variant="solid" padding="lg">
        <CardTitle className="mb-5">Skills</CardTitle>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Type a skill and press Add"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              className="flex-1"
            />
            <Button variant="outline" size="md" onClick={addSkill}>
              Add
            </Button>
          </div>
          {(profile.skills || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(profile.skills || []).map((skill) => (
                <Badge key={skill} variant="lime" className="gap-1">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="hover:text-error transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Links */}
      <Card variant="solid" padding="lg">
        <CardTitle className="mb-5">Links (Optional)</CardTitle>
        <div className="space-y-4">
          <Input
            label="LinkedIn"
            type="url"
            value={profile.linkedin_url || ""}
            onChange={(e) => updateField("linkedin_url", e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
          />
          <Input
            label="GitHub"
            type="url"
            value={profile.github_url || ""}
            onChange={(e) => updateField("github_url", e.target.value)}
            placeholder="https://github.com/yourusername"
          />
          <Input
            label="Portfolio"
            type="url"
            value={profile.portfolio_url || ""}
            onChange={(e) => updateField("portfolio_url", e.target.value)}
            placeholder="https://yourportfolio.com"
          />
        </div>
      </Card>

      {/* Save Button (bottom) */}
      <div className="flex justify-end">
        <Button variant="primary" size="lg" loading={saving} onClick={handleSave} icon={<Save className="w-4 h-4" />}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
