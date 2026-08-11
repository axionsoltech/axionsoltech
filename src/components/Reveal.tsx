import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { TRANSITIONS } from '../lib/motion';
import { useDevice } from '../hooks/useDevice';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = TRANSITIONS.duration.base,
  yOffset = 30,
  once = true,
  className = '',
}: RevealProps) {
  const { reducedMotion } = useDevice();

  if (reducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, margin: '-10%' }}
        transition={{ duration, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10%' }}
      transition={{ duration, delay, ease: TRANSITIONS.ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export function MaskedReveal({ children, delay = 0, duration = 1.2, className = '' }: RevealProps) {
  const { reducedMotion } = useDevice();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        className="-mt-2 -mb-2 pt-2 pb-2"
      >
        {children}
      </motion.div>
    </div>
  );
}
