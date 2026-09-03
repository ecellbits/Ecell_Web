import React from "react";
import OurTeam from "./OurTeam";
import SEO from "../common/SEO";

function Team() {
  return (
    <div>
      <SEO
        title="Our Team"
        description="Meet the core organizing team behind E-Cell BITS Hyderabad for the 2025–2026 tenure."
        keywords={['E-Cell Team', 'E-Cell BITS Hyderabad', 'PORs', 'Entrepreneurship Cell', 'Core Team', 'Leadership']}
        url="https://ecellbphc.in/team"
      />
      <OurTeam />
    </div>
  );
}

export default Team;
