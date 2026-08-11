import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQS, type Faq } from '../data/faqs';

function FaqItem({ faq, open, onToggle }: { faq: Faq; open: boolean; onToggle: () => void }) {
  const answerId = `faq-answer-${faq.question.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div
      className={`relative rounded-[2rem] border overflow-hidden transition-all duration-500 ${open
        ? 'border-accent/40 bg-accent/5 shadow-[0_0_30px_rgba(var(--accent),0.15)]'
        : 'border-white/5 bg-surface/50 hover:bg-surface hover:border-white/10'
        }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 px-6 sm:px-10 py-6 sm:py-8 text-left group"
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span className={`font-display text-lg sm:text-xl font-medium transition-colors ${open ? 'text-white' : 'text-text-primary group-hover:text-white'}`}>
          {faq.question}
        </span>
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${open ? 'bg-accent/20 text-accent shadow-[0_0_15px_rgba(var(--accent),0.3)]' : 'bg-white/5 text-text-secondary group-hover:bg-white/10 group-hover:text-white'}`}>
          <Plus
            className={`w-5 h-5 transition-transform duration-500 ${open ? 'rotate-45' : ''}`}
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
            <div className="px-6 sm:px-10 pb-8">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />
              <p className="text-base text-text-secondary leading-relaxed max-w-3xl">
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
    <section className="relative py-24 sm:py-32 lg:py-40 border-t border-border overflow-hidden bg-bg">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-[80%] max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <div className="max-w-3xl mx-auto mb-12 text-center flex flex-col items-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-soft mb-6">Common questions</p>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-[4rem] font-bold tracking-tighter leading-[0.95] text-text-primary">
            Before you reach out.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
