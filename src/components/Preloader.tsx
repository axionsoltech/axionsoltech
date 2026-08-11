import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let start = performance.now();
    const DURATION = 1200; // 1.2s total

    const animate = (time: number) => {
      const elapsed = time - start;
      const progressValue = Math.min(Math.floor((elapsed / DURATION) * 100), 100);
      setProgress(progressValue);

      if (progressValue < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setLoading(false), 200); // Small pause at 100% before exit
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-bg flex flex-col justify-between p-8 sm:p-12"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          {/* Top Line */}
          <div className="w-full flex justify-between items-center text-xs font-mono text-text-secondary tracking-widest relative z-10">
            <span>AXION SOL TECH</span>
            <span>SYSTEM_INIT</span>
          </div>

          {/* Center Logo */}
          <div className="flex flex-col items-center justify-center flex-1 relative z-10">
            <motion.svg
              width="80"
              height="80"
              viewBox="0 0 48 48"
              fill="none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-8"
            >
              <motion.path
                d="M24 8 L40 40 L30 40 L24 27 L18 40 L8 40 Z"
                stroke="#3B82F6"
                strokeWidth={1.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
              <motion.path
                d="M24 8 L40 40 L30 40 L24 27 Z"
                fill="#60A5FA"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              />
            </motion.svg>
          </div>

          {/* Bottom Progress */}
          <div className="w-full relative z-10">
            <div className="flex justify-between items-end mb-4">
              <span className="text-sm text-text-secondary font-display uppercase tracking-widest">Loading Experience</span>
              <span className="text-5xl sm:text-6xl font-display font-medium text-text-primary">
                {progress}%
              </span>
            </div>
            {/* Progress Bar */}
            <div className="h-[1px] w-full bg-border relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
