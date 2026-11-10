import { useLayoutEffect } from 'react';

// Scroll-driven motion for the editorial pages. Markup opts in with attributes:
//   data-reveal[="left"|"right"|"line"|"image"]  animate in once on entering the viewport
//   data-stagger                                 reveal direct children one after another
//   data-delay="120"                             extra delay in ms for a reveal or group
//   data-scrub / data-parallax                   receive --progress (0 → 1) while crossing the viewport
//   data-count                                   count a figure such as "3,000+" up from zero
export function useScrollMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    root.classList.add('motion-ready');
    root.querySelectorAll('[data-delay]').forEach((el) => {
      el.style.setProperty('--delay', `${el.dataset.delay}ms`);
    });
    root.querySelectorAll('[data-stagger]').forEach((group) => {
      Array.from(group.children).forEach((child, i) => child.style.setProperty('--i', String(i)));
    });

    const reveals = Array.from(root.querySelectorAll('[data-reveal], [data-stagger], [data-count]'));
    const counts = new Map();
    let entrancesReady = true;

    const scrubbed = Array.from(root.querySelectorAll('[data-scrub], [data-parallax]'));
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progressBar);

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      if (entrancesReady) {
        for (const el of reveals) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 0 && counts.has(el)) {
            counts.get(el)?.();
            counts.delete(el);
          }
          if (el.classList.contains('is-revealed') || rect.top > viewport * 0.95) continue;
          const passed = rect.top < 0;
          if (passed) el.classList.add('motion-instant');
          el.classList.add('is-revealed');
          if (el.hasAttribute('data-count') && !passed) {
            counts.set(el, countUp(el));
          }
        }
      }
      for (const el of scrubbed) {
        const rect = el.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
        el.style.setProperty('--progress', progress.toFixed(4));
      }
      const scrollable = document.documentElement.scrollHeight - viewport;
      progressBar.style.setProperty('--progress', scrollable > 0 ? (window.scrollY / scrollable).toFixed(4) : '0');
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      counts.forEach((finish) => finish());
      counts.clear();
      reveals.forEach((el) => el.classList.remove('is-revealed', 'motion-instant'));
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      progressBar.remove();
      root.classList.remove('motion-ready');
    };
  }, [rootRef]);
}

function countUp(el) {
  const node = el.firstChild;
  const match = node?.nodeValue?.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!node || !match) return () => {};
  const [, prefix, digits, suffix] = match;
  const target = Number(digits.replace(/,/g, ''));
  const decimals = digits.split('.')[1]?.length ?? 0;
  const grouped = digits.includes(',');
  const format = (value) => prefix + value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  }) + suffix;

  const duration = 1400;
  const start = performance.now();
  let frame = 0;
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    node.nodeValue = format(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(frame);
    node.nodeValue = format(target);
  };
}

