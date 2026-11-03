import { useRef, useState } from "react";
import { X } from "lucide-react";
import { flushSync } from "react-dom";
import "./magazine-review.css";
import { Link } from "@/shims/react-router";
import launchpadPhoto from "@/assets/Launchpad1.JPG";
import communityPhoto from "@/assets/community_meet/community_meet_1.jpg";
import expoPhoto from "@/assets/lpevents/startup_expo_memories/mem1.png";
import { useScrollMotion } from "@/components/common/useScrollMotion";
import { MAGAZINE_LINKS } from "./data";

const ISSUE_STORIES = [
  {
    title: "Udyama Volume 01: A year of ideas in motion",
    excerpt: "The people, ideas and events that shaped E-Cell’s 2025–26 year.",
    href: "/udyama-volume-1",
    linkLabel: "Read the story",
  },
];

const MAGAZINE = {
  volume: "Volume 01",
  year: "2025–26",
  title: "A year at E-Cell",
  note: "A look back at the people, ideas and events that shaped our year.",
};

const SECTION_TITLE = "text-[clamp(30px,4vw,42px)] leading-none font-black tracking-[-0.03em]";

function SectionHead({ id, kicker, title, aside }: { id: string; kicker?: string; title: string; aside?: string }) {
  return (
    <div className="mb-6">
      <div data-reveal="">
        {kicker && <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-maroon">{kicker}</p>}
        <h2 id={id} className={SECTION_TITLE}>{title}</h2>
      </div>
      {aside && <p data-reveal="" data-delay="120" className="mt-3 text-sm leading-6 text-ecell-text-muted">{aside}</p>}
    </div>
  );
}

function StoriesSection() {
  return (
    <section id="stories" className="pt-12" aria-labelledby="issue-heading">
      <div className="mx-auto max-w-[1080px] px-6">
        <SectionHead id="issue-heading" title="Inside this volume" />
        <div data-stagger="" className="flex flex-col gap-4">
          {ISSUE_STORIES.map((story, index) => (
            <article key={story.title} className="group grid grid-cols-[32px_1fr] items-start gap-3 rounded-2xl border border-hairline-strong bg-surface p-5 sm:grid-cols-[40px_1fr] sm:gap-4 sm:p-6">
              {ISSUE_STORIES.length > 1 && <span className="pt-1 font-sans text-lg font-extrabold leading-none text-brand-navy">{String(index + 1).padStart(2, "0")}</span>}
              <div className={ISSUE_STORIES.length === 1 ? "col-span-2" : ""}>
                <h3 className="text-xl leading-tight font-extrabold tracking-[-0.02em] sm:text-2xl">{story.title}</h3>
                <p className="mt-2 max-w-[60ch] text-sm leading-6 text-ecell-text-muted">{story.excerpt}</p>
                <Link to={story.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy underline decoration-brand-navy/40 underline-offset-4 transition-all hover:gap-2.5 hover:decoration-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy">{story.linkLabel} <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-ecell-text-muted">More stories coming in the next issue.</p>
      </div>
    </section>
  );
}

const REVIEW_SECTIONS = [
  { heading: "Around the community", items: [
    ["Community Meet 2025", "Organised with TBIS, the meet brought students and startup ecosystem members together to discuss venture capital, incubation and student entrepreneurship. Vikas Katragadda of Naandi Ventures and Mir Ali of TBI BITS Hyderabad shared their perspectives. Campus founders including Apollyon Dynamics and Slowcialize spoke about their journeys; Apollyon described its path from an idea to a first Indian Army order."],
    ["Management Temptations", "Students explored management through outlet operations, vendor and crowd interactions, and practical challenges in leadership and decision-making."],
    ["Founders and investors in Bengaluru", "Launchpad’s Bengaluru edition co-organised Founder’s Investor Connect with CEDAT, bringing builders and investors together for conversations and networking."],
  ] },
  { heading: "Launchpad ’26", items: [
    ["Internship Drive", "Over 650 students connected with around 50 companies; more than 80 secured internships, with stipends reaching ₹60,000 per month."],
    ["Startup Expo", "25 ventures showcased their ideas and met mentors, with a ₹75,000 prize pool. MakerMasti, Keepmon and Mehak were recognised for innovation, vision and scalability respectively."],
    ["SEED", "The new Summit for Entrepreneurial Ecosystem Development brought nine E-Cells together for three days of sessions, roundtables and mentorship."],
    ["Ground Reality", "Around 65 teams developed business plans through a business model canvas round, mentorship and pitching. QwikPrint, Sterilysense and XADS were the winners."],
    ["Teen Tycoons", "More than 800 school students explored entrepreneurship through a business model round, bootcamp and final presentations."],
    ["DP World Hackathon", "More than 2,500 student innovators from about 27 institutions worked on challenges in logistics, trade and technology."],
    ["Pitchers’ Pilot", "50 participants presented their ventures to five investors and 15 mentors, gaining feedback and opportunities to connect."],
    ["Networking Arena", "Founders, investors and mentors came together for conversations, shared learning and collaboration."],
  ] },
  { heading: "Ideas on stage and beyond", items: [
    ["From Cockpit to Command", "Air Chief Marshal RKS Bhadauria and retired Wing Commander Anish Anthony discussed leadership and decision-making under pressure."],
    ["Innovation, storytelling and social impact", "Nidhi Saxena, Shanthala Veigas and Shaily Mehrotra discussed creating value through creativity and purpose."],
    ["From blueprint to market", "Meraj Faheem shared the GTM Canvas and insights on positioning products and bringing ideas to market."],
    ["Building ecosystems and backing founders", "Speakers and investors discussed the communities, infrastructure and capital that help ventures grow."],
    ["Smarter minds, healthier futures", "Swati Ganeti and Anant Anand explored the role of AI in education and healthcare."],
    ["TechGyan and featured workshops", "TechGyan hosted 12 workshops with over 570 registrations, covering topics from full-stack development and AI to design and digital marketing. Featured sessions explored design thinking, visual communication and large language models."],
    ["Impactus and engagement", "Impactus challenged teams to respond to evolving crises as policymakers and business leaders. GeoGuessr, an IPL mock auction, Corporate Crusades and an open mic brought competition and creative expression to the summit."],
    ["Ecosystem on tour", "The team connected with founders at Draper Startup House, CoKarma, Startup Party and Global Startups Club, as well as TiE Nizamabad and WE Hub’s Social Impact Award kick-off. Outreach also reached BVRIT Summit and Malla Reddy E-Summit."],
  ] },
];

function YearReview() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const images = [communityPhoto, launchpadPhoto, expoPhoto];
  const names = ["Community", "Launchpad", "Ideas"];
  const summaries = ["Campus founders, practical challenges and conversations beyond Hyderabad.", "Three days of pitches, showcases, careers and connections.", "Leadership, learning and ideas shared on stage and beyond."];

  const transition = (update: () => void) => {
    const doc = document as Document & { startViewTransition?: (callback: () => void) => unknown };
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) doc.startViewTransition(update);
    else update();
  };
  const openStory = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    transition(() => {
      flushSync(() => setSelected(index));
      dialogRef.current?.showModal();
    });
  };
  const closeStory = () => {
    transition(() => {
      dialogRef.current?.close();
      flushSync(() => setSelected(null));
      triggerRef.current?.focus();
    });
  };

  return <section id="year-review" aria-labelledby="review-heading" className="pt-20"><div className="mx-auto max-w-[1080px] px-6">
    <div className="mt-16 flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-navy">The 2025–26 issue</p><h2 id="review-heading" className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Inside this issue</h2></div><p className="max-w-xs font-serif text-base leading-relaxed text-ecell-text-muted">The people, ideas and moments that made our year.</p></div>
    <div className="my-8 flex flex-wrap gap-2" role="group" aria-label="Filter stories by topic">{["All", ...names].map(name => <button key={name} type="button" aria-pressed={active === name} onClick={() => setActive(name)} className={`rounded-full border border-hairline-strong px-4 py-2 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${active === name ? "bg-brand-navy text-brand-cream" : "bg-transparent text-ink hover:bg-raised"}`}>{name}</button>)}</div>
    <div className="grid auto-rows-auto gap-4 md:grid-cols-3">{REVIEW_SECTIONS.map((section, index) => (active === "All" || active === names[index]) && <button key={section.heading} type="button" onClick={event => openStory(index, event.currentTarget)} style={selected === null ? { viewTransitionName: `review-${index}` } : undefined} className={`group relative flex min-h-[260px] overflow-hidden rounded-2xl text-left text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy ${active === "All" && index === 1 ? "md:col-span-2 md:row-span-2 md:min-h-[540px]" : ""}`}>
      <img src={images[index]} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" /><span className="absolute inset-0 bg-brand-ink/70" />
      <span className="relative flex w-full flex-col justify-between p-6 sm:p-8"><span className="text-xs font-bold uppercase tracking-widest">{names[index]} / 0{index + 1}</span><span><span className="block max-w-[16ch] text-3xl font-black leading-tight tracking-tight sm:text-4xl">{section.heading}</span><span className="mt-3 block max-w-[35ch] font-serif text-base leading-relaxed text-white/90">{summaries[index]}</span><span className="mt-6 block text-xs font-bold uppercase tracking-wider">Read this section ↗</span></span></span>
    </button>)}</div>
    <dialog ref={dialogRef} aria-labelledby="review-dialog-title" onCancel={event => { event.preventDefault(); closeStory(); }} onClick={event => { if (event.target === event.currentTarget) closeStory(); }} className="review-dialog m-auto max-h-[min(88dvh,900px)] w-[min(90vw,760px)] overflow-y-auto border-0 rounded-2xl bg-page p-0 text-ink shadow-2xl shadow-brand-navy/25" style={selected !== null ? { viewTransitionName: `review-${selected}` } : undefined}>
      {selected !== null && <><div className="relative min-h-[240px] overflow-hidden bg-ink p-7 text-white sm:min-h-[300px] sm:p-10"><img src={images[selected]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" /><div className="relative"><button type="button" onClick={closeStory} autoFocus aria-label="Close section" className="float-right p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><X size={20} aria-hidden="true" /></button><p className="pt-3 text-xs font-bold uppercase tracking-widest">{names[selected]} / 2025–26</p><h3 id="review-dialog-title" className="mt-14 max-w-xl text-4xl font-black tracking-tight sm:text-5xl">{REVIEW_SECTIONS[selected].heading}</h3></div></div><div className="px-7 py-4 sm:px-10">{REVIEW_SECTIONS[selected].items.map(([title, text]) => <article key={title} className="border-b border-hairline py-6 last:border-0"><h4 className="text-xl font-bold">{title}</h4><p className="mt-3 max-w-[65ch] font-serif text-base leading-7 text-ecell-text-muted">{text}</p></article>)}</div></>}
    </dialog>
  </div></section>;
}

function StartupSpotlight() {
  const stats = [
    ["38", "startups incubated since 2019"],
    ["₹14 Cr", "raised by campus founders"],
    ["120+", "mentors in the alumni network"],
    ["6,400", "students at E-Cell events last year"],
  ];

  return (
    <section id="spotlight" aria-labelledby="startup-spotlight-heading" className="pt-12">
      <div className="mx-auto max-w-[1080px] px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 id="startup-spotlight-heading" className={SECTION_TITLE}>Startup spotlight</h2>
          <p className="max-w-xl font-serif text-base leading-relaxed text-ecell-text-muted">One alumni venture, covered in depth every issue.</p>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
          <article className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 transition-colors duration-300 hover:border-brand-maroon/25 sm:p-8">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-brand-navy">KhetiLink</h3>
              <blockquote className="mt-4 max-w-[50ch] font-serif text-xl italic leading-[1.55] text-ink sm:text-2xl">“We sold our first order before we had a company name. The name came when the invoice needed one.”</blockquote>
              <p className="mt-4 max-w-[58ch] text-sm leading-6 text-ecell-text-muted">Ananya Rao recalls the first customer order arriving before the company had a name; the invoice made choosing one necessary.</p>
            </div>
            <p className="mt-6 text-sm font-semibold text-ink">Ananya Rao <span className="font-normal text-ecell-text-muted">· Co-founder, KhetiLink · Class of 2021</span></p>
          </article>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {stats.map(([value, label]) => (
              <div key={label} className="flex min-h-32 flex-col justify-center rounded-2xl border border-black/10 bg-white p-5 transition-colors duration-300 hover:border-brand-maroon/25 sm:p-6">
                <dt className="text-3xl font-extrabold leading-none tracking-tight text-brand-navy">{value}</dt>
                <dd className="mt-3 max-w-[22ch] text-sm leading-5 text-ink/70">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function PastVolumesSection() {
  return (
    <section id="archive" aria-labelledby="archive-heading" className="pt-16">
      <div className="mx-auto max-w-[1080px] px-6">
        <h2 id="archive-heading" className={SECTION_TITLE}>Past volumes</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a href="/udyama-volume-1" aria-label="Read Udyama, 2025–26 current volume" className="group block w-full max-w-[220px] no-underline text-ink">
            <div className="relative flex aspect-[3/4] flex-col justify-between overflow-hidden bg-brand-navy p-5 text-brand-cream transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none">
              <img src={launchpadPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
              <span className="relative text-xs font-bold uppercase tracking-wider">Udyama</span>
              <span className="relative text-3xl font-extrabold leading-none">2025–26</span>
            </div>
            <h3 className="mt-3 text-lg font-bold tracking-tight text-brand-navy">A year of building together</h3>
          </a>
        </div>
        <p className="mt-4 text-sm leading-6 text-ecell-text-muted">Earlier volumes will be added here when they are available.</p>
      </div>
    </section>
  );
}

function ConversationsSection() {
  return <section id="podcast" aria-labelledby="podcast-heading" className="pt-16"><div className="mx-auto max-w-[1080px] px-6">
    <SectionHead id="podcast-heading" title="Continue the conversation" />
    <div className="flex flex-col items-start gap-4">
    <p className="max-w-2xl text-sm leading-7 text-ecell-text-muted mb-0">Explore conversations and updates from E-Cell on our YouTube channel.</p>
    <a href={MAGAZINE_LINKS.podcast} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold text-brand-navy underline-offset-4 hover:underline">Visit the E-Cell channel →</a></div>
  </div></section>;
}

function NewsletterSection() {
  const [note, setNote] = useState("");

  return (
    <section>
      <div className="mx-auto max-w-[1080px] px-6">
        <div id="subscribe" data-stagger="" className="mt-16 grid grid-cols-2 items-center gap-9 py-12 max-[760px]:grid-cols-1 max-[760px]:py-8 [&_p]:mt-3 [&_p]:max-w-[400px] [&_p]:text-[13.5px] [&_p]:leading-[1.7] [&_p]:text-ecell-text-muted">
          <div>
            <h2 className={SECTION_TITLE}>One email when each issue goes live.</h2>
            <p>
              A note when the next issue is published, with new stories and the
              events shaping the E-Cell year.
            </p>
          </div>
            <form
            className="flex flex-col gap-2.5 [&_input]:h-[44px] [&_input]:rounded-[12px] [&_input]:border-hairline-strong [&_input]:bg-surface [&_input]:text-ink [&_input::placeholder]:text-ecell-text-muted"
            onSubmit={(e) => {
              e.preventDefault();
              const email = (
                document.getElementById("nlEmail") as HTMLInputElement | null
              )?.value.trim();
              setNote(
                email
                  ? `Demo form. Signups are not stored yet. Write to ecell@hyderabad.bits-pilani.ac.in to get on the list.`
                  : ""
              );
            }}
          >
            <input
              className="w-full min-w-0 border px-4 py-2.5 focus:outline-2 focus:outline-offset-2 focus:outline-brand-navy"
              aria-label="Email address"
              id="nlEmail"
              type="email"
              placeholder="reader@bits-hyderabad.ac.in"
              required
            />
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-[11px] text-[13px] font-semibold tracking-[0.01em] text-brand-cream transition-colors duration-200 hover:bg-brand-ink" type="submit">
              Sign Up
            </button>
            <span className="text-[11.5px] text-ecell-text-muted">{note}</span>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function MagazinePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useScrollMotion(pageRef);

  return (
    <div ref={pageRef} className="bg-page text-ink selection:bg-secondary selection:text-ink [&>header]:pt-[88px] [&>header]:pb-12">
      <header id="top">
        <div className="mx-auto grid max-w-[1080px] grid-cols-[1fr_0.8fr] items-center gap-12 px-6 max-[720px]:grid-cols-1">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-brand-navy">The annual E-Cell magazine · 2025–26</p>
            <h1 className="text-[clamp(65px,11vw,140px)] leading-[0.85] font-black tracking-[-0.07em] text-brand-navy">Udyama<span className="text-brand-maroon">.</span></h1>
            <p className="mt-7 max-w-[470px] font-serif text-lg leading-relaxed text-ecell-text-muted sm:text-xl">A year of building together. Stories, people and ideas from E-Cell BITS Pilani Hyderabad Campus.</p>
            <a href="/udyama-volume-1" className="mt-7 inline-flex rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-brand-cream transition-colors hover:bg-brand-ink">Read the issue →</a>
          </div>
          <a href="/udyama-volume-1" aria-label="Read the 2025–26 issue" className="group relative mx-auto flex aspect-[3/4] w-full max-w-[360px] rotate-2 flex-col justify-between overflow-hidden rounded-2xl bg-brand-navy p-7 text-white shadow-[12px_12px_0_#510609] transition-transform duration-300 hover:rotate-0 sm:p-8">
            <span className="relative z-10 border-b border-white/40 pb-3 text-xs font-bold uppercase tracking-widest">Udyama · 2025–26</span>
            <img src={launchpadPhoto} alt="" className="absolute inset-x-0 bottom-0 h-[58%] w-full object-cover opacity-70 mix-blend-luminosity" />
            <span className="relative z-10 max-w-[8ch] text-[clamp(38px,5vw,60px)] leading-[0.95] font-black tracking-tight">A year of building together.</span>
            <span className="relative z-10 text-xs font-bold uppercase tracking-widest">The year in review ↗</span>
          </a>
        </div>
      </header>

      <nav aria-label="In this issue" className="mx-auto max-w-[1080px] px-6">
        <div data-stagger="" className="flex flex-wrap gap-x-6 gap-y-2 py-3 text-xs text-ecell-text-muted">
        <a href="#year-review" className="hover:text-brand-navy">Year in review</a>
        <a href="#stories" className="hover:text-brand-navy">More stories</a>
        <a href="#spotlight" className="hover:text-brand-navy">Spotlight</a>
        <a href="#podcast" className="hover:text-brand-navy">Podcast</a>
        <a href="#archive" className="hover:text-brand-navy">Past volumes</a>
        <a href="#subscribe" className="hover:text-brand-navy">Subscribe</a>
        </div>
      </nav>

      <YearReview />
      <StoriesSection />
      <StartupSpotlight />
      <ConversationsSection />
      <PastVolumesSection />
      <NewsletterSection />
      <div className="mx-auto flex max-w-[1080px] justify-between px-6 py-8 text-xs text-ecell-text-muted"><span>E-Cell Magazine · {MAGAZINE.year}</span><a href="#top" className="hover:text-brand-navy">Back to top ↑</a></div>
    </div>
  );
}
