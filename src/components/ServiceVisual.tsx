import { motion, AnimatePresence } from 'framer-motion';
import { TRANSITIONS } from '../lib/motion';
import { useDevice } from '../hooks/useDevice';
import { getServiceBySlug } from '../data/services';

export function ServiceVisual({ activeSlug }: { activeSlug: string }) {
  const { reducedMotion } = useDevice();
  const service = getServiceBySlug(activeSlug);

  return (
    <div className="bg-bg relative flex h-full w-full items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlug}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: TRANSITIONS.duration.fast, ease: TRANSITIONS.ease }}
          className="absolute inset-0 h-full w-full"
        >
          {service?.image ? (
            <img
              src={service.image}
              alt={`${service.title} visualization`}
              className="h-full w-full object-cover brightness-[0.85] contrast-[1.1] filter transition-transform duration-1000"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="bg-surface/30 flex h-full w-full items-center justify-center" />
          )}

          {/* Subtle inner shadow/gradient to blend the image into the dark card */}
          <div className="from-bg/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent mix-blend-multiply" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
