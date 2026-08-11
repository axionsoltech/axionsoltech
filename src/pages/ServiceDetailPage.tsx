import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { getServiceBySlug, SERVICES } from '../data/services';
import { CTABand } from '../components/CTABand';
import { usePageTitle } from '../hooks/usePageTitle';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  usePageTitle(service?.title ?? 'Service');

  if (!service) return <Navigate to="/services" replace />;

  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="bg-grid absolute inset-0" aria-hidden="true" />
        <div
          className="glow-orb -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-[75%] px-4 sm:px-6">
          <Link
            to="/services"
            className="text-text-secondary hover:text-text-primary mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="border-accent/20 bg-accent/10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border">
              <service.icon className="text-accent-soft h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="font-display text-text-primary text-3xl font-semibold tracking-tight sm:text-5xl">
              {service.title}
            </h1>
            <p className="text-accent-soft mt-4 max-w-2xl text-lg">{service.tagline}</p>
          </motion.div>
        </div>
      </section>

      <section className="border-border relative border-t pt-16 pb-24">
        <div className="mx-auto w-[75%] px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-border-strong bg-surface/70 mb-12 rounded-[2rem] border p-6 backdrop-blur sm:p-8"
          >
            <p className="text-text-secondary text-base leading-relaxed sm:text-lg">
              {service.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="border-border bg-surface/80 rounded-[1.5rem] border p-6 sm:p-7"
            >
              <h2 className="font-display text-text-primary mb-5 text-xl font-semibold">
                What's included
              </h2>
              <ul className="space-y-3.5">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="bg-accent/15 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                      <Check className="text-accent-soft h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-border bg-surface/80 rounded-[1.5rem] border p-6 sm:p-7"
            >
              <h2 className="font-display text-text-primary mb-5 text-xl font-semibold">
                Typical stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-border bg-surface text-text-secondary rounded-full border px-3.5 py-1.5 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-border relative border-t pt-16 pb-24">
        <div className="mx-auto w-[75%] px-4 sm:px-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="font-display text-text-primary text-xl font-semibold">
              Related services
            </h2>
            <Link
              to="/services"
              className="text-accent-soft hover:text-accent inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
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
                className="card-glow border-border bg-surface rounded-[1.25rem] border p-5"
              >
                <div className="bg-accent/10 mb-4 flex h-9 w-9 items-center justify-center rounded-lg">
                  <s.icon className="text-accent-soft h-4 w-4" aria-hidden="true" />
                </div>
                <p className="font-display text-text-primary text-sm font-semibold">{s.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand title={`Ready to talk about ${service.title.toLowerCase()}?`} />
    </>
  );
}
