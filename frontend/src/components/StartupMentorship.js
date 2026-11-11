import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './common/SEO';
import { useSectionHash } from './common/use-section-hash';
import './common/content-pages.css';

const sessions = [
  {
    number: "01",
    date: "18 OCT",
    status: "Completed",
    title: "Problem, Customer & ICP",
    description:
      "Understand your customers, sharpen your problem statement, identify your ideal customer profile, and discover why now is the right time.",
  },
  {
    number: "02",
    date: "01 NOV*",
    status: "Completed",
    title: "MVP & Product Validation",
    description:
      "Learn what to build first, what to skip, and how to validate your product with real users.",
  },
  {
    number: "03",
    date: "15 NOV*",
    status: "Live",
    title: "Business Model & Unit Economics",
    description:
      "Explore customer acquisition costs, lifetime value, burn rate, and early monetisation.",
  },
  {
    number: "04",
    date: "22 NOV*",
    status: "Upcoming",
    title: "Market, Competition & GTM",
    description:
      "Map your market, understand competitors, position your startup, and plan for your first 100 customers.",
  },
  {
    number: "05",
    date: "DEC — WEEK 3*",
    status: "Upcoming",
    title: "Fundraising Strategy",
    description:
      "Understand how investors evaluate startups, what makes a pitch deck fundable, and common fundraising mistakes.",
  },
];

export default function StartupMentorship() {
  useSectionHash();

  return (
    <main className="content-page" data-theme="light">
      <SEO
        title="Founder’s First Mentorship"
        description="A five-session startup mentorship program, from customer discovery and product validation to fundraising."
        url="https://www.ecellbits.com/startup-mentorship"
        keywords={['Founder’s First', 'Startup Mentorship', 'BITS Hyderabad']}
        image="https://www.ecellbits.com/navbarlogo.png"
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'EducationalOccupationalProgram',
          name: 'Founder’s First Mentorship',
          provider: {
            '@type': 'Organization',
            name: 'E-Cell BITS Pilani Hyderabad Campus'
          }
        }}
      />
      <div className="content-container">
        <header className="content-hero">
          <p className="content-meta">Founder’s First · Startup mentorship</p>
          <h1>Build beyond<br />the idea.</h1>
          <p className="content-lead">
            Five sessions. Real startup experience. Practical feedback. From finding the right problem to preparing for fundraising, take your startup to its next stage.
          </p>
          <div className="content-actions">
            <Link to="/mentor-connect" className="content-button content-button-primary">
              Apply for mentorship →
            </Link>
            <a href="#roadmap" className="content-link">
              Explore the program ↓
            </a>
          </div>
        </header>
        <section className="content-section mentorship-intro">
          <h2>Your startup deserves more than advice.</h2>
          <div>
            <p>
              The Startup Mentorship Program is a five-session learning experience for early-stage founders, designed to turn entrepreneurial questions into practical next steps.
            </p>
            <p>
              Explore problem discovery, product validation, business fundamentals, go-to-market strategies, and fundraising with guidance shaped by real startup experience.
            </p>
          </div>
        </section>
        <section id="roadmap" className="content-section">
          <h2>Five sessions. One journey.</h2>
          <p className="content-muted">From understanding your customers to fundraising readiness.</p>
          <ol className="mentorship-sessions">
            {sessions.map((session) => (
              <li key={session.number}>
                <span className="content-number">{session.number}</span>
                <div>
                  <p className="content-meta">
                    {session.date} ·{' '}
                    <span
                      style={{
                        fontWeight: 600,
                        color:
                          session.status === 'Completed'
                            ? '#1a7f45'
                            : session.status === 'Live'
                            ? '#b45309'
                            : 'inherit',
                      }}
                    >
                      {session.status === 'Completed' ? '✓ Completed' : session.status}
                    </span>
                  </p>
                  <h3>{session.title}</h3>
                  <p>{session.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="content-muted">* Dates are tentative and subject to confirmation.</p>
        </section>
        <section className="content-section">
          <h2>Take the next step.</h2>
          <p>Tell us what you’re building and where you need guidance.</p>
          <div className="content-actions">
            <Link to="/mentor-connect" className="content-button content-button-primary">
              Apply for mentorship →
            </Link>
            <Link to="/blog" className="content-link">
              Read the founder playbook →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
