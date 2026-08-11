import { useState } from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES } from '../data/industries';
import { useDevice } from '../hooks/useDevice';
import { ArrowUpRight } from 'lucide-react';

export function Industries() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { isTouch } = useDevice();

  return (
    <section className="bg-bg border-border relative border-y py-16 md:py-32">
      <div className="bg-surface/30 pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-[80%] max-w-7xl px-4 sm:px-6">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-2xl">
            <p className="text-accent-soft mb-4 text-xs font-medium tracking-[0.2em] uppercase">
              Where we work
            </p>
            <h2 className="font-display text-text-primary text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Industries we build for.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

            return (
              <motion.div
                key={industry.name}
                onHoverStart={() => !isTouch && setHoveredIndex(i)}
                onHoverEnd={() => !isTouch && setHoveredIndex(null)}
                animate={{
                  scale: isHovered ? 1.02 : isDimmed ? 0.98 : 1,
                  opacity: isDimmed ? 0.4 : 1,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="border-border bg-surface group relative flex h-72 cursor-pointer flex-col justify-end overflow-hidden rounded-[2rem] border p-8"
              >
                {/* Background Interactive Visual */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="from-accent/5 absolute inset-0 bg-gradient-to-br to-transparent" />
                  <div className="bg-grid absolute inset-0 opacity-30" />
                  <industry.icon
                    className="text-accent/5 absolute -top-10 -right-10 h-64 w-64"
                    strokeWidth={1}
                  />
                </div>

                <div className="relative z-10 flex h-full flex-col">
                  <div className="bg-border group-hover:bg-accent/20 group-hover:text-accent-soft mb-auto flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-500">
                    <industry.icon className="h-6 w-6" />
                  </div>

                  <div className="mt-8">
                    <div className="mb-3 flex items-end justify-between">
                      <h3 className="font-display text-text-primary text-2xl font-semibold">
                        {industry.name}
                      </h3>
                      <ArrowUpRight className="text-text-muted group-hover:text-accent h-5 w-5 -translate-x-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    </div>

                    <div className="overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{
                          height: isHovered || isTouch ? 'auto' : 0,
                          opacity: isHovered || isTouch ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-text-secondary pt-2 text-sm leading-relaxed">
                          {industry.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
