import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Container } from './ui';

const usefulLinks = [
  { label: 'Home', to: '/' },
  { label: 'Programs', to: '/program' },
  { label: 'Our Team', to: '/team' },
  { label: 'Blog', to: '/blog' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact Us', to: '/contact' },
];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/e-cell-bphc/', icon: FaLinkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/ecell_bphc', icon: FaInstagram },
  { label: 'X (Twitter)', href: 'https://x.com/ecell_bphc', icon: FaTwitter },
  { label: 'Facebook', href: 'https://www.facebook.com/groups/158307448076754/', icon: FaFacebook },
];

const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6449362741447!2d78.5701715!3d17.5453898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb83594a86132d:0xc3e06e9e76cebf3d!2sBirla%20Institute%20of%20Technology%20%26%20Science%20Pilani%2C%20Hyderabad%20Campus!5e0!3m2!1sen!2sin!4v1709730000000!5m2!1sen!2sin';
const MAP_LINK = 'https://www.google.com/maps/place/Birla+Institute+of+Technology+%26+Science+Pilani,+Hyderabad+Campus/@17.5453898,78.5701715,18.08z/data=!3m1!5s0x3bcb9cb2ec082bcf:0x1985b4ad5caaad3b!4m22!1m15!4m14!1m5!1m1!1s0x3bcb83594a86132d:0xc3e06e9e76cebf3d!2m2!1d78.571838!2d17.5448888!1m6!1m2!1s0x3bcb83594a86132d:0xc3e06e9e76cebf3d!2sBirla+Institute+of+Technology+%26+Science+Pilani,+Hyderabad+Campus,+BITS+Pilani+Hyderabad+Campus,+Secunderabad,+Telangana+500078!2m2!1d78.571838!2d17.5448888!3e0!3m5!1s0x3bcb83594a86132d:0xc3e06e9e76cebf3d!8m2!3d17.5448888!4d78.571838!16s%2Fm%2F09k5fsf?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D';

const linkClass = 'text-black/65 no-underline hover:text-brand-navy transition-colors';

const ColumnTitle = ({ children }) => (
  <h3 className="m-0 mb-5 !font-copy text-xs font-bold uppercase tracking-[0.2em] text-brand-navy">{children}</h3>
);

const HomeFooter = () => (
  <footer className="relative z-50 bg-brand-cream text-brand-ink">
    <Container className="pt-16 md:pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 font-copy text-sm">
        {/* Brand + Social */}
        <div className="lg:col-span-4">
          <p className="m-0 !font-display text-2xl font-semibold tracking-tight text-brand-navy">E-CELL</p>
          <p className="m-0 mt-1 text-black/65">BITS Pilani Hyderabad Campus</p>

          <p className="m-0 mt-7 mb-3 text-black/65">Get connected with us on social networks:</p>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:border-brand-navy hover:text-brand-cream transition-colors"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div className="lg:col-span-2">
          <ColumnTitle>Useful Links</ColumnTitle>
          <ul className="m-0 p-0 list-none space-y-2.5">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <ColumnTitle>Contact</ColumnTitle>
          <ul className="m-0 p-0 list-none space-y-3">
            <li className="text-black/65 leading-relaxed">
              BITS Pilani, Hyderabad Campus,<br />
              Hyderabad, Telangana 500078
            </li>
            <li>
              <a href="mailto:ecell@hyderabad.bits-pilani.ac.in" className={`${linkClass} break-words`}>ecell@hyderabad.bits-pilani.ac.in</a>
            </li>
            <li>
              <a href="tel:+917440532400" className={linkClass}>Sampooran Sinha- +91 7003712277</a>
            </li>
            <li className="pt-2">
              <span className="block text-xs uppercase tracking-widest text-black/50 mb-1">Join our community</span>
              <a
                href="https://chat.whatsapp.com/GRGDBbVBNiV6WvTpw1g182"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand-navy no-underline hover:underline"
              >
                WhatsApp Group
              </a>
            </li>
          </ul>
        </div>

        {/* Map */}
        <div className="lg:col-span-3">
          <ColumnTitle>Find Us</ColumnTitle>
          <div className="h-44 rounded-2xl overflow-hidden border border-black/10">
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BITS Pilani Hyderabad Campus Location"
            />
          </div>
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs font-semibold text-brand-navy no-underline hover:underline"
          >
            Open in Google Maps
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-14 py-6 border-t border-black/10 font-copy text-xs text-black/55">
        © 2026 Copyright: E-Cell BITS Pilani Hyderabad
      </div>
    </Container>
  </footer>
);

export default HomeFooter;
