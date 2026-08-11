import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Annotation } from './Annotation';
import { useDevice } from '../hooks/useDevice';

export function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion, isTouch } = useDevice();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'end 20%']
  });

  // Opacity cascade
  const o1 = useTransform(scrollYProgress, [0, 0.3], [0.15, 1]);
  const o2 = useTransform(scrollYProgress, [0.1, 0.4], [0.15, 1]);
  const o3 = useTransform(scrollYProgress, [0.2, 0.5], [0.15, 1]);
  const o4 = useTransform(scrollYProgress, [0.3, 0.6], [0.15, 1]);
  
  // Kinetic Parallax (Horizontal opposing motion)
  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "5%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-5%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const x4 = useTransform(scrollYProgress, [0, 1], ["10%", "-5%"]);

  return (
    <section ref={containerRef} className="relative z-30 bg-bg py-24 sm:py-32 lg:py-48 overflow-hidden border-b border-border">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-[80%] max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-tighter leading-[0.9] uppercase sm:whitespace-nowrap flex-wrap">
          
          {/* Line 1: WE TURN + Server Image */}
          <motion.div style={{ opacity: o1, x: reducedMotion || isTouch ? 0 : x1 }} className="flex items-center gap-4 sm:gap-8 justify-start">
            <span className="text-white">We turn</span>
            <div className="w-24 sm:w-32 md:w-48 lg:w-64 h-12 sm:h-16 md:h-20 lg:h-28 rounded-[2rem] overflow-hidden shrink-0 hidden sm:block relative border border-white/20 group shadow-lg">
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" alt="Servers" />
            </div>
          </motion.div>

          {/* Line 2: COMPLEX (Red Pill) + TECHNOLOGY */}
          <motion.div style={{ opacity: o2, x: reducedMotion || isTouch ? 0 : x2 }} className="flex items-center gap-4 sm:gap-8 justify-end">
            <div className="relative group flex items-center justify-center px-6 sm:px-12 py-3 sm:py-6 rounded-full border border-red-500/40 bg-red-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(239,68,68,0.15)] mt-4">
               {/* Technical tag - floating outside without opaque background */}
               <div className="absolute -top-6 sm:-top-8 left-8 sm:left-12 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                 <span className="font-mono text-[10px] sm:text-xs text-red-500 tracking-widest lowercase">state: entangled</span>
               </div>
               {/* Override leading-[0.9] to leading-none to prevent squished borders */}
               <span className="text-red-500 group-hover:text-red-400 transition-colors leading-none pt-2">COMPLEX</span>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-text-secondary mt-4">TECHNOLOGY</span>
          </motion.div>

          {/* Line 3: INTO + SIMPLE (Blue Pill) */}
          <motion.div style={{ opacity: o3, x: reducedMotion || isTouch ? 0 : x3 }} className="flex items-center gap-4 sm:gap-8 justify-start">
            <span className="text-text-secondary/50 font-medium">INTO</span>
            <div className="relative group flex items-center justify-center px-6 sm:px-12 py-3 sm:py-6 rounded-full border border-accent/50 bg-accent/10 backdrop-blur-sm shadow-[0_0_40px_rgba(var(--accent),0.2)] mt-4">
               {/* Technical tag - floating outside */}
               <div className="absolute -top-6 sm:-top-8 right-8 sm:right-12 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent),0.8)]" />
                 <span className="font-mono text-[10px] sm:text-xs text-accent tracking-widest lowercase">sys.resolve()</span>
               </div>
               {/* Override leading-[0.9] to leading-none to prevent squished borders */}
               <span className="text-accent group-hover:text-white transition-colors leading-none pt-2">SIMPLE</span>
            </div>
          </motion.div>

          {/* Line 4: DIGITAL PRODUCTS */}
          <motion.div style={{ opacity: o4, x: reducedMotion || isTouch ? 0 : x4 }} className="flex items-center gap-4 sm:gap-8 justify-end text-white">
            <div className="w-24 sm:w-32 md:w-48 lg:w-64 h-12 sm:h-16 md:h-20 lg:h-28 rounded-[2rem] overflow-hidden shrink-0 hidden sm:block relative border border-accent/40 shadow-[0_0_30px_rgba(var(--accent),0.2)] group">
              <div className="absolute inset-0 bg-accent/20 backdrop-blur-md flex items-center justify-center z-20 group-hover:bg-transparent transition-colors duration-500">
                <span className="font-mono text-accent text-xs sm:text-sm tracking-widest font-semibold opacity-100 group-hover:opacity-0 transition-opacity">BUILDING...</span>
              </div>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" loading="lazy" decoding="async" className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-700 scale-105 group-hover:scale-100" alt="Digital Dashboard" />
            </div>
            <span>DIGITAL PRODUCTS.</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
