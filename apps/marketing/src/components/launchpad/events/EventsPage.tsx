import React from 'react';
import Hero from "./EventsHero";
import List from "./EventsList";
import SEO from "@/components/common/SEO";

function Gr() {
  return (
    <div>
      <SEO
        title="Events | Launchpad 2026"
        description="Discover the exciting lineup of events at Launchpad 2026 - from Ground Reality to Teen Tycoons and internship drives."
        keywords={['Launchpad Events', 'Ground Reality', 'Teen Tycoons', 'Internship Drive', 'Startup Expo']}
        url="https://ecellbphc.in/launchpad/events"
      />
      <Hero />
      <List />
    </div>
  );
}

export default Gr;
export { Gr as Comp };
