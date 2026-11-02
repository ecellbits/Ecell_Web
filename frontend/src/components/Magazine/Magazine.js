import React, { useState, useEffect } from 'react';
import './Magazine.css';
import SEO from '../common/SEO';
import { Helmet } from 'react-helmet-async';
import { useLenis } from '../SmoothScroll';
import { X } from 'lucide-react';

const storiesData = [
  {
    id: 1,
    title: "The last-bench startup that hit ₹1 Cr in revenue",
    category: "Founders",
    author: "Sanay Shah",
    color: "#FFB61E",
    paragraphs: [
      "Three second-years began by reselling lab notes. Eighteen months later the same team runs a study-material business with paying customers in nine cities.",
      "Their advice for newcomers is plain: talk to ten buyers before writing a single line of code, and keep a record of every refusal.",
      "Building during semester exams required relentless prioritization. 'We scheduled customer interviews between practicals and automated our order fulfilment scripts late at night,' Riya recalls. Today, the platform supports over 40,000 active students."
    ]
  },
  {
    id: 2,
    title: "How we raised our first cheque without a pitch deck",
    category: "Funding",
    author: "Karan Iyer",
    color: "#9FA8FF",
    paragraphs: [
      "The first investor said yes after a working demo and a one-page summary. No slides were involved.",
      "Karan explains how to find angels inside your own alumni network and what to ask for in the first meeting.",
      "'Investors back momentum, not formatting,' Karan notes. 'If you can show five people using your buggy MVP every day and paying for it, that signals tenfold more conviction than a thirty-page slide presentation.'"
    ]
  },
  {
    id: 3,
    title: "Inside the incubator: a day with Cohort 7",
    category: "Campus",
    author: "Meera Nair",
    color: "#FF8A7A",
    paragraphs: [
      "Twelve teams share one floor, one whiteboard wall, and a weekly review where ideas get cut.",
      "We followed three of them from a Monday standup to a Friday customer call.",
      "The atmosphere is a blend of intense coding, rapid customer feedback calls, and spontaneous mentor office hours. In the incubator, failures aren't stigmatized—they are accelerated so teams pivot before capital dries up."
    ]
  },
  {
    id: 4,
    title: "A 30-day plan to validate any idea",
    category: "Playbook",
    author: "Dev Malhotra",
    color: "#7BE0B0",
    paragraphs: [
      "Week one: write down the problem and who has it. Week two: interview fifteen of them. Week three: sell a fake version. Week four: decide.",
      "The plan has been used by 40 campus teams, and a third of them dropped their first idea by day 21.",
      "Validating demand early saves months of building things nobody wants. Dev walks through the exact interview scripts and no-code landing page experiments any student can run in a weekend."
    ]
  },
  {
    id: 5,
    title: "Co-founder breakups and how to survive them",
    category: "Founders",
    author: "Sana Qureshi",
    color: "#FFB61E",
    paragraphs: [
      "Most student teams never write down who owns what. That gap turns into a fight the first time money arrives.",
      "Sana speaks to four founders who split and a lawyer who has drawn up the papers.",
      "Clear vesting schedules, founder agreements, and honest conversations on commitment levels before incorporating can turn potential disasters into clean, amicable transitions."
    ]
  },
  {
    id: 6,
    title: "Grants, scholarships and other money that isn’t equity",
    category: "Funding",
    author: "Arjun Pillai",
    color: "#9FA8FF",
    paragraphs: [
      "A short guide to government schemes, corporate grants and competition prizes open to students.",
      "Includes a table of deadlines and what each programme actually expects from you.",
      "From NIDHI-PRAYAS to SISFS and university innovation fellowships, non-dilutive capital gives campus founders the runway they need to build defensible tech without diluting their cap table early."
    ]
  }
];

const categories = ["all", "Founders", "Funding", "Campus", "Playbook","Startups","Mentorship"];

//have to see these colors should they be matching with the theme of the website or should they be different
const archiveIssues = [
  { issue: 12, year: 2025, color: "#FFB61E" },
  { issue: 11, year: 2024, color: "#9FA8FF" },
  { issue: 10, year: 2023, color: "#FF8A7A" },
  { issue: 9, year: 2022, color: "#7BE0B0" },
  { issue: 8, year: 2021, color: "#FFB61E" },
  { issue: 7, year: 2020, color: "#9FA8FF" }
];

const upcomingEvents = [
  {
    date: "23rd Oct",
    title: "Build2Base",
    description: "Eight teams, five minutes each, three investors on the panel. Main auditorium."
  },
  {
    date: "22 Nov",
    title: "Founder Fireside",
    description: "An alumnus who shut down a startup explains what the post-mortem taught them."
  },
  {
    date: "13 Dec",
    title: "48-hour Build Weekend",
    description: "Form a team on Friday night, demo a working product on Sunday evening."
  }
];

const StoryCardArt = ({ color, index }) => (
  <svg className="mag-card-art" viewBox="0 0 400 210" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="210" fill={color} />
    <circle
      cx={90 + index * 45}
      cy={60 + (index % 3) * 35}
      r={50 + (index % 2) * 20}
      fill="#10142E"
      opacity="0.9"
    />
    <rect
      x={200 + index * 20}
      y={30 + index * 10}
      width="130"
      height="130"
      fill="#ffffff"
      opacity="0.56"
      transform={`rotate(${12 + index * 9} 300 100)`}
    />
  </svg>
);

const Magazine = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedStory, setSelectedStory] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({ text: '', isError: false });

  const lenis = useLenis();

  // Handle ESC key to close modal & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedStory(null);
      }
    };

    if (selectedStory) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedStory]);


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -90 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    // Valid email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //here backend is not connected so only text visible 
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setSubscribeStatus({
        text: 'Enter a valid email address, for example name@college.edu or name@hyderabad.bits-pilani.ac.in',
        isError: true
      });
      return;
    }

    // Success response
    setSubscribeStatus({
      text: `Subscribed! The next issue will arrive at ${cleanEmail}.`,
      isError: false
    });
    setEmail(''); //reloading a new email everytime
  };

  const filteredStories = storiesData.filter(
    (story) => activeFilter === 'all' || story.category === activeFilter
  );

  return (
    <div className="magazine-page-container">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        />
      </Helmet>
      <SEO
        title="Udyama Magazine | E-Cell BITS Pilani Hyderabad"
        description="The official annual magazine of E-Cell BITS Pilani Hyderabad Campus: student founders, hard lessons, startup spotlights, and stories that started in hostel rooms."
        keywords={["Udyama", "E-Cell Magazine", "BITS Pilani Hyderabad", "Student Startups", "Entrepreneurship"]}
      />

      <div className="mag-wrap">
        {/* Magazine Sub-Navigation */}
        <nav className="mag-nav" aria-label="Magazine Navigation">
          <div className="mag-nav-brand">
            <span className="mag-logo">Udyama</span>
            <span className="mag-issue-badge">Issue 12 · 2026</span>
          </div>

          <ul>
            <li>
              <a
                href="#stories"
                onClick={(e) => 
                {
                  e.preventDefault();
                  scrollToSection('stories');
                }}
              >
                Stories
              </a>
            </li>
            <li>
              <a
                href="#spotlight"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('spotlight');
                }}
              >
                Spotlight
              </a>
            </li>
            <li>
              <a
                href="#events"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('events');
                }}
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#archive"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('archive');
                }}
              >
                Archive
              </a>
            </li>
            <li>
              <a
                href="#join"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('join');
                }}
              >
                Subscribe
              </a>
            </li>
          </ul>

          <div className="mag-nav-actions">
           
        
          </div>
        </nav>

        {/* Hero Section */}
        <header className="mag-hero" id="top">
          <div>
            <h1 className="mag-masthead">Udyama</h1>
            <p className="mag-lead">
              The annual magazine of the E Cell Bits Pilani Hyderabad Campus. Student founders,
              hard lessons, and the ideas that started in hostel rooms.
            </p>
            <div className="mag-btn-row">
              <button
                className="mag-btn"
                onClick={() => scrollToSection('stories')}
              >
                Read Issue 12
              </button>
              <button
                className="mag-btn mag-btn-alt"
                onClick={() => scrollToSection('join')}
              >
                Wait for the next issue
              </button>
            </div>
          </div>

          {/* 3D Cover Preview */}
          <div className="mag-cover" aria-label="Issue 12 cover">
            <small>Issue 12 · Launchpad 2026</small>
            <h2>ECELL 2026-27</h2>
            <svg className="mag-cover-art" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="120" cy="120" r="80" fill="#FFB61E" />
              <path d="M20 190 L100 60 L140 120 L170 80 L200 190Z" fill="#10142E" />
              <circle cx="60" cy="60" r="16" fill="#fff" />
            </svg>
          </div>
        </header>

        {/* Stories Section */}
        <section className="mag-section" id="stories">
          <div className="mag-sec-head">
            <h2>This issue</h2>
            {/* <p>Pick a topic, then open a story to read it.</p>  No need for this*/}
          </div>

          <div className="mag-filters" role="group" aria-label="Filter stories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`mag-chip ${activeFilter === cat ? 'active' : ''}`}
                aria-pressed={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div className="mag-grid" id="grid">
            {filteredStories.map((story, idx) => (
              <button
                key={story.id}
                className={`mag-card ${idx === 0 ? 'featured' : ''}`}
                onClick={() => setSelectedStory(story)}
                aria-label={`Open story: ${story.title}`}
              >
                <StoryCardArt color={story.color} index={idx} />
                <span className="mag-card-txt">
                  <span className="mag-tag">{story.category}</span>
                  <h3>{story.title}</h3>
                  <span className="mag-by">By {story.author}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Startup Spotlight Section */}
        <section className="mag-section" id="spotlight">
          <div className="mag-sec-head">
            <h2>Startup spotlight</h2>
            <p>One alumni venture, covered in depth every issue.</p>
          </div>
          <div className="mag-spot">
            <div>
              <blockquote>
                “We sold our first order before we had a company name. The name came when the
                invoice needed one.”
              </blockquote>
              <cite>Jayant Khatri, CEO of Appolyon Dynamics Class 0f 2023</cite>
            </div>
            <div className="mag-facts">
              <div className="mag-fact">
                <b>38</b>
                <span>startups incubated since 2019</span>
              </div>
              <div className="mag-fact">
                <b>₹14 Cr</b>
                <span>raised by campus founders</span>
              </div>
              <div className="mag-fact">
                <b>120+</b>
                <span>mentors in the alumni network</span>
              </div>
              <div className="mag-fact">
                <b>6,400</b>
                <span>students at our events last year</span>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Up / Events Section */}
        <section className="mag-section" id="events">
          <div className="mag-sec-head">
            <h2>Coming up</h2>
            <p>Open to every department and every year.</p>
          </div>
          <ul className="mag-events-list">
            {upcomingEvents.map((event, i) => (
              <li key={i}>
                <span className="mag-event-date">{event.date}</span>
                <div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
                <button
                  className="mag-btn"
                  onClick={() => scrollToSection('join')}
                >
                  Register
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Archive Section */}
        <section className="mag-section" id="archive">
          <div className="mag-sec-head">
            <h2>Past issues</h2>
            <p>ECell Stories since 2020</p>
          </div>
          <div className="mag-issues-scroll" id="issues">
            {archiveIssues.map((item) => (
              <div
                key={item.issue}
                className="mag-issue-item"
                style={{ backgroundColor: item.color }}
                onClick={() => {
                  setSelectedStory({
                    title: `Archive: Issue ${item.issue} (${item.year})`,
                    category: 'Archive',
                    author: 'E-Cell Editorial Team',
                    paragraphs: [
                      `Issue ${item.issue} of Udyama was published in ${item.year} during Launchpad BPHC.`,
                      `It featured candid interviews with our flagship cohort, in-depth pitch breakdowns, and founder diaries from BITS Pilani alumni who launched high-growth ventures across fintech, agritech, and deeptech.`,
                      `Full archival PDF copies and retrospective issues can be requested via the subscription box below or directly through the E-Cell library.`
                    ]
                  });
                }}
              >
                <span>{item.year}</span>
                <b>Issue {item.issue}</b>
              </div>
            ))}
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="mag-section" id="join">
          <div className="mag-sub-box">
            <div>
              <h2>One email when each issue goes live</h2>
            </div>
            <form onSubmit={handleSubscribe} noValidate>
              <input
                id="email"
                type="email"
                placeholder="Your college email"
                aria-label="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (subscribeStatus.text) setSubscribeStatus({ text: '', isError: false });
                }}
                required
              />
              <button className="mag-btn" type="submit">
                Subscribe
              </button>
              {subscribeStatus.text && (
                <p
                  className="mag-sub-msg"
                  role="status"
                  style={{ color: subscribeStatus.isError ? '#ffdddd' : '#ffffff' }}
                >
                  {subscribeStatus.text}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Editorial Footer Note */}
        <footer className="mag-footer-note">
          <span>Udyama, published by ECell Bits Pilani Hyderabad Campus.</span>
          <span>© 2026 ECell BPHC</span>
        </footer>
      </div>

      {/* Story Reader Modal */}
      {selectedStory && (
        <div
          className="mag-modal-backdrop"
          onClick={() => setSelectedStory(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="mag-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mag-modal-close"
              onClick={() => setSelectedStory(null)}
              aria-label="Close story"
            >
              <X size={18} />
            </button>
            <span className="mag-tag">{selectedStory.category}</span>
            <h2>{selectedStory.title}</h2>
            <div className="mag-by">By {selectedStory.author}</div>
            <div className="mag-modal-body">
              {selectedStory.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Magazine;
