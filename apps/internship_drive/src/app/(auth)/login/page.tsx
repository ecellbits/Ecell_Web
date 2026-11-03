"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Welcome back!");
      router.push(redirect || "/");
      router.refresh();
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
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
          Welcome Back
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Sign in to your account to continue
        </p>
      </div>

      <Card variant="solid" padding="lg" className="border-border-default">
        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Sign In
          </Button>
        </form>
      </Card>

      <p className="text-center text-sm text-text-secondary mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-accent-lime hover:underline font-medium">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
