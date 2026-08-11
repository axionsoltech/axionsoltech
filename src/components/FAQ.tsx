import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQS, type Faq } from '../data/faqs';

function FaqItem({ faq, open, onToggle }: { faq: Faq; open: boolean; onToggle: () => void }) {
  const answerId = `faq-answer-${faq.question.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border transition-all duration-500 ${
        open
          ? 'border-accent/40 bg-accent/5 shadow-[0_0_30px_rgba(var(--accent),0.15)]'
          : 'bg-surface/50 hover:bg-surface border-white/5 hover:border-white/10'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-10 sm:py-8"
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span
          className={`font-display text-lg font-medium transition-colors sm:text-xl ${open ? 'text-white' : 'text-text-primary group-hover:text-white'}`}
        >
          {faq.question}
        </span>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${open ? 'bg-accent/20 text-accent shadow-[0_0_15px_rgba(var(--accent),0.3)]' : 'text-text-secondary bg-white/5 group-hover:bg-white/10 group-hover:text-white'}`}
        >
          <Plus
            className={`h-5 w-5 transition-transform duration-500 ${open ? 'rotate-45' : ''}`}
            aria-hidden="true"
          />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={answerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 sm:px-10">
              <div className="via-border mb-6 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
              <p className="text-text-secondary max-w-3xl text-base leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-border bg-bg relative overflow-hidden border-t py-24 sm:py-32 lg:py-40">
      {/* Ambient background glow */}
      <div className="bg-accent/5 pointer-events-none absolute top-1/2 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto w-[80%] max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
          <p className="text-accent-soft mb-6 text-xs font-medium tracking-[0.2em] uppercase">
            Common questions
          </p>
          <h2 className="font-display text-text-primary text-5xl leading-[0.95] font-bold tracking-tighter sm:text-7xl lg:text-[4rem]">
            Before you reach out.
          </h2>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
