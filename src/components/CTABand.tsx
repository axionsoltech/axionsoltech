import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CTABand({ title = "Let's build what's next.", subtitle = "Stop managing tickets. Start shipping product." }: { title?: string; subtitle?: string }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-accent text-white group cursor-pointer" data-cursor="VIEW">
      <Link to="/contact" className="absolute inset-0 z-20">
        <span className="sr-only">Contact us</span>
      </Link>
      
      {/* Dynamic tech pattern background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none transition-transform duration-1000 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[80%] max-w-7xl mx-auto px-4 sm:px-6 text-center z-10 flex flex-col items-center"
      >
        <h2 className="font-display text-4xl sm:text-6xl md:text-[5rem] lg:text-[6.5rem] font-bold tracking-tighter leading-[0.95] uppercase max-w-5xl break-words hyphens-auto">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-8 text-xl sm:text-2xl font-medium text-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        
        <div className="mt-16 inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-bold text-accent transition-all group-hover:scale-105 group-hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]">
          Start a project
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  );
}
