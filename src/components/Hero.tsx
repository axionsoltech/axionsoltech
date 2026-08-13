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
      transition: { duration: 0.8, ease: TRANSITIONS.ease, delay: 0.2 },
    },
  };

  return (
    <section ref={containerRef} id="top" className="bg-bg relative h-[150vh]">
      <div className="sticky top-0 flex h-[100dvh] w-full flex-col justify-start lg:justify-center overflow-hidden pt-24 lg:pt-28 pb-6 lg:pb-12">
        <motion.div
          style={{ opacity: bgOpacity }}
          className="bg-grid pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <motion.div
          style={{ opacity: bgOpacity }}
          className="glow-orb pointer-events-none -top-20 left-1/2 h-[600px] w-[600px] -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto mt-0 lg:mt-12 flex h-full w-full md:w-[80%] max-w-7xl items-start lg:items-center px-4 sm:px-6">
          <div className="grid w-full items-center gap-6 lg:grid-cols-2 lg:gap-20 pt-2 lg:pt-0">
            {/* Text Content */}
            <motion.div
              style={{ scale: textScale, opacity: textOpacity, y: textY }}
              className="flex w-full flex-col items-start text-left"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="border-border/50 bg-surface/30 text-text-secondary mb-4 lg:mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs shadow-sm backdrop-blur-md"
              >
                <Sparkles className="text-accent-soft h-3.5 w-3.5" aria-hidden="true" />
                Software &amp; Cloud Engineering
              </motion.div>

              {/* Large Headline */}
              <h1 className="font-display text-text-primary mb-4 lg:mb-8 text-4xl leading-[0.95] font-bold tracking-tighter sm:text-5xl lg:text-[5.5rem]">
                <div className="overflow-hidden pb-2">
                  <motion.div variants={lineVariants} initial="hidden" animate="show">
                    We engineer
                  </motion.div>
                </div>
                <div className="overflow-hidden pb-2">
                  <motion.div
                    variants={lineVariants}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-gradient">digital platforms</span>
                  </motion.div>
                </div>
                <div className="overflow-hidden pb-2">
                  <motion.div
                    variants={lineVariants}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.4 }}
                  >
                    that scale.
                  </motion.div>
                </div>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-text-secondary max-w-lg text-base leading-relaxed font-medium sm:text-xl"
              >
                Partnering with ambitious founders and enterprises to design, build, and deploy
                products across web, mobile, cloud, and AI.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-4 lg:mt-10 flex flex-wrap items-center gap-3 lg:gap-4"
              >
                <Link
                  to="/contact"
                  data-magnetic="true"
                  className="bg-accent btn-glow hover:bg-accent-light inline-flex items-center gap-2 rounded-full px-6 lg:px-8 py-3 lg:py-4 text-sm font-semibold text-white transition-all"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="#services"
                  data-magnetic="true"
                  className="border-border bg-surface/50 text-text-primary hover:bg-surface inline-flex items-center gap-2 rounded-full border px-6 lg:px-8 py-3 lg:py-4 text-sm font-semibold backdrop-blur-sm transition-all"
                >
                  Our Services
                  <ChevronRight className="text-text-secondary h-4 w-4" aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>

            {/* Isometric Technology Visual */}
            <div className="relative z-20 flex w-full flex-col justify-center perspective-[1200px]">
              {/* Decorative background glow for the 3D element */}
              <div className="bg-accent/5 pointer-events-none absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

              <motion.div
                initial={{ opacity: 0, rotateY: -20, rotateX: 10, y: 40 }}
                animate={{ opacity: 1, rotateY: -15, rotateX: 10, y: 0 }}
                transition={{ duration: 1.5, delay: 1.0, ease: TRANSITIONS.ease }}
                style={{ y: visualY, scale: visualScale }}
                className="transform-style-3d shadow-accent/20 w-full rounded-[2rem] shadow-2xl"
              >
                {/* Simulated Glass Cover for isometric depth */}
                <div className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] border border-white/10 bg-gradient-to-tr from-white/5 to-transparent" />
                <TechVisual />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
