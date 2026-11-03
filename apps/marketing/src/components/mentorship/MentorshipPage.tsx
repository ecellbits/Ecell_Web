import { Link } from '@/shims/react-router';
import SEO from '@/components/common/SEO';
import { useSectionHash } from '@/components/common/use-section-hash';
import { sessions } from './data';
import '@/components/common/content-pages.css';

export default function MentorshipPage() {
  useSectionHash();
  return (
    <main className="content-page">
      <SEO title="Founder’s First Mentorship" description="A five-session startup mentorship program, from customer discovery and product validation to fundraising." url="https://www.ecellbits.com/startup-mentorship" keywords={['Founder’s First', 'Startup Mentorship', 'BITS Hyderabad']} image="https://www.ecellbits.com/navbarlogo.png" schemaData={{ '@context': 'https://schema.org', '@type': 'EducationalOccupationalProgram', name: 'Founder’s First Mentorship', provider: { '@type': 'Organization', name: 'E-Cell BITS Pilani Hyderabad Campus' } }} />
      <div className="content-container">
        <header className="content-hero">
          <p className="content-meta">Founder’s First · Startup mentorship</p>
          <h1>Build beyond<br />the idea.</h1>
          <p className="content-lead">Five sessions. Real startup experience. Practical feedback. From finding the right problem to preparing for fundraising, take your startup to its next stage.</p>
          <div className="content-actions"><Link to="/mentor-connect" className="content-button content-button-primary">Apply for mentorship →</Link><a href="#roadmap" className="content-link">Explore the program ↓</a></div>
        </header>
        <section className="content-section mentorship-intro"><h2>Your startup deserves more than advice.</h2><div><p>The Startup Mentorship Program is a five-session learning experience for early-stage founders, designed to turn entrepreneurial questions into practical next steps.</p><p>Explore problem discovery, product validation, business fundamentals, go-to-market strategies, and fundraising with guidance shaped by real startup experience.</p></div></section>
        <section id="roadmap" className="content-section">
          <h2>Five sessions. One journey.</h2><p className="content-muted">From understanding your customers to fundraising readiness.</p>
          <ol className="mentorship-sessions">{sessions.map((session) => <li key={session.number}><span className="content-number">{session.number}</span><div><p className="content-meta">{session.date} · Upcoming</p><h3>{session.title}</h3><p>{session.description}</p></div></li>)}</ol>
          <p className="content-muted">* Dates are tentative and subject to confirmation.</p>
        </section>
        <section className="content-section"><h2>Take the next step.</h2><p>Tell us what you’re building and where you need guidance.</p><div className="content-actions"><Link to="/mentor-connect" className="content-button content-button-primary">Apply for mentorship →</Link><Link to="/blog" className="content-link">Read the founder playbook →</Link></div></section>
      </div>
    </main>
  );
}
