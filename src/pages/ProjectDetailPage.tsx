import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getProjectBySlug } from '../data/projects';
import { CTABand } from '../components/CTABand';
import { usePageTitle } from '../hooks/usePageTitle';

const BLOCKS = [
  { key: 'problem', label: 'The problem' },
  { key: 'approach', label: 'Our approach' },
  { key: 'outcome', label: 'The outcome' },
] as const;

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  usePageTitle(project?.title ?? 'Project');

  if (!project) return <Navigate to="/portfolio" replace />;

  return (
    <>
      <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="glow-orb w-[420px] h-[420px] -top-32 left-1/2 -translate-x-1/2" aria-hidden="true" />

        <div className="relative w-[75%] mx-auto px-4 sm:px-6">
          <Link to="/portfolio" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-8">
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            All work
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-accent-soft">{project.category}</span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-text-primary">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl">{project.summary}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-24 border-t border-border pt-16">
        <div className="w-[75%] mx-auto px-4 sm:px-6 space-y-12">
          {BLOCKS.map((block, i) => (
            <motion.div
              key={block.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h2 className="font-display text-lg font-semibold text-text-primary mb-3">{block.label}</h2>
              <p className="text-text-secondary leading-relaxed">{project[block.key]}</p>
            </motion.div>
          ))}

          <div>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-4">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-text-secondary">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand title="Want to talk through a project like this?" />
    </>
  );
}
