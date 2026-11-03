import { useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { useScrollMotion } from '@/components/common/useScrollMotion';
import Hero from './HomeHero';
import Startup from './Startups';
import BlogShortcut from './BlogShortcut';
import Initiatives from './Initiatives';
import Launchpad from './LaunchpadSection';
import SEO from '@/components/common/SEO';

function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  useScrollMotion(pageRef);

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
    <MotionConfig reducedMotion="user">
      <div ref={pageRef} className="relative bg-brand-cream">
        <SEO
          title="Home"
          description="E-Cell BITS Pilani Hyderabad Campus - Fostering Entrepreneurship and Innovation. Join our events and programs like Launchpad to grow your startup."
          keywords={['E-Cell', 'BITS Pilani', 'Hyderabad', 'Entrepreneurship', 'Startups', 'Launchpad', 'Blog']}
          schemaData={jsonLd}
        />
        <Hero />
        <Startup />
        <BlogShortcut />
        <Initiatives />
        <Launchpad />
      </div>
    </MotionConfig>
  );
}

export default Home;
export { Home as Comp };
