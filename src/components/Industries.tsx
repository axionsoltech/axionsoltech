import { useState } from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES } from '../data/industries';
import { useDevice } from '../hooks/useDevice';
import { ArrowUpRight } from 'lucide-react';

export function Industries() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { isTouch } = useDevice();

  return (
    <section className="relative py-16 md:py-32 bg-bg border-y border-border">
      <div className="absolute inset-0 bg-surface/30 pointer-events-none" />

      <div className="w-[80%] max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-soft mb-4">Where we work</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-text-primary tracking-tight">
              Industries we build for.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 group cursor-pointer h-72 flex flex-col justify-end"
              >
                {/* Background Interactive Visual */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <industry.icon className="absolute -top-10 -right-10 w-64 h-64 text-accent/5" strokeWidth={1} />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-border flex items-center justify-center mb-auto transition-colors duration-500 group-hover:bg-accent/20 group-hover:text-accent-soft">
                    <industry.icon className="w-6 h-6" />
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between items-end mb-3">
                      <h3 className="font-display text-2xl font-semibold text-text-primary">
                        {industry.name}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-text-muted transition-all duration-300 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent" />
                    </div>

                    <div className="overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{
                          height: isHovered || isTouch ? 'auto' : 0,
                          opacity: isHovered || isTouch ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm text-text-secondary leading-relaxed pt-2">
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
