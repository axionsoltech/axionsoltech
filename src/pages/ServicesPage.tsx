import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { ServicesGrid } from '../components/ServicesGrid';
import { CTABand } from '../components/CTABand';
import { SERVICES } from '../data/services';
import { usePageTitle } from '../hooks/usePageTitle';

export default function ServicesPage() {
  usePageTitle('Services');

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Full-stack engineering, on tap."
        description="From a single embedded specialist to a full delivery team — pick the shape of support that fits where you are."
      />

      <section className="relative pb-12 sm:pb-16">
        <div className="mx-auto w-[75%] px-4 sm:px-6">
          <div className="border-border-strong bg-surface/70 mb-10 rounded-[2rem] border p-6 backdrop-blur sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-accent-soft mb-3 text-xs font-medium tracking-[0.2em] uppercase">
                  What we offer
                </p>
                <h2 className="font-display text-text-primary text-2xl font-semibold tracking-tight sm:text-3xl">
                  Flexible support for every stage of delivery.
                </h2>
                <p className="text-text-secondary mt-3 text-base leading-relaxed">
                  Whether you need a product-minded engineer, a technical partner, or a full squad,
                  we shape the engagement around your goals, constraints, and timeline.
                </p>
              </div>

              <Link
                to="/contact"
                className="bg-accent btn-glow inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition-all"
              >
                Book a discovery call
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <ServicesGrid services={SERVICES} />
        </div>
      </section>

      <CTABand subtitle="Not sure which service fits your project? Tell us the problem, not the solution — we'll help figure out the rest." />
    </>
  );
}
