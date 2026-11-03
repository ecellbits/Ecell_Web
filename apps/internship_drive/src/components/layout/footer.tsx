import Link from "next/link";
import { ExternalLink, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-[var(--radius-md)] bg-accent-lime flex items-center justify-center">
                <span className="text-black font-bold text-sm font-[family-name:var(--font-heading)]">
                  ID
                </span>
              </div>
              <span className="text-lg font-bold text-text-primary font-[family-name:var(--font-heading)]">
                Internship Drive
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              A flagship initiative by E-Cell, BITS Pilani Hyderabad Campus,
              connecting students across India with startup internships.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 font-[family-name:var(--font-ui)]">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Browse Internships", href: "/student/listings" },
                { label: "Register as Student", href: "/register/student" },
                { label: "Partner with Us", href: "/register/company" },
                { label: "About Launchpad", href: "https://www.ecellbphc.in/launchpad" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-lime transition-colors"
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* E-Cell */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 font-[family-name:var(--font-ui)]">
              E-Cell BPHC
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "E-Cell Website", href: "https://www.ecellbphc.in" },
                { label: "Launchpad", href: "https://www.ecellbphc.in/launchpad" },
                { label: "Pitcher's Pilot", href: "https://www.ecellbphc.in/launchpad" },
                { label: "Contact Us", href: "https://www.ecellbphc.in/launchpad" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-accent-lime transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 font-[family-name:var(--font-ui)]">
              Connect
            </h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="w-4 h-4 text-accent-lime" />
                <span>ecell@hyderabad.bits-pilani.ac.in</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-accent-lime" />
                <span>BITS Pilani, Hyderabad Campus</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[
                { label: "LinkedIn", href: "https://linkedin.com/company/ecellbphc" },
                { label: "Instagram", href: "https://instagram.com/ecell_bphc" },
                { label: "X", href: "https://twitter.com/ecell_bphc" },
                { label: "Facebook", href: "https://facebook.com/ecellbphc" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-[var(--radius-lg)] border border-border-default text-text-muted hover:text-accent-lime hover:border-accent-lime/30 transition-all text-xs flex items-center justify-center"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border-default flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} E-Cell BITS Pilani Hyderabad Campus. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Part of the{" "}
            <Link
              href="https://www.ecellbphc.in/launchpad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-lime hover:underline"
            >
              Launchpad
            </Link>{" "}
            initiative
          </p>
        </div>
      </div>
    </footer>
  );
}
