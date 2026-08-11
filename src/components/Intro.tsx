import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Annotation } from './Annotation';
import { useDevice } from '../hooks/useDevice';

export function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion, isTouch } = useDevice();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'end 20%'],
  });

  // Opacity cascade
  const o1 = useTransform(scrollYProgress, [0, 0.3], [0.15, 1]);
  const o2 = useTransform(scrollYProgress, [0.1, 0.4], [0.15, 1]);
  const o3 = useTransform(scrollYProgress, [0.2, 0.5], [0.15, 1]);
  const o4 = useTransform(scrollYProgress, [0.3, 0.6], [0.15, 1]);

  // Kinetic Parallax (Horizontal opposing motion)
  const x1 = useTransform(scrollYProgress, [0, 1], ['-10%', '5%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['10%', '-5%']);
  const x3 = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const x4 = useTransform(scrollYProgress, [0, 1], ['10%', '-5%']);

  return (
    <section
      ref={containerRef}
      className="bg-bg border-border relative z-30 overflow-hidden border-b py-24 sm:py-32 lg:py-48"
    >
      {/* Background ambient glow */}
      <div className="bg-accent/5 pointer-events-none absolute top-1/2 left-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto w-[80%] max-w-7xl px-4 sm:px-6">
        <div className="font-display flex flex-col flex-wrap gap-8 text-4xl leading-[0.9] font-bold tracking-tighter uppercase sm:gap-10 sm:text-5xl sm:whitespace-nowrap md:text-6xl lg:gap-12 lg:text-[5.5rem] xl:text-[6.5rem]">
          {/* Line 1: WE TURN + Server Image */}
          <motion.div
            style={{ opacity: o1, x: reducedMotion || isTouch ? 0 : x1 }}
            className="flex items-center justify-start gap-4 sm:gap-8"
          >
            <span className="text-white">We turn</span>
            <div className="group relative hidden h-12 w-24 shrink-0 overflow-hidden rounded-[2rem] border border-white/20 shadow-lg sm:block sm:h-16 sm:w-32 md:h-20 md:w-48 lg:h-28 lg:w-64">
              <div className="bg-accent/10 absolute inset-0 z-10 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
                loading="lazy"
                decoding="async"
                className="h-full w-full scale-105 object-cover grayscale filter transition-all duration-700 group-hover:scale-100 group-hover:grayscale-0"
                alt="Servers"
              />
            </div>
          </motion.div>

          {/* Line 2: COMPLEX (Red Pill) + TECHNOLOGY */}
          <motion.div
            style={{ opacity: o2, x: reducedMotion || isTouch ? 0 : x2 }}
            className="flex items-center justify-end gap-4 sm:gap-8"
          >
            <div className="group relative mt-4 flex items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 px-6 py-3 shadow-[0_0_30px_rgba(239,68,68,0.15)] backdrop-blur-sm sm:px-12 sm:py-6">
              {/* Technical tag - floating outside without opaque background */}
              <div className="absolute -top-6 left-8 flex items-center gap-2 sm:-top-8 sm:left-12">
                <div className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                <span className="font-mono text-[10px] tracking-widest text-red-500 lowercase sm:text-xs">
                  state: entangled
                </span>
              </div>
              {/* Override leading-[0.9] to leading-none to prevent squished borders */}
              <span className="pt-2 leading-none text-red-500 transition-colors group-hover:text-red-400">
                COMPLEX
              </span>
            </div>
            <span className="to-text-secondary mt-4 bg-gradient-to-r from-white via-white bg-clip-text text-transparent">
              TECHNOLOGY
            </span>
          </motion.div>

          {/* Line 3: INTO + SIMPLE (Blue Pill) */}
          <motion.div
            style={{ opacity: o3, x: reducedMotion || isTouch ? 0 : x3 }}
            className="flex items-center justify-start gap-4 sm:gap-8"
          >
            <span className="text-text-secondary/50 font-medium">INTO</span>
            <div className="group border-accent/50 bg-accent/10 relative mt-4 flex items-center justify-center rounded-full border px-6 py-3 shadow-[0_0_40px_rgba(var(--accent),0.2)] backdrop-blur-sm sm:px-12 sm:py-6">
              {/* Technical tag - floating outside */}
              <div className="absolute -top-6 right-8 flex items-center gap-2 sm:-top-8 sm:right-12">
                <div className="bg-accent h-2 w-2 rounded-full shadow-[0_0_10px_rgba(var(--accent),0.8)]" />
                <span className="text-accent font-mono text-[10px] tracking-widest lowercase sm:text-xs">
                  sys.resolve()
                </span>
              </div>
              {/* Override leading-[0.9] to leading-none to prevent squished borders */}
              <span className="text-accent pt-2 leading-none transition-colors group-hover:text-white">
                SIMPLE
              </span>
            </div>
          </motion.div>

          {/* Line 4: DIGITAL PRODUCTS */}
          <motion.div
            style={{ opacity: o4, x: reducedMotion || isTouch ? 0 : x4 }}
            className="flex items-center justify-end gap-4 text-white sm:gap-8"
          >
            <div className="border-accent/40 group relative hidden h-12 w-24 shrink-0 overflow-hidden rounded-[2rem] border shadow-[0_0_30px_rgba(var(--accent),0.2)] sm:block sm:h-16 sm:w-32 md:h-20 md:w-48 lg:h-28 lg:w-64">
              <div className="bg-accent/20 absolute inset-0 z-20 flex items-center justify-center backdrop-blur-md transition-colors duration-500 group-hover:bg-transparent">
                <span className="text-accent font-mono text-xs font-semibold tracking-widest opacity-100 transition-opacity group-hover:opacity-0 sm:text-sm">
                  BUILDING...
                </span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                loading="lazy"
                decoding="async"
                className="h-full w-full scale-105 object-cover brightness-90 filter transition-all duration-700 group-hover:scale-100 group-hover:brightness-110"
                alt="Digital Dashboard"
              />
            </div>
            <span>DIGITAL PRODUCTS.</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
