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
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={sectionRef} className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <motion.div
        style={{ y: orbY }}
        className="glow-orb w-[420px] h-[420px] -top-32 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="relative w-[80%] mx-auto px-4 sm:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase tracking-[0.2em] text-accent-soft mb-4"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 text-text-secondary max-w-xl mx-auto"
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
