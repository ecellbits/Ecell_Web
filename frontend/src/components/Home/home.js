import React from 'react';
import Startup from './startups';

import Initiatives from './initiatives';
import Launchpad from './launchpad';
import Hero from './hero';
import BlogShortcut from './BlogShortcut';
import GradientBackground from '../GradientBackground';
import SEO from '../common/SEO';

function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "E-Cell BITS Hyderabad",
    "url": "https://ecellbphc.in",
    "logo": "https://ecellbphc.in/navbarlogo.png",
    "description": "Entrepreneurship Cell at BITS Pilani Hyderabad Campus, fostering startups and innovation.",
    "sameAs": [
      "https://www.instagram.com/ecell_bphc",
      "https://www.linkedin.com/company/e-cell-bphc/",
      "https://x.com/ecell_bphc",
      "https://www.facebook.com/groups/158307448076754/"
    ]
  };

  return (
    <div className="relative">
      <SEO
        title="Home"
        description="E-Cell BITS Pilani Hyderabad Campus - Fostering Entrepreneurship and Innovation. Join our events and programs like Launchpad to grow your startup."
        keywords={['E-Cell', 'BITS Pilani', 'Hyderabad', 'Entrepreneurship', 'Startups', 'Launchpad', 'Blog']}
        schemaData={jsonLd}
      />
      <Hero />
      <GradientBackground>
        <Startup />
        <BlogShortcut />
        <Launchpad />
        <Initiatives />
      </GradientBackground>
    </div>
  );
}

export default Home;