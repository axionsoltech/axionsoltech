import { motion, useScroll, useSpring } from 'framer-motion';
import { useDevice } from '../hooks/useDevice';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { reducedMotion } = useDevice();

  // Spring the progress for a smoother fill
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reducedMotion) return null;

  return (
    <motion.div
      className="bg-accent pointer-events-none fixed top-0 right-0 left-0 z-[9999] h-[2px] origin-left"
      style={{ scaleX }}
    />
  );
}
