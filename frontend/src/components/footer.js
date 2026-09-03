import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  // Global site links (match App routes)
  const usefulLinks = [
    { label: 'Home', to: '/' },
    { label: 'Programs', to: '/program' },
    { label: 'Our Team', to: '/team' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact Us', to: '/contact' },
  ];

  return (
    <footer className="pt-12 bg-ecell-bg text-ecell-text relative z-50" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + Social */}
          <div>
            <div className="mb-6">
              <div className="text-xl text-elegant-header leading-tight" style={{ fontWeight: 800 }}>E-CELL</div>
              <div className="text-sm text-elegant-body opacity-80">BITS Pilani Hyderabad Campus</div>
            </div>

            <div className="text-sm mb-3 opacity-90">Get connected with us on social networks:</div>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/e-cell-bphc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className="hover:text-ecell-primary transition-colors text-ecell-text">
                <FaLinkedin size={22} />
              </a>
              <a href="https://www.instagram.com/ecell_bphc" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram" className="hover:text-ecell-primary transition-colors text-ecell-text">
                <FaInstagram size={22} />
              </a>
              <a href="https://x.com/ecell_bphc" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" title="X (Twitter)" className="hover:text-ecell-primary transition-colors text-ecell-text">
                <FaTwitter size={22} />
              </a>
              <a href="https://www.facebook.com/groups/158307448076754/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook" className="hover:text-ecell-primary transition-colors text-ecell-text">
                <FaFacebook size={22} />
              </a>
            </div>
          </div>

          {/* Our Initiatives (col 1) */}
          {/*
          <div>
            <h3 className="text-sm text-elegant-box mb-4 text-ecell-primary font-semibold">OUR INITIATIVES</h3>
            <ul className="space-y-2">
              {initiativeItems.slice(0, 6).map((item, idx) => (
                <li key={idx} className="opacity-90 hover:opacity-100 hover:text-ecell-primary transition-all">
                  {item.to.startsWith('http') ? (
                    <a href={item.to} target="_blank" rel="noopener noreferrer" title={item.label}>{item.label}</a>
                  ) : (
                    <Link to={item.to} aria-label={item.label} title={item.label}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          */}

          {/* Useful Links */}
          <div>
            <h3 className="text-sm text-elegant-box mb-4 text-ecell-primary font-semibold">USEFUL LINKS</h3>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link.label} className="opacity-90 hover:opacity-100 hover:text-ecell-primary transition-all">
                  {link.to.startsWith('http') ? (
                    <a href={link.to} target="_blank" rel="noopener noreferrer" title={link.label}>{link.label}</a>
                  ) : (
                    <Link to={link.to} aria-label={link.label} title={link.label}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm text-elegant-box mb-4 text-ecell-primary font-semibold">CONTACT</h3>
            <ul className="space-y-3 text-sm">
              <li className="opacity-90">
                <span>BITS Pilani, Hyderabad Campus,</span><br />
                <span>Hyderabad, Telangana 500078</span>
              </li>
              <li className="opacity-90 hover:text-ecell-primary transition-colors">
                <a href="mailto:ecell@hyderabad.bits-pilani.ac.in">ecell@hyderabad.bits-pilani.ac.in</a>
              </li>

              <li className="opacity-90">
                <a href="tel:+917440532400" className="hover:text-ecell-primary transition-colors">Sampooran Sinha- +91 7003712277</a>
              </li>
              <li className="opacity-90 pt-2">
                <span className="block text-xs uppercase tracking-widest text-ecell-text/60 mb-1">Join our community</span>
                <a
                  href="https://chat.whatsapp.com/GRGDBbVBNiV6WvTpw1g182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ecell-primary hover:underline font-bold"
                >
                  WhatsApp Group
                </a>
              </li>
            </ul>
          </div>

          {/* Map Column */}
          <div>
            <h3 className="text-sm text-elegant-box mb-4 text-ecell-primary font-semibold">FIND US</h3>
            <div className="w-full h-56 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6449362741447!2d78.5701715!3d17.5453898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb83594a86132d:0xc3e06e9e76cebf3d!2sBirla%20Institute%20of%20Technology%20%26%20Science%20Pilani%2C%20Hyderabad%20Campus!5e0!3m2!1sen!2sin!4v1709730000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BITS Pilani Hyderabad Campus Location"
              ></iframe>
            </div>
            <div className="mt-2 text-xs text-ecell-primary text-center">
              <a href="https://www.google.com/maps/place/Birla+Institute+of+Technology+%26+Science+Pilani,+Hyderabad+Campus/@17.5453898,78.5701715,18.08z/data=!3m1!5s0x3bcb9cb2ec082bcf:0x1985b4ad5caaad3b!4m22!1m15!4m14!1m5!1m1!1s0x3bcb83594a86132d:0xc3e06e9e76cebf3d!2m2!1d78.571838!2d17.5448888!1m6!1m2!1s0x3bcb83594a86132d:0xc3e06e9e76cebf3d!2sBirla+Institute+of+Technology+%26+Science+Pilani,+Hyderabad+Campus,+BITS+Pilani+Hyderabad+Campus,+Secunderabad,+Telangana+500078!2m2!1d78.571838!2d17.5448888!3e0!3m5!1s0x3bcb83594a86132d:0xc3e06e9e76cebf3d!8m2!3d17.5448888!4d78.571838!16s%2Fm%2F09k5fsf?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 py-4 text-center text-sm text-ecell-primary">
          © 2026 Copyright: E-Cell BITS Pilani Hyderabad
        </div>
      </div>
    </footer>
  );
};

export default Footer;