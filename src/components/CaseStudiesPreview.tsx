import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { useDevice } from '../hooks/useDevice';
import { MaskedReveal } from './Reveal';

export function CaseStudiesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useDevice();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Convert vertical scroll to horizontal scroll.
  // We have N projects. We want to scroll so the last project is fully visible.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${100 * (PROJECTS.length - 1)}vw`]);

  return (
    <section
      ref={containerRef}
      className="bg-bg relative"
      style={{ height: `${PROJECTS.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden pt-20 pb-10">
        {/* Background Base */}
        <div className="bg-surface/20 pointer-events-none absolute inset-0" />

        {/* Header - Stays fixed in the sticky container */}
        <div className="relative z-20 mx-auto mb-8 w-full md:w-[80%] max-w-7xl shrink-0 px-4 sm:mb-12 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-accent-soft mb-4 text-xs font-medium tracking-[0.2em] uppercase">
                Case Studies
              </p>
              <h2 className="font-display text-text-primary flex flex-col text-4xl font-semibold tracking-tight sm:text-5xl">
                <MaskedReveal delay={0.1}>Work that scales.</MaskedReveal>
              </h2>
            </div>
            <Link
              to="/case-studies"
              className="text-accent hover:text-accent-soft hidden items-center gap-2 text-sm font-medium transition-colors sm:inline-flex"
            >
              View all work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative flex flex-1 items-center">
          <motion.div
            style={!reducedMotion ? { x } : {}}
            className="flex h-full w-max items-center"
          >
            {PROJECTS.map((project, i) => {
              // Task 3: Image Parallax
              // Calculate local scroll progress for THIS specific project to drive parallax
              const start = i / PROJECTS.length;
              const end = (i + 1) / PROJECTS.length;

              const imageParallax = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.2), Math.min(1, end + 0.2)],
                ['-15%', '15%']
              );

              return (
                <div key={project.slug} className="flex w-screen justify-center px-4 sm:px-6">
                  <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-8 pb-10 sm:pb-20 lg:flex-row lg:items-end lg:gap-16">
                    {/* Left Text */}
                    <div className="order-2 flex w-full flex-col lg:order-1 lg:w-[40%]">
                      <div className="text-text-muted mb-4 font-mono text-sm tracking-widest uppercase">
                        [0{i + 1} / 0{PROJECTS.length}]
                      </div>

                      <h3 className="font-display text-text-primary mb-6 text-4xl leading-[0.95] font-semibold tracking-tighter sm:text-6xl lg:text-[4.5rem]">
                        {project.title}
                      </h3>

                      <p className="text-text-secondary mb-8 text-xl leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="text-text-muted mb-10 flex flex-wrap gap-4 font-mono text-sm">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span key={tech} className="tracking-widest uppercase">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/case-studies/${project.slug}`}
                        className="text-text-primary group inline-flex w-max items-center gap-2 font-medium"
                      >
                        <span className="border-accent/30 group-hover:border-accent border-b pb-0.5 transition-colors">
                          Read Case Study
                        </span>
                        <ArrowUpRight className="text-accent h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>

                    {/* Right Image with Parallax */}
                    <div className="relative order-1 h-[40vh] w-full overflow-hidden rounded-[2rem] border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] lg:order-2 lg:h-[65vh] lg:w-[60%]">
                      <motion.img
                        style={!reducedMotion ? { y: imageParallax, scale: 1.15 } : {}}
                        src={project.image}
                        alt={`${project.title} mockup`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <div className="relative z-20 mx-auto mt-8 hidden w-full md:w-[80%] max-w-7xl shrink-0 items-center gap-4 px-4 sm:px-6 lg:flex">
          <div className="bg-border relative h-[2px] flex-1 overflow-hidden rounded-full">
            <motion.div
              className="bg-accent absolute top-0 bottom-0 left-0 w-full origin-left"
              style={{ scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
            />
          </div>
          <div className="text-text-muted w-8 text-right font-mono text-xs">
            <motion.span>
              {useTransform(
                scrollYProgress,
                (v) => `0${Math.min(PROJECTS.length, Math.max(1, Math.ceil(v * PROJECTS.length)))}`
              )}
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
