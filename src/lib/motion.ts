// Centralized motion system to ensure consistency across the application
export const TRANSITIONS = {
  // The primary easing curve for cinematic movement
  ease: [0.16, 1, 0.3, 1] as const,
  // Bouncier ease for micro-interactions
  spring: { type: 'spring', stiffness: 400, damping: 30 },

  duration: {
    fast: 0.4,
    base: 0.8,
    slow: 1.2,
  },

  stagger: {
    fast: 0.05,
    base: 0.1,
    slow: 0.2,
  },
};

export const VARIANTS = {
  reveal: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: TRANSITIONS.duration.base, ease: TRANSITIONS.ease },
    },
  },
  revealSlow: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: TRANSITIONS.duration.slow, ease: TRANSITIONS.ease },
    },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: TRANSITIONS.duration.base, ease: TRANSITIONS.ease },
    },
  },
};
