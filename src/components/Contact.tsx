import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react';

/** UI-only for now — wire this up to a real form backend (e.g. an email API or a serverless
 *  function) before launch. Currently just shows a client-side confirmation state. */
export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="glow-orb top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-[80%] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="text-accent-soft mb-3 text-xs font-medium tracking-[0.2em] uppercase">
            Let's talk
          </p>
          <h2 className="font-display text-text-primary text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Have a project in mind?
          </h2>
          <p className="text-text-secondary mx-auto mt-4 max-w-2xl text-base leading-relaxed">
            Tell us what you're building. We'll come back with a clear plan, timeline, and a
            straight answer on whether it's a fit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border-border-strong bg-surface/80 mx-auto max-w-4xl rounded-[2rem] border p-6 shadow-[0_30px_100px_-40px_rgba(59,130,246,0.45)] backdrop-blur sm:p-10"
        >
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 className="text-accent-soft mb-4 h-10 w-10" aria-hidden="true" />
              <p className="font-display text-text-primary text-lg font-semibold">
                Thanks — message received.
              </p>
              <p className="text-text-secondary mt-2 text-sm">
                We'll get back to you within one business day.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="border-border bg-surface-hover/50 rounded-[1.25rem] border p-6 sm:p-7">
                <p className="text-accent-soft text-xs font-medium tracking-[0.2em] uppercase">
                  What to expect
                </p>
                <h3 className="font-display text-text-primary mt-3 text-xl font-semibold tracking-tight">
                  A thoughtful response, not a sales pitch.
                </h3>
                <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                  Share your goals, constraints, and timeline. We’ll respond with a practical next
                  step, whether that means a quick intro call or a more detailed scope review.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="border-border bg-surface/60 flex items-start gap-3 rounded-xl border p-3">
                    <Mail className="text-accent-soft mt-0.5 h-4 w-4" aria-hidden="true" />
                    <span className="text-text-secondary text-sm">hello@axionsoltech.com</span>
                  </div>
                  <div className="border-border bg-surface/60 text-text-secondary rounded-xl border p-3 text-sm">
                    Usually replies within one business day.
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-text-secondary text-xs">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    placeholder="Jane Doe"
                    className="border-border bg-bg text-text-primary placeholder:text-text-muted focus:border-accent-dim focus:ring-accent/20 rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus:ring-2 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-text-secondary text-xs">
                    Email
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="jane@company.com"
                    className="border-border bg-bg text-text-primary placeholder:text-text-muted focus:border-accent-dim focus:ring-accent/20 rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus:ring-2 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="message" className="text-text-secondary text-xs">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="What are you building, and what does success look like?"
                    className="border-border bg-bg text-text-primary placeholder:text-text-muted focus:border-accent-dim focus:ring-accent/20 resize-none rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus:ring-2 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-accent btn-glow mt-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all sm:col-span-2"
                >
                  Send message
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="text-text-muted mt-1 flex items-center justify-center gap-1.5 text-xs sm:col-span-2">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  or write to us directly at hello@axionsoltech.com
                </p>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
