import { useDevice } from '../hooks/useDevice';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ROW_1 = [
  'React', 'TypeScript', 'Node.js', 'Go', 'Python', 'AWS', 'PostgreSQL',
  'GraphQL', 'Docker', 'Kubernetes', 'Redis', 'Next.js', 'Tailwind'
];
const TECH_ROW_1 = [...ROW_1, ...ROW_1];

const ROW_2 = [
  'Figma', 'OpenAI', 'Kafka', 'ClickHouse', 'Terraform', 'WebSockets', 'LangChain',
  'Firebase', 'Swift', 'Kotlin', 'React Native', 'PyTorch', 'Jest'
];
const TECH_ROW_2 = [...ROW_2, ...ROW_2];

function TechBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center shrink-0 px-8 py-2">
      <span className="font-display text-4xl sm:text-5xl font-bold text-text-secondary hover:text-white transition-colors cursor-default whitespace-nowrap uppercase tracking-tighter mix-blend-plus-lighter">{label}</span>
    </div>
  );
}

export function HighlightsMarquee() {
  const { reducedMotion } = useDevice();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "20% 0px 20% 0px" });
  
  const marqueeVariants: any = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
    animateReverse: {
      x: [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 35,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section ref={containerRef} className="relative py-20 bg-bg overflow-hidden flex flex-col gap-6 mask-fade border-y border-border-strong/30">
      <div className="absolute inset-0 bg-surface/30 pointer-events-none" />

      {/* Row 1 */}
      <div className="relative flex overflow-hidden">
        {(!reducedMotion && isInView) ? (
          <div className="marquee-track gap-4">
            {TECH_ROW_1.map((tech, i) => (
              <TechBadge key={`${tech}-${i}`} label={tech} />
            ))}
          </div>
        ) : (
          <div className="flex gap-4 px-4 overflow-x-auto snap-x hide-scrollbar">
             {TECH_ROW_1.slice(0, 10).map((tech, i) => (
              <div key={`${tech}-${i}`} className="snap-start">
                <TechBadge label={tech} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Row 2 */}
      <div className="relative flex overflow-hidden">
         {(!reducedMotion && isInView) ? (
          <div className="marquee-track gap-4" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
            {TECH_ROW_2.map((tech, i) => (
              <TechBadge key={`${tech}-${i}`} label={tech} />
            ))}
          </div>
        ) : (
          <div className="flex gap-4 px-4 overflow-x-auto snap-x hide-scrollbar" dir="ltr">
             {TECH_ROW_2.slice(0, 10).map((tech, i) => (
              <div key={`${tech}-${i}`} className="snap-start">
                <TechBadge label={tech} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
