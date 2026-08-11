import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useDevice } from '../hooks/useDevice';

export function CustomCursor() {
  const { isTouch, reducedMotion } = useDevice();
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 28, stiffness: 380, mass: 0.4 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 380, mass: 0.4 });

  useEffect(() => {
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      if (magneticTarget && !reducedMotion) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Pull cursor 15% toward the center of the element
        targetX = e.clientX + (centerX - e.clientX) * 0.15;
        targetY = e.clientY + (centerY - e.clientY) * 0.15;
      }

      cursorX.set(targetX);
      cursorY.set(targetY);
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for magnetic
      const magneticEl = target.closest('[data-magnetic="true"]') as HTMLElement;
      if (magneticEl) {
        setMagneticTarget(magneticEl);
      } else {
        setMagneticTarget(null);
      }

      // Check for data-cursor text
      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor'));
        setIsHovering(true);
        return;
      }

      // Default link/button hover
      if (target.closest('a, button, [role="button"]')) {
        setCursorText(null);
        setIsHovering(true);
        return;
      }

      setCursorText(null);
      setIsHovering(false);
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [isTouch, reducedMotion, magneticTarget, cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center overflow-hidden mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      initial={false}
      animate={{
        width: cursorText ? 80 : isHovering ? 44 : 18,
        height: cursorText ? 80 : isHovering ? 44 : 18,
        opacity: isVisible ? 1 : 0,
        backgroundColor: cursorText ? 'rgba(255, 255, 255, 1)' : 'transparent',
        border: cursorText ? '0px solid transparent' : '1px solid rgba(255,255,255,1)',
        borderRadius: '9999px',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <AnimatePresence>
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="font-display text-center text-[10px] font-bold tracking-widest text-black"
            style={{ mixBlendMode: 'normal' }}
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
