import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import lplogo from '@/assets/ecell/lp_logo_new.png';

// ───────────────────────────────────────────────
// Edit the links below to update the page
// ───────────────────────────────────────────────
const PROFILE = {
  avatar: lplogo,
  handle: 'ecell_bphc',
  bio: 'E-Cell, BITS Pilani Hyderabad Campus',
};

const SOCIAL_LINKS = [
  { icon: <FaInstagram />, href: 'https://www.instagram.com/ecell_bphc', label: 'Instagram' },
  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/company/e-cell-bphc/', label: 'LinkedIn' },
  { icon: <FaTwitter />, href: 'https://x.com/ecell_bphc', label: 'X / Twitter' },
  { icon: <FaFacebook />, href: 'https://www.facebook.com/groups/158307448076754/', label: 'Facebook' },
];

const LINKS = [
  {
    emoji: '⏳',
    title: 'Early Bird Tickets Closing Soon',
    subtitle: 'Limited spots — grab yours now',
    href: '/launchpad/passes',
    internal: true,
  },
  {
    emoji: '🎓',
    title: "Coming as a College Group? Grab Contingent Passes for Launchpad '26",
    subtitle: 'Special group pricing available',
    href: '/launchpad/contingent-passes',
    internal: true,
  },
  {
    emoji: '🌐',
    title: 'Become a Campus Ambassador for Launchpad 2026',
    subtitle: 'Represent your college at Launchpad',
    href: '/launchpad/campus-ambassador',
    internal: true,
  },
  {
    emoji: '🏨',
    title: "Accommodation & Stay for Launchpad '26",
    subtitle: 'Book your stay on campus',
    href: '/launchpad/accommodation',
    internal: true,
  },
  {
    emoji: '🎤',
    title: "Speakers at Launchpad '26",
    subtitle: 'Industry leaders & venture capitalists',
    href: '/launchpad/speakers',
    internal: true,
  },
  {
    emoji: '🏢',
    title: 'Want to Sponsor Launchpad 2026?',
    subtitle: 'Partner with BITS Hyderabad\'s premier startup fest',
    href: '/launchpad/sponsor/wanna-sponsor',
    internal: true,
  },
  {
    emoji: '📸',
    title: 'Gallery — Relive Launchpad 2025',
    subtitle: 'Photos & highlights from last year',
    href: '/launchpad/gallery',
    internal: true,
  },
  {
    emoji: '🚀',
    title: 'Visit the Official Launchpad Website',
    subtitle: 'ecellbphc.in/launchpad',
    href: '/launchpad',
    internal: true,
  },
  {
    emoji: '📢',
    title: "Launchpad '26 Announcements",
    subtitle: 'WhatsApp Community • Free to join',
    href: 'https://chat.whatsapp.com/GRGDBbVBNiV6WvTpw1g182',
    internal: false,
    thumbnailBg: '#25d366',
    thumbnailIcon: '💬',
  },
];

// ───────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] } },
};

const profileVariants = {
  hidden: { opacity: 0, scale: 0.88, y: -12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] } },
};

function LinkCard({ link }) {
  const Tag = link.internal ? 'a' : 'a';
  const extraProps = link.internal
    ? {}
    : { target: '_blank', rel: 'noopener noreferrer' };

  return (
    <motion.div variants={itemVariants}>
      <Tag className="group/link relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-[14px] border border-white/9 bg-white/4 px-5 py-4 no-underline backdrop-blur-[12px] transition-[background,border-color,transform,box-shadow] duration-220 before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(212,255,0,0.06)_0%,transparent_60%)] before:opacity-0 before:transition-opacity before:duration-250 before:content-[''] hover:-translate-y-0.5 hover:border-[#d4ff00]/35 hover:bg-[#d4ff00]/7 hover:shadow-[0_8px_32px_rgba(212,255,0,0.08)] hover:before:opacity-100 active:translate-y-0 active:scale-[0.98]" href={link.href} {...extraProps} aria-label={link.title}>
        {link.thumbnailIcon ? (
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-white/6 text-[1.55rem]"
            style={{ background: link.thumbnailBg || 'rgba(255,255,255,0.06)' }}
          >
            {link.thumbnailIcon}
          </div>
        ) : (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-white/6 text-[1.55rem]">{link.emoji}</div>
        )}

        <div className="flex flex-1 flex-col gap-[0.18rem]">
          <span className="text-[0.95rem] leading-[1.35] font-semibold tracking-[-0.01em] text-ink">{link.title}</span>
          {link.subtitle && (
            <span className="text-[0.78rem] leading-[1.25] font-normal text-white/45">{link.subtitle}</span>
          )}
        </div>

        <span className="shrink-0 text-[0.9rem] text-white/25 transition-[color,transform] duration-220 group-hover/link:translate-x-[3px] group-hover/link:text-[#d4ff00]">
          <FiExternalLink />
        </span>
      </Tag>
    </motion.div>
  );
}

export default function LaunchpadLinks() {
  return (
    <div className="box-border flex min-h-screen w-full flex-col items-center bg-page bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(212,255,0,0.08)_0%,transparent_60%),radial-gradient(ellipse_40%_30%_at_80%_80%,rgba(212,255,0,0.04)_0%,transparent_50%)] px-5 pt-14 pb-16 max-[520px]:px-[0.9rem] max-[520px]:pt-10 max-[520px]:pb-12">
      {/* Profile */}
      <motion.div
        className="mb-10 flex w-full max-w-[480px] flex-col items-center gap-[0.6rem]"
        variants={profileVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative mb-[0.4rem] flex size-[110px] items-center justify-center drop-shadow-[0_0_18px_rgba(212,255,0,0.35)] transition-[filter] duration-300 hover:drop-shadow-[0_0_28px_rgba(212,255,0,0.55)] max-[520px]:size-20">
          <img
            src={PROFILE.avatar}
            alt={PROFILE.handle}
            className="block size-[110px] rounded-none object-contain max-[520px]:size-20"
          />
        </div>

        <h1 className="m-0 text-xl font-bold tracking-[-0.02em] text-white">{PROFILE.handle}</h1>
        <p className="m-0 text-center text-[0.88rem] font-normal tracking-[0.01em] text-white/55">{PROFILE.bio}</p>

        <div className="my-[0.2rem] flex gap-[0.9rem]">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-[38px] items-center justify-center rounded-full border border-white/15 bg-white/6 text-[1.1rem] text-white/70 no-underline backdrop-blur-[8px] transition-all duration-250 hover:-translate-y-0.5 hover:scale-[1.08] hover:border-[#d4ff00] hover:bg-[#d4ff00]/10 hover:text-[#d4ff00] hover:shadow-[0_0_14px_rgba(212,255,0,0.25)]"
              aria-label={s.label}
              title={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Links */}
      <motion.div
        className="flex w-full max-w-[480px] flex-col gap-[0.85rem]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {LINKS.map((link, i) => (
          <LinkCard key={i} link={link} />
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-12 flex flex-col items-center gap-[0.35rem]">
        <span className="text-[0.72rem] tracking-[0.06em] text-white/20">© 2026 E-Cell BITS Hyderabad</span>
      </div>
    </div>
  );
}

export { LaunchpadLinks as Comp };
