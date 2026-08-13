import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useDevice } from '../hooks/useDevice';

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Align on goals, constraints, and success metrics before a line of code is written.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Architecture and UX exploration, validated with clickable prototypes.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Iterative development in weekly sprints, shipped to staging continuously.',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Production rollout with monitoring, load testing, and a rollback plan.',
  },
  {
    number: '05',
    title: 'Support',
    description: 'Ongoing iteration, on-call support, and roadmap planning post-launch.',
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useDevice();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section
      id="process"
      className="bg-bg border-border/30 relative overflow-hidden border-t py-16 sm:py-32 md:py-48"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-10" />

      <div className="relative mx-auto w-full md:w-[80%] max-w-4xl px-4 sm:px-6">
        <div className="mb-20 text-center sm:mb-32">
          <p className="text-accent-soft mb-4 text-xs font-medium tracking-[0.2em] uppercase">
            How we work
          </p>
          <h2 className="font-display text-text-primary text-4xl font-bold tracking-tighter uppercase sm:text-5xl lg:text-6xl">
            A process built <br className="hidden sm:block" /> for momentum.
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* Vertical Line */}
          <div className="bg-border absolute top-0 bottom-0 left-[23px] w-[2px] sm:left-1/2 sm:-translate-x-1/2" />

          {/* Animated Line */}
          {!reducedMotion && (
            <motion.div
              className="bg-accent absolute top-0 bottom-0 left-[23px] w-[2px] origin-top sm:left-1/2 sm:-translate-x-1/2"
              style={{ scaleY: scrollYProgress }}
            />
          )}

          <div className="relative z-10 flex flex-col gap-12 sm:gap-24">
            {STEPS.map((step, i) => {
              // Calculate activation threshold based on index
              const threshold = i / (STEPS.length - 1);

              // We'll consider a step "active" when scrollYProgress passes its threshold (with a small offset)
              const isActive = useTransform(
                scrollYProgress,
                (v) => v >= Math.max(0, threshold - 0.1)
              );

              return (
                <div
                  key={step.number}
                  className={`flex items-start gap-8 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Left (or Right) Content */}
                  <div
                    className={`hidden flex-1 sm:block ${i % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'} pt-2`}
                  >
                    <motion.div
                      style={
                        !reducedMotion
                          ? { opacity: useTransform(isActive, (active) => (active ? 1 : 0.3)) }
                          : { opacity: 1 }
                      }
                      className="transition-opacity duration-500"
                    >
                      <h3 className="font-display text-text-primary mb-3 text-2xl font-semibold sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary ml-auto max-w-sm leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Node */}
                  <div className="relative flex shrink-0 items-center justify-center">
                    <div className="border-border bg-bg relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2">
                      <motion.div
                        style={
                          !reducedMotion
                            ? { scale: useTransform(isActive, (active) => (active ? 1 : 0)) }
                            : { scale: 1 }
                        }
                        className="bg-accent/20 absolute inset-0 rounded-full transition-transform duration-500"
                      />
                      <motion.span
                        style={
                          !reducedMotion
                            ? {
                                color: useTransform(isActive, (active) =>
                                  active ? 'var(--color-accent-soft)' : 'var(--color-text-muted)'
                                ),
                              }
                            : {}
                        }
                        className="relative z-20 font-mono text-sm font-bold transition-colors duration-500"
                      >
                        {step.number}
                      </motion.span>
                    </div>
                  </div>

                  {/* Mobile Content / Right Side Text */}
                  <div className={`flex-1 pt-2 sm:hidden ${i % 2 !== 0 && 'sm:block sm:pr-16'}`}>
                    <motion.div
                      style={
                        !reducedMotion
                          ? { opacity: useTransform(isActive, (active) => (active ? 1 : 0.3)) }
                          : { opacity: 1 }
                      }
                      className="transition-opacity duration-500"
                    >
                      <h3 className="font-display text-text-primary mb-3 text-2xl font-semibold sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary max-w-sm leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty space for desktop alternate layout */}
                  {i % 2 === 0 && <div className="hidden flex-1 sm:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
