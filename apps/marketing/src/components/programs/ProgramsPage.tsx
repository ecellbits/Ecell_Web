import React from 'react';
import Intro from './ProgramsIntro';
import List from './ProgramsList';
import Memory from './ProgramMemories';
import { Link } from '@/shims/react-router';
function Programs() {
  return (
    <div>
    <Intro/>
    <List/>
    <section className="home-section"><div className="home-section-inner"><h2 className="home-section-title">Founder’s First mentorship</h2><p className="home-section-description mt-4 mb-6">Five sessions to move from customer discovery to fundraising readiness.</p><Link className="home-text-link" to="/startup-mentorship">Explore the program →</Link></div></section>
    <Memory/>
    </div>
  );
}

export default Programs;
export { Programs as Comp };
