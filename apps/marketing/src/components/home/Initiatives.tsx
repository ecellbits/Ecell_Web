import { Link } from '@/shims/react-router';
import { ArrowUpRight } from 'lucide-react';
import zakPhoto from '@/assets/Gallery-optimized/ZAK06519.jpg'
import a7photo from '@/assets/Gallery-optimized/A7C07547.jpg'
import dscPhoto from '@/assets/Gallery-optimized/DSC08244.jpg'
import galleryPhoto from '@/assets/LaunchPad.JPG';
import photo1 from '@/assets/Gallery-optimized/ZAK06284.jpg'
import photo2 from '@/assets/Gallery-optimized/A7C01516.jpg'
import { Container, Section, SectionHeading } from './ui';

const initiatives = [
  {
    title: 'Speaker Sessions',
    subtitle: 'Engaging sessions throughout the year',
    images: [zakPhoto, a7photo, dscPhoto],
    link: '/program',
  },
  {
    title: 'Launchpad',
    subtitle: 'Largest E-Summit of South India',
    images: [galleryPhoto],
    link: '/launchpad',
    tall: true,
  },
  {
    title: 'Gallery',
    subtitle: 'Relive our previous summits',
    images: [photo1, photo2, dscPhoto],
    link: '/gallery',
  },
];

const Card = ({ item }: { item: (typeof initiatives)[number] }) => (
  <div className={item.tall ? 'h-full' : ''}>
    <Link
      to={item.link}
      className="group flex flex-col h-full rounded-2xl overflow-hidden border border-black/10 bg-white no-underline text-brand-ink hover:border-brand-maroon/30 hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <div
        data-parallax=""
        className={`relative overflow-hidden ${item.tall ? 'flex-1 min-h-[280px] md:min-h-[420px]' : 'h-[200px] md:h-[260px]'}`}
      >
        <div className={`absolute inset-0 grid gap-0.5 ${item.images.length > 1 ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {item.images.map((img) => (
            <img
              key={img}
              src={img}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between gap-4 p-6 md:p-8">
        <div>
          <h3 className="m-0 text-2xl md:text-4xl font-bold tracking-tight leading-tight">{item.title}</h3>
          <p className="mt-2 mb-0 font-copy text-sm md:text-base text-black/60">{item.subtitle}</p>
        </div>
        <span className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full border border-brand-navy/20 text-brand-navy flex items-center justify-center group-hover:bg-brand-maroon group-hover:text-brand-cream transition-colors">
          <ArrowUpRight className="w-5 h-5" />
        </span>
      </div>
    </Link>
  </div>
);

const Initiatives = () => (
  <Section className="bg-brand-cream text-brand-ink">
    <Container>
      <SectionHeading
        align="center"
        title={<>Programs & <span className="text-brand-maroon">Initiatives</span></>}
        description="Fostering innovation through our curated programs designed to support and accelerate your entrepreneurial journey."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6" data-stagger="">
        <div className="flex flex-col gap-5 md:gap-6">
          <Card item={initiatives[0]} />
          <Card item={initiatives[2]} />
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          <div className="flex-1">
            <Card item={initiatives[1]} />
          </div>
          <div>
            <Link
              to="/program"
              className="group flex flex-col justify-between min-h-[220px] md:min-h-[260px] rounded-2xl p-8 md:p-10 bg-brand-maroon text-brand-cream no-underline hover:bg-brand-ink transition-colors"
            >
              <div className="flex justify-end">
                <span className="w-12 h-12 rounded-full bg-brand-cream text-brand-maroon flex items-center justify-center transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>
              <span className="font-syne text-3xl md:text-5xl font-bold leading-[1.1]">
                Explore All Our Programs
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  </Section>
);

export default Initiatives;
