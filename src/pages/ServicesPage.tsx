import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { ServicesGrid } from "../components/ServicesGrid";
import { CTABand } from "../components/CTABand";
import { SERVICES } from "../data/services";
import { usePageTitle } from "../hooks/usePageTitle";

export default function ServicesPage() {
  usePageTitle("Services");

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Full-stack engineering, on tap."
        description="From a single embedded specialist to a full delivery team — pick the shape of support that fits where you are."
      />

      <section className="relative pb-12 sm:pb-16">
        <div className="w-[75%] mx-auto px-4 sm:px-6">
          <div className="mb-10 rounded-[2rem] border border-border-strong bg-surface/70 p-6 sm:p-8 backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-soft mb-3">
                  What we offer
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                  Flexible support for every stage of delivery.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  Whether you need a product-minded engineer, a technical
                  partner, or a full squad, we shape the engagement around your
                  goals, constraints, and timeline.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white btn-glow transition-all"
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
