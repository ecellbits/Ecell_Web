import sandiskLogo from '@/assets/Bitsian startups/SanDisk Logo.png';
import mplLogo from '@/assets/Bitsian startups/MPL_Logo 1.png';
import bbLogo from '@/assets/Bitsian startups/bb.png';
import redbusLogo from '@/assets/Bitsian startups/redbus.png';
import swiggyLogo from '@/assets/Bitsian startups/Swiggy.png';
import growwLogo from '@/assets/Bitsian startups/groww.png';
import { Container, Section } from './ui';

const startups = [
  {
    name: 'SanDisk',
    foundedBy: 'Sanjay Mehrotra',
    description: 'Founded in 1988 as SunDisk by Eli Harari, Sanjay Mehrotra, and Jack Yuan, the company was acquired by Western Digital in 2016.',
    logo: sandiskLogo,
    tile: '#ffffff',
  },
  {
    name: 'MPL',
    foundedBy: 'Shubham Malhotra',
    description: 'Mobile Premier League (MPL) is an Indian online gaming platform based in Bengaluru. It was founded in 2018 by Sai Srinivas Kiran G and Shubham Malhotra.',
    logo: mplLogo,
    tile: '#ffffff',
  },
  {
    name: 'bigbasket',
    foundedBy: 'Hari Menon',
    description: 'BigBasket is an Indian online grocer headquartered in Bangalore. It was founded in December 2011 by V.S. Sudhakar, Hari Menon, V.S. Ramesh, Vipul Parekh, and Abhinay Choudhari.',
    logo: bbLogo,
    tile: '#98cb4b',
    square: true,
  },
  {
    name: 'redBus',
    foundedBy: 'Phanindra Sama',
    description: 'redBus is an Indian multinational online bus ticketing platform founded in 2006 by Phanindra Sama, Sudhakar Pasupunuri, and Charan Padmaraju, all alumni of BITS Pilani.',
    logo: redbusLogo,
    tile: '#d84e55',
    square: true,
  },
  {
    name: 'Swiggy',
    foundedBy: 'Sriharsha Majety',
    description: "Swiggy is India's leading on-demand delivery platform, founded in 2014 by BITS Pilani alumni Sriharsha Majety and Nandan Reddy, and Rahul Jaimini.",
    logo: swiggyLogo,
    tile: '#ffffff',
  },
  {
    name: 'Groww',
    foundedBy: 'Ishan Bansal',
    description: 'Groww is a financial services platform founded in 2016 by Lalit Keshre, Harsh Jain, Neeraj Singh, and Ishan Bansal to democratize investing in India.',
    logo: growwLogo,
    tile: '#0F1754',
  },
];

const Startups = () => (
  <Section className="bg-brand-cream text-brand-ink border-t border-black/10">
    <Container>
      <h2
        data-reveal=""
        className="m-0 mb-12 md:mb-16 max-w-4xl text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]"
      >
        <span className="text-brand-maroon">BITS Pilani:</span> Fueling the Next Wave of Innovation.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" data-stagger="">
        {startups.map((s) => (
          <div key={s.name} className="flex">
            <article
              className="flex-1 flex flex-col rounded-2xl border border-black/10 bg-white overflow-hidden hover:border-brand-maroon/30 hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <div
                className="h-28 md:h-32 flex items-center justify-center p-6 border-b border-black/5"
                style={{ backgroundColor: s.tile }}
              >
                <img
                  src={s.logo}
                  alt={s.name}
                  loading="lazy"
                  className={`${s.square ? 'max-h-16 md:max-h-20' : 'max-h-12 md:max-h-14'} max-w-[70%] object-contain`}
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <p className="m-0 font-copy text-sm text-black/50">
                  Founded By <span className="font-bold text-brand-maroon">{s.foundedBy}</span>
                </p>
                <p className="mt-3 mb-0 font-copy text-sm leading-relaxed text-black/70">{s.description}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </Container>
  </Section>
);

export default Startups;
