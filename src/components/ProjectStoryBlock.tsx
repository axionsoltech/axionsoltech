import { motion, useTransform, useMotionTemplate, MotionValue } from 'framer-motion';
import type { ProjectCaseStudy } from '../data/projects';
import { useDevice } from '../hooks/useDevice';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectProps {
  project: ProjectCaseStudy;
  index: number;
  total: number;
  globalProgress: MotionValue<number>;
}

function getEngineeringFocus(project: ProjectCaseStudy) {
  if (project.slug === 'multi-tenant-saas-platform')
    return ['Multi-Tenant', 'Tenant Isolation', 'White-labelable'];
  if (project.slug === 'realtime-logistics-dispatch')
    return ['Real-Time Engine', 'Offline-First Sync', 'Auto-Optimization'];
  if (project.slug === 'clinical-patient-portal')
    return ['HIPAA-Aligned', 'Role-Based Access', 'Encrypted Messaging'];
  if (project.slug === 'realtime-analytics-dashboard')
    return ['Streaming Ingestion', 'Sub-Second Queries', 'Live Event Data'];
  return ['Scalable Architecture', 'High Performance'];
}

export function DesktopProjectText({ project, index, total, globalProgress }: ProjectProps) {
  const { reducedMotion } = useDevice();
  const start = index / total;
  const end = (index + 1) / total;

  // Local progress for this specific project (0 to 1)
  const local = useTransform(globalProgress, [start, end], [0, 1]);

  // Entire block fades in at start, out at end
  const blockOpacity = useTransform(
    globalProgress,
    [Math.max(0, start - 0.02), start + 0.05, end - 0.05, Math.min(1, end + 0.02)],
    [0, 1, 1, 0]
  );

  // Scene Opacities
  // Scene 1: Intro (0.0 to 0.3)
  const s1O = useTransform(local, [0, 0.05, 0.25, 0.35], [0, 1, 1, 0]);
  const s1Y = useTransform(local, [0, 0.05, 0.25, 0.35], [20, 0, 0, -20]);

  // Scene 2: Context (0.25 to 0.55)
  const s2O = useTransform(local, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const s2Y = useTransform(local, [0.25, 0.35, 0.5, 0.6], [20, 0, 0, -20]);

  // Scene 3: Tech (0.5 to 0.8)
  const s3O = useTransform(local, [0.5, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  const s3Y = useTransform(local, [0.5, 0.6, 0.75, 0.85], [20, 0, 0, -20]);

  // Scene 4: Outcome (0.75 to 1.0)
  const s4O = useTransform(local, [0.75, 0.85, 0.95, 1.0], [0, 1, 1, 0]);
  const s4Y = useTransform(local, [0.75, 0.85, 0.95, 1.0], [20, 0, 0, -20]);

  const engineeringFocus = getEngineeringFocus(project);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex flex-col justify-center"
      style={{
        opacity: blockOpacity,
        pointerEvents: useTransform(blockOpacity, (v) => (v > 0.5 ? 'auto' : ('none' as any))),
      }}
    >
      {/* Progress Indicator */}
      <div className="text-text-muted mb-12 flex items-center gap-4 font-mono text-xs tracking-widest uppercase">
        <span>
          0{index + 1} / 0{total}
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${i === index ? 'bg-accent shadow-[0_0_8px_rgba(var(--accent),0.8)]' : 'bg-border/30'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative h-[300px] w-full">
        {/* SCENE 1: INTRO */}
        <motion.div
          className="absolute inset-0 flex flex-col"
          style={{ opacity: s1O, y: reducedMotion ? 0 : s1Y }}
        >
          <p className="text-accent mb-4 text-sm font-medium tracking-[0.2em] uppercase">
            {project.category}
          </p>
          <h3 className="font-display text-text-primary mb-6 text-4xl leading-[0.95] font-bold tracking-tighter lg:text-5xl">
            {project.title}
          </h3>
          <p className="text-text-secondary max-w-md text-xl leading-relaxed">{project.summary}</p>
        </motion.div>

        {/* SCENE 2: CONTEXT */}
        <motion.div
          className="absolute inset-0 flex flex-col"
          style={{ opacity: s2O, y: reducedMotion ? 0 : s2Y }}
        >
          <div className="mb-8">
            <h4 className="text-text-muted mb-3 font-mono text-xs tracking-widest uppercase">
              The Challenge
            </h4>
            <p className="text-text-primary max-w-md text-lg leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <h4 className="text-text-muted mb-3 font-mono text-xs tracking-widest uppercase">
              The Approach
            </h4>
            <p className="text-text-secondary max-w-md text-lg leading-relaxed">
              {project.approach}
            </p>
          </div>
        </motion.div>

        {/* SCENE 3: TECH */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center"
          style={{ opacity: s3O, y: reducedMotion ? 0 : s3Y }}
        >
          <h4 className="text-text-muted mb-6 font-mono text-xs tracking-widest uppercase">
            Engineering Focus
          </h4>
          <div className="border-border/50 relative flex flex-col gap-5 border-l pl-6">
            <div className="from-accent/50 via-accent/20 absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b to-transparent" />
            {engineeringFocus.map((focus) => (
              <div key={focus} className="flex items-center gap-4">
                <div className="font-display text-2xl font-medium tracking-tight text-white uppercase sm:text-3xl">
                  {focus}
                </div>
                <div className="bg-border/50 h-px max-w-[40px] flex-1" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* SCENE 4: OUTCOME */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center"
          style={{ opacity: s4O, y: reducedMotion ? 0 : s4Y }}
        >
          <h4 className="text-text-muted mb-4 font-mono text-xs tracking-widest uppercase">
            The Outcome
          </h4>
          <p className="font-display text-text-primary mb-8 max-w-md text-3xl leading-tight font-bold tracking-tighter lg:text-4xl">
            {project.outcome}
          </p>
          <Link
            to={`/case-studies/${project.slug}`}
            className="text-text-primary group inline-flex w-max items-center gap-2 font-medium"
          >
            <span className="border-accent/30 group-hover:border-accent border-b pb-0.5 transition-colors">
              Read Full Case Study
            </span>
            <ArrowUpRight className="text-accent h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function DesktopProjectVisual({ project, index, total, globalProgress }: ProjectProps) {
  const { reducedMotion } = useDevice();
  const start = index / total;
  const end = (index + 1) / total;
  const local = useTransform(globalProgress, [start, end], [0, 1]);

  const opacity = useTransform(
    globalProgress,
    [Math.max(0, start - 0.02), start + 0.02, end - 0.05, Math.min(1, end + 0.02)],
    [0, 1, 1, 0]
  );

  const scale = useTransform(local, [0, 0.1, 0.9, 1], [1.08, 1, 1, 1.05]);
  const y = useTransform(local, [0, 0.1, 0.9, 1], [20, 0, 0, -20]);

  const clipBottom = useTransform(local, [0, 0.1, 0.9, 1.0], [10, 0, 0, 100]);
  const clipOther = useTransform(local, [0, 0.1], [10, 0]);
  const clipPath = useMotionTemplate`inset(${clipOther}% ${clipOther}% ${clipBottom}% ${clipOther}%)`;

  const isVisible = useTransform(opacity, (v) => v > 0);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ opacity, pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
        style={!reducedMotion ? { scale, y, clipPath } : {}}
      >
        <div className="bg-accent/5 absolute inset-0 z-10 mix-blend-overlay" />
        <img
          src={project.image}
          alt={`${project.title} mockup`}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.85] contrast-[1.1] filter"
        />
      </motion.div>
    </motion.div>
  );
}

export function MobileProject({ project, index }: { project: ProjectCaseStudy; index: number }) {
  const engineeringFocus = getEngineeringFocus(project);

  return (
    <div className="flex w-full flex-col">
      <div className="text-text-muted mb-4 font-mono text-xs tracking-widest uppercase">
        0{index + 1}
      </div>

      <div className="relative mb-8 h-[40vh] w-full overflow-hidden rounded-xl shadow-2xl">
        <div className="bg-accent/5 absolute inset-0 z-10 mix-blend-overlay" />
        <img
          src={project.image}
          alt={`${project.title} mockup`}
          loading={index === 0 ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.85] filter"
        />
      </div>

      <p className="text-accent mb-3 text-xs font-medium tracking-[0.2em] uppercase">
        {project.category}
      </p>
      <h3 className="font-display text-text-primary mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
        {project.title}
      </h3>
      <p className="text-text-secondary mb-8 text-lg leading-relaxed">{project.summary}</p>

      <div className="bg-surface/50 border-border/50 mb-8 flex flex-col gap-6 rounded-2xl border p-6">
        <div>
          <h4 className="text-text-muted mb-2 font-mono text-[10px] tracking-widest uppercase">
            The Challenge
          </h4>
          <p className="text-text-primary text-sm leading-relaxed">{project.problem}</p>
        </div>
        <div>
          <h4 className="text-text-muted mb-2 font-mono text-[10px] tracking-widest uppercase">
            The Approach
          </h4>
          <p className="text-text-secondary text-sm leading-relaxed">{project.approach}</p>
        </div>
      </div>

      <div className="mb-10">
        <h4 className="text-text-muted mb-4 font-mono text-xs tracking-widest uppercase">
          Engineering Focus
        </h4>
        <div className="flex flex-wrap gap-2">
          {engineeringFocus.map((focus) => (
            <span
              key={focus}
              className="border-border bg-surface text-text-secondary rounded-full border px-3 py-1.5 font-mono text-xs uppercase"
            >
              {focus}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-text-muted mb-3 font-mono text-xs tracking-widest uppercase">
          The Outcome
        </h4>
        <p className="font-display text-text-primary text-2xl leading-tight font-bold tracking-tight">
          {project.outcome}
        </p>
      </div>

      <Link
        to={`/case-studies/${project.slug}`}
        className="text-text-primary group inline-flex w-max items-center gap-2 text-sm font-medium"
      >
        <span className="border-accent/30 group-hover:border-accent border-b pb-0.5 transition-colors">
          Read Full Case Study
        </span>
        <ArrowUpRight className="text-accent h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}
