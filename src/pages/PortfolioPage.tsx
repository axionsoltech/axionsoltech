import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { CTABand } from '../components/CTABand';
import { PROJECTS } from '../data/projects';
import { usePageTitle } from '../hooks/usePageTitle';

export default function PortfolioPage() {
  usePageTitle('Our Work');

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Representative engagements."
        description="A look at the kind of problems we take on and how we approach them — case studies illustrative of our process, not a full client roster."
      />

      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto w-[75%] px-4 sm:px-6">
          <div className="border-border-strong bg-surface/70 mb-10 rounded-[2rem] border p-6 backdrop-blur sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-accent-soft mb-3 text-xs font-medium tracking-[0.2em] uppercase">
                  Portfolio overview
                </p>
                <h2 className="font-display text-text-primary text-2xl font-semibold tracking-tight sm:text-3xl">
                  A curated view of the products, platforms, and systems we build.
                </h2>
                <p className="text-text-secondary mt-3 text-base leading-relaxed">
                  Each case study shows how we approach ambiguity, ship quickly, and create durable
                  product foundations.
                </p>
              </div>

              <div className="border-border bg-surface text-text-secondary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
                <span className="bg-accent-soft h-2.5 w-2.5 rounded-full" />
                Cross-functional delivery
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="card-glow group border-border bg-surface/85 flex h-full flex-col rounded-[1.5rem] border p-7 shadow-[0_20px_60px_-30px_rgba(3,7,18,0.75)]"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-accent-soft text-xs font-medium tracking-[0.15em] uppercase">
                      {project.category}
                    </span>
                    <span className="border-border bg-surface text-text-muted rounded-full border px-2.5 py-1 text-[11px]">
                      Case study
                    </span>
                  </div>
                  <h3 className="font-display text-text-primary mb-3 text-xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary mb-6 text-sm leading-relaxed">
                    {project.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="border-border bg-surface text-text-muted rounded-full border px-2.5 py-1 text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-accent-soft mt-6 flex items-center gap-2 text-sm font-medium">
                    <span>View project</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Have something similar in mind?" />
    </>
  );
}
