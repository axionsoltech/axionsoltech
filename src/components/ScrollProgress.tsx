import { motion, useScroll, useSpring } from 'framer-motion';
import { useDevice } from '../hooks/useDevice';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { reducedMotion } = useDevice();
  
  // Spring the progress for a smoother fill
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[9999] pointer-events-none"
      style={{ scaleX }}
    />
  );
}
