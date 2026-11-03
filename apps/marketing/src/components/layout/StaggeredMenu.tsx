import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from '@/shims/react-router';

export const StaggeredMenu = React.forwardRef(({
  position = 'right',
  colors = ['#B19EEF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/logo192.png',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  isFixed = false,
  onMenuOpen,
  onMenuClose,
  hideHeader = false,
  showHamburgerAlways = false,
  logoLink = "/"
}, ref) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const colorTweenRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef(null);


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      if (!panel) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('[data-menu="layer"]'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      if (plusH && plusV && icon) {
        gsap.set(plusH, { transformOrigin: '50% 50%' });
        gsap.set(plusV, { transformOrigin: '50% 50%' });
        gsap.set(icon, { transformOrigin: '50% 50%' });
      }
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('[data-menu="label"]'));
    const numberEls = Array.from(panel.querySelectorAll('[data-menu="list"][data-numbering] [data-menu="item"]'));
    const socialTitle = panel.querySelector('[data-menu="social-title"]');
    const socialLinks = Array.from(panel.querySelectorAll('[data-menu="social-link"]'));

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' }
        },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' }
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('[data-menu="label"]'));
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        const numberEls = Array.from(panel.querySelectorAll('[data-menu="list"][data-numbering] [data-menu="item"]'));
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector('[data-menu="social-title"]');
        const socialLinks = Array.from(panel.querySelectorAll('[data-menu="social-link"]'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback(() => {
    // Hamburger animation is now handled by CSS
  }, []);

  const animateColor = useCallback(
    opening => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback(() => {
    // Text animation removed - using hamburger icon only
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  React.useImperativeHandle(ref, () => ({
    toggle: toggleMenu,
    isOpen: open
  }));

  return (
    <div
      className={`group/menu ${isFixed ? 'pointer-events-none fixed top-0 left-0 z-2000 h-screen w-screen overflow-hidden' : 'relative z-40 size-full'} ${className}`}
      style={accentColor ? { '--sm-accent': accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="pointer-events-none absolute inset-y-0 right-0 z-5 w-[clamp(260px,38vw,420px)] group-data-[position=left]/menu:right-auto group-data-[position=left]/menu:left-0" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#c9d3dc'];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => <div key={i} data-menu="layer" className="absolute top-0 right-0 size-full translate-x-0" style={{ background: c }} />);
        })()}
      </div>
      {!hideHeader && (showHamburgerAlways || open) && (
        <header className="pointer-events-none absolute top-0 left-0 z-20 flex w-full items-center justify-between bg-transparent p-[2em] [&>*]:pointer-events-auto max-[640px]:px-[1em] max-[640px]:py-[1.5em]" aria-label="Main navigation header">
          <div className="flex items-center select-none">
            <Link to={logoLink} onClick={() => { if (openRef.current) toggleMenu(); }}>
              <img src={logoUrl} alt="Logo" className="block h-8 w-auto object-contain brightness-0" />
            </Link>
          </div>
          <div style={{ flex: 1 }}></div>
          <button
            ref={toggleBtnRef}
            className="relative inline-flex cursor-pointer items-center gap-[0.3rem] overflow-visible border-none bg-transparent leading-none font-medium text-ink focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffffffaa]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span ref={iconRef} className="relative flex h-5 w-7 flex-[0_0_28px] flex-col items-stretch justify-between will-change-transform" aria-hidden="true">
              <span ref={plusHRef} className="h-0.5 w-full rounded-[2px] bg-current transition-all duration-300 group-data-open/menu:nth-1:[transform:translateY(9px)_rotate(45deg)] group-data-open/menu:nth-2:opacity-0 group-data-open/menu:nth-3:[transform:translateY(-9px)_rotate(-45deg)]" />
              <span className="h-0.5 w-full rounded-[2px] bg-current transition-all duration-300 group-data-open/menu:nth-1:[transform:translateY(9px)_rotate(45deg)] group-data-open/menu:nth-2:opacity-0 group-data-open/menu:nth-3:[transform:translateY(-9px)_rotate(-45deg)]" />
              <span ref={plusVRef} className="h-0.5 w-full rounded-[2px] bg-current transition-all duration-300 group-data-open/menu:nth-1:[transform:translateY(9px)_rotate(45deg)] group-data-open/menu:nth-2:opacity-0 group-data-open/menu:nth-3:[transform:translateY(-9px)_rotate(-45deg)]" />
            </span>
          </button>
        </header>
      )}

      <aside id="staggered-menu-panel" ref={panelRef} className="pointer-events-auto absolute top-0 right-0 z-10 flex h-full w-[clamp(260px,38vw,420px)] flex-col overflow-y-auto border-l border-hairline bg-surface px-[2em] pt-[6em] pb-[2em] group-data-[position=left]/menu:right-auto group-data-[position=left]/menu:left-0 max-[1024px]:w-[min(84vw,360px)] max-[640px]:w-[92vw]" aria-hidden={!open}>
        <div className="flex flex-1 flex-col gap-5">
          <ul data-menu="list" className="m-0 flex list-none flex-col gap-2 p-0" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="relative overflow-hidden leading-none" key={it.label + idx}>
                  <Link data-menu="item" className="relative inline-block cursor-pointer pr-[1.4em] text-[2.5rem] leading-none font-semibold tracking-[-1.5px] text-ink uppercase no-underline transition-[background,color] duration-250 hover:text-brand-maroon max-[1024px]:text-[2rem] max-[640px]:text-[1.5rem] after:pointer-events-none after:absolute after:top-[0.1em] after:right-[2.8em] after:text-base after:font-normal after:tracking-normal after:text-brand-maroon after:opacity-[var(--sm-num-opacity,0)] after:content-[attr(data-number)] after:select-none" to={it.link} onClick={() => { if (openRef.current) toggleMenu(); }} aria-label={it.ariaLabel} data-index={idx + 1} data-number={displayItemNumbering ? String(idx + 1).padStart(2, '0') : undefined}>
                    <span data-menu="label" className="inline-block origin-[50%_100%] will-change-transform">{it.label}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="relative overflow-hidden leading-none" aria-hidden="true">
                <span data-menu="item" className="relative inline-block cursor-pointer pr-[1.4em] text-[2.5rem] leading-none font-semibold tracking-[-1.5px] text-ink uppercase no-underline transition-[background,color] duration-250 hover:text-brand-maroon max-[1024px]:text-[2rem] max-[640px]:text-[1.5rem] after:pointer-events-none after:absolute after:top-[0.1em] after:right-[2.8em] after:text-base after:font-normal after:tracking-normal after:text-brand-maroon after:opacity-[var(--sm-num-opacity,0)] after:content-[attr(data-number)] after:select-none">
                  <span data-menu="label" className="inline-block origin-[50%_100%] will-change-transform">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="mt-auto flex flex-col gap-3 pt-8" aria-label="Social links">
              <h3 data-menu="social-title" className="m-0 text-base font-medium text-lava-bright">Socials</h3>
              <ul className="group/socials m-0 flex list-none flex-row flex-wrap items-center gap-4 p-0">
                {socialItems.map((s, i) => (
                  <li key={s.label + i}>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-menu="social-link" className="relative inline-flex items-center justify-center p-2 text-2xl font-medium text-ink no-underline opacity-100 transition-[color,opacity,transform] duration-300 group-hover/socials:[&:not(:hover)]:opacity-35 group-focus-within/socials:[&:not(:focus-visible)]:opacity-35 hover:-translate-y-[3px] hover:text-brand-maroon focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand-maroon [&_svg]:size-6"
                      aria-label={s.label}
                      title={s.label}
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
});

export default StaggeredMenu;
