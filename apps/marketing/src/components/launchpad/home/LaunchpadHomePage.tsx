import React from "react";
import ParticipationSection from "./ParticipationSection";
import Hero from "./LaunchpadHero";
import GradientBackground from "@/components/common/GradientBackground";
import Sponsor from "./SponsorsCarousel";
import Past from "./PastSpeakersSection";
import Partners from "./PartnersCarousel";
import Media from "./MediaPartnersCarousel";

import About from "./AboutSection";
import ProgramsSection from "./ProgramsSection";
import SEO from "@/components/common/SEO";

function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Launchpad 2026",
    "startDate": "2026-03-15T09:00:00+05:30",
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "BITS Pilani Hyderabad Campus",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jawahar Nagar, Shameerpet",
        "addressLocality": "Hyderabad",
        "postalCode": "500078",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    },
    "description": "Annual flagship startup competition of E-Cell BITS Hyderabad.",
    "organizer": {
      "@type": "Organization",
      "name": "E-Cell BITS Hyderabad",
      "url": "https://ecellbphc.in"
    }
  };

  return (
    <>
      <SEO
        title="Launchpad 2026"
        description="The premier startup stage for student entrepreneurs. Pitch to VCs like Speciale Invest and win equity-free grants."
        keywords={['Startup', 'BITS Pilani', 'Entrepreneurship', 'Venture Capital', 'Hyderabad']}
        image="https://ecellbphc.in/og-launchpad.jpg"
        url="https://ecellbphc.in/launchpad"
        schemaData={jsonLd}
      />

      {/* First loading screen - only LP part visible with big scroll animation */}
      <Hero />

      <GradientBackground>
        <ProgramsSection />
        <ParticipationSection />
        <About />
        <Past />
        <Sponsor />
        <Partners />
        <Media />
      </GradientBackground>
    </>
  );
}

export default Home;
export { Home as Comp };
