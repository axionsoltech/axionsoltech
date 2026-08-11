import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getServiceBySlug, SERVICES } from "../data/services";
import { CTABand } from "../components/CTABand";
import { usePageTitle } from "../hooks/usePageTitle";

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  usePageTitle(service?.title ?? "Service");

  if (!service) return <Navigate to="/services" replace />;

  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className="glow-orb w-[420px] h-[420px] -top-32 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="relative w-[75%] mx-auto px-4 sm:px-6">
          <Link
            to="/services"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10">
              <service.icon
                className="h-6 w-6 text-accent-soft"
                aria-hidden="true"
              />
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-accent-soft">
              {service.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-border pt-16 pb-24">
        <div className="w-[75%] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 rounded-[2rem] border border-border-strong bg-surface/70 p-6 sm:p-8 backdrop-blur"
          >
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              {service.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-[1.5rem] border border-border bg-surface/80 p-6 sm:p-7"
            >
              <h2 className="mb-5 font-display text-xl font-semibold text-text-primary">
                What's included
              </h2>
              <ul className="space-y-3.5">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                      <Check
                        className="h-3 w-3 text-accent-soft"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[1.5rem] border border-border bg-surface/80 p-6 sm:p-7"
            >
              <h2 className="mb-5 font-display text-xl font-semibold text-text-primary">
                Typical stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-border pt-16 pb-24">
        <div className="w-[75%] mx-auto px-4 sm:px-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-text-primary">
              Related services
            </h2>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft transition-colors hover:text-accent"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="card-glow rounded-[1.25rem] border border-border bg-surface p-5"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                  <s.icon
                    className="h-4 w-4 text-accent-soft"
                    aria-hidden="true"
                  />
                </div>
                <p className="font-display text-sm font-semibold text-text-primary">
                  {s.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand title={`Ready to talk about ${service.title.toLowerCase()}?`} />
    </>
  );
}
