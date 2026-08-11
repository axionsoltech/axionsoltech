import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFoundPage() {
  usePageTitle('Page not found');

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="glow-orb w-[380px] h-[380px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />

      <div className="relative text-center px-5">
        <p className="font-display text-7xl font-semibold text-gradient mb-4">404</p>
        <h1 className="font-display text-2xl font-semibold text-text-primary mb-3">Page not found</h1>
        <p className="text-text-secondary mb-8">The page you're looking for doesn't exist or has moved.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white btn-glow transition-all"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </section>
  );
}
