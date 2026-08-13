import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CTABand({
  title = "Let's build what's next.",
  subtitle = 'Stop managing tickets. Start shipping product.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section
      className="bg-accent group relative flex min-h-[90vh] cursor-pointer items-center overflow-hidden text-white"
      data-cursor="VIEW"
    >
      <Link to="/contact" className="absolute inset-0 z-20">
        <span className="sr-only">Contact us</span>
      </Link>

      {/* Dynamic tech pattern background */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20 transition-transform duration-1000 group-hover:scale-105" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex w-full md:w-[80%] max-w-7xl flex-col items-center px-4 text-center sm:px-6"
      >
        <h2 className="font-display max-w-5xl text-4xl leading-[0.95] font-bold tracking-tighter break-words hyphens-auto uppercase sm:text-6xl md:text-[5rem] lg:text-[6.5rem]">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-8 max-w-2xl text-xl font-medium text-white/80 sm:text-2xl">
            {subtitle}
          </p>
        )}

        <div className="text-accent mt-16 inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-bold transition-all group-hover:scale-105 group-hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]">
          Start a project
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </section>
  );
}
