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
    description:
      "We treat every codebase like we're the ones maintaining it in three years — because we might be.",
  },
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'No black-box status updates. You see the same roadmap, backlog, and metrics we do.',
  },
  {
    icon: Rocket,
    title: 'Ownership',
    description:
      'We think in outcomes, not tickets. If something looks wrong for the business, we say so.',
  },
  {
    icon: Compass,
    title: 'Long-term thinking',
    description:
      'Fast is good. Fast-and-still-maintainable-in-a-year is the actual bar we hold ourselves to.',
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

      <section className="border-border relative border-t py-20 sm:py-28">
        <div className="mx-auto w-[75%] px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent-soft mb-3 text-xs font-medium tracking-[0.2em] uppercase">
              Why we exist
            </p>
            <h2 className="font-display text-text-primary mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
              Too many software projects die in translation between what a business needs and what
              actually gets built.
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Axion Sol Tech exists to close that gap. We pair senior engineering with product
              thinking, so the software we ship doesn't just match a spec — it solves the problem
              the spec was trying to describe. That means asking hard questions early, saying no to
              scope that doesn't serve the goal, and staying accountable for how the product
              performs after launch, not just at handover.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-border relative border-t py-20 sm:py-28">
        <div className="mx-auto w-[75%] px-4 sm:px-6">
          <div className="mb-14 max-w-xl">
            <p className="text-accent-soft mb-3 text-xs font-medium tracking-[0.2em] uppercase">
              What we stand for
            </p>
            <h2 className="font-display text-text-primary text-3xl font-semibold tracking-tight sm:text-4xl">
              Our values, in practice.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-glow border-border bg-surface rounded-2xl border p-6"
              >
                <div className="bg-accent/10 mb-5 flex h-11 w-11 items-center justify-center rounded-xl">
                  <value.icon className="text-accent-soft h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-text-primary mb-2 text-base font-semibold">
                  {value.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <Stats />
      <CTABand
        title="Want to work with us?"
        subtitle="We take on a limited number of engagements at a time, so we can stay hands-on with every one."
      />
    </>
  );
}
