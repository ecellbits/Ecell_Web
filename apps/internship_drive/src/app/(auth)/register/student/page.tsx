"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Lock, User, ArrowRight, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";
import { verifyTurnstileToken } from "@/app/actions/auth";

export default function StudentRegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "student",
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/student`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Registration successful! Please check your email to verify your account.");
      router.push("/verify-email?email=" + encodeURIComponent(email));
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-[fade-in_0.5s_ease-out]">
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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-lime/10 border border-accent-lime/20 text-accent-lime text-xs font-medium mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          Student Registration
        </div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
          Create Your Account
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Start exploring internship opportunities
        </p>
      </div>

      <Card variant="solid" padding="lg" className="border-border-default">
        <form onSubmit={handleRegister} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            icon={<User className="w-4 h-4" />}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            hint="Any email domain accepted — not restricted to college email"
            icon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<Lock className="w-4 h-4" />}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            icon={<Lock className="w-4 h-4" />}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
            iconRight={<ArrowRight className="w-5 h-5" />}
          >
            Create Account
          </Button>
        </form>
      </Card>

      <p className="text-center text-sm text-text-secondary mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-accent-lime hover:underline font-medium">
          Sign in
        </Link>
      </p>
      <p className="text-center text-sm text-text-secondary mt-2">
        <Link href="/register/company" className="text-accent-purple hover:underline font-medium">
          Register as a company instead →
        </Link>
      </p>
    </div>
  );
}
