import { Link } from '@/shims/react-router';
import { BookOpen, ArrowUpRight, Compass, Play, Clock } from 'lucide-react';
import { Container } from './ui';

const stages = ['1. Bootstrapping', '2. Pre-Seed', '3. Seed Round', '4. VC Funding', '5. Exit Stage'];

const BlogShortcut = () => {
  return (
    <section className="relative py-20 md:py-28 bg-brand-navy text-brand-cream border-t border-black/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Text Column */}
          <div data-reveal="" className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-copy">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-cream text-brand-navy">
                <Compass className="w-3.5 h-3.5" /> Featured Editorial
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-brand-cream/50 font-medium">
                <Clock className="w-3.5 h-3.5" /> 8 Min Read
              </span>
              <span className="text-brand-cream/25">•</span>
              <span className="text-xs text-brand-cream/50 font-medium">Episode 01 Inside</span>
            </div>

            <h3 className="mt-6 mb-0 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight text-brand-cream">
              Entrepreneurship and Founder Playbook
            </h3>

            <p className="mt-4 mb-0 font-copy text-sm sm:text-base text-brand-cream/65 leading-relaxed max-w-xl">
              From personal savings and MVP validation to Series A-C and public exit. Explore our interactive roadmap paired with candid founder realities from{' '}
              <span className="text-brand-cream font-semibold underline decoration-brand-cream/50 underline-offset-4">E-Cell Conversations EP-01</span>.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {stages.map((stage) => (
                <span
                  key={stage}
                  className="font-copy text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-brand-cream/10 border border-brand-cream/15 text-brand-cream/70"
                >
                  {stage}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-cream text-brand-navy font-copy font-bold text-sm no-underline hover:bg-white transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Read Full Blog Post
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/blog#video-box"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-cream/25 text-brand-cream/85 font-copy font-semibold text-sm no-underline hover:bg-brand-cream/10 hover:text-brand-cream transition-colors"
              >
                <Play className="w-4 h-4" />
                Watch Ep-01 Stream
              </Link>
            </div>
          </div>

          {/* Right Visual Preview Column */}
          <div data-reveal="image" data-delay="140" className="lg:col-span-5">
            <Link to="/blog" className="group block no-underline">
              <div className="relative rounded-2xl overflow-hidden border border-brand-cream/15 bg-black aspect-video">
                <img
                  src="https://img.youtube.com/vi/1uAXFS-mi1g/maxresdefault.jpg"
                  alt="E-Cell Conversations Episode 01"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://img.youtube.com/vi/1uAXFS-mi1g/hqdefault.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                <div className="absolute top-3 left-3 bg-brand-cream text-brand-ink px-3 py-1 rounded-full font-copy text-[11px] font-bold tracking-wide">
                  E-CELL CONVERSATIONS EP-01
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-brand-cream text-brand-navy flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 ml-0.5 fill-current" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 font-copy text-xs font-semibold text-white truncate">
                  What Does It Really Take to Build a Startup?
                </div>
              </div>
              <p className="mt-3 mb-0 text-right font-copy text-xs font-semibold text-brand-cream/60 group-hover:text-brand-cream transition-colors">
                Click to explore interactive blog page →
              </p>
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default BlogShortcut;
