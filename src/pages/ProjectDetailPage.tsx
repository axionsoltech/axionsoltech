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
      <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="bg-grid absolute inset-0" aria-hidden="true" />
        <div
          className="glow-orb -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full md:w-[75%] px-4 sm:px-6">
          <Link
            to="/portfolio"
            className="text-text-secondary hover:text-text-primary mb-8 inline-flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All work
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-accent-soft text-xs font-medium tracking-[0.15em] uppercase">
              {project.category}
            </span>
            <h1 className="font-display text-text-primary mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="text-text-secondary mt-4 max-w-2xl text-lg">{project.summary}</p>
          </motion.div>
        </div>
      </section>

      <section className="border-border relative border-t pt-16 pb-24">
        <div className="mx-auto w-full md:w-[75%] space-y-12 px-4 sm:px-6">
          {BLOCKS.map((block, i) => (
            <motion.div
              key={block.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
                {block.label}
              </h2>
              <p className="text-text-secondary leading-relaxed">{project[block.key]}</p>
            </motion.div>
          ))}

          <div>
            <h2 className="font-display text-text-primary mb-4 text-lg font-semibold">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="border-border bg-surface text-text-secondary rounded-full border px-3.5 py-1.5 text-xs"
                >
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
