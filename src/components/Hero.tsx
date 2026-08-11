import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { TRANSITIONS } from '../lib/motion';
import { TechVisual } from './TechVisual';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // As user scrolls down the 150vh, hero text scales down, moves up, and fades out
  const textScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -100]);

  // Technology visual scales up and subtle y movement to feel continuous
  const visualScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.15]);
  const visualY = useTransform(scrollYProgress, [0, 0.8], [0, -50]);

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const lineVariants: any = {
    hidden: { y: '110%' },
    show: {
      y: 0,
      transition: { duration: 0.8, ease: TRANSITIONS.ease, delay: 0.2 }
    }
  };

  return (
    <section ref={containerRef} id="top" className="relative h-[150vh] bg-bg">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-28 pb-12">
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
        <motion.div
          style={{ opacity: bgOpacity }}
          className="glow-orb w-[600px] h-[600px] -top-20 left-1/2 -translate-x-1/2 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative w-[80%] max-w-7xl mx-auto px-4 sm:px-6 z-10 flex h-full items-center mt-12">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            {/* Text Content */}
            <motion.div
              style={{ scale: textScale, opacity: textOpacity, y: textY }}
              className="flex flex-col items-start text-left w-full"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-md px-4 py-1.5 text-xs text-text-secondary mb-8 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent-soft" aria-hidden="true" />
                Software &amp; Cloud Engineering
              </motion.div>

              {/* Large Headline */}
              <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] mb-8 text-text-primary">
                <div className="overflow-hidden pb-2">
                  <motion.div variants={lineVariants} initial="hidden" animate="show">
                    We engineer
                  </motion.div>
                </div>
                <div className="overflow-hidden pb-2">
                  <motion.div variants={lineVariants} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
                    <span className="text-gradient">digital platforms</span>
                  </motion.div>
                </div>
                <div className="overflow-hidden pb-2">
                  <motion.div variants={lineVariants} initial="hidden" animate="show" transition={{ delay: 0.4 }}>
                    that scale.
                  </motion.div>
                </div>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-lg sm:text-xl text-text-secondary max-w-lg font-medium leading-relaxed"
              >
                Partnering with ambitious founders and enterprises to design, build, and deploy products across web, mobile, cloud, and AI.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/contact"
                  data-magnetic="true"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white btn-glow transition-all hover:bg-accent-light"
                >
                  Start a project
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <a
                  href="#services"
                  data-magnetic="true"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-text-primary transition-all hover:bg-surface"
                >
                  Our Services
                  <ChevronRight className="w-4 h-4 text-text-secondary" aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>

            {/* Isometric Technology Visual */}
            <div className="w-full relative z-20 flex flex-col justify-center perspective-[1200px]">
              {/* Decorative background glow for the 3D element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, rotateY: -20, rotateX: 10, y: 40 }}
                animate={{ opacity: 1, rotateY: -15, rotateX: 10, y: 0 }}
                transition={{ duration: 1.5, delay: 1.0, ease: TRANSITIONS.ease }}
                style={{ y: visualY, scale: visualScale }}
                className="w-full transform-style-3d shadow-2xl rounded-[2rem] shadow-accent/20"
              >
                {/* Simulated Glass Cover for isometric depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-[2rem] border border-white/10 pointer-events-none z-30" />
                <TechVisual />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
