import { motion, AnimatePresence } from 'framer-motion';
import { TRANSITIONS } from '../lib/motion';
import { useDevice } from '../hooks/useDevice';
import { getServiceBySlug } from '../data/services';

export function ServiceVisual({ activeSlug }: { activeSlug: string }) {
  const { reducedMotion } = useDevice();
  const service = getServiceBySlug(activeSlug);

  return (
    <div className="w-full h-full overflow-hidden relative bg-bg flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlug}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: TRANSITIONS.duration.fast, ease: TRANSITIONS.ease }}
          className="absolute inset-0 w-full h-full"
        >
          {service?.image ? (
            <img 
              src={service.image} 
              alt={`${service.title} visualization`}
              className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.1] transition-transform duration-1000"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full bg-surface/30 flex items-center justify-center" />
          )}
          
          {/* Subtle inner shadow/gradient to blend the image into the dark card */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent pointer-events-none mix-blend-multiply" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
