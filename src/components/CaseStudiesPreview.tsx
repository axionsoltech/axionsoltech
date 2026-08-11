import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/projects";
import { useDevice } from "../hooks/useDevice";
import { MaskedReveal } from "./Reveal";

export function CaseStudiesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useDevice();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Convert vertical scroll to horizontal scroll.
  // We have N projects. We want to scroll so the last project is fully visible.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${100 * (PROJECTS.length - 1)}vw`]);

  return (
    <section ref={containerRef} className="relative bg-bg" style={{ height: `${PROJECTS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-20 pb-10 flex flex-col">

        {/* Background Base */}
        <div className="absolute inset-0 bg-surface/20 pointer-events-none" />

        {/* Header - Stays fixed in the sticky container */}
        <div className="relative w-[80%] max-w-7xl mx-auto px-4 sm:px-6 shrink-0 z-20 mb-8 sm:mb-12">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-soft mb-4">Case Studies</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-text-primary tracking-tight flex flex-col">
                <MaskedReveal delay={0.1}>Work that scales.</MaskedReveal>
              </h2>
            </div>
            <Link to="/case-studies" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-soft transition-colors">
              View all work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="flex-1 relative flex items-center">
          <motion.div
            style={!reducedMotion ? { x } : {}}
            className="flex w-max h-full items-center"
          >
            {PROJECTS.map((project, i) => {
              // Task 3: Image Parallax
              // Calculate local scroll progress for THIS specific project to drive parallax
              const start = i / PROJECTS.length;
              const end = (i + 1) / PROJECTS.length;

              const imageParallax = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.2), Math.min(1, end + 0.2)],
                ["-15%", "15%"]
              );

              return (
                <div
                  key={project.slug}
                  className="w-screen flex justify-center px-4 sm:px-6"
                >
                  <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-end justify-between pb-10 sm:pb-20">

                    {/* Left Text */}
                    <div className="flex flex-col w-full lg:w-[40%] order-2 lg:order-1">
                      <div className="font-mono text-sm text-text-muted mb-4 uppercase tracking-widest">
                        [0{i + 1} / 0{PROJECTS.length}]
                      </div>

                      <h3 className="font-display text-4xl sm:text-6xl lg:text-[4.5rem] font-semibold text-text-primary tracking-tighter leading-[0.95] mb-6">
                        {project.title}
                      </h3>

                      <p className="text-xl text-text-secondary leading-relaxed mb-8">
                        {project.summary}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-10 text-sm font-mono text-text-muted">
                        {project.stack.slice(0, 4).map(tech => (
                          <span key={tech} className="uppercase tracking-widest">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/case-studies/${project.slug}`}
                        className="inline-flex items-center gap-2 text-text-primary font-medium group w-max"
                      >
                        <span className="border-b border-accent/30 pb-0.5 group-hover:border-accent transition-colors">
                          Read Case Study
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>

                    {/* Right Image with Parallax */}
                    <div className="w-full lg:w-[60%] h-[40vh] lg:h-[65vh] relative order-1 lg:order-2 overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5">
                      <motion.img
                        style={!reducedMotion ? { y: imageParallax, scale: 1.15 } : {}}
                        src={project.image}
                        alt={`${project.title} mockup`}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                    </div>

                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <div className="relative w-[80%] max-w-7xl mx-auto px-4 sm:px-6 z-20 shrink-0 hidden lg:flex items-center gap-4 mt-8">
          <div className="flex-1 h-[2px] bg-border relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-accent origin-left w-full"
              style={{ scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
            />
          </div>
          <div className="font-mono text-xs text-text-muted w-8 text-right">
            <motion.span>
              {useTransform(scrollYProgress, v => `0${Math.min(PROJECTS.length, Math.max(1, Math.ceil(v * PROJECTS.length)))}`)}
            </motion.span>
          </div>
        </div>

      </div>
    </section>
  );
}
