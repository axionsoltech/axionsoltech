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
  if (project.slug === 'multi-tenant-saas-platform') return ['Multi-Tenant', 'Tenant Isolation', 'White-labelable'];
  if (project.slug === 'realtime-logistics-dispatch') return ['Real-Time Engine', 'Offline-First Sync', 'Auto-Optimization'];
  if (project.slug === 'clinical-patient-portal') return ['HIPAA-Aligned', 'Role-Based Access', 'Encrypted Messaging'];
  if (project.slug === 'realtime-analytics-dashboard') return ['Streaming Ingestion', 'Sub-Second Queries', 'Live Event Data'];
  return ['Scalable Architecture', 'High Performance'];
}

export function DesktopProjectText({ project, index, total, globalProgress }: ProjectProps) {
  const { reducedMotion } = useDevice();
  const start = index / total;
  const end = (index + 1) / total;
  
  // Local progress for this specific project (0 to 1)
  const local = useTransform(globalProgress, [start, end], [0, 1]);
  
  // Entire block fades in at start, out at end
  const blockOpacity = useTransform(globalProgress, 
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
      className="absolute inset-0 flex flex-col justify-center pointer-events-none"
      style={{ opacity: blockOpacity, pointerEvents: useTransform(blockOpacity, v => v > 0.5 ? 'auto' : 'none' as any) }}
    >
      {/* Progress Indicator */}
      <div className="font-mono text-xs text-text-muted mb-12 flex items-center gap-4 uppercase tracking-widest">
        <span>0{index + 1} / 0{total}</span>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${i === index ? 'bg-accent shadow-[0_0_8px_rgba(var(--accent),0.8)]' : 'bg-border/30'}`} />
          ))}
        </div>
      </div>

      <div className="relative w-full h-[300px]">
        {/* SCENE 1: INTRO */}
        <motion.div className="absolute inset-0 flex flex-col" style={{ opacity: s1O, y: reducedMotion ? 0 : s1Y }}>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4">{project.category}</p>
          <h3 className="font-display text-4xl lg:text-5xl font-bold text-text-primary tracking-tighter leading-[0.95] mb-6">
            {project.title}
          </h3>
          <p className="text-xl text-text-secondary leading-relaxed max-w-md">
            {project.summary}
          </p>
        </motion.div>

        {/* SCENE 2: CONTEXT */}
        <motion.div className="absolute inset-0 flex flex-col" style={{ opacity: s2O, y: reducedMotion ? 0 : s2Y }}>
          <div className="mb-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">The Challenge</h4>
            <p className="text-lg text-text-primary leading-relaxed max-w-md">
              {project.problem}
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">The Approach</h4>
            <p className="text-lg text-text-secondary leading-relaxed max-w-md">
              {project.approach}
            </p>
          </div>
        </motion.div>

        {/* SCENE 3: TECH */}
        <motion.div className="absolute inset-0 flex flex-col justify-center" style={{ opacity: s3O, y: reducedMotion ? 0 : s3Y }}>
          <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-6">Engineering Focus</h4>
          <div className="flex flex-col gap-5 border-l border-border/50 pl-6 relative">
             <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />
             {engineeringFocus.map((focus) => (
               <div key={focus} className="flex items-center gap-4">
                 <div className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-white uppercase">{focus}</div>
                 <div className="h-px bg-border/50 flex-1 max-w-[40px]" />
               </div>
             ))}
          </div>
        </motion.div>

        {/* SCENE 4: OUTCOME */}
        <motion.div className="absolute inset-0 flex flex-col justify-center" style={{ opacity: s4O, y: reducedMotion ? 0 : s4Y }}>
          <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">The Outcome</h4>
          <p className="font-display text-3xl lg:text-4xl font-bold text-text-primary tracking-tighter leading-tight max-w-md mb-8">
            {project.outcome}
          </p>
          <Link
            to={`/case-studies/${project.slug}`}
            className="inline-flex items-center gap-2 text-text-primary font-medium group w-max"
          >
            <span className="border-b border-accent/30 pb-0.5 group-hover:border-accent transition-colors">
              Read Full Case Study
            </span>
            <ArrowUpRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
  
  const opacity = useTransform(globalProgress, 
    [Math.max(0, start - 0.02), start + 0.02, end - 0.05, Math.min(1, end + 0.02)], 
    [0, 1, 1, 0]
  );
  
  const scale = useTransform(local, [0, 0.1, 0.9, 1], [1.08, 1, 1, 1.05]);
  const y = useTransform(local, [0, 0.1, 0.9, 1], [20, 0, 0, -20]);
  
  const clipBottom = useTransform(local, [0, 0.1, 0.9, 1.0], [10, 0, 0, 100]);
  const clipOther = useTransform(local, [0, 0.1], [10, 0]);
  const clipPath = useMotionTemplate`inset(${clipOther}% ${clipOther}% ${clipBottom}% ${clipOther}%)`;
  
  const isVisible = useTransform(opacity, v => v > 0);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <motion.div 
        className="w-full h-full relative overflow-hidden rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
        style={!reducedMotion ? { scale, y, clipPath } : {}}
      >
        <div className="absolute inset-0 bg-accent/5 mix-blend-overlay z-10" />
        <img
          src={project.image}
          alt={`${project.title} mockup`}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.85] contrast-[1.1]"
        />
      </motion.div>
    </motion.div>
  );
}

export function MobileProject({ project, index }: { project: ProjectCaseStudy, index: number }) {
  const engineeringFocus = getEngineeringFocus(project);

  return (
    <div className="w-full flex flex-col">
      <div className="font-mono text-xs text-text-muted mb-4 uppercase tracking-widest">
        0{index + 1}
      </div>
      
      <div className="w-full h-[40vh] relative overflow-hidden rounded-xl shadow-2xl mb-8">
        <div className="absolute inset-0 bg-accent/5 mix-blend-overlay z-10" />
        <img
          src={project.image}
          alt={`${project.title} mockup`}
          loading={index === 0 ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.85]"
        />
      </div>

      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-3">{project.category}</p>
      <h3 className="font-display text-3xl sm:text-4xl font-bold text-text-primary tracking-tighter mb-4">
        {project.title}
      </h3>
      <p className="text-lg text-text-secondary leading-relaxed mb-8">
        {project.summary}
      </p>

      <div className="flex flex-col gap-6 p-6 rounded-2xl bg-surface/50 border border-border/50 mb-8">
         <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">The Challenge</h4>
            <p className="text-sm text-text-primary leading-relaxed">{project.problem}</p>
         </div>
         <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">The Approach</h4>
            <p className="text-sm text-text-secondary leading-relaxed">{project.approach}</p>
         </div>
      </div>

      <div className="mb-10">
        <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">Engineering Focus</h4>
        <div className="flex flex-wrap gap-2">
          {engineeringFocus.map((focus) => (
            <span key={focus} className="px-3 py-1.5 rounded-full border border-border bg-surface text-xs font-mono text-text-secondary uppercase">
              {focus}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">The Outcome</h4>
        <p className="font-display text-2xl font-bold text-text-primary tracking-tight leading-tight">
          {project.outcome}
        </p>
      </div>

      <Link
        to={`/case-studies/${project.slug}`}
        className="inline-flex items-center gap-2 text-sm text-text-primary font-medium group w-max"
      >
        <span className="border-b border-accent/30 pb-0.5 group-hover:border-accent transition-colors">
          Read Full Case Study
        </span>
        <ArrowUpRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}
