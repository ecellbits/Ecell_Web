import { useEffect, type ReactNode } from 'react';
import { useRouter } from '@tanstack/react-router';

export function NavigationScroll({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => router.subscribe('onBeforeLoad', ({ pathChanged }) => {
    if (pathChanged) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }), [router]);
  return children;
}
