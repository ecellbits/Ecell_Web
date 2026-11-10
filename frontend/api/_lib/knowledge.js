/**
 * E-Cell BITS Pilani Hyderabad Campus — Chatbot Knowledge Base
 *
 * Exports:
 *   toolDeclarations  – Gemini function-calling tool declarations
 *   executeFunction   – Runs a tool by name and returns its result
 */

// ---------------------------------------------------------------------------
// Tool declarations (Gemini function-calling format)
// ---------------------------------------------------------------------------

const toolDeclarations = [
  {
    name: "get_ecell_overview",
    description:
      "Returns general information about E-Cell BITS Pilani Hyderabad Campus, including its mission, notable alumni startups, and social media links.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "get_launchpad_info",
    description:
      "Returns information about Launchpad, the largest E-Summit of South India organized by E-Cell BPHC.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "get_event_details",
    description:
      "Returns detailed information about a specific Launchpad event including description, registration link, and details page.",
    parameters: {
      type: "object",
      properties: {
        event_name: {
          type: "string",
          description: "The event to look up.",
          enum: [
            "startup_expo",
            "teen_tycoons",
            "pitchers_pilot",
            "ground_reality",
            "internship_drive",
            "seed",
          ],
        },
      },
      required: ["event_name"],
    },
  },
  {
    name: "get_community_meet_details",
    description:
      "Returns detailed information about E-Cell's Community Meet initiative ('Ideas Into Impact'), sectors covered, featured startup ventures, and direct page link.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "get_programs_info",
    description:
      "Returns an overview of all E-Cell programs and initiatives such as Launchpad, Speaker Sessions, Community Meet, Mentorship, Campus Ambassador, etc.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "get_mentorship_details",
    description:
      "Returns detailed information about the Founder's First Startup Mentorship program, including session schedule and application link.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "get_blog_info",
    description:
      "Returns information about the E-Cell entrepreneurship blog, including featured articles and link.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "get_contact_info",
    description:
      "Returns contact information for E-Cell and Launchpad, including social media handles and relevant forms.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "get_sponsors_info",
    description:
      "Returns sponsorship and partnership information for Launchpad, including links to sponsor slabs and media pages.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "get_page_url",
    description:
      "Returns the full URL and a brief description for a given page on the E-Cell or Launchpad website.",
    parameters: {
      type: "object",
      properties: {
        page: {
          type: "string",
          description: "The page identifier to look up.",
          enum: [
            "home",
            "blog",
            "team",
            "programs",
            "community_meet",
            "gallery",
            "contact",
            "launchpad",
            "launchpad_events",
            "launchpad_sponsors",
            "launchpad_speakers",
            "launchpad_team",
            "launchpad_gallery",
            "launchpad_contact",
            "launchpad_links",
            "startup_connect",
            "mentor_connect",
            "startup_mentorship",
            "campus_ambassador",
            "passes",
            "accommodation",
          ],
        },
      },
      required: ["page"],
    },
  },
];

// ---------------------------------------------------------------------------
// Knowledge data
// ---------------------------------------------------------------------------

const BASE = "https://www.ecellbphc.in";

function getEcellOverview() {
  return {
    name: "E-Cell BITS Pilani, Hyderabad Campus",
    description:
      "The Entrepreneurship Cell of BITS Pilani, Hyderabad Campus. E-Cell fosters innovation and the entrepreneurial spirit among students through events, programs, speaker sessions, and mentorship initiatives.",
    notable_bitsian_startups: [
      "Swiggy",
      "redBus",
      "Groww",
      "bigbasket",
      "MPL (Mobile Premier League)",
      "SanDisk",
    ],
    social_media: {
      instagram: "https://instagram.com/ecell_bphc",
      linkedin: "https://linkedin.com/company/e-cell-bphc",
      twitter: "https://twitter.com/ecell_bphc",
      facebook: "https://facebook.com/ecellbphc",
    },
    website: BASE,
  };
}

function getLaunchpadInfo() {
  return {
    name: "Launchpad",
    tagline: "The largest E-Summit of South India",
    organizer: "E-Cell BITS Pilani Hyderabad Campus",
    highlights: [
      "Multiple flagship events",
      "Speaker sessions with industry leaders",
      "Startup Expo",
      "Networking opportunities",
    ],
    website: `${BASE}/launchpad`,
    sections: {
      events: `${BASE}/launchpad/events`,
      sponsors: `${BASE}/launchpad/sponsor`,
      speakers: `${BASE}/launchpad/speakers`,
      team: `${BASE}/launchpad/team`,
      gallery: `${BASE}/launchpad/gallery`,
      schedule: `${BASE}/launchpad/schedule`,
    },
  };
}

const EVENTS = {
  startup_expo: {
    name: "Startup Expo",
    description:
      "Unleash innovation and connect with industry leaders at the Startup Expo.",
    registration:
      "https://unstop.com/competitions/startup-expo-launchpad-26-bits-1631560",
    details: `${BASE}/launchpad/startup_expo`,
  },
  teen_tycoons: {
    name: "Teen Tycoons",
    description:
      "Shaping the next generation of entrepreneurs through dynamic challenges and expert mentorship.",
    registration:
      "https://unstop.com/competitions/teen-tycoons-launchpad-26-bits-1631539",
    details: `${BASE}/launchpad/teen_tycoons`,
  },
  pitchers_pilot: {
    name: "Pitcher's Pilot",
    description:
      "A dynamic platform for entrepreneurs to showcase their ventures, gain valuable feedback, and connect with investors.",
    registration:
      "https://unstop.com/competitions/pitchers-pilot-launchpad-26-bits-1631551",
    details: `${BASE}/launchpad/pitchers_pilot`,
  },
  ground_reality: {
    name: "Ground Reality",
    description:
      "Pitch your startup to top investors and win Rs. 2 Lakhs along with mentorship and resources.",
    registration:
      "https://unstop.com/competitions/ground-reality-business-plan-competition-launchpad-26-bits-1631135",
    details: `${BASE}/launchpad/ground_reality`,
  },
  internship_drive: {
    name: "Internship Drive",
    description:
      "Launch your career — connect, learn, and grow with top startups.",
    registration: null,
    details: `${BASE}/launchpad/internship_drive`,
  },
  seed: {
    name: "SEED",
    description:
      "A national initiative to bring together E-Cells from across India to share ideas and best practices in building campus startup ecosystems.",
    registration: null,
    details: `${BASE}/launchpad/seed`,
  },
};

function getEventDetails(args) {
  const event = EVENTS[args.event_name];
  if (!event) {
    return { error: `Unknown event: ${args.event_name}` };
  }
  return event;
}

function getProgramsInfo() {
  return {
    programs: [
      {
        name: "Launchpad",
        description: "The largest E-Summit of South India.",
        link: `${BASE}/launchpad`,
      },
      {
        name: "Speaker Sessions",
        description:
          "Engaging sessions throughout the year with industry leaders and entrepreneurs.",
        link: `${BASE}/program`,
      },
      {
        name: "Community Meet",
        tagline: "Ideas Into Impact",
        description:
          "Community meetups featuring startups from sectors like Defence Technology, Agritech, Healthcare, AI Diagnostics, and Industrial Technology. Featured ventures include Beijan, Mitti Sanjeevani, AtreVes Healthcare, and more.",
        link: `${BASE}/community-meet`,
      },
      {
        name: "Management Temptations",
        description:
          "Unleash your strategic genius — a business strategy competition.",
      },
      {
        name: "Networking Arena",
        description:
          "Connect, collaborate & create — networking events for entrepreneurs.",
      },
      {
        name: "Startup Mentorship (Founder's First)",
        description:
          "A five-session mentorship program for early-stage founders covering Problem & ICP discovery, MVP & Product Validation, Business Model & Unit Economics, Market & GTM Strategy, and Fundraising Strategy.",
        apply: `${BASE}/mentor-connect`,
        details: `${BASE}/startup-mentorship`,
      },
      {
        name: "Campus Ambassador Program",
        description:
          "Promote Launchpad, earn referral rewards (Delegate pass at 5 refs, Executive at 10, Nexus at 20), get certificates and LORs.",
        link: `${BASE}/launchpad/campus-ambassador`,
      },
    ],
  };
}

function getMentorshipDetails() {
  return {
    name: "Founder's First — Startup Mentorship Program",
    tagline: "Build Beyond The Idea",
    overview:
      "A five-session learning and feedback experience designed for early-stage founders to turn entrepreneurial questions into practical next steps — from problem discovery to fundraising readiness.",
    how_to_register:
      "To register for Founder's First, submit your application via the Mentor Connect form. Provide your startup details, stage, and focus area. Direct link: [Apply for Mentorship](https://www.ecellbphc.in/mentor-connect)",
    curriculum_details:
      "Full program details, curriculum roadmap, and session schedules are available at: [Founder's First Mentorship](https://www.ecellbphc.in/startup-mentorship)",
    sessions: [
      { number: "01", topic: "Problem, Customer & ICP", date: "18 OCT", description: "Understand your customers, sharpen problem statements, identify ICP, and discover timing." },
      { number: "02", topic: "MVP & Product Validation", date: "01 NOV*", description: "Learn what to build first, what to skip, and how to validate with real users." },
      { number: "03", topic: "Business Model & Unit Economics", date: "15 NOV*", description: "Explore CAC, LTV, burn rate, and early monetization." },
      { number: "04", topic: "Market, Competition & GTM", date: "22 NOV*", description: "Map market, understand competitors, position startup, and plan first 100 customers." },
      { number: "05", topic: "Fundraising Strategy", date: "DEC — WEEK 3*", description: "Understand investor evaluations, pitch decks, and common fundraising mistakes." },
    ],
    note: "* Dates marked with an asterisk are tentative and subject to confirmation by organizers.",
    apply_url: `${BASE}/mentor-connect`,
    details_url: `${BASE}/startup-mentorship`,
  };
}

function getBlogInfo() {
  return {
    description:
      "E-Cell runs an entrepreneurship blog with articles and insights for aspiring founders.",
    featured_articles: [
      "The Entrepreneurial Spark",
      "Stages of a Startup (interactive animation)",
      "E-Cell Conversations (Ep-01)",
      "The Builder's Playbook",
    ],
    features: ["Dark / light mode", "Table of contents sidebar"],
    link: `${BASE}/blog`,
  };
}

function getContactInfo() {
  return {
    contact_form: `${BASE}/contact`,
    launchpad_contact: `${BASE}/launchpad/contact`,
    social_media: {
      instagram: "https://instagram.com/ecell_bphc (@ecell_bphc)",
      linkedin: "https://linkedin.com/company/e-cell-bphc (E-Cell BPHC)",
      twitter: "https://twitter.com/ecell_bphc (@ecell_bphc)",
      facebook: "https://facebook.com/ecellbphc",
    },
    startup_connect: `${BASE}/startup-connect`,
    mentor_connect: `${BASE}/mentor-connect`,
  };
}

function getSponsorsInfo() {
  return {
    sponsorship_details: `${BASE}/launchpad/sponsor`,
    want_to_sponsor: `${BASE}/launchpad/sponsor/wanna-sponsor`,
    sponsorship_slabs: `${BASE}/launchpad/sponsor/slabs`,
    partners: `${BASE}/launchpad/partner`,
    media: `${BASE}/launchpad/media`,
  };
}

const PAGE_MAP = {
  home: {
    url: `${BASE}/`,
    description: "E-Cell BITS Pilani Hyderabad Campus homepage",
  },
  blog: {
    url: `${BASE}/blog`,
    description: "Entrepreneurship blog with articles and insights",
  },
  team: {
    url: `${BASE}/team`,
    description: "Meet the E-Cell team",
  },
  programs: {
    url: `${BASE}/program`,
    description: "E-Cell programs and initiatives",
  },
  community_meet: {
    url: `${BASE}/community-meet`,
    description: "Community Meet event details",
  },
  gallery: {
    url: `${BASE}/gallery`,
    description: "Photo gallery of past events",
  },
  contact: {
    url: `${BASE}/contact`,
    description: "Get in touch with E-Cell",
  },
  launchpad: {
    url: `${BASE}/launchpad`,
    description: "Launchpad E-Summit homepage",
  },
  launchpad_events: {
    url: `${BASE}/launchpad/events`,
    description: "Launchpad events listing",
  },
  launchpad_sponsors: {
    url: `${BASE}/launchpad/sponsor`,
    description: "Launchpad sponsors",
  },
  launchpad_speakers: {
    url: `${BASE}/launchpad/speakers`,
    description: "Launchpad speakers",
  },
  launchpad_team: {
    url: `${BASE}/launchpad/team`,
    description: "Launchpad organizing team",
  },
  launchpad_gallery: {
    url: `${BASE}/launchpad/gallery`,
    description: "Launchpad photo gallery",
  },
  launchpad_contact: {
    url: `${BASE}/launchpad/contact`,
    description: "Contact the Launchpad team",
  },
  launchpad_links: {
    url: `${BASE}/launchpad/links`,
    description: "All Launchpad quick links",
  },
  startup_connect: {
    url: `${BASE}/startup-connect`,
    description: "Submit your startup to E-Cell",
  },
  mentor_connect: {
    url: `${BASE}/mentor-connect`,
    description: "Apply for startup mentorship",
  },
  startup_mentorship: {
    url: `${BASE}/startup-mentorship`,
    description: "Founder's First Mentorship program details",
  },
  campus_ambassador: {
    url: `${BASE}/launchpad/campus-ambassador`,
    description: "Campus Ambassador program for Launchpad",
  },
  passes: {
    url: `${BASE}/launchpad/passes`,
    description: "Launchpad event passes",
  },
  accommodation: {
    url: `${BASE}/launchpad/accommodation`,
    description: "Accommodation info for Launchpad attendees",
  },
};

function getPageUrl(args) {
  const entry = PAGE_MAP[args.page];
  if (!entry) {
    return { error: `Unknown page: ${args.page}` };
  }
  return entry;
}

function getCommunityMeetDetails() {
  return {
    name: "E-Cell Community Meet",
    tagline: "Ideas Into Impact",
    description:
      "A vibrant community gathering bringing together visionaries, researchers, professors, and student founders to turn groundbreaking ideas into real-world ventures.",
    sectors: [
      "Defence Technology",
      "Agritech",
      "Healthcare",
      "AI Diagnostics",
      "Industrial Technology",
    ],
    featured_ventures: [
      "Beijan",
      "Mitti Sanjeevani",
      "AtreVes Healthcare",
      "Prakirbha AI Diagnostics",
      "Yantraayush Solutions",
      "HindArch InnovationsSector",
    ],
    student_startups: [
      {
        name: "Kramarine",
        description: "Unmanned rescue technology for flood and coastal safety",
      },
    ],
    details_link: `${BASE}/community-meet`,
  };
}

// ---------------------------------------------------------------------------
// Dispatcher
// ---------------------------------------------------------------------------

/**
 * Execute a tool function by name with the given arguments.
 * @param {string} name  – tool / function name
 * @param {object} args  – arguments object from Gemini
 * @returns {object} result data
 */
function executeFunction(name, args = {}) {
  switch (name) {
    case "get_ecell_overview":
      return getEcellOverview();
    case "get_launchpad_info":
      return getLaunchpadInfo();
    case "get_event_details":
      return getEventDetails(args);
    case "get_community_meet_details":
      return getCommunityMeetDetails();
    case "get_programs_info":
      return getProgramsInfo();
    case "get_mentorship_details":
      return getMentorshipDetails();
    case "get_blog_info":
      return getBlogInfo();
    case "get_contact_info":
      return getContactInfo();
    case "get_sponsors_info":
      return getSponsorsInfo();
    case "get_page_url":
      return getPageUrl(args);
    default:
      return { error: `Unknown function: ${name}` };
  }
}

module.exports = { toolDeclarations, executeFunction };
