import { useEffect, useLayoutEffect, useRef, useState, lazy, Suspense } from "react";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "@/index.css";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import ECellLoader from "@/components/common/ECellLoader";
import { NavigationScroll } from "@/components/common/NavigationScroll";
import { useLocation } from "@/shims/react-router";
import lplogo from "@/assets/ecell/lp_logo_new.png";

const StaggeredMenu = lazy(() => import("@/components/layout/StaggeredMenu"));
const Footer = lazy(() => import("@/components/layout/Footer"));
const GlobalBackground = lazy(() => import("@/components/common/GlobalBackground"));
const Navbar = lazy(() => import("@/components/layout/Navbar"));
const LaunchpadTimer = lazy(() => import("@/components/launchpad/LaunchpadTimer"));

const PageHead = () => {
  useEffect(() => {
    document.title = "E-Cell BITS Hyderabad";
    const link = document.querySelector("link[rel~='icon']");
    if (link) link.href = "/navbarlogo.png";
  }, []);

  return null;
};

const PageAnalytics = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.gtag?.("config", "G-4NKFEK9XLW", {
      page_path: pathname + search,
    });
  }, [pathname, search]);

  return null;
};

type MenuApi = { toggle: () => void };

// This commits only when all content in the surrounding Suspense boundary is ready.
function LoaderContentReady({ onReady, pathname }: { onReady: (path: string) => void; pathname: string }) {
  useLayoutEffect(() => { onReady(pathname); }, [onReady, pathname]);
  return null;
}

function RootShell() {
  const location = useLocation();
  const isLaunchpadRoute = location.pathname.startsWith("/launchpad");

  const menuRef = useRef<MenuApi | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [readyPath, setReadyPath] = useState<string | null>(null);

  // Page motion waits on this so entrances don't play behind the intro loader.
  useLayoutEffect(() => {
    document.documentElement.toggleAttribute("data-ecell-loading", isLoaderActive);
  }, [isLoaderActive]);

  const toggleMenu = () => {
    menuRef.current?.toggle();
  };

  // Menu items for StaggeredMenu
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "Programs", ariaLabel: "View our programs", link: "/program" },
    { label: "Our Team", ariaLabel: "Meet the team", link: "/team" },
    { label: "Gallery", ariaLabel: "View our gallery", link: "/gallery" },
    { label: "Launchpad", ariaLabel: "Explore Launchpad", link: "/launchpad" },
    { label: "Blog", ariaLabel: "Read the founder playbook", link: "/blog" },
    { label: "Mentorship", ariaLabel: "Explore Founder’s First mentorship", link: "/startup-mentorship" },
    { label: "Magazine", ariaLabel: "Read the E-Cell magazine", link: "/magazine" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
  ];

  const socialItems = [
    { label: "Instagram", link: "https://www.instagram.com/ecell_bphc", icon: <FaInstagram /> },
    { label: "LinkedIn", link: "https://www.linkedin.com/company/e-cell-bphc/", icon: <FaLinkedin /> },
    { label: "Twitter", link: "https://x.com/ecell_bphc", icon: <FaTwitter /> },
    { label: "Facebook", link: "https://www.facebook.com/groups/158307448076754/", icon: <FaFacebook /> },
  ];

  // Launchpad menu items
  const launchpadMenuItems = [
    { label: "Home", ariaLabel: "Go to Launchpad home", link: "/launchpad" },
    { label: "Links", ariaLabel: "All Launchpad links", link: "/launchpad/links" },
    { label: "Events", ariaLabel: "View events", link: "/launchpad/events" },
    { label: "Speakers", ariaLabel: "View speakers", link: "/launchpad/speakers" },
    { label: "Sponsors", ariaLabel: "View sponsors", link: "/launchpad/sponsor" },
    { label: "Gallery", ariaLabel: "View gallery", link: "/launchpad/gallery" },
    { label: "Team", ariaLabel: "Meet the team", link: "/launchpad/team" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/launchpad/contact" },
    { label: "E-Cell", ariaLabel: "Go back to E-Cell website", link: "/" },
  ];

  return (
    <div className="relative flex min-h-screen flex-col">
      <ECellLoader ready={readyPath === location.pathname} onLoadingChange={setIsLoaderActive} />
      <Suspense fallback={null}>
      {!isLaunchpadRoute && <GlobalBackground />}
      <PageAnalytics />
      {(location.pathname === "/" || location.pathname === "/launchpad") && !isLoaderActive && (
        <Suspense fallback={null}><LaunchpadTimer /></Suspense>
      )}

      <Navbar onToggleMenu={toggleMenu} isOpen={isMenuOpen} isLaunchpad={isLaunchpadRoute} />

      {isLaunchpadRoute ? (
        <StaggeredMenu
          ref={menuRef as never}
          position="right"
          items={launchpadMenuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={false}
          menuButtonColor="#17212b"
          openMenuButtonColor="#17212b"
          changeMenuColorOnOpen={false}
          colors={["#f7f8f8", "#e2e8ee"]}
          logoUrl={lplogo}
          logoLink="/launchpad"
          accentColor="#e0424f"
          isFixed={true}
          showHamburgerAlways={false}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      ) : (
        <StaggeredMenu
          ref={menuRef as never}
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={false}
          menuButtonColor="#0F1754"
          openMenuButtonColor="#0F1754"
          changeMenuColorOnOpen={false}
          colors={["#FEF8E6", "#FBF0D7"]}
          logoUrl="/navbarlogo.png"
          accentColor="#510609"
          isFixed={true}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      )}

      <div className="relative pt-0">
        <Outlet />
      </div>

      {/* Global Footer */}
      <Footer />
      <SpeedInsights />
      <LoaderContentReady pathname={location.pathname} onReady={setReadyPath} />
      </Suspense>
    </div>
  );
}

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: 'html[data-ecell-boot]::before{content:"";position:fixed;inset:0;background:#0F1754;z-index:10000}' }} />
        <script dangerouslySetInnerHTML={{ __html: `if (['/', '/launchpad', '/magazine'].includes(location.pathname)) document.documentElement.setAttribute('data-ecell-boot', '');` }} />
        <HeadContent />
      </head>
      <body>
        <HelmetProvider>
          <ErrorBoundary>
            <NavigationScroll>
              <PageHead />
              <RootShell />
            </NavigationScroll>
          </ErrorBoundary>
        </HelmetProvider>
        <Scripts />
      </body>
    </html>
  );
}

type RouterContext = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { title: "E-Cell BITS Hyderabad" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#fef8e6" },
      { name: "description", content: "Official website of E-Cell BITS Pilani Hyderabad Campus" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "icon", href: "/navbarlogo.png" },
      { rel: "shortcut icon", href: "/navbarlogo.png" },
      { rel: "apple-touch-icon", href: "/navbarlogo.png" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      { async: true, src: "https://www.googletagmanager.com/gtag/js?id=G-4NKFEK9XLW" },
      {
        // Inline dataLayer bootstrap
        children: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-4NKFEK9XLW');",
        type: "text/javascript",
      },
    ],
  }),
});
