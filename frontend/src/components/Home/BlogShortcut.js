import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowUpRight, Compass, Play, Clock } from 'lucide-react';
import { Container, fadeUp } from './ui';

const stages = ['1. Bootstrapping', '2. Pre-Seed', '3. Seed Round', '4. VC Funding', '5. Exit Stage'];

const BlogShortcut = () => {
  return (
    <section className="relative py-20 md:py-28 bg-brand-navy text-brand-ink">
      <Container>
        <motion.div
          {...fadeUp}
          className="rounded-3xl p-6 sm:p-10 bg-brand-cream shadow-[0_24px_48px_-24px_rgba(0,0,0,0.5)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Text Column */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-copy">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-maroon/10 text-brand-maroon">
                  <Compass className="w-3.5 h-3.5" /> Featured Editorial
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-black/50 font-medium">
                  <Clock className="w-3.5 h-3.5" /> 8 Min Read
                </span>
                <span className="text-black/30">•</span>
                <span className="text-xs text-black/50 font-medium">Episode 01 Inside</span>
              </div>

              <h3 className="mt-5 mb-0 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight text-brand-ink">
                Entrepreneurship and Founder Playbook
              </h3>

              <p className="mt-4 mb-0 font-copy text-sm sm:text-base text-black/65 leading-relaxed max-w-xl">
                From personal savings and MVP validation to Series A-C and public exit. Explore our interactive roadmap paired with candid founder realities from{' '}
                <span className="text-brand-ink font-semibold underline decoration-brand-maroon underline-offset-4">E-Cell Conversations EP-01</span>.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {stages.map((stage) => (
                  <span
                    key={stage}
                    className="font-copy text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white border border-black/10 text-black/70"
                  >
                    {stage}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-navy text-brand-cream font-copy font-bold text-sm no-underline hover:bg-brand-ink transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Read Full Blog Post
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/blog#video-box"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/15 text-brand-ink font-copy font-semibold text-sm no-underline hover:border-brand-maroon hover:text-brand-maroon transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Watch Ep-01 Stream
                </Link>
              </div>
            </div>

            {/* Right Visual Preview Column */}
            <div className="lg:col-span-5">
              <Link to="/blog" className="group block no-underline">
                <div className="relative rounded-2xl overflow-hidden border border-black/10 bg-black aspect-video">
                  <img
                    src="https://img.youtube.com/vi/1uAXFS-mi1g/maxresdefault.jpg"
                    alt="E-Cell Conversations Episode 01"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://img.youtube.com/vi/1uAXFS-mi1g/hqdefault.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  <div className="absolute top-3 left-3 bg-brand-cream text-brand-ink px-3 py-1 rounded-full font-copy text-[11px] font-bold tracking-wide">
                    E-CELL CONVERSATIONS EP-01
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-brand-cream text-brand-navy flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 font-copy text-xs font-semibold text-white truncate">
                    What Does It Really Take to Build a Startup?
                  </div>
                </div>
                <p className="mt-3 mb-0 text-right font-copy text-xs font-semibold text-brand-navy group-hover:underline">
                  Click to explore interactive blog page →
                </p>
              </Link>
            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default BlogShortcut;
