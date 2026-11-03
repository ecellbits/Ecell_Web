import React from 'react';
import Hero from "./SponsorsHero";
import Partners from "./PartnersList";
import Contact from "./SponsorContacts";
import SEO from "@/components/common/SEO";

function PartnerPage() {
    return (
        <div>
            <SEO
                title="Our Partners | Launchpad 2026"
                description="Meet the official partners of Launchpad 2026. Strategic partnerships that drive BITS Pilani Hyderabad's startup ecosystem."
                keywords={['Launchpad Partners', 'E-Cell BITS Hyderabad Partners', 'Strategic Partnerships', 'Startup Support']}
                url="https://ecellbphc.in/launchpad/partner"
            />
            <Hero />
            <Partners />
            <Contact />
        </div>
    );
}

export default PartnerPage;
export { PartnerPage as Comp };
