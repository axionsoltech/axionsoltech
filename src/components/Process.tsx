import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useDevice } from '../hooks/useDevice';

const STEPS = [
  { number: '01', title: 'Discover', description: 'Align on goals, constraints, and success metrics before a line of code is written.' },
  { number: '02', title: 'Design', description: 'Architecture and UX exploration, validated with clickable prototypes.' },
  { number: '03', title: 'Build', description: 'Iterative development in weekly sprints, shipped to staging continuously.' },
  { number: '04', title: 'Launch', description: 'Production rollout with monitoring, load testing, and a rollback plan.' },
  { number: '05', title: 'Support', description: 'Ongoing iteration, on-call support, and roadmap planning post-launch.' },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useDevice();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="process" className="relative py-16 sm:py-32 md:py-48 bg-bg border-t border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="w-[80%] max-w-4xl mx-auto px-4 sm:px-6 relative">
        <div className="mb-20 sm:mb-32 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-soft mb-4">How we work</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tighter uppercase">
            A process built <br className="hidden sm:block" /> for momentum.
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[23px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-border sm:-translate-x-1/2" />

          {/* Animated Line */}
          {!reducedMotion && (
            <motion.div
              className="absolute left-[23px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-accent sm:-translate-x-1/2 origin-top"
              style={{ scaleY: scrollYProgress }}
            />
          )}

          <div className="flex flex-col gap-12 sm:gap-24 relative z-10">
            {STEPS.map((step, i) => {
              // Calculate activation threshold based on index
              const threshold = i / (STEPS.length - 1);

              // We'll consider a step "active" when scrollYProgress passes its threshold (with a small offset)
              const isActive = useTransform(scrollYProgress, (v) => v >= Math.max(0, threshold - 0.1));

              return (
                <div key={step.number} className={`flex items-start gap-8 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>

                  {/* Left (or Right) Content */}
                  <div className={`hidden sm:block flex-1 ${i % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'} pt-2`}>
                    <motion.div
                      style={!reducedMotion ? { opacity: useTransform(isActive, (active) => active ? 1 : 0.3) } : { opacity: 1 }}
                      className="transition-opacity duration-500"
                    >
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary mb-3">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed max-w-sm ml-auto">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Node */}
                  <div className="shrink-0 relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-border bg-bg flex items-center justify-center relative z-10">
                      <motion.div
                        style={!reducedMotion ? { scale: useTransform(isActive, (active) => active ? 1 : 0) } : { scale: 1 }}
                        className="absolute inset-0 bg-accent/20 rounded-full transition-transform duration-500"
                      />
                      <motion.span
                        style={!reducedMotion ? { color: useTransform(isActive, (active) => active ? "var(--color-accent-soft)" : "var(--color-text-muted)") } : {}}
                        className="font-mono text-sm font-bold transition-colors duration-500 relative z-20"
                      >
                        {step.number}
                      </motion.span>
                    </div>
                  </div>

                  {/* Mobile Content / Right Side Text */}
                  <div className={`flex-1 pt-2 sm:hidden ${i % 2 !== 0 && 'sm:block sm:pr-16'}`}>
                    <motion.div
                      style={!reducedMotion ? { opacity: useTransform(isActive, (active) => active ? 1 : 0.3) } : { opacity: 1 }}
                      className="transition-opacity duration-500"
                    >
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary mb-3">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed max-w-sm">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty space for desktop alternate layout */}
                  {i % 2 === 0 && <div className="hidden sm:block flex-1" />}

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
