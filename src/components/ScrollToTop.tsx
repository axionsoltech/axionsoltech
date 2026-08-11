import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from './SmoothScroll';

/** React Router doesn't reset scroll position between route changes by default — without this,
 *  navigating from the bottom of one page lands you at the same scroll offset on the next.
 *  Goes through Lenis (when it's ready) so the reset respects the smooth-scroll instance's own
 *  internal position tracking instead of fighting it. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, lenis]);

  return null;
}
