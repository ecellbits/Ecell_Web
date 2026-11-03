import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import {
  Briefcase,
  GraduationCap,
  Building2,
  ArrowRight,
  Sparkles,
  Users,
  TrendingUp,
  MapPin,
} from "lucide-react";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();
    if (userData) redirect(`/${userData.role}`);
  }

  // Fetch current season data
  const { data: season } = await supabase
    .from("drive_seasons")
    .select("*")
    .eq("is_current", true)
    .single();

  const stats = (season?.landing_stats as Array<{ label: string; value: string; description: string }>) || [];
  const faqs = (season?.landing_faq as Array<{ question: string; answer: string }>) || [];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-lime/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_2s]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-lime/20 to-transparent" />
        </div>

        {/* Nav */}
        <nav className="absolute top-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[var(--radius-md)] bg-accent-lime flex items-center justify-center">
                <span className="text-black font-bold text-sm font-[family-name:var(--font-heading)]">ID</span>
              </div>
              <span className="text-lg font-bold text-text-primary font-[family-name:var(--font-heading)]">
                Internship Drive
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">Register</Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-lime/10 border border-accent-lime/20 text-accent-lime text-sm font-medium mb-8 animate-[fade-in_0.5s_ease-out]">
            <Sparkles className="w-4 h-4" />
            {season?.banner_message || "Registration is now open!"}
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-[family-name:var(--font-heading)] bg-[linear-gradient(135deg,#d4ff00,#bcff2f)] bg-clip-text text-transparent leading-tight mb-6 animate-[fade-in_0.7s_ease-out]">
            {season?.landing_hero_title || "INTERNSHIP DRIVE"}
          </h1>

          <p className="text-xl sm:text-2xl text-text-secondary max-w-2xl mx-auto mb-10 animate-[fade-in_0.9s_ease-out]">
            {season?.landing_hero_subtitle || "Bridging Academics and Industry"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fade-in_1.1s_ease-out]">
            <Link href="/register/student">
              <Button variant="primary" size="lg" iconRight={<ArrowRight className="w-5 h-5" />}>
                Apply as Student
              </Button>
            </Link>
            <Link href="/register/company">
              <Button variant="secondary" size="lg" iconRight={<Building2 className="w-5 h-5" />}>
                Partner with Us
              </Button>
            </Link>
          </div>

          <p className="text-sm text-text-muted mt-6 animate-[fade-in_1.3s_ease-out]">
            Open to students from all colleges across India
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fade-in_1.5s_ease-out]">
          <span className="text-xs text-text-muted uppercase tracking-[0.2em]">Scroll to Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-accent-lime/50 to-transparent" />
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-20 border-t border-border-default">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-[var(--radius-2xl)] bg-bg-card border border-border-default">
                  <p className="text-3xl sm:text-4xl font-black font-[family-name:var(--font-heading)] bg-[linear-gradient(135deg,#d4ff00,#bcff2f)] bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-text-primary mt-2">{stat.label}</p>
                  <p className="text-xs text-text-muted mt-1">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it Works */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-center mb-4">
            How it <span className="bg-[linear-gradient(135deg,#d4ff00,#bcff2f)] bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
            A simple, streamlined process to connect you with the right opportunity.
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* For Students */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent-lime/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-accent-lime" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)]">For Students</h3>
              </div>
              <div className="space-y-4">
                {[
                  { step: "01", title: "Register & Build Profile", desc: "Sign up, upload your resume, and showcase your skills." },
                  { step: "02", title: "Browse & Apply", desc: "Explore listings from 50+ startups and apply with one click." },
                  { step: "03", title: "Interview & Get Selected", desc: "Companies shortlist, schedule interviews, and extend offers." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 rounded-[var(--radius-xl)] bg-bg-card border border-border-default hover:border-accent-lime/20 transition-colors">
                    <span className="text-2xl font-black font-[family-name:var(--font-heading)] text-accent-lime/30">{item.step}</span>
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{item.title}</p>
                      <p className="text-xs text-text-secondary mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Companies */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-accent-purple" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)]">For Companies</h3>
              </div>
              <div className="space-y-4">
                {[
                  { step: "01", title: "Register & Get Approved", desc: "Sign up your company, our team verifies within 24 hours." },
                  { step: "02", title: "Post Internships", desc: "Create listings with details, stipend, and requirements." },
                  { step: "03", title: "Review & Hire", desc: "Browse applicants, schedule interviews, and select interns." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 rounded-[var(--radius-xl)] bg-bg-card border border-border-default hover:border-accent-purple/20 transition-colors">
                    <span className="text-2xl font-black font-[family-name:var(--font-heading)] text-accent-purple/30">{item.step}</span>
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{item.title}</p>
                      <p className="text-xs text-text-secondary mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-center mb-12">
            Why <span className="bg-[linear-gradient(135deg,#d4ff00,#bcff2f)] bg-clip-text text-transparent">Internship Drive</span>?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Users className="w-6 h-6" />, title: "Multi-College Network", desc: "Open to students from BITS, IITs, NITs, and colleges across India — not just one campus." },
              { icon: <Briefcase className="w-6 h-6" />, title: "Curated Startups", desc: "Every company is reviewed and approved by the E-Cell team before listings go live." },
              { icon: <TrendingUp className="w-6 h-6" />, title: "High Stipends", desc: "Internships offering up to ₹1.25L/month with opportunities for PPOs." },
              { icon: <MapPin className="w-6 h-6" />, title: "Remote-Friendly", desc: "75% of opportunities are remote, so you can work from anywhere." },
              { icon: <Sparkles className="w-6 h-6" />, title: "Real Experience", desc: "Work on live projects at fast-growing startups, not just busywork." },
              { icon: <GraduationCap className="w-6 h-6" />, title: "Zero Cost", desc: "Completely free for students and companies — no fees, no catch." },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-[var(--radius-2xl)] bg-bg-card border border-border-default hover:border-accent-lime/20 hover:shadow-[var(--shadow-glow-lime)] transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-accent-lime/10 flex items-center justify-center text-accent-lime mb-4 group-hover:bg-accent-lime/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-text-primary font-[family-name:var(--font-heading)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 bg-bg-secondary">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-center mb-12">
              Frequently Asked <span className="bg-[linear-gradient(135deg,#d4ff00,#bcff2f)] bg-clip-text text-transparent">Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-bg-card border border-border-default rounded-[var(--radius-xl)] overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-text-primary font-medium hover:text-accent-lime transition-colors list-none">
                    {faq.question}
                    <span className="text-text-muted group-open:rotate-45 transition-transform text-xl">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      <section className="py-20 bg-bg-primary border-t border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-12">
            Our <span className="bg-[linear-gradient(135deg,#d4ff00,#bcff2f)] bg-clip-text text-transparent">Partners</span>
          </h2>
          <div className="flex justify-center items-center">
            <div className="group flex flex-col items-center justify-center p-8 bg-bg-card rounded-[var(--radius-2xl)] border border-border-default hover:border-accent-lime/30 hover:shadow-[var(--shadow-glow-lime)] transition-all duration-300 w-64">
              {/* Note: Please upload the actual image as 'thirsty-pelican.png' to the public directory */}
              <div className="w-32 h-32 relative mb-6 rounded-full overflow-hidden bg-bg-secondary flex items-center justify-center border-4 border-bg-primary group-hover:scale-105 transition-transform duration-300">
                 <span className="text-3xl">🦤</span>
              </div>
              <span className="text-xl font-black font-[family-name:var(--font-heading)] text-text-primary text-center leading-tight">
                THIRSTY<br />PELICAN
              </span>
              <span className="text-xs text-accent-lime mt-3 font-semibold tracking-wider uppercase">
                Official Partner
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Ready to get started?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Whether you&apos;re a student looking for your next opportunity or a company seeking top talent — the Internship Drive is for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register/student">
              <Button variant="primary" size="lg" iconRight={<ArrowRight className="w-5 h-5" />}>
                Register as Student
              </Button>
            </Link>
            <Link href="/register/company">
              <Button variant="outline" size="lg" iconRight={<ArrowRight className="w-5 h-5" />}>
                Register as Company
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
