import { Link } from '@/shims/react-router';
import heroImg from '@/assets/LaunchPad.JPG';

export default function LaunchpadHero() {
  return (
    <section className="flex min-h-[min(720px,calc(100svh-60px))] flex-col items-center justify-center gap-7 bg-page px-6 py-14 text-center text-ink">
      <h1 className="sr-only">Launchpad</h1>
      <img loading="eager" fetchpriority="high" src={heroImg} alt="Launchpad main stage during the E-Summit" className="mx-auto max-h-[46svh] w-full max-w-4xl rounded-lg object-cover shadow-xl" />
      <p className="font-mono text-xl text-lava-bright">3–5 April 2026 · BITS Pilani Hyderabad</p>
      <p className="max-w-[48ch] leading-relaxed text-ecell-text-muted">Three days of conversations, new ventures, and opportunities to build with the startup community.</p>
      <div className="flex flex-wrap items-center justify-center gap-5"><Link to="/launchpad/events" className="rounded bg-lava px-6 py-3 text-sm font-semibold hover:bg-lava">Explore events →</Link><Link to="/launchpad/schedules" className="home-text-link">View schedule →</Link></div>
    </section>
  );
}
