import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Building2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
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
          Join the Drive
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Choose how you want to participate
        </p>
      </div>

      <div className="space-y-4">
        {/* Student Option */}
        <Link href="/register/student" className="block">
          <Card variant="solid" hover padding="lg" className="group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-accent-lime/10 flex items-center justify-center text-accent-lime group-hover:bg-accent-lime/20 transition-colors shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-text-primary group-hover:text-accent-lime transition-colors">
                  I&apos;m a Student
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  Discover internships, apply to startups, and kickstart your career.
                  Open to students from any college in India.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent-lime transition-colors shrink-0 mt-1" />
            </div>
          </Card>
        </Link>

        {/* Company Option */}
        <Link href="/register/company" className="block">
          <Card variant="solid" hover padding="lg" className="group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-accent-purple/10 flex items-center justify-center text-accent-purple group-hover:bg-accent-purple/20 transition-colors shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-text-primary group-hover:text-accent-purple transition-colors">
                  I&apos;m a Company
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  Post internships, access a curated multi-college talent pool,
                  and hire interns seamlessly.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent-purple transition-colors shrink-0 mt-1" />
            </div>
          </Card>
        </Link>
      </div>

      <p className="text-center text-sm text-text-secondary mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-accent-lime hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
