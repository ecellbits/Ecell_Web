import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomeNavbar.css';

const links = [
  { label: 'Programs', to: '/program' },
  { label: 'Team', to: '/team' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Launchpad', to: '/launchpad' },
];

// Transparent over the navy hero, solid cream once the page scrolls.
const HomeNavbar = ({ onToggleMenu, isOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Main"
      className={`fixed top-0 inset-x-0 z-[1000] border-b transition-[background-color,border-color,box-shadow,opacity] duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : ''} ${isScrolled
        ? 'bg-brand-cream/95 backdrop-blur-md border-black/10 shadow-[0_8px_24px_-20px_rgba(15,23,84,0.6)]'
        : 'bg-transparent border-transparent'
        }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-[72px] flex items-center justify-between gap-6">
        <Link to="/" aria-label="E-Cell home" className="shrink-0 flex items-center">
          <img
            src="/navbarlogo.png"
            alt="E-Cell BITS Pilani Hyderabad Campus"
            className={`h-12 w-auto transition-[filter] duration-300 ${isScrolled ? 'brightness-0' : ''}`}
          />
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`font-copy text-[15px] font-semibold no-underline transition-colors duration-300 ${isScrolled ? 'text-brand-navy/75 hover:text-brand-navy' : 'text-brand-cream/80 hover:text-brand-cream'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className={`hidden lg:inline-flex items-center px-5 py-2.5 rounded-full font-copy text-sm font-bold no-underline transition-colors duration-300 ${isScrolled ? 'bg-brand-navy text-brand-cream hover:bg-brand-ink' : 'bg-brand-cream text-brand-navy hover:bg-white'}`}
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={onToggleMenu}
            aria-label="Open menu"
            aria-expanded={isOpen}
            className={`home-nav-burger lg:hidden w-11 h-11 -mr-2 flex flex-col items-center justify-center bg-transparent border-0 transition-colors duration-300 ${isOpen ? 'is-open' : ''} ${isScrolled ? 'text-brand-navy' : 'text-brand-cream'}`}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
