import { useLayoutEffect } from 'react';
import { useLocation } from '@/shims/react-router';

// Handle incoming article links after the destination's content has mounted.
export function useSectionHash() {
  const { hash } = useLocation();
  useLayoutEffect(() => {
    if (!hash) return;
    let id: string;
    try { id = decodeURIComponent(hash.replace(/^#/, '')); }
    catch { return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, [hash]);
}
