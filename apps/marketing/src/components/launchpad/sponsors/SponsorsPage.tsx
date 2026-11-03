import React from 'react';
import Hero from "./SponsorsHero";
import Companies from "./SponsorsList";
import Contact from "./SponsorContacts";
import SEO from "@/components/common/SEO";


function Sponsor() {
  return (
    <div>
      <SEO
        title="Sponsors | Launchpad 2026"
        description="Meet the sponsors and partners supporting Launchpad 2026. Explore opportunities to partner with BITS Pilani Hyderabad's flagship event."
        keywords={['Launchpad Sponsors', 'Partner with E-Cell', 'Sponsorship Opportunities', 'Startup Ecosystem Partners']}
        url="https://ecellbphc.in/launchpad/sponsor"
      />
      <Hero />
      <Companies />
      <Contact />
    </div>
  );
}

export default Sponsor;
export { Sponsor as Comp };
