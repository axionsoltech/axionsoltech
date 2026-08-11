import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFoundPage() {
  usePageTitle('Page not found');

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-20">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="glow-orb top-1/2 left-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative px-5 text-center">
        <p className="font-display text-gradient mb-4 text-7xl font-semibold">404</p>
        <h1 className="font-display text-text-primary mb-3 text-2xl font-semibold">
          Page not found
        </h1>
        <p className="text-text-secondary mb-8">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="bg-accent btn-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </section>
  );
}
