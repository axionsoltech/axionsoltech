import { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ServiceDetail } from "../data/services";
import { ServiceVisual } from "./ServiceVisual";
import { useDevice } from "../hooks/useDevice";
import { MaskedReveal } from "./Reveal";

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
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section ref={containerRef} className="relative bg-bg" style={{ height: `${services.length * 75}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-20 pb-10 flex flex-col">

        {/* Background Base */}
        <div className="absolute inset-0 bg-surface/20 pointer-events-none" />

        {/* Header - Stays fixed in the sticky container */}
        <div className="relative w-full px-[5vw] lg:px-[17.5vw] shrink-0 z-20 mb-8 sm:mb-12">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-soft mb-4">What we do</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-text-primary tracking-tight flex flex-col">
                <MaskedReveal delay={0.1}>Full-stack capability,</MaskedReveal>
                <MaskedReveal delay={0.2} className="text-accent-soft">one accountable team.</MaskedReveal>
              </h2>
            </div>
            <Link to="/services" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-soft transition-colors">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="flex-1 relative flex items-center">
          <motion.div
            ref={trackRef}
            style={!reducedMotion ? { x } : {}}
            className="flex w-max h-full items-center gap-6 lg:gap-12 px-[5vw] lg:px-[17.5vw]"
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
                  className="w-[90vw] lg:w-[65vw] shrink-0 flex justify-center"
                  style={{ perspective: "2000px" }}
                >
                  <motion.div 
                    style={!reducedMotion ? { scale: itemScale, opacity: itemOpacity, rotateY: itemRotateY } : {}}
                    className="w-full relative rounded-[2rem] sm:rounded-[2.5rem] bg-surface border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] p-6 sm:p-10 lg:p-14 origin-center will-change-transform"
                  >
                    {/* Inner Glass Glare */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-[2.5rem]" />
                    
                    {/* Hover Glow (Optional premium touch) */}
                    <div className="absolute inset-0 bg-accent-soft/5 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />

                    <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between relative z-10">

                      {/* Left Text */}
                      <motion.div 
                        style={!reducedMotion ? { y: textY } : {}}
                        className="flex flex-col w-full lg:w-[45%] order-2 lg:order-1"
                      >
                        <div className="font-mono text-sm text-text-muted mb-6 uppercase tracking-widest flex items-center gap-4">
                          <span>[0{i + 1} / 0{services.length}]</span>
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft/15 text-accent-soft shadow-inner">
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>

                        <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tighter leading-[1] mb-6">
                          {service.title}
                        </h3>

                        <p className="text-lg text-text-secondary leading-relaxed mb-8">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-10 text-xs font-mono text-text-muted">
                          {service.stack.slice(0, 3).map(tech => (
                            <span key={tech} className="uppercase tracking-widest px-3 py-1.5 rounded-full border border-border/50 bg-bg/50 backdrop-blur-md">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 text-text-primary font-medium group w-max"
                        >
                          <span className="border-b-2 border-accent/40 pb-1 group-hover:border-accent transition-colors">
                            Explore capabilities
                          </span>
                          <ArrowUpRight className="w-5 h-5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </motion.div>

                      {/* Right Visual with Parallax */}
                      <motion.div 
                        style={!reducedMotion ? { y: imageY } : {}}
                        className="w-full lg:w-[55%] h-[35vh] lg:h-[50vh] relative order-1 lg:order-2 overflow-hidden rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] bg-bg/50 border border-white/5"
                      >
                        <motion.div
                          style={!reducedMotion ? { y: visualParallax, scale: 1.15 } : {}}
                          className="absolute inset-[-10%] w-[120%] h-[120%]"
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
        <div className="relative w-[80%] max-w-7xl mx-auto px-4 sm:px-6 z-20 shrink-0 hidden lg:flex items-center gap-4 mt-8">
          <div className="flex-1 h-[2px] bg-border relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-accent rounded-full"
              style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
          <div className="font-mono text-xs text-text-muted w-8 text-right">
            <motion.span>
              {useTransform(scrollYProgress, v => `0${Math.min(services.length, Math.max(1, Math.ceil(v * services.length)))}`)}
            </motion.span>
          </div>
        </div>

      </div>
    </section>
  );
}
