import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/** Compact hero banner for every page except Home — clears the fixed Navbar and keeps the same
 *  glow/grid/parallax visual language as the homepage hero, just shorter. */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <motion.div
        style={{ y: orbY }}
        className="glow-orb -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-[80%] px-4 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-accent-soft mb-4 text-xs font-medium tracking-[0.2em] uppercase"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-text-primary text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="text-text-secondary mx-auto mt-5 max-w-xl"
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
