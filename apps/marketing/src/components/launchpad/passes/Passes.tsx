import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, Rocket, Users, Gift, Award, Briefcase, Hotel } from 'lucide-react';
import ChromaGrid from "@/components/common/ChromaGrid";
import { useNavigate, useLocation } from "@/shims/react-router";
import prathviImg from "@/assets/prathvi.jpeg";
import manishImg from "@/assets/manish.jpeg";
import SEO from "@/components/common/SEO";


const PassCard = ({ title, price, perks, isPopular, icon: Icon, delay, position, onGetStarted, id, isSoldOut }) => {
  // Determine border glow color based on position
  const getBorderGlowClass = () => {
    if (position === 'center') {
      return 'border-ecell-blue shadow-[0_0_15px_rgba(111,102,255,0.3)] hover:shadow-[0_0_25px_rgba(111,102,255,0.45)]';
    }
    return 'border-ecell-blue shadow-[0_0_15px_rgba(111,102,255,0.3)] hover:shadow-[0_0_25px_rgba(111,102,255,0.45)]';
  };

  return (
    <motion.div
      id={id}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`relative bg-surface/72 backdrop-blur-[10px] p-8 rounded-lg border-2 flex flex-col h-full transition-all duration-500 group ${getBorderGlowClass()} ${isPopular ? 'bg-ecell-primary/5' : ''}`}
    >
      {(isSoldOut || isPopular) && (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-md shadow-lg z-20 ${isSoldOut ? "bg-red-500 shadow-red-500/40" : "bg-ecell-primary "}`}>
          {isSoldOut ? 'Sold Out' : 'Most Popular'}
        </div>
      )}

      <div className="mb-8">
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-colors duration-500 ${isPopular ? "bg-ecell-primary text-white" : "bg-white/5 text-ecell-primary group-hover:bg-ecell-primary group-hover:text-white"}`}>
          <Icon size={28} />
        </div>
        <h3 className="text-3xl font-sans font-bold text-white mb-2">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white font-sans">₹{price}</span>
          <span className="text-white/40 text-sm">/ person</span>
        </div>
      </div>

      <div className="space-y-4 mb-10 flex-grow">
        {perks.map((perk, idx) => (
          <div key={idx} className="flex items-start gap-3">
            {perk.hideIcon ? (
              <div className="mt-1 shrink-0 w-[18px]" />
            ) : (
              <div className={`mt-1 shrink-0 ${perk.included ? 'text-ecell-primary' : 'text-red-500'}`}>
                {perk.included ? <Check size={18} /> : <X size={18} />}
              </div>
            )}
            <div className="flex flex-col">
              <span className={`text-sm font-sans font-bold ${perk.included ? 'text-ecell-primary' : 'text-red-500/80'}`}>
                {perk.text}
              </span>
              {perk.subtext && (
                <span className={`text-xs font-sans ${perk.included ? 'text-white/50' : 'text-red-500/50'}`}>
                  {perk.subtext}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={isSoldOut}
        onClick={onGetStarted}
        className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 transform font-sans flex items-center justify-center gap-2 ${isSoldOut
          ? "bg-red-500/20 text-red-500 border-2 border-red-500/50 cursor-not-allowed"
          : isPopular
            ? "bg-ecell-primary text-white"
            : "bg-transparent text-ecell-primary border-2 border-ecell-primary"
          }`}
      >
        {isSoldOut ? 'Sold Out' : 'Get Started'} {!isSoldOut && <Rocket size={18} />}
      </button>
    </motion.div >
  );
};

const Passes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [location]);

  const handleGetStarted = (tier) => {
    const encodedUrl = encodeURIComponent(tier.paymentUrl);
    navigate(`/launchpad/payment?url=${encodedUrl}&tier=${encodeURIComponent(tier.title)}&from=/launchpad/passes`);
  };

  const tiers = [
    {
      title: "Delegate",
      price: "299",
      icon: Users,
      delay: 0.1,
      position: 'left',
      paymentUrl: "https://konfhub.com/widget/launchpad-2026?desc=true&secondaryBg=F7F7F7&ticketBg=F7F7F7&borderCl=F7F7F7&bg=FFFFFF&fontColor=1e1f24&ticketCl=1e1f24&btnColor=002E6E&fontFamily=Hind&borderRadius=10&widget_type=quick&screen=1&tickets=74038&ticketId=74038%7C1",
      perks: [
        { text: "Startup Expo Access", subtext: "Explore live startups & innovations", included: true },
        { text: "Competition Viewing Access", subtext: "Pitchers Pilot · Ground Reality · Teen Tycoons", included: true },
        { text: "Speaker Sessions Access", subtext: "Talks by founders & industry leaders", included: true },
        { text: "Internship Drive Access", subtext: "SOLD OUT", included: false, hideIcon: true },
        { text: "E-Cell In-House Workshops", subtext: "Hands-on learning sessions", included: false },
        { text: "Highlight Speaker Session Access", subtext: "Flagship Talks by Founders & Industry Leaders", included: false },

        { text: "Networking Lunch", subtext: "Founder & peer networking", included: false },
        { text: "Event Freebies & Swag", subtext: "Merch, goodies & partner giveaways", included: false },
      ]
    },
    {
      title: "Executive",
      price: "749",
      icon: Rocket,
      isPopular: true,
      delay: 0.2,
      position: 'center',
      paymentUrl: "https://konfhub.com/widget/launchpad-2026?desc=true&secondaryBg=F7F7F7&ticketBg=F7F7F7&borderCl=F7F7F7&bg=FFFFFF&fontColor=1e1f24&ticketCl=1e1f24&btnColor=002E6E&fontFamily=Hind&borderRadius=10&widget_type=quick&screen=1&tickets=74242&ticketId=74242%7C1",
      perks: [
        { text: "Startup Expo Access", subtext: "Explore live startups & innovations", included: true },
        { text: "Competition Viewing Access", subtext: "Pitchers Pilot · Ground Reality · Teen Tycoons", included: true },
        { text: "Speaker Sessions Access", subtext: "Talks by founders & industry leaders", included: true },
        { text: "Internship Drive Access", subtext: "SOLD OUT", included: false, hideIcon: true },
        { text: "E-Cell In-House Workshops", subtext: "Hands-on learning sessions", included: true },
        { text: "Highlight Speaker Session Access", subtext: "Flagship Talks by Founders & Industry Leaders", included: true },

        { text: "Networking Lunch", subtext: "Founder & peer networking", included: false },
        { text: "Event Freebies & Swag", subtext: "Merch, goodies & partner giveaways", included: false },
      ]
    },
    {
      title: "Nexus",
      price: "1399",
      icon: Star,
      delay: 0.3,
      isSoldOut: true,
      position: 'right',
      paymentUrl: "https://konfhub.com/widget/launchpad-2026?desc=true&secondaryBg=F7F7F7&ticketBg=F7F7F7&borderCl=F7F7F7&bg=FFFFFF&fontColor=1e1f24&ticketCl=1e1f24&btnColor=002E6E&fontFamily=Hind&borderRadius=10&widget_type=standard&tickets=74243&ticketId=74243%7C1&screen=1",
      perks: [
        { text: "Startup Expo Access", subtext: "Explore live startups & innovations", included: true },
        { text: "Competition Viewing Access", subtext: "Pitchers Pilot · Ground Reality · Teen Tycoons", included: true },
        { text: "Speaker Sessions Access", subtext: "Talks by founders & industry leaders", included: true },
        { text: "Internship Drive Access", subtext: "SOLD OUT", included: false, hideIcon: true },
        { text: "E-Cell In-House Workshops", subtext: "Hands-on learning sessions", included: true },
        { text: "Highlight Speaker Session Access", subtext: "Flagship Talks by Founders & Industry Leaders", included: true },

        { text: "Networking Lunch", subtext: "Founder & peer networking", included: true },
        { text: "Event Freebies & Swag", subtext: "Merch, goodies & partner giveaways", included: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-ecell-bg py-32 px-6 relative overflow-hidden">
      <SEO
        title="Get Your Passes | Launchpad 2026"
        description="Secure your spot at Launchpad 2026. Choose from Delegate, Executive, or Nexus passes to access competitions, speakers, and networking events."
        keywords={['Launchpad Passes', 'Event Tickets', 'Startup Competition Registration', 'Entrepreneurship Event Passes']}
        url="https://ecellbphc.in/launchpad/passes"
      />
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-ecell-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Launchpad 2026
          </motion.span>
          <motion.h1
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-sans font-bold text-white mb-6 uppercase tracking-tighter"
          >
            CHOOSE YOUR <span className="text-ecell-primary">PATH</span>
          </motion.h1>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-2xl mx-auto text-lg font-sans"
          >
            Select the tier that best fits your journey. Whether you are an aspiring student or a budding entrepreneur, we have a pass for you.
          </motion.p>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-ecell-primary font-bold mt-4 text-sm uppercase tracking-wider"
          >
            Disclaimer: Accommodation is not included in these passes
          </motion.p>
        </div>

        {/* Internship Drive — Moved to Top */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12"
        >
          <div
            id="internship-drive-pass"
            className="bg-surface/72 backdrop-blur-[10px] p-8 md:p-10 rounded-lg border border-ecell-primary/20 relative overflow-hidden group flex flex-col items-center"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-md shadow-lg shadow-red-500/40 z-20">
              Sold Out
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Briefcase size={120} className="text-ecell-primary" />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center flex-1">
              <div className="mb-4">
                <Briefcase size={28} className="text-ecell-primary opacity-20" />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-3">
                  Internship <span className="text-ecell-primary">Drive</span>
                </h2>
                <p className="text-white/60 text-sm font-sans mb-6 max-w-lg">
                  Connect with 50+ startups and explore internship opportunities with founders and industry leaders.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-ecell-primary/10 flex items-center justify-center text-ecell-primary">
                      <Check size={14} />
                    </div>
                    <span className="text-white text-sm font-medium">Internship Drive Access</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 mt-auto">
                <div className="text-3xl font-bold text-white font-sans">₹349</div>
                <button
                  disabled
                  className="px-12 py-3.5 rounded-xl bg-red-500/20 text-red-500 border border-red-500/50 font-bold text-center cursor-not-allowed transform font-sans inline-flex items-center justify-center gap-2"
                >
                  Sold Out
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier, idx) => (
            <PassCard
              key={idx}
              {...tier}
              onGetStarted={() => handleGetStarted(tier)}
            />
          ))}
        </div>
      </div>



      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Corporate Pass — Row 2 Left */}
        <div className="bg-surface/72 backdrop-blur-[10px] p-8 md:p-10 rounded-lg border border-white/5 relative overflow-hidden group flex flex-col items-center">
          <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <Briefcase size={120} className="text-ecell-primary" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center flex-1">
            <div className="mb-4">
              <Briefcase size={28} className="text-ecell-primary opacity-20" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-3">Corporate <span className="text-ecell-primary">Pass</span></h2>
              <p className="text-white/60 text-sm font-sans mb-8 max-w-md">
                Attend Launchpad with your team. Get exclusive access, premium networking opportunities, and special corporate perks.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                {["Premium Networking", "Highlight Sessions", "VIP Goodies", "Masterclass"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-ecell-primary/10 flex items-center justify-center text-ecell-primary">
                      <Check size={14} />
                    </div>
                    <span className="text-white text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto">
              <button
                onClick={() => navigate('/launchpad/corporate-passes')}
                className="px-8 py-3.5 rounded-xl bg-ecell-primary text-white font-bold text-center transition-all duration-300 transform font-sans inline-flex items-center justify-center gap-2"
              >
                View More <Briefcase size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Contingent Pass — Row 2 Right */}
        <div className="bg-surface/72 backdrop-blur-[10px] p-8 md:p-10 rounded-lg border border-white/5 relative overflow-hidden group flex flex-col items-center">
          <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <Users size={120} className="text-ecell-primary" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center flex-1">
            <div className="mb-4">
              <Users size={28} className="text-ecell-primary opacity-20" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-3">Contingent <span className="text-ecell-primary">Pass</span></h2>
              <p className="text-white/60 text-sm font-sans mb-8 max-w-md">
                Coming in a group? Our Contingent Pass offers exclusive bulk benefits, discounted rates, and collective networking for college delegations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                {["Accommodation", "Dedicated Manager", "SEED", "Team Certificates"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-ecell-primary/10 flex items-center justify-center text-ecell-primary">
                      <Check size={14} />
                    </div>
                    <span className="text-white text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto">
              <button
                onClick={() => navigate('/launchpad/contingent-passes')}
                className="px-8 py-3.5 rounded-xl bg-ecell-primary text-white font-bold text-center transition-all duration-300 transform font-sans inline-flex items-center justify-center gap-2"
              >
                View More <Rocket size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Campus Ambassador — Row 3 Left */}
        <div
          className="bg-surface/72 backdrop-blur-[10px] p-8 md:p-10 rounded-lg border border-ecell-secondary/20 relative overflow-hidden group cursor-pointer flex flex-col items-center"
          onClick={() => navigate('/launchpad/campus-ambassador')}
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <Award size={120} className="text-ecell-secondary" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center flex-1">
            <div className="w-14 h-14 rounded-lg bg-ecell-secondary/10 flex items-center justify-center mb-6 transition-transform duration-300">
              <Gift size={28} className="text-ecell-secondary" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-3">
                Campus <span className="text-ecell-primary">Ambassador</span>
              </h2>
              <p className="text-white/50 text-sm font-sans mb-8 max-w-md">
                Want to attend LAUNCHPAD for free? Become a Campus Ambassador — refer friends, earn free passes & exclusive rewards.
              </p>
            </div>
            <div className="mt-auto">
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/launchpad/campus-ambassador'); }}
                className="px-8 py-3.5 rounded-xl bg-ecell-secondary text-white font-bold transition-all duration-300 font-sans inline-flex items-center gap-2 hover:shadow-[0_0_25px_rgba(107,95,255,0.5)]"
              >
                I'm Interested <Rocket size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Looking for Accommodation — Row 3 Right */}
        <div
          className="bg-surface/72 backdrop-blur-[10px] p-8 md:p-10 rounded-lg border border-white/5 relative overflow-hidden group flex flex-col items-center"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <Hotel size={120} className="text-ecell-secondary" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center flex-1">
            <div className="w-14 h-14 rounded-lg bg-ecell-secondary/10 flex items-center justify-center mb-6">
              <Hotel size={28} className="text-ecell-secondary" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-3">
                Looking for <span className="text-ecell-primary">Accommodation?</span>
              </h2>
              <p className="text-white/60 text-sm font-sans mb-8 max-w-md">
                We provide comfortable and affordable stay options for outstation participants to ensure a hassle-free experience.
              </p>
            </div>
            <div className="mt-auto">
              <button
                onClick={() => navigate('/launchpad/accommodation')}
                className="px-8 py-3.5 rounded-xl bg-ecell-secondary text-white font-bold transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_25px_rgba(107,95,255,0.5)]"
              >
                View Stay Options <Hotel size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>


      {/* Contact Section */}
      <div className="mt-24 text-center">
        <h3 className="text-2xl font-sans font-bold text-white mb-8">Please feel free to contact in case of query</h3>
        <div className="max-w-2xl mx-auto flex justify-center">
          <ChromaGrid
            columns={2}
            rows={1}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            items={[
              {
                name: "Prathvi Raj Chauhan",
                role: "+91 78271 75012",
                image: prathviImg,
                linkedin: "https://www.linkedin.com/in/prathvirajchauhan/",
              },
              {
                name: "Manish Rumale",
                role: "+91 98861 17965",
                image: manishImg,
                linkedin: "https://www.linkedin.com/in/manish-rumale-99b5b534a/",
              }
            ].map((m) => {
              const handle = m.linkedin
                ? m.linkedin.split("/").filter(Boolean).pop()
                : m.name.replace(/\s/g, "").toLowerCase();

              const role = (m.role || "").toLowerCase();
              let gradient = "linear-gradient(135deg, rgba(107,95,255,0.2), rgba(212,255,0,0.2))";
              let borderColor = "#1d6ba8";

              if (role.includes("chairman") || role.includes("president")) {
                gradient = "linear-gradient(135deg, rgba(212,255,0,0.28), rgba(107,95,255,0.24))";
                borderColor = "#e0424f";
              } else if (role.includes("tech") || role.includes("technical") || role.includes("design") || role.includes("videography")) {
                gradient = "linear-gradient(135deg, rgba(107,95,255,0.26), rgba(212,255,0,0.18))";
                borderColor = "#5fa3d6";
              } else if (role.includes("media") || role.includes("publicity")) {
                gradient = "linear-gradient(135deg, rgba(107,95,255,0.22), rgba(212,255,0,0.22))";
                borderColor = "#1d6ba8";
              } else if (role.includes("treasurer") || role.includes("operations") || role.includes("hospitality")) {
                gradient = "linear-gradient(135deg, rgba(212,255,0,0.22), rgba(107,95,255,0.18))";
                borderColor = "#e0424f";
              }

              return {
                title: m.name,
                subtitle: m.role,
                image: m.image,
                handle: handle ? `@${handle.substring(0, 15)}` : undefined,
                url: m.linkedin,
                gradient,
                borderColor,
                imgStyle: (() => {
                  const name = m.name.toLowerCase();
                  if (name.includes("prathvi")) {
                    return { objectPosition: "center" };
                  }
                  if (name.includes("manish")) {
                    return { objectPosition: "center" };
                  }
                  return undefined;
                })()
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Passes;
export { Passes as Comp };
