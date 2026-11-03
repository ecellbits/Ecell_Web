import { useLayoutEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLocation } from '@/shims/react-router';

function isLoaderRoute(path: string) {
    if (path === '/' || path === '/magazine') return true;
    if (path === '/launchpad') return true;
    return false;
}

const ECellLoader = ({ ready = true, onLoadingChange }: { ready?: boolean; onLoadingChange?: (loading: boolean) => void }) => {
    const { pathname } = useLocation();
    const [initialPath] = useState(pathname);
    const [finished, setFinished] = useState(false);
    const loading = isLoaderRoute(initialPath) && !finished && pathname === initialPath;

    // Route navigation must never replay the document's entrance animation.
    useLayoutEffect(() => {
        if (pathname !== initialPath) setFinished(true);
    }, [pathname, initialPath]);
    const rootRef = useRef<HTMLDivElement>(null);
    const plumeRef = useRef<SVGPathElement>(null);
    const edgeRef = useRef<SVGPathElement>(null);
    const rocketRef = useRef<SVGGElement>(null);
    const maskId = `exhaust-${useId().replace(/:/g, '')}`;

    useLayoutEffect(() => {
        onLoadingChange?.(loading);
    }, [loading, onLoadingChange]);

    useLayoutEffect(() => {
        if (!loading || !rootRef.current) return;
        const finish = () => setFinished(true);

        const root = rootRef.current;
        // The document cover owns the first paint; this mounted overlay takes over.
        root.style.backgroundColor = '#0F1754';
        root.style.opacity = '1';
        rocketRef.current?.setAttribute('visibility', 'hidden');
        document.documentElement.removeAttribute('data-ecell-boot');
        if (!ready) {
            return;
        }
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const flight = { progress: 0 };
        let width = root.clientWidth;
        let height = root.clientHeight;

        // Both the cutout and its luminous lip use the same exhaust geometry.
        // Local +x points along the flight; the plume widens behind the nozzle.
        const draw = () => {
            const p = flight.progress;
            const diagonal = Math.hypot(width, height);
            const angle = -Math.atan2(height, width);
            const ux = Math.cos(angle);
            const uy = Math.sin(angle);
            const distance = diagonal * (1.8 * p - 0.08);
            const x = ux * distance;
            const y = height + uy * distance;
            const length = diagonal * 3;
            const spread = diagonal * (0.025 + 2.8 * p * p);
            const neck = 4;
            const outline = `M 0 ${-neck} C ${-length * 0.12} ${-neck}, ${-length * 0.3} ${-spread * 0.7}, ${-length} ${-spread} L ${-length} ${spread} C ${-length * 0.3} ${spread * 0.7}, ${-length * 0.12} ${neck}, 0 ${neck} Z`;
            const transform = `translate(${x} ${y}) rotate(${angle * 180 / Math.PI})`;
            for (const node of [plumeRef.current, edgeRef.current]) {
                node?.setAttribute('d', outline);
                node?.setAttribute('transform', transform);
            }
            rocketRef.current?.setAttribute('transform', `${transform} scale(${width < 600 ? 0.8 : 1})`);
            edgeRef.current?.setAttribute('opacity', String(Math.min(1, p * 8) * (1 - p)));
        };
        const resize = () => {
            width = root.clientWidth;
            height = root.clientHeight;
            draw();
        };
        draw();
        rocketRef.current?.setAttribute('visibility', 'visible');
        root.style.backgroundColor = 'transparent';
        window.addEventListener('resize', resize);

        const timeline = gsap.timeline({ paused: true, onComplete: finish });
        if (motionPreference.matches) {
            timeline.to(root, { opacity: 0, duration: 0.2 });
        } else {
            timeline.to(flight, {
                progress: 1,
                duration: 2.7,
                delay: 0.15,
                ease: 'power1.inOut',
                onUpdate: draw,
            });
        }
        // Start on the next frame only after the initial geometry has been committed.
        const frame = requestAnimationFrame(() => timeline.play(0));
        const reduceMotion = () => { if (motionPreference.matches) timeline.progress(1); };
        motionPreference.addEventListener('change', reduceMotion);
        return () => {
            cancelAnimationFrame(frame);
            timeline.kill();
            window.removeEventListener('resize', resize);
            motionPreference.removeEventListener('change', reduceMotion);
        };
    }, [loading, ready, pathname]);

    if (!loading) return null;

    return (
        <div ref={rootRef} style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden', backgroundColor: '#0F1754' }} role="status" aria-label="Launching E-Cell" data-lenis-prevent>
            <svg className="absolute inset-0 h-full w-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <mask id={maskId} x="0" y="0" width="100%" height="100%" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }}>
                        <rect width="100%" height="100%" fill="white" />
                        <path ref={plumeRef} fill="black" />
                    </mask>
                </defs>
                <rect width="100%" height="100%" fill="#0F1754" mask={`url(#${maskId})`} />
                <path ref={edgeRef} fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0" />
                <g ref={rocketRef} visibility="hidden" fill="#ffffff">
                    {/* A single swept flying wing with a crisp, notched trailing edge. */}
                    <path d="M 58 0 L -10 -42 L -3 -25 L 7 -20 L 2 -12 L 10 -8 L 0 -4 L 0 4 L 10 8 L 2 12 L 7 20 L -3 25 L -10 42 Z" />
                </g>
            </svg>
            <span className="sr-only">Loading the website</span>
        </div>
    );
};

export default ECellLoader;
