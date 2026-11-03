import { useState, useEffect } from "react";
import { NavLink, useLocation } from "@/shims/react-router";
import { motion } from "framer-motion";
import lplogo from "@/assets/ecell/lp_logo_new.png";

// Transparent over dark hero surfaces, then full-width cream once the page scrolls.
const Navbar = ({ onToggleMenu, isOpen, isLaunchpad }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const hasDarkHero = isLaunchpad || location.pathname === "/";
  const overDarkHero = !isScrolled && hasDarkHero;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Transparent over the hero; full-width cream chrome once the page scrolls.
  const chrome = isScrolled
    ? "bg-brand-cream/95 border-black/10 shadow-[0_8px_24px_-20px_rgba(15,23,84,0.6)] backdrop-blur-md"
    : "bg-transparent border-transparent";
  const linkTone = overDarkHero ? "text-brand-cream/75 hover:text-brand-cream" : "text-brand-navy/70 hover:text-brand-navy";

  return (
    <>
      {/* Keep the page content aligned below the fixed navigation. */}
      {location.pathname !== "/" && <div aria-hidden="true" className={`h-[76px] ${hasDarkHero ? "bg-brand-navy" : ""}`} />}

      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: isOpen ? -96 : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
        className={`fixed top-0 inset-x-0 z-[1000] border-b transition-[background-color,border-color,box-shadow,opacity] duration-300 ${chrome} ${isOpen ? "pointer-events-none opacity-0" : ""}`}
      >
        <div
          className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10"
        >
          <NavLink to={isLaunchpad ? "/launchpad" : "/"} className="flex shrink-0 items-center" aria-label="E-Cell home">
            <img
              src={isLaunchpad ? lplogo : "/navbarlogo.png"}
              alt={isLaunchpad ? "Launchpad" : "E-CELL"}
              className={`h-12 w-auto transition-[filter] duration-300 ${overDarkHero ? "" : "brightness-0"}`}
            />
          </NavLink>

          <div className="hidden items-center gap-9 lg:flex">
            {isLaunchpad ? (
              <>
                <NavLink to="/launchpad/events" className={`text-sm font-semibold transition-colors ${linkTone}`}>Events</NavLink>
                <NavLink to="/launchpad/team" className={`text-sm font-semibold transition-colors ${linkTone}`}>Team</NavLink>
                <NavLink to="/" end className={`text-sm font-semibold transition-colors ${linkTone}`}>E-Cell Page</NavLink>
                <NavLink to="/launchpad/contact" className={`text-sm font-semibold transition-colors ${linkTone}`}>Contact</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/program" className={`text-[15px] font-semibold transition-colors ${linkTone}`}>Programs</NavLink>
                <NavLink to="/team" className={`text-[15px] font-semibold transition-colors ${linkTone}`}>Team</NavLink>
                <NavLink to="/gallery" className={`text-[15px] font-semibold transition-colors ${linkTone}`}>Gallery</NavLink>
                <NavLink to="/blog" className={`text-[15px] font-semibold transition-colors ${linkTone}`}>Blog</NavLink>
                <NavLink to="/launchpad" className={`text-[15px] font-semibold transition-colors ${linkTone}`}>Launchpad</NavLink>
                <NavLink to="/magazine" className={`text-[15px] font-semibold transition-colors ${linkTone}`}>Magazine</NavLink>
              </>
            )}
          </div>

          {!isLaunchpad && (
            <div className="flex items-center gap-2">
              <NavLink to="/contact" className={`hidden items-center rounded-full px-5 py-2.5 text-sm font-bold transition-colors lg:inline-flex ${overDarkHero ? "bg-brand-cream text-brand-navy hover:bg-white" : "bg-brand-navy text-brand-cream hover:bg-brand-ink"}`}>Contact</NavLink>
              <button
                type="button"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                onClick={onToggleMenu}
                className={`flex h-11 w-11 flex-col items-center justify-center border-0 bg-transparent transition-colors lg:hidden ${overDarkHero ? "text-brand-cream" : "text-brand-navy"} ${isOpen ? "is-open" : ""}`}
              >
                <span className={`h-0.5 w-[22px] rounded-sm transition-transform ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} style={{ backgroundColor: "currentColor" }} />
                <span className={`mt-[5px] h-0.5 w-[22px] rounded-sm transition-opacity ${isOpen ? "opacity-0" : ""}`} style={{ backgroundColor: "currentColor" }} />
                <span className={`mt-[5px] h-0.5 w-[22px] rounded-sm transition-transform ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} style={{ backgroundColor: "currentColor" }} />
              </button>
            </div>
          )}

          {isLaunchpad && (
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={onToggleMenu}
              className={`flex h-11 w-11 flex-col items-center justify-center border-0 bg-transparent transition-colors lg:hidden ${overDarkHero ? "text-brand-cream" : "text-brand-navy"} ${isOpen ? "is-open" : ""}`}
            >
              <span className={`h-0.5 w-[22px] rounded-sm transition-transform ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} style={{ backgroundColor: "currentColor" }} />
              <span className={`mt-[5px] h-0.5 w-[22px] rounded-sm transition-opacity ${isOpen ? "opacity-0" : ""}`} style={{ backgroundColor: "currentColor" }} />
              <span className={`mt-[5px] h-0.5 w-[22px] rounded-sm transition-transform ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} style={{ backgroundColor: "currentColor" }} />
            </button>
          )}
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
