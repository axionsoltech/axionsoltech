import { useDevice } from '../hooks/useDevice';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ROW_1 = [
  'React',
  'TypeScript',
  'Node.js',
  'Go',
  'Python',
  'AWS',
  'PostgreSQL',
  'GraphQL',
  'Docker',
  'Kubernetes',
  'Redis',
  'Next.js',
  'Tailwind',
];
const TECH_ROW_1 = [...ROW_1, ...ROW_1];

const ROW_2 = [
  'Figma',
  'OpenAI',
  'Kafka',
  'ClickHouse',
  'Terraform',
  'WebSockets',
  'LangChain',
  'Firebase',
  'Swift',
  'Kotlin',
  'React Native',
  'PyTorch',
  'Jest',
];
const TECH_ROW_2 = [...ROW_2, ...ROW_2];

function TechBadge({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center justify-center px-8 py-2">
      <span className="font-display text-text-secondary cursor-default text-4xl font-bold tracking-tighter whitespace-nowrap uppercase mix-blend-plus-lighter transition-colors hover:text-white sm:text-5xl">
        {label}
      </span>
    </div>
  );
}

export function HighlightsMarquee() {
  const { reducedMotion } = useDevice();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '20% 0px 20% 0px' });

  return (
    <section
      ref={containerRef}
      className="bg-bg mask-fade border-border-strong/30 relative flex flex-col gap-6 overflow-hidden border-y py-20"
    >
      <div className="bg-surface/30 pointer-events-none absolute inset-0" />

      {/* Row 1 */}
      <div className="relative flex overflow-hidden">
        {!reducedMotion && isInView ? (
          <div className="marquee-track gap-4">
            {TECH_ROW_1.map((tech, i) => (
              <TechBadge key={`${tech}-${i}`} label={tech} />
            ))}
          </div>
        ) : (
          <div className="hide-scrollbar flex snap-x gap-4 overflow-x-auto px-4">
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
        {!reducedMotion && isInView ? (
          <div
            className="marquee-track gap-4"
            style={{ animationDirection: 'reverse', animationDuration: '35s' }}
          >
            {TECH_ROW_2.map((tech, i) => (
              <TechBadge key={`${tech}-${i}`} label={tech} />
            ))}
          </div>
        ) : (
          <div className="hide-scrollbar flex snap-x gap-4 overflow-x-auto px-4" dir="ltr">
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
