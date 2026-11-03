import React from "react";
import Current from "./CurrentSpeakers";
import Hero from "./SpeakersHero";
import Past from "./PastSpeakers";
import Contact from "./SpeakerContacts";
import SEO from "@/components/common/SEO";

function Home() {
  return (
    <div>
      <SEO
        title="Speakers | Launchpad 2026"
        description="Meet the industry leaders, VCs, and entrepreneurs speaking at Launchpad 2026. Gain insights from the best in the business."
        keywords={['Launchpad Speakers', 'Startup Mentors', 'BITS Hyderabad Speakers', 'Entrepreneurship Talk']}
        url="https://ecellbphc.in/launchpad/speakers"
      />
      <Hero />
      <Current />
      <Past />
      <Contact />
    </div>
  );
}

export default Home;
export { Home as Comp };
