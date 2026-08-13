import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ServiceDetail } from '../data/services';
import { ServiceVisual } from './ServiceVisual';
import { useDevice } from '../hooks/useDevice';
import { MaskedReveal } from './Reveal';

export function ServicesGrid({ services }: { services: ServiceDetail[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const { reducedMotion } = useDevice();

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    const measure = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth);
      }
    };

    measure(); // Initial measure

    // ResizeObserver catches layout shifts from fonts or images loading after paint
    const observer = new ResizeObserver(() => {
      measure();
    });

    observer.observe(trackRef.current);

    return () => {
      observer.disconnect();
    };
  }, [services]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      ref={containerRef}
      className="bg-bg relative"
      style={{ height: `${services.length * 75}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden pt-20 pb-10">
        {/* Background Base */}
        <div className="bg-surface/20 pointer-events-none absolute inset-0" />

        {/* Header - Stays fixed in the sticky container */}
        <div className="relative z-20 mb-8 w-full shrink-0 px-3 md:px-[5vw] sm:mb-12 lg:px-[17.5vw]">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-accent-soft mb-4 text-xs font-medium tracking-[0.2em] uppercase">
                What we do
              </p>
              <h2 className="font-display text-text-primary flex flex-col text-4xl font-semibold tracking-tight sm:text-5xl">
                <MaskedReveal delay={0.1}>Full-stack capability,</MaskedReveal>
                <MaskedReveal delay={0.2} className="text-accent-soft">
                  one accountable team.
                </MaskedReveal>
              </h2>
            </div>
            <Link
              to="/services"
              className="text-accent hover:text-accent-soft hidden items-center gap-2 text-sm font-medium transition-colors sm:inline-flex"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative flex flex-1 items-center">
          <motion.div
            ref={trackRef}
            style={!reducedMotion ? { x } : {}}
            className="flex h-full w-max items-center gap-6 px-3 md:px-[5vw] lg:gap-12 lg:px-[17.5vw]"
          >
            {services.map((service, i) => {
              const Icon = service.icon;

              // Progress points for this specific card
              const centerProgress = i / (services.length - 1);
              const windowProgress = 1 / (services.length - 1);

              // 1. Scale and fade
              const itemScale = useTransform(scrollYProgress, (v) => {
                const dist = Math.abs(v - centerProgress);
                const clampedDist = Math.min(dist / windowProgress, 1);
                return 1 - clampedDist * 0.15; // 1 to 0.85
              });

              const itemOpacity = useTransform(scrollYProgress, (v) => {
                const dist = Math.abs(v - centerProgress);
                const clampedDist = Math.min(dist / windowProgress, 1);
                return 1 - clampedDist * 0.8; // 1 to 0.2
              });

              // 2. 3D Rotation (Swings the card as it passes)
              const itemRotateY = useTransform(scrollYProgress, (v) => {
                const diff = v - centerProgress;
                const percent = Math.max(-1, Math.min(1, diff / windowProgress));
                return percent * 25; // -25deg to 25deg (slightly reduced since they are closer)
              });

              // 3. Criss-cross parallax for internal elements
              const textY = useTransform(scrollYProgress, (v) => {
                const diff = v - centerProgress;
                const percent = Math.max(-1, Math.min(1, diff / windowProgress));
                return percent * 100; // Text moves opposite to scroll
              });

              const imageY = useTransform(scrollYProgress, (v) => {
                const diff = v - centerProgress;
                const percent = Math.max(-1, Math.min(1, diff / windowProgress));
                return percent * -100; // Image moves with scroll
              });

              // Internal visual parallax inside the image container
              const visualParallax = useTransform(scrollYProgress, (v) => {
                const diff = v - centerProgress;
                const percent = Math.max(-1, Math.min(1, diff / windowProgress));
                return `${percent * -15}%`;
              });

              return (
                <div
                  key={service.slug}
                  className="flex w-[90vw] shrink-0 justify-center lg:w-[65vw]"
                  style={{ perspective: '2000px' }}
                >
                  <motion.div
                    style={
                      !reducedMotion
                        ? { scale: itemScale, opacity: itemOpacity, rotateY: itemRotateY }
                        : {}
                    }
                    className="bg-surface relative w-full origin-center rounded-[2rem] border border-white/10 p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] will-change-transform sm:rounded-[2.5rem] sm:p-10 lg:p-14"
                  >
                    {/* Inner Glass Glare */}
                    <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent" />

                    {/* Hover Glow (Optional premium touch) */}
                    <div className="bg-accent-soft/5 pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-0 transition-opacity duration-700 hover:opacity-100" />

                    <div className="relative z-10 flex w-full flex-col items-center justify-between gap-12 lg:flex-row lg:gap-20">
                      {/* Left Text */}
                      <motion.div
                        style={!reducedMotion ? { y: textY } : {}}
                        className="order-2 flex w-full flex-col lg:order-1 lg:w-[45%]"
                      >
                        <div className="text-text-muted mb-6 flex items-center gap-4 font-mono text-sm tracking-widest uppercase">
                          <span>
                            [0{i + 1} / 0{services.length}]
                          </span>
                          <div className="bg-accent-soft/15 text-accent-soft flex h-10 w-10 items-center justify-center rounded-xl shadow-inner">
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>

                        <h3 className="font-display text-text-primary mb-6 text-4xl leading-[1] font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                          {service.title}
                        </h3>

                        <p className="text-text-secondary mb-8 text-lg leading-relaxed">
                          {service.description}
                        </p>

                        <div className="text-text-muted mb-10 flex flex-wrap gap-3 font-mono text-xs">
                          {service.stack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="border-border/50 bg-bg/50 rounded-full border px-3 py-1.5 tracking-widest uppercase backdrop-blur-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <Link
                          to={`/services/${service.slug}`}
                          className="text-text-primary group inline-flex w-max items-center gap-2 font-medium"
                        >
                          <span className="border-accent/40 group-hover:border-accent border-b-2 pb-1 transition-colors">
                            Explore capabilities
                          </span>
                          <ArrowUpRight className="text-accent h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </motion.div>

                      {/* Right Visual with Parallax */}
                      <motion.div
                        style={!reducedMotion ? { y: imageY } : {}}
                        className="bg-bg/50 relative order-1 h-[35vh] w-full overflow-hidden rounded-[2rem] border border-white/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] lg:order-2 lg:h-[50vh] lg:w-[55%]"
                      >
                        <motion.div
                          style={!reducedMotion ? { y: visualParallax, scale: 1.15 } : {}}
                          className="absolute inset-[-10%] h-[120%] w-[120%]"
                        >
                          <ServiceVisual activeSlug={service.slug} />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <div className="relative z-20 mx-auto mt-8 hidden w-full md:w-[80%] max-w-7xl shrink-0 items-center gap-4 px-4 sm:px-6 lg:flex">
          <div className="bg-border relative h-[2px] flex-1 overflow-hidden rounded-full">
            <motion.div
              className="bg-accent absolute top-0 bottom-0 left-0 rounded-full"
              style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
          <div className="text-text-muted w-8 text-right font-mono text-xs">
            <motion.span>
              {useTransform(
                scrollYProgress,
                (v) => `0${Math.min(services.length, Math.max(1, Math.ceil(v * services.length)))}`
              )}
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
