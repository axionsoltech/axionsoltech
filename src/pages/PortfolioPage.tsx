import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { CTABand } from "../components/CTABand";
import { PROJECTS } from "../data/projects";
import { usePageTitle } from "../hooks/usePageTitle";

export default function PortfolioPage() {
  usePageTitle("Our Work");

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Representative engagements."
        description="A look at the kind of problems we take on and how we approach them — case studies illustrative of our process, not a full client roster."
      />

      <section className="relative pb-20 sm:pb-28">
        <div className="w-[75%] mx-auto px-4 sm:px-6">
          <div className="mb-10 rounded-[2rem] border border-border-strong bg-surface/70 p-6 sm:p-8 backdrop-blur">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent-soft">
                  Portfolio overview
                </p>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
                  A curated view of the products, platforms, and systems we
                  build.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  Each case study shows how we approach ambiguity, ship quickly,
                  and create durable product foundations.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-secondary">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-soft" />
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
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="card-glow group flex h-full flex-col rounded-[1.5rem] border border-border bg-surface/85 p-7 shadow-[0_20px_60px_-30px_rgba(3,7,18,0.75)]"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-accent-soft">
                      {project.category}
                    </span>
                    <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-text-muted">
                      Case study
                    </span>
                  </div>
                  <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-text-primary">
                    {project.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                    {project.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent-soft">
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
