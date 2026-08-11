import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { GitBranch, Activity, ShieldCheck, Zap } from 'lucide-react';
import { useDevice } from '../hooks/useDevice';

const POINTS = [
  {
    title: 'Engineering rigor',
    description:
      'Senior engineers on every project. Code review, testing, and CI gates on every single pull request. Documentation built in from day one.',
    icon: GitBranch,
  },
  {
    title: 'Radical visibility',
    description:
      'Weekly demos, a live roadmap, and direct Slack access to the engineers building your product. Transparent time tracking.',
    icon: Activity,
  },
  {
    title: 'Built for scale',
    description:
      'We design cloud architecture and delivery pipelines that let your team ship confidently—infrastructure as code, from day one.',
    icon: ShieldCheck,
  },
  {
    title: 'Fast execution',
    description:
      'No bloat, no unnecessary meetings. We focus on writing production-ready code and shipping features that move the needle.',
    icon: Zap,
  },
];

function RealisticCard({
  point,
  index,
  total,
  scrollYProgress,
  reducedMotion,
}: {
  point: (typeof POINTS)[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const numTransitions = total - 1;

  // Custom ease-out curve for the drop
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

  const y = useTransform(scrollYProgress, (v) => {
    const currentTransition = v * numTransitions;

    if (index === 0) {
      return currentTransition * -40; // Card 0 pushes up slowly
    }

    if (currentTransition < index - 1) {
      return 1200; // Waiting off screen bottom
    } else if (currentTransition >= index - 1 && currentTransition <= index) {
      // Entering
      const p = currentTransition - (index - 1);
      return 1200 * (1 - easeOut(p));
    } else {
      // Pushed back by subsequent cards
      const pushbackAmount = currentTransition - index;
      return pushbackAmount * -40;
    }
  });

  const scale = useTransform(scrollYProgress, (v) => {
    const currentTransition = v * numTransitions;

    if (index === 0) {
      return 1 - currentTransition * 0.04;
    }

    if (currentTransition < index - 1) return 1.2;
    if (currentTransition >= index - 1 && currentTransition <= index) {
      const p = currentTransition - (index - 1);
      return 1.2 - easeOut(p) * 0.2; // Lands exactly at 1.0
    } else {
      const pushbackAmount = currentTransition - index;
      return 1 - pushbackAmount * 0.04;
    }
  });

  const opacity = useTransform(scrollYProgress, (v) => {
    const currentTransition = v * numTransitions;

    if (index === 0) {
      return 1 - currentTransition * 0.15;
    }

    if (currentTransition < index - 1) return 0;
    if (currentTransition >= index - 1 && currentTransition <= index) {
      const p = currentTransition - (index - 1);
      // Fast fade in, but scales/moves physically
      return Math.min(1, p * 2);
    } else {
      const pushbackAmount = currentTransition - index;
      return 1 - pushbackAmount * 0.15;
    }
  });

  const rotateX = useTransform(scrollYProgress, (v) => {
    const currentTransition = v * numTransitions;

    if (index === 0) {
      return currentTransition * 15; // Tilts back as it gets buried
    }

    if (currentTransition < index - 1) return -45; // Tilted heavily forward while falling
    if (currentTransition >= index - 1 && currentTransition <= index) {
      const p = currentTransition - (index - 1);
      return -45 * (1 - easeOut(p)); // Settles to 0
    } else {
      const pushbackAmount = currentTransition - index;
      return pushbackAmount * 15; // Tilts back
    }
  });

  const blur = useTransform(scrollYProgress, (v) => {
    if (reducedMotion) return 'none';
    const currentTransition = v * numTransitions;
    let pushbackAmount = 0;

    if (index === 0) {
      pushbackAmount = currentTransition;
    } else if (currentTransition > index) {
      pushbackAmount = currentTransition - index;
    }

    return `blur(${pushbackAmount * 3}px)`;
  });

  // A slight static rotation so the deck looks messy and organic
  const staticRotateZ = (index % 2 === 0 ? 1 : -1) * (index * 2);

  return (
    <motion.div
      style={
        !reducedMotion
          ? {
              y,
              scale,
              opacity,
              rotateX,
              rotateZ: staticRotateZ,
              filter: blur,
              transformPerspective: 1200,
              zIndex: index,
            }
          : { zIndex: index }
      }
      className={`absolute inset-0 flex h-full w-full origin-bottom items-center justify-center px-4 ${reducedMotion && index !== 0 ? 'hidden' : ''}`}
    >
      <div className="bg-surface/95 border-border/80 relative flex w-full max-w-xl flex-col items-start gap-6 overflow-hidden rounded-[2rem] border p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-3xl sm:flex-row sm:gap-8 sm:rounded-[2.5rem] sm:p-10 lg:max-w-2xl lg:p-12">
        {/* Subtle inner glare effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

        <div className="bg-accent-soft/10 text-accent-soft relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-inner sm:h-16 sm:w-16">
          <point.icon className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>
        <div className="relative z-10 flex-1">
          <div className="text-text-muted mb-2 font-mono text-[10px] tracking-[0.2em] uppercase sm:mb-3 sm:text-xs">
            Card 0{index + 1}
          </div>
          <h3 className="font-display text-text-primary mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
            {point.title}
          </h3>
          <p className="text-text-secondary text-base leading-relaxed sm:text-lg">
            {point.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useDevice();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      className="bg-bg border-border relative border-b"
      style={{ height: !reducedMotion ? `${POINTS.length * 100}vh` : 'auto' }}
    >
      <div
        className={`${!reducedMotion ? 'sticky top-0 h-screen' : 'py-16 md:py-32'} mx-auto flex w-[80%] max-w-7xl flex-col overflow-hidden px-4 sm:px-6 lg:flex-row`}
      >
        {/* Left Sticky Content */}
        <div
          className={`w-full lg:w-[40%] ${!reducedMotion ? 'flex h-full flex-col justify-center' : ''} relative z-20 pr-0 lg:pr-12`}
        >
          <div className="max-w-xl">
            <p className="text-accent-soft mb-6 text-xs font-medium tracking-[0.2em] uppercase">
              Why Us
            </p>
            <h2 className="font-display text-text-primary mb-8 text-5xl leading-[0.95] font-bold tracking-tighter sm:text-7xl lg:text-[5rem]">
              We don't <br /> compromise.
            </h2>
            <p className="text-text-secondary mb-8 max-w-lg text-lg leading-relaxed sm:text-xl">
              Our approach is simple: write excellent code, communicate transparently, and treat
              your business like our own.
            </p>
          </div>
        </div>

        {/* Right Cards Stack */}
        <div
          className={`w-full lg:w-[60%] ${!reducedMotion ? 'relative h-full' : 'mt-16 flex flex-col gap-8 px-4'}`}
        >
          {POINTS.map((point, i) => (
            <RealisticCard
              key={point.title}
              point={point}
              index={i}
              total={POINTS.length}
              scrollYProgress={scrollYProgress}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
