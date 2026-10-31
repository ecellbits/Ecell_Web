import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Launchpad1 from '../../assets/Launchpad1.JPG';
import { Container, Section, SectionHeading, fadeUp } from './ui';

const initiatives = [
  {
    title: 'Speaker Sessions',
    subtitle: 'Engaging sessions throughout the year',
    images: ['/speaker_session_new_3.jpg', '/speaker_session_new_2.jpg', '/speaker_session_new.jpg'],
    link: '/program',
  },
  {
    title: 'Launchpad',
    subtitle: 'Largest E-Summit of South India',
    images: [Launchpad1],
    link: '/launchpad',
    tall: true,
  },
  {
    title: 'Gallery',
    subtitle: 'Relive our previous summits',
    images: ['/na.png', '/na1.png', '/ss.JPG'],
    link: '/gallery',
  },
];

const Card = ({ item }) => (
  <motion.div {...fadeUp} className={item.tall ? 'h-full' : ''}>
    <Link
      to={item.link}
      className="group flex flex-col h-full rounded-2xl overflow-hidden border border-black/10 bg-white no-underline text-brand-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-12px_rgba(15,23,84,0.25)] hover:border-brand-maroon/30 hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <div className={`relative overflow-hidden ${item.tall ? 'flex-1 min-h-[280px] md:min-h-[420px]' : 'h-[200px] md:h-[260px]'}`}>
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
  </motion.div>
);

const Initiatives = () => (
  <Section className="bg-brand-cream text-brand-ink">
    <Container>
      <SectionHeading
        align="center"
        title={<>Programs & <span className="text-brand-maroon">Initiatives</span></>}
        description="Fostering innovation through our curated programs designed to support and accelerate your entrepreneurial journey."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div className="flex flex-col gap-5 md:gap-6">
          <Card item={initiatives[0]} />
          <Card item={initiatives[2]} />
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          <div className="flex-1">
            <Card item={initiatives[1]} />
          </div>
          <motion.div {...fadeUp}>
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
          </motion.div>
        </div>
      </div>
    </Container>
  </Section>
);

export default Initiatives;
