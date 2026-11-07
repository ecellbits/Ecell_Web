import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Handle incoming article links after the destination's content has mounted.
export function useSectionHash() {
  const { hash } = useLocation();
  useLayoutEffect(() => {
    if (!hash) return;
    let id;
    try {
      id = decodeURIComponent(hash.replace(/^#/, ''));
    } catch {
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);
}

