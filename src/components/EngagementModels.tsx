import { motion } from 'framer-motion';
import { Target, Users, UserPlus, CheckCircle2 } from 'lucide-react';

const MODELS = [
  {
    icon: Target,
    title: 'Fixed Scope',
    description: 'A clearly defined project with a set scope, timeline, and price. Best when requirements are well understood upfront.',
    points: ['Detailed proposal before kickoff', 'Fixed price, fixed timeline', 'Best for MVPs & defined projects'],
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description: 'A team assembled around your product, working exclusively with you for as long as you need them.',
    points: ['Monthly retainer, scale up or down', 'Direct access to your engineers', 'Best for ongoing product work'],
    highlighted: true,
  },
  {
    icon: UserPlus,
    title: 'Staff Augmentation',
    description: 'One or more senior engineers embedded directly into your existing team and workflow.',
    points: ['Fills a specific skill gap', 'Works inside your own process', 'Best for scaling an in-house team'],
  },
];

export function EngagementModels() {
  return (
    <section className="relative py-16 sm:py-24 lg:pt-32 lg:pb-16 border-t border-border overflow-hidden bg-bg">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-[80%] max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <div className="max-w-2xl mb-16 text-center mx-auto">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-soft mb-6">How we engage</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-text-primary tracking-tight leading-[1.1]">
            Pick the model that fits <br className="hidden sm:block"/> <span className="text-text-secondary">how you work.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {MODELS.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`relative rounded-[2rem] p-8 sm:p-10 flex flex-col group transition-all duration-500 hover:-translate-y-2 ${
                model.highlighted 
                  ? 'border-2 border-accent/40 bg-accent/5 backdrop-blur-md shadow-[0_0_40px_rgba(var(--accent),0.15)]' 
                  : 'border border-border bg-surface/50 hover:bg-surface hover:border-white/10 shadow-lg'
              }`}
            >
              {model.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bg px-4 py-1 rounded-full border border-accent/40 shadow-[0_0_20px_rgba(var(--accent),0.3)]">
                  <span className="text-[10px] sm:text-xs text-accent tracking-[0.1em] uppercase font-semibold">Recommended</span>
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-500 ${
                model.highlighted ? 'bg-accent/20 text-accent shadow-[0_0_15px_rgba(var(--accent),0.2)]' : 'bg-white/5 text-text-secondary group-hover:bg-white/10 group-hover:text-white'
              }`}>
                <model.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              
              <h3 className={`font-medium text-xl mb-3 ${model.highlighted ? 'text-white' : 'text-text-primary group-hover:text-white transition-colors'}`}>{model.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-8 min-h-[60px]">{model.description}</p>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />
              
              <ul className="space-y-4 mt-auto">
                {model.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${model.highlighted ? 'text-accent' : 'text-text-muted group-hover:text-accent-soft transition-colors'}`} aria-hidden="true" />
                    <span className="text-sm text-text-secondary">{point}</span>
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
