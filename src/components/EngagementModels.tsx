import { motion } from 'framer-motion';
import { Target, Users, UserPlus, CheckCircle2 } from 'lucide-react';

const MODELS = [
  {
    icon: Target,
    title: 'Fixed Scope',
    description:
      'A clearly defined project with a set scope, timeline, and price. Best when requirements are well understood upfront.',
    points: [
      'Detailed proposal before kickoff',
      'Fixed price, fixed timeline',
      'Best for MVPs & defined projects',
    ],
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description:
      'A team assembled around your product, working exclusively with you for as long as you need them.',
    points: [
      'Monthly retainer, scale up or down',
      'Direct access to your engineers',
      'Best for ongoing product work',
    ],
    highlighted: true,
  },
  {
    icon: UserPlus,
    title: 'Staff Augmentation',
    description:
      'One or more senior engineers embedded directly into your existing team and workflow.',
    points: [
      'Fills a specific skill gap',
      'Works inside your own process',
      'Best for scaling an in-house team',
    ],
  },
];

export function EngagementModels() {
  return (
    <section className="border-border bg-bg relative overflow-hidden border-t py-16 sm:py-24 lg:pt-32 lg:pb-16">
      {/* Ambient background glow */}
      <div className="bg-accent/5 pointer-events-none absolute top-1/2 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-accent-soft mb-6 text-xs font-medium tracking-[0.2em] uppercase">
            How we engage
          </p>
          <h2 className="font-display text-text-primary text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
            Pick the model that fits <br className="hidden sm:block" />{' '}
            <span className="text-text-secondary">how you work.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {MODELS.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`group relative flex flex-col rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 sm:p-10 ${model.highlighted
                  ? 'border-accent/40 bg-accent/5 border-2 shadow-[0_0_40px_rgba(var(--accent),0.15)] backdrop-blur-md'
                  : 'border-border bg-surface/50 hover:bg-surface border shadow-lg hover:border-white/10'
                }`}
            >
              {model.highlighted && (
                <div className="bg-bg border-accent/40 absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border px-4 py-1 shadow-[0_0_20px_rgba(var(--accent),0.3)]">
                  <span className="text-accent text-[10px] font-semibold tracking-[0.1em] uppercase sm:text-xs">
                    Recommended
                  </span>
                </div>
              )}

              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-500 ${model.highlighted
                    ? 'bg-accent/20 text-accent shadow-[0_0_15px_rgba(var(--accent),0.2)]'
                    : 'text-text-secondary bg-white/5 group-hover:bg-white/10 group-hover:text-white'
                  }`}
              >
                <model.icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3
                className={`mb-3 text-xl font-medium ${model.highlighted ? 'text-white' : 'text-text-primary transition-colors group-hover:text-white'}`}
              >
                {model.title}
              </h3>
              <p className="text-text-secondary mb-8 min-h-[60px] text-sm leading-relaxed">
                {model.description}
              </p>

              <div className="via-border mb-6 h-px w-full bg-gradient-to-r from-transparent to-transparent" />

              <ul className="mt-auto space-y-4">
                {model.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      className={`mt-0.5 h-4 w-4 shrink-0 ${model.highlighted ? 'text-accent' : 'text-text-muted group-hover:text-accent-soft transition-colors'}`}
                      aria-hidden="true"
                    />
                    <span className="text-text-secondary text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
