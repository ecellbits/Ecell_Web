import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Phone, BookOpen } from "lucide-react";
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
          {isLaunchpad ? (
            <div className="nav-single-row">
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
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link-new launchpad-link ${isActive ? "active" : ""}`}
              >
                <img src={logo} alt="E-CELL" className="lp-icon-nav scale-75" />
                ECell
              </NavLink>
              <NavLink
                to="/launchpad/contact"
                className={({ isActive }) => `nav-phone-btn ${isActive ? "active" : ""}`}
                title="Contact Us"
                aria-label="Contact Us"
              >
                <Phone size={15} />
              </NavLink>
            </div>
          ) : (
            <div className="nav-single-row">
              <NavLink
                to="/program"
                className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
              >
                Programs
              </NavLink>
              <NavLink
                to="/team"
                className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
              >
                Team
              </NavLink>
              <NavLink
                to="/gallery"
                className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
              >
                Gallery
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) => `nav-link-new ${isActive ? "active" : ""}`}
              >
                <BookOpen size={13} className="inline mr-1 opacity-80" />
                Blog
              </NavLink>
              <NavLink
                to="/launchpad"
                className={({ isActive }) => `nav-link-new launchpad-link ${isActive ? "active" : ""}`}
              >
                <img src={lplogo} alt="LP" className="lp-icon-nav" />
                Launchpad
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-phone-btn ${isActive ? "active" : ""}`}
                title="Contact Us"
                aria-label="Contact Us"
              >
                <Phone size={15} />
              </NavLink>
            </div>
          )}
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

