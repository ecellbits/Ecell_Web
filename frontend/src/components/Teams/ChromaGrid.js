import React from 'react';

export const ChromaGrid = ({ items = [], className = '', columns = 3 }) => {
  return (
    <div
      className={`mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 min-[561px]:grid-cols-2 min-[901px]:grid-cols-[repeat(var(--cols),minmax(0,1fr))] ${className}`}
      style={{ '--cols': columns }}
    >
      {items.map((c, i) => {
        const name = c.title?.toLowerCase();
        const needsFix =
          name === "ayush jain" || name === "divyansh rungta";

        return (
          <article
            key={i}
            className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-hairline bg-card text-card-foreground transition-all duration-200 hover:border-hairline-strong hover:shadow-lg"
          >
            <div className="relative aspect-square shrink-0 overflow-hidden border-b border-hairline bg-muted [&_img]:absolute [&_img]:inset-0 [&_img]:size-full [&_img]:object-cover">
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                style={
                  c.imgStyle || (needsFix
                    ? {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      transform: "none",
                      display: "block"
                    }
                    : undefined)
                }
              />
            </div>

            <footer className="relative flex-1 px-4 py-5 text-ecell-text">
              <h3 className="text-[clamp(14px,2.2vw,18px)] leading-[1.2] font-bold tracking-[0.2px]">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4 text-ink no-underline">
                    {c.title}
                  </a>
                ) : (
                  c.title
                )}
              </h3>
              {c.handle && <span className="ml-2 inline-block text-[0.85em] text-ecell-text-muted">{c.handle}</span>}
              <p className="mt-1.5 text-[clamp(12px,2vw,14px)] text-ecell-text font-medium">{c.subtitle}</p>
              {c.location && <span className="mt-1.5 inline-block text-xs text-ecell-text-muted">{c.location}</span>}

              {/* Contact Row */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {/* Phone pill */}
                {c.phone && (
                  <a
                    href={`tel:${c.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline-strong bg-raised px-3.5 py-1.5 text-[13px] whitespace-nowrap text-ecell-text no-underline transition-all duration-200 hover:border-brand-navy hover:bg-brand-navy hover:text-brand-cream [&_svg]:shrink-0"
                    onClick={e => e.stopPropagation()}
                    title={`Call ${c.title}`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{c.phone}</span>
                  </a>
                )}

                {/* Email icon button */}
                {c.email && (
                  <a
                    href={`mailto:${c.email}`}
                    className="inline-flex size-[34px] cursor-pointer items-center justify-center rounded-full border border-hairline-strong bg-raised text-ecell-text no-underline transition-all duration-200 hover:border-brand-navy hover:bg-brand-navy hover:text-brand-cream"
                    onClick={e => e.stopPropagation()}
                    title={`Email ${c.title}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                )}
              </div>
            </footer>
          </article>
        );
      })}
    </div>
  );
};

export default ChromaGrid;
