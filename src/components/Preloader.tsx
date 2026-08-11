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
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="bg-bg fixed inset-0 z-[200] flex flex-col justify-between p-8 sm:p-12"
        >
          {/* Subtle grid background */}
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

          {/* Top Line */}
          <div className="text-text-secondary relative z-10 flex w-full items-center justify-between font-mono text-xs tracking-widest">
            <span>AXION SOL TECH</span>
            <span>SYSTEM_INIT</span>
          </div>

          {/* Center Logo */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
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
          <div className="relative z-10 w-full">
            <div className="mb-4 flex items-end justify-between">
              <span className="text-text-secondary font-display text-sm tracking-widest uppercase">
                Loading Experience
              </span>
              <span className="font-display text-text-primary text-5xl font-medium sm:text-6xl">
                {progress}%
              </span>
            </div>
            {/* Progress Bar */}
            <div className="bg-border relative h-[1px] w-full overflow-hidden">
              <motion.div
                className="bg-accent absolute top-0 bottom-0 left-0"
                initial={{ width: '0%' }}
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
