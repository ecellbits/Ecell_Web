import { Link } from '@/shims/react-router';

const ways = [
  { title: 'Attend Launchpad', text: 'Find a pass for yourself or your team.', links: [['Individual passes', '/launchpad/passes'], ['Corporate passes', '/launchpad/corporate-passes'], ['Contingent passes', '/launchpad/contingent-passes']] },
  { title: 'Campus ambassadors', text: 'Bring your community to Launchpad and explore referral rewards.', links: [['Explore the program', '/launchpad/campus-ambassador']] },
  { title: 'Partner with us', text: 'Support student founders through sponsorship or an ecosystem partnership.', links: [['Sponsorship opportunities', '/launchpad/sponsor/wanna-sponsor'], ['Our partners', '/launchpad/partner'], ['Media partners', '/launchpad/media']] },
];

export default function ParticipationSection() {
  return <section className="home-section"><div className="home-section-inner"><h2 className="home-section-title">Find your place.</h2><div className="participation-list">{ways.map((way) => <div key={way.title}><h3>{way.title}</h3><p>{way.text}</p><div>{way.links.map(([label, to]) => <Link className="home-text-link" key={to} to={to}>{label} →</Link>)}</div></div>)}</div><div className="content-disclosure"><h2>DP World National Hackathon</h2><p>Registration is closed. The national hackathon brought developers and innovators together to compete for a ₹3 lakh prize pool.</p></div></div></section>;
}
