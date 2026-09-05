import React, { useEffect, useState, useRef, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SpeedInsights } from "@vercel/speed-insights/react"
import ErrorBoundary from "./components/ErrorBoundary";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import ECellLoader from './components/ECellLoader';
import { SmoothScroll, useLenis } from './components/SmoothScroll';
import { AnimatePresence } from 'framer-motion';
import lplogo from "./assets/ecell/lp_logo_new.png";
import Home from "./components/Home/home";

// Lazy load components
const StaggeredMenu = lazy(() => import("./components/StaggeredMenu"));
const Footer = lazy(() => import("./components/footer"));
const GlobalBackground = lazy(() => import('./components/GlobalBackground'));
const Team = lazy(() => import("./components/Teams/team"));
const Program = lazy(() => import("./components/Programs/program"));
const CommunityMeet = lazy(() => import("./components/Programs/CommunityMeet"));
const Contact = lazy(() => import("./components/contact"));
const Gallery = lazy(() => import("./components/Gallery/gallery"));
const LaunchpadGallery = lazy(() => import("./components/Gallery/launchpadgallery"));
const Navbar = lazy(() => import("./components/navbar"));


const Lteam = lazy(() => import("./components/team/team"));
const Lcontact = lazy(() => import("./components/lcontact"));
const Launchpadhome = lazy(() => import("./components/Home/launchpadhome"));
const Event = lazy(() => import("./components/events/event"));
const Sponsor = lazy(() => import("./components/sponsors/sponsor"));
const PartnerPage = lazy(() => import("./components/sponsors/PartnerPage"));
const MediaPage = lazy(() => import("./components/sponsors/MediaPage"));
const WannaSponsor = lazy(() => import("./components/sponsors/WannaSponsor"));
const SponsorshipSlabs = lazy(() => import("./components/sponsors/SponsorshipSlabs"));

const Schedules = lazy(() => import("./components/schedules"));
const Speakers = lazy(() => import("./components/speakers/launchpadspeakers"));

const Gr = lazy(() => import("./components/lpevents/gr/grindex"));
const Pitchp = lazy(() => import("./components/lpevents/pitcherspilot/ppindex"));
const TT = lazy(() => import("./components/lpevents/t3/t3index"));
const Id = lazy(() => import("./components/lpevents/id/idindex"));
// TEMPORARILY HIDDEN - Uncomment to restore
// const Na = lazy(() => import("./components/lpevents/na/naindex"));
const Se = lazy(() => import("./components/lpevents/startupexpo/seindex"));
const Seed = lazy(() => import("./components/lpevents/seed/seedindex"));
const PaymentSuccess = lazy(() => import("./components/paymentsuccess"));
const PaymentFailed = lazy(() => import("./components/paymentfailed"));
const PaymentCancel = lazy(() => import("./components/paymentcancel"));
const StartupConnectForm = lazy(() => import("./components/StartupConnectForm"));
const EventDemo = lazy(() => import("./components/lpevents/EventTemplate/EventDemo"));
const Passes = lazy(() => import("./components/passes"));
const PassesSoon = lazy(() => import("./components/PassesSoon"));
const Accommodation = lazy(() => import("./components/Accommodation"));
const PaymentPage = lazy(() => import("./components/PaymentPage"));
const ContingentPasses = lazy(() => import("./components/ContingentPasses"));
const CampusAmbassador = lazy(() => import("./components/CampusAmbassador"));
const CorporatePasses = lazy(() => import("./components/CorporatePasses"));
const LaunchpadTimer = lazy(() => import("./components/LaunchpadTimer"));
const LaunchpadLinks = lazy(() => import("./components/Launchpadlinks/LaunchpadLinks"));



// Scroll to top on route change

const PageHead = () => {
  useEffect(() => {
    document.title = "E-Cell BITS Hyderabad";
    const link = document.querySelector("link[rel~='icon']");
    if (link) link.href = "/navbarlogo.png";
  }, []);

  return null;
};

const ScrollToTop = () => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Track page view in Google Analytics on route change
    if (window.gtag) {
      window.gtag('config', 'G-4NKFEK9XLW', {
        page_path: location.pathname + location.search,
      });
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, lenis]);

  return null;
};

function App() {
  return (
    <>
      <ErrorBoundary>
        <SmoothScroll>
          <Router>
            <ScrollToTop />
            <PageHead />
            <MainContent />
          </Router>
        </SmoothScroll>
      </ErrorBoundary>
    </>
  );
}

// Extracted main content to keep `useLocation()` inside `Router`
function MainContent() {
  const location = useLocation();
  const isLaunchpadRoute = location.pathname.startsWith("/launchpad");

  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(true);

  const toggleMenu = () => {
    menuRef.current?.toggle();
  };

  // Menu items for StaggeredMenu
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Programs', ariaLabel: 'View our programs', link: '/program' },
    { label: 'Our Team', ariaLabel: 'Meet the team', link: '/team' },
    { label: 'Gallery', ariaLabel: 'View our gallery', link: '/gallery' },
    { label: 'Launchpad', ariaLabel: 'Explore Launchpad', link: '/launchpad' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/ecell_bphc', icon: <FaInstagram /> },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/company/e-cell-bphc/', icon: <FaLinkedin /> },
    { label: 'Twitter', link: 'https://x.com/ecell_bphc', icon: <FaTwitter /> },
    { label: 'Facebook', link: 'https://www.facebook.com/groups/158307448076754/', icon: <FaFacebook /> }
  ];

  // Launchpad menu items
  const launchpadMenuItems = [
    { label: 'Home', ariaLabel: 'Go to Launchpad home', link: '/launchpad' },
    { label: 'Links', ariaLabel: 'All Launchpad links', link: '/launchpad/links' },
    { label: 'Schedule', ariaLabel: 'View schedule', link: '/launchpad/schedules' },
    { label: 'Events', ariaLabel: 'View events', link: '/launchpad/events' },
    { label: 'Passes', ariaLabel: 'Buy passes', link: '/launchpad/passes' },
    { label: 'Accoms', ariaLabel: 'View accommodation', link: '/launchpad/accommodation' },
    { label: 'Speakers', ariaLabel: 'View speakers', link: '/launchpad/speakers' },
    { label: 'Sponsors', ariaLabel: 'View sponsors', link: '/launchpad/sponsor' },
    { label: 'Gallery', ariaLabel: 'View gallery', link: '/launchpad/gallery' },
    { label: 'Team', ariaLabel: 'Meet the team', link: '/launchpad/team' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/launchpad/contact' },
    { label: 'E-Cell', ariaLabel: 'Go back to E-Cell website', link: '/' }
  ];

  return (
    <div className="app-container">
      <ECellLoader onLoadingChange={setIsLoaderActive} />
      {!isLaunchpadRoute && <GlobalBackground />}
      <ScrollToTop />
      {(location.pathname === '/' || location.pathname === '/launchpad') && !isLoaderActive && <LaunchpadTimer />}


      <Navbar onToggleMenu={toggleMenu} isOpen={isMenuOpen} isLaunchpad={isLaunchpadRoute} />

      {isLaunchpadRoute ? (
        <StaggeredMenu
          ref={menuRef}
          position="right"
          items={launchpadMenuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={false}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={false}
          colors={['#1a1a1a', '#2a2a2a']}
          logoUrl={lplogo}
          logoLink="/launchpad"
          accentColor="#d4ff00"
          isFixed={true}
          showHamburgerAlways={false}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      ) : (
        <StaggeredMenu
          ref={menuRef}
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={false}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={false}
          colors={['#1a1a1a', '#2a2a2a']}
          logoUrl="/navbarlogo.png"
          accentColor="#d4ff00"
          isFixed={true}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      )}

      <AnimatePresence mode="wait">
        <Suspense fallback={<ECellLoader />}>
          <div className={`main-content ${location.pathname === "/" || location.pathname === "/launchpad" ? "no-padding" : ""}`}>
            <Routes location={location} key={location.pathname}>
              {/* Normal Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/team" element={<Team />} />
              <Route path="/program" element={<Program />} />
              <Route path="/community-meet" element={<CommunityMeet />} />
              <Route path="/program/community-meet" element={<CommunityMeet />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/launchpad/gallery" element={<LaunchpadGallery />} />
              <Route path="/contact" element={<Contact />} />
              {/* TEMPORARILY HIDDEN - Uncomment to restore */}
              {/* <Route path="/na" element={<Na />} /> */}

              {/* Launchpad Routes */}
              <Route path="/launchpad" element={<Launchpadhome />} />
              <Route path="/launchpad/contact" element={<Lcontact />} />
              <Route path="/launchpad/events" element={<Event />} />
              <Route path="/launchpad/sponsor" element={<Sponsor />} />
              <Route path="/launchpad/sponsor/wanna-sponsor" element={<WannaSponsor />} />
              <Route path="/launchpad/sponsor/slabs" element={<SponsorshipSlabs />} />
              <Route path="/launchpad/partner" element={<PartnerPage />} />
              <Route path="/launchpad/media" element={<MediaPage />} />

              <Route path="/launchpad/speakers" element={<Speakers />} />

              <Route path="/launchpad/schedules" element={<Schedules />} />
              <Route path="/launchpad/team" element={<Lteam />} />
              <Route path="/launchpad/ground_reality" element={<Gr />} />
              <Route path="/launchpad/pitchers_pilot" element={<Pitchp />} />
              <Route path="/launchpad/teen_tycoons" element={<TT />} />
              <Route path="/launchpad/internship_drive" element={<Id />} />
              <Route path="/launchpad/startup_expo" element={<Se />} />
              <Route path="/launchpad/seed" element={<Seed />} />
              <Route path="/launchpad/passes" element={<Passes />} />
              <Route path="/launchpad/passes-soon" element={<PassesSoon />} />
              <Route path="/launchpad/payment" element={<PaymentPage />} />
              <Route path="/launchpad/payment-success" element={<PaymentSuccess />} />

              <Route path="/launchpad/payment-failed" element={<PaymentFailed />} />
              <Route path="/launchpad/workshop-demo" element={<EventDemo />} />
              <Route path="/launchpad/payment-cancel" element={<PaymentCancel />} />
              <Route path="/launchpad/accommodation" element={<Accommodation />} />
              <Route path="/launchpad/contingent-passes" element={<ContingentPasses />} />
              <Route path="/launchpad/campus-ambassador" element={<CampusAmbassador />} />
              <Route path="/launchpad/corporate-passes" element={<CorporatePasses />} />
              <Route path="/launchpad/links" element={<LaunchpadLinks />} />


              {/* startup connect form route */}
              <Route path="/startup-connect" element={<StartupConnectForm />} />
            </Routes>
          </div>
        </Suspense>
      </AnimatePresence>

      {/* Global Footer */}
      <Footer />
      <SpeedInsights />
    </div>
  );
}

export default App;
