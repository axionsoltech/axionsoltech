import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useDevice } from '../hooks/useDevice';

import { INDUSTRIES } from '../data/industries';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';

import { animate, useMotionValue } from 'framer-motion';

function CountUp({
  target,
  suffix,
  prefix = '',
}: {
  target: number;
  suffix: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const count = useMotionValue(0);
  const { reducedMotion } = useDevice();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      count.set(target);
      setDisplayValue(target);
      return;
    }

    const controls = animate(count, target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, target, reducedMotion, count]);

  return (
    <span ref={ref}>
      <span className="text-accent">{prefix}</span>
      {displayValue}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export function Stats() {
  // Dynamically calculate real stats from the project data
  const stats = useMemo(() => {
    const allTech = new Set([
      ...SERVICES.flatMap((s) => s.stack),
      ...PROJECTS.flatMap((p) => p.stack),
    ]);

    // Round down to nearest 10 for a cleaner "+"" number
    const techCount = Math.floor(allTech.size / 10) * 10;

    return [
      { target: SERVICES.length, suffix: '', label: 'Engineering Disciplines' },
      { target: techCount, suffix: '+', label: 'Core Technologies' },
      { target: INDUSTRIES.length, suffix: '', label: 'Industries Served' },
      { target: PROJECTS.length, suffix: '', label: 'Enterprise Case Studies' },
    ];
  }, []);

  return (
    <section className="bg-bg border-border-strong/50 relative border-y py-16 md:py-24">
      <div className="bg-surface/10 pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-[80%] max-w-7xl px-4 sm:px-6">
        <div className="divide-border/0 lg:divide-border/50 grid grid-cols-2 gap-8 divide-x lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center first:pl-0 lg:items-start lg:px-8 lg:text-left"
            >
              <div className="font-display text-text-primary mb-4 flex items-baseline text-5xl font-semibold tracking-tighter sm:text-6xl lg:text-[5rem]">
                <CountUp target={stat.target} suffix={stat.suffix} />
              </div>
              <p className="text-text-secondary text-sm leading-relaxed font-medium tracking-widest uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
