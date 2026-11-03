"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type");

  return (
    <div className="animate-[fade-in_0.5s_ease-out] text-center">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent-lime flex items-center justify-center">
            <span className="text-black font-bold font-[family-name:var(--font-heading)]">ID</span>
          </div>
          <span className="text-xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
            Internship Drive
          </span>
        </Link>
      </div>

      <Card variant="solid" padding="lg" className="border-border-default">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-accent-lime/10 flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-accent-lime" />
          </div>

          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-text-primary mb-2">
            Check Your Email
          </h1>

          <p className="text-sm text-text-secondary max-w-sm mb-6">
            We&apos;ve sent a verification link to{" "}
            {email && <span className="text-text-primary font-medium">{email}</span>}.
            Click the link to verify your account.
          </p>

          {type === "company" && (
            <div className="w-full p-4 rounded-[var(--radius-xl)] bg-accent-purple/5 border border-accent-purple/20 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent-purple shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-medium text-text-primary">Company Registration Note</p>
                  <p className="text-xs text-text-secondary mt-1">
                    After email verification, your company registration will be reviewed by the
                    E-Cell team. You&apos;ll receive an email once approved. This typically takes 24–48 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 w-full">
            <Link href="/login" className="block">
              <Button variant="primary" size="md" className="w-full" iconRight={<ArrowRight className="w-4 h-4" />}>
                Go to Login
              </Button>
            </Link>
            <p className="text-xs text-text-muted">
              Didn&apos;t receive the email? Check your spam folder or try registering again.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
