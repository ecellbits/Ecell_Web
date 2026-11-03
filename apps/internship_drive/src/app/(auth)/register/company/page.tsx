"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Mail, Lock, Building2, User, Globe, Phone, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";
import { verifyTurnstileToken } from "@/app/actions/auth";

const INDUSTRY_OPTIONS = [
  "Technology", "FinTech", "EdTech", "HealthTech", "E-Commerce",
  "SaaS", "AI / ML", "Blockchain / Web3", "CleanTech", "AgriTech",
  "Media & Entertainment", "Logistics", "D2C / Retail", "Consulting",
  "Marketing & Advertising", "Other",
].map((v) => ({ value: v, label: v }));

const SIZE_OPTIONS = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-500", label: "201–500 employees" },
  { value: "500+", label: "500+ employees" },
];

export default function CompanyRegisterPage() {
  const [form, setForm] = useState({
    companyName: "",
    website: "",
    industry: "",
    companySize: "",
    hrName: "",
    hrEmail: "",
    hrPhone: "",
    about: "",
    password: "",
    confirmPassword: "",
  });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!turnstileToken && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY !== "placeholder") {
      toast.error("Please complete the security check");
      return;
    }

    setLoading(true);

    try {
      // 1. Verify Turnstile Token securely on the server
      const { success: turnstileSuccess } = await verifyTurnstileToken(turnstileToken);
      if (!turnstileSuccess) {
        toast.error("Security check failed. Please try again.");
        setLoading(false);
        return;
      }

      // 2. Register with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.hrEmail,
        password: form.password,
        options: {
          data: {
            role: "company",
            company_name: form.companyName,
            hr_contact_name: form.hrName,
          },
          emailRedirectTo: `${window.location.origin}/company`,
        },
      });

      if (authError) {
        toast.error(authError.message);
        return;
      }

      // Update company details (the trigger creates a basic company record)
      if (authData.user) {
        const { error: updateError } = await supabase
          .from("companies")
          .update({
            name: form.companyName,
            website: form.website || null,
            industry: form.industry || null,
            company_size: form.companySize || null,
            hr_contact_name: form.hrName,
            hr_contact_email: form.hrEmail,
            hr_contact_phone: form.hrPhone || null,
            about: form.about || "",
          })
          .eq("user_id", authData.user.id);

        if (updateError) {
          console.error("Error updating company:", updateError);
        }
      }

      toast.success("Registration submitted! Please check your email to verify your account.");
      router.push("/verify-email?email=" + encodeURIComponent(form.hrEmail) + "&type=company");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-[fade-in_0.5s_ease-out] max-w-lg mx-auto">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent-lime flex items-center justify-center">
            <span className="text-black font-bold font-[family-name:var(--font-heading)]">ID</span>
          </div>
          <span className="text-xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
            Internship Drive
          </span>
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-medium mb-3">
          <Building2 className="w-3.5 h-3.5" />
          Company Registration
        </div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
          Partner with Us
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Access a curated multi-college intern talent pool
        </p>
      </div>

      <Card variant="solid" padding="lg" className="border-border-default">
        <form onSubmit={handleRegister} className="space-y-5">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider font-[family-name:var(--font-ui)]">
            Company Details
          </h3>

          <Input
            label="Company Name"
            type="text"
            placeholder="Your startup name"
            value={form.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            required
            icon={<Building2 className="w-4 h-4" />}
          />

          <Input
            label="Website"
            type="url"
            placeholder="https://yourcompany.com"
            value={form.website}
            onChange={(e) => updateField("website", e.target.value)}
            icon={<Globe className="w-4 h-4" />}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Industry"
              options={INDUSTRY_OPTIONS}
              value={form.industry}
              onChange={(e) => updateField("industry", e.target.value)}
              placeholder="Select industry"
            />
            <Select
              label="Company Size"
              options={SIZE_OPTIONS}
              value={form.companySize}
              onChange={(e) => updateField("companySize", e.target.value)}
              placeholder="Select size"
            />
          </div>

          <Textarea
            label="About Your Company"
            placeholder="Tell us briefly about your company, what you do, and your culture..."
            value={form.about}
            onChange={(e) => updateField("about", e.target.value)}
            hint="This will be visible to applicants"
          />

          <div className="border-t border-border-default pt-5">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider font-[family-name:var(--font-ui)] mb-4">
              HR Contact
            </h3>

            <div className="space-y-4">
              <Input
                label="Contact Name"
                type="text"
                placeholder="HR contact person"
                value={form.hrName}
                onChange={(e) => updateField("hrName", e.target.value)}
                required
                icon={<User className="w-4 h-4" />}
              />

              <Input
                label="Email"
                type="email"
                placeholder="hr@yourcompany.com"
                value={form.hrEmail}
                onChange={(e) => updateField("hrEmail", e.target.value)}
                required
                hint="This will also be your login email"
                icon={<Mail className="w-4 h-4" />}
              />

              <Input
                label="Phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.hrPhone}
                onChange={(e) => updateField("hrPhone", e.target.value)}
                icon={<Phone className="w-4 h-4" />}
              />
            </div>
          </div>

          <div className="border-t border-border-default pt-5">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider font-[family-name:var(--font-ui)] mb-4">
              Set Password
            </h3>

            <div className="space-y-4">
              <Input
                label="Password"
                type="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                required
                icon={<Lock className="w-4 h-4" />}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                required
                icon={<Lock className="w-4 h-4" />}
              />
            </div>
          </div>

          <div className="flex justify-center py-2">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
              onSuccess={(token) => setTurnstileToken(token)}
            />
          </div>

          <Button
            type="submit"
            variant="secondary"
            size="lg"
            loading={loading}
            className="w-full"
            iconRight={<ArrowRight className="w-5 h-5" />}
          >
            Submit Registration
          </Button>

          <p className="text-xs text-text-muted text-center">
            Your registration will be reviewed by the E-Cell team. You&apos;ll be notified once approved.
          </p>
        </form>
      </Card>

      <p className="text-center text-sm text-text-secondary mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-accent-lime hover:underline font-medium">
          Sign in
        </Link>
      </p>
      <p className="text-center text-sm text-text-secondary mt-2">
        <Link href="/register/student" className="text-accent-lime hover:underline font-medium">
          ← Register as a student instead
        </Link>
      </p>
    </div>
  );
}
