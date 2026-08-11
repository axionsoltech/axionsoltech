import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} — Axion Sol Tech` : 'Axion Sol Tech';
    return () => {
      document.title = previous;
    };
  }, [title]);
}
