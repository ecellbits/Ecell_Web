import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../common/SEO';
import { useSectionHash } from '../common/use-section-hash';
import StartupStages from './StartupStages';
import Conversations from './Conversations';
import '../common/content-pages.css';

const sections = [
  ['intro', 'The entrepreneurial spark'],
  ['stages', 'Stages of a startup'],
  ['ecell-conversations', 'E-Cell Conversations'],
  ['founder-summary', "The builder’s playbook"],
];

export default function BlogPage() {
  const [shareStatus, setShareStatus] = useState('');
  useSectionHash();

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Entrepreneurship and Founder Playbook', url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareStatus('Link copied.');
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setShareStatus('Copy the page URL from your address bar to share.');
      }
    }
  }

  return (
    <main className="content-page" data-theme="light">
      <SEO
        title="Entrepreneurship and Founder Playbook"
        description="Explore five startup stages and practical founder lessons from E-Cell Conversations Episode 01."
        url="https://www.ecellbits.com/blog"
        keywords={['Founder Playbook', 'E-Cell Blog', 'Startup Stages']}
        image="https://i.ytimg.com/vi/1uAXFS-mi1g/hqdefault.jpg"
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: 'Entrepreneurship and Founder Playbook',
          datePublished: '2026-10-17',
          author: { '@type': 'Organization', name: 'E-Cell BITS Pilani Hyderabad Campus' }
        }}
      />
      <div className="content-container">
        <div className="content-toolbar">
          <Link to="/" className="content-link">← Home</Link>
          <div className="content-actions">
            <button
              type="button"
              className="content-button"
              title="Share"
              aria-label="Share"
              onClick={share}
              style={{ width: '2.75rem' }}
            >
              <Share2 size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        {shareStatus && <p role="status" className="content-muted">{shareStatus}</p>}
        <header className="content-hero">
          <p className="content-meta">E-Cell editorial · October 2026 · 8 min read</p>
          <h1>Entrepreneurship and Founder Playbook</h1>
          <p className="content-lead">
            A guide through every milestone of the venture lifecycle—from personal savings and prototype building to venture capital and market exit, paired with insights from E-Cell Conversations EP-01.
          </p>
          <p className="content-muted">E-Cell BITS Pilani Hyderabad Campus</p>
        </header>
        <div className="content-editorial-grid">
          <aside className="content-toc">
            <nav aria-label="On this page">
              <p className="font-bold text-sm mb-3">On this page</p>
              {sections.map(([id, label], index) => (
                <a key={id} href={`#${id}`}>{index + 1}. {label}</a>
              ))}
            </nav>
            <Link to="/startup-mentorship" className="content-link">
              Explore Founder’s First mentorship →
            </Link>
          </aside>
          <article className="content-article">
            <section id="intro" className="content-section">
              <h2>The entrepreneurial spark</h2>
              <p>
                Entrepreneurship is not merely about launching a commercial entity; it is the deliberate discipline of identifying acute human friction, designing scalable solutions under radical uncertainty, and having the conviction to bring something new into existence.
              </p>
              <p>
                At E-Cell BITS Pilani Hyderabad Campus, our foundational mission is to cultivate an uncompromising culture of innovation. We bridge the gap between technical brilliance and commercial reality. Whether you are hacking a prototype in your hostel room or pitching to institutional venture capitalists, understanding the structured anatomy of a startup’s journey is the prerequisite to enduring success.
              </p>
              <blockquote>
                “Most startups fail not because they couldn’t build their product, but because they built something nobody actually wanted. Knowing your lifecycle stage protects you from premature scaling and fatal dilution.”
                <cite>E-Cell BPHC Venture Principles</cite>
              </blockquote>
            </section>
            <StartupStages />
            <Conversations />
            <section id="founder-summary" className="content-section">
              <h2>The core takeaway</h2>
              <p>
                Building a great startup is an iterative loop of hypothesis, validation, humility, and relentless execution. Whether you are bootstrapping your initial prototype today or gearing up for VC funding tomorrow, remember that external capital only accelerates what is already working.
              </p>
              <div className="content-actions">
                <Link to="/startup-connect" className="content-button content-button-primary">
                  Apply to Startup Connect →
                </Link>
                <Link to="/launchpad" className="content-link">
                  Explore Launchpad →
                </Link>
              </div>
            </section>
            <section className="content-section">
              <h2>Connect & subscribe</h2>
              <p>Stay connected with the BITS Pilani entrepreneurship network.</p>
              <div className="content-actions">
                <a className="content-link" href="https://chat.whatsapp.com/GRGDBbVBNiV6WvTpw1g182" target="_blank" rel="noopener noreferrer">
                  Join the WhatsApp community ↗
                </a>
                <a className="content-link" href="https://www.instagram.com/ecell_bphc" target="_blank" rel="noopener noreferrer">
                  Follow @ecell_bphc ↗
                </a>
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
