import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Phone } from "lucide-react";
import "./Navbar.css";
import logo from "../assets/navbarlogo.png";
import lplogo from "../assets/ecell/lp_logo_new.png";

const Navbar = ({ onToggleMenu, isOpen, isLaunchpad }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar-new ${isScrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""} ${isLaunchpad ? "launchpad-mode" : ""}`}>
      <div className="navbar-container-new">
        <div className="nav-logo-box">
          <NavLink to={isLaunchpad ? "/launchpad" : "/"} className="navbar-logo-link">
            <img src={isLaunchpad ? lplogo : logo} alt={isLaunchpad ? "LP" : "E-CELL"} className="nav-logo-img" />
          </NavLink>
        </div>

        <div className="nav-main-content">
          <div className="nav-row-top">
            {isLaunchpad ? (
              <>
                <NavLink
                  to="/launchpad/events"
                  className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
                >
                  Events
                </NavLink>
                <NavLink
                  to="/launchpad/team"
                  className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
                >
                  Team
                </NavLink>
                {/* Temporarily hidden from public:
                <NavLink
                  to="/launchpad/passes"
                  className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
                >
                  Passes
                </NavLink>
                <NavLink
                  to="/launchpad/accommodation"
                  className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
                >
                  Accoms
                </NavLink>
                <NavLink
                  to="/launchpad/schedules"
                  className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
                >
                  Schedule
                </NavLink>
                */}
              </>
            ) : (
              <>
                <NavLink
                  to="/program"
                  className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
                >
                  Programs & Initiatives
                </NavLink>
                <NavLink
                  to="/team"
                  className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
                >
                  Our Team
                </NavLink>
                <NavLink
                  to="/gallery"
                  className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
                >
                  Gallery
                </NavLink>
              </>
            )}
          </div>
          <div className="nav-row-bottom">
            {isLaunchpad ? (
              <>
                <div className="nav-cell-bottom border-right">
                  <NavLink
                    to="/"
                    className={({ isActive }) => `nav-link-new launchpad-link ${isActive ? "active" : ""}`}
                  >
                    <img src={logo} alt="E-CELL" className="lp-icon-nav scale-75" />
                    ECell Page
                  </NavLink>
                </div>
                <div className="nav-cell-bottom">
                  <NavLink
                    to="/launchpad/contact"
                    className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
                  >
                    <Phone size={14} className="nav-icon-phone" />
                    Contact Us
                  </NavLink>
                </div>
              </>
            ) : (
              <>
                <div className="nav-cell-bottom border-right">
                  <NavLink
                    to="/launchpad"
                    className={({ isActive }) => `nav-link-new launchpad-link ${isActive ? "active" : ""}`}
                  >
                    <img src={lplogo} alt="LP" className="lp-icon-nav" />
                    Launchpad
                  </NavLink>
                </div>
                <div className="nav-cell-bottom">
                  <NavLink
                    to="/contact"
                    className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
                  >
                    <Phone size={14} className="nav-icon-phone" />
                    Contact Us
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="nav-hamburger-box" onClick={onToggleMenu}>
          <div className={`sm-hamburger ${isOpen ? "active" : ""}`}>
            <span className="sm-hamburger-line"></span>
            <span className="sm-hamburger-line"></span>
            <span className="sm-hamburger-line"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

