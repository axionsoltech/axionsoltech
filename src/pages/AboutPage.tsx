import { motion } from 'framer-motion';
import { Gem, Eye, Rocket, Compass } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Process } from '../components/Process';
import { Stats } from '../components/Stats';
import { CTABand } from '../components/CTABand';
import { usePageTitle } from '../hooks/usePageTitle';

const VALUES = [
  {
    icon: Gem,
    title: 'Craftsmanship',
    description: 'We treat every codebase like we\'re the ones maintaining it in three years — because we might be.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'No black-box status updates. You see the same roadmap, backlog, and metrics we do.',
  },
  {
    icon: Rocket,
    title: 'Ownership',
    description: 'We think in outcomes, not tickets. If something looks wrong for the business, we say so.',
  },
  {
    icon: Compass,
    title: 'Long-term thinking',
    description: 'Fast is good. Fast-and-still-maintainable-in-a-year is the actual bar we hold ourselves to.',
  },
];

export default function AboutPage() {
  usePageTitle('About Us');

  return (
    <>
      <PageHero
        eyebrow="About Axion Sol Tech"
        title="Software built by people who ship, not just plan."
        description="We're a software engineering studio focused on one thing: turning ambitious product ideas into software that holds up in production."
      />

      <section className="relative py-20 sm:py-28 border-t border-border">
        <div className="w-[75%] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-soft mb-3">Why we exist</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight mb-6">
              Too many software projects die in translation between what a business needs and what actually gets built.
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Axion Sol Tech exists to close that gap. We pair senior engineering with product
              thinking, so the software we ship doesn't just match a spec — it solves the problem
              the spec was trying to describe. That means asking hard questions early, saying no
              to scope that doesn't serve the goal, and staying accountable for how the product
              performs after launch, not just at handover.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 border-t border-border">
        <div className="w-[75%] mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-soft mb-3">What we stand for</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight">
              Our values, in practice.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-glow rounded-2xl border border-border bg-surface p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <value.icon className="w-5 h-5 text-accent-soft" aria-hidden="true" />
                </div>
                <h3 className="font-display text-base font-semibold text-text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <Stats />
      <CTABand title="Want to work with us?" subtitle="We take on a limited number of engagements at a time, so we can stay hands-on with every one." />
    </>
  );
}
