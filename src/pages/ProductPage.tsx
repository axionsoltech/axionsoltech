import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { CTABand } from '../components/CTABand';
import { INSURADESK_FEATURES } from '../data/product';
import { INSURADESK_URL } from '../lib/config';
import { usePageTitle } from '../hooks/usePageTitle';

export default function ProductPage() {
  usePageTitle('Our Product — InsuraDesk');

  return (
    <>
      <PageHero
        eyebrow="Our product"
        title="InsuraDesk"
        description="A white-label SaaS platform for insurance brokers — built and operated end to end by our own team."
      >
        <a
          href={INSURADESK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white btn-glow transition-all"
        >
          Visit InsuraDesk
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </PageHero>

      <section className="relative pb-24 border-t border-border pt-16">
        <div className="w-[75%] mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-text-secondary leading-relaxed text-base sm:text-lg"
          >
            Most engineering studios only show you client work under NDA. InsuraDesk is
            different — it's our own product, running in production, that we can point to
            directly. It's a multi-tenant platform that lets insurance brokers launch their own
            branded storefront, compare and issue policies across integrated insurers, and run
            their entire operation — agents, customers, claims, and commissions — from one
            system.
          </motion.p>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <div className="w-[75%] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INSURADESK_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-glow rounded-2xl border border-border bg-surface p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <feature.icon className="w-5 h-5 text-accent-soft" aria-hidden="true" />
                </div>
                <h3 className="font-display text-base font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Want something like this built for your industry?"
        subtitle="InsuraDesk shows how we approach a real product, end to end. Tell us what you're building."
      />
    </>
  );
}
