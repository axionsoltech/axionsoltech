import { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { ArchitectureNode } from './ArchitectureNode';
import { ArchitectureConnections } from './ArchitectureConnections';
import { useDevice } from '../hooks/useDevice';

const nodes = [
  { id: '01', title: 'PRODUCT', subtitle: 'Digital experience', step: 0, top: '10%', left: '50%' },
  { id: '02', title: 'FRONTEND', subtitle: 'User interface', step: 1, top: '25%', left: '50%' },
  { id: '03', title: 'API', subtitle: 'GraphQL / REST', step: 2, top: '40%', left: '50%' },
  { id: '04', title: 'BACKEND', subtitle: 'Microservices', step: 3, top: '60%', left: '25%' },
  { id: '05', title: 'AI', subtitle: 'Models / Agents', step: 3, top: '60%', left: '75%' },
  { id: '06', title: 'DATA', subtitle: 'Pipelines', step: 4, top: '80%', left: '50%' },
  { id: '07', title: 'CLOUD', subtitle: 'Infrastructure', step: 5, top: '95%', left: '50%' },
];

export function EngineeringArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const { reducedMotion } = useDevice();
  const [currentStep, setCurrentStep] = useState(-1);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (reducedMotion) {
      setCurrentStep(6);
      return;
    }
    if (latest >= 0.95) setCurrentStep(6);
    else if (latest >= 0.9) setCurrentStep(5);
    else if (latest >= 0.8) setCurrentStep(4);
    else if (latest >= 0.7) setCurrentStep(3);
    else if (latest >= 0.5) setCurrentStep(2);
    else if (latest >= 0.3) setCurrentStep(1);
    else if (latest >= 0.1) setCurrentStep(0);
    else setCurrentStep(-1);
  });

  return (
    <section className="bg-bg border-border border-y">
      {/* 
        Mobile Layout 
        Standard vertical flow, no sticky.
      */}
      <div className="px-4 py-16 md:hidden">
        <div className="mb-16 text-center">
          <h2 className="font-display mb-4 text-4xl font-bold tracking-tighter text-white uppercase sm:text-5xl lg:text-6xl">
            How we engineer
          </h2>
          <p className="text-text-secondary mx-auto max-w-xs text-sm">
            (Switch to desktop to experience the full interactive architecture viewer)
          </p>
        </div>

        <div className="relative z-20 mx-auto flex w-full max-w-sm flex-col items-center gap-8">
          {nodes.map((node) => (
            <ArchitectureNode
              key={node.id}
              id={node.id}
              title={node.title}
              subtitle={node.subtitle}
              active={true}
              isMobile={true}
            />
          ))}
        </div>
      </div>

      {/* Desktop Layout (Sticky/Scroll) */}
      <div className="relative hidden md:block" ref={containerRef} style={{ height: '400vh' }}>
        {/* Sticky Stage */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="z-10 mx-auto flex w-full md:w-[80%] max-w-7xl items-center justify-between">
            {/* Left: Sticky Information Stage */}
            <div className="flex w-[35%] flex-col justify-center">
              <p className="text-accent-soft mb-6 text-xs font-medium tracking-[0.2em] uppercase">
                Engineering Architecture
              </p>
              <h2 className="font-display text-text-primary mb-8 text-5xl leading-[0.95] font-bold tracking-tighter sm:text-7xl lg:text-[5.5rem]">
                Engineering <br /> without <br /> the black box.
              </h2>
              <p className="text-text-secondary mb-12 max-w-lg text-lg leading-relaxed sm:text-xl">
                From product architecture to production infrastructure, we design systems that are
                built to scale.
              </p>

              {/* Final State Text */}
              <div
                className={`transition-all duration-1000 ${
                  currentStep >= 6 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <div className="border-accent/30 bg-accent/5 inline-flex items-center gap-3 rounded-full border px-4 py-2">
                  <div className="bg-accent h-2 w-2 animate-pulse rounded-full" />
                  <span className="text-accent font-mono text-sm tracking-widest uppercase">
                    Built to scale.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Architecture Visualization */}
            <div className="relative h-[80vh] min-h-[600px] w-[60%] lg:w-[55%]">
              <div className="absolute inset-0 mx-auto w-full max-w-3xl">
                {/* SVG Connections Map */}
                <ArchitectureConnections progress={scrollYProgress} />

                {/* Nodes Map */}
                {nodes.map((node) => (
                  <ArchitectureNode
                    key={node.id}
                    id={node.id}
                    title={node.title}
                    subtitle={node.subtitle}
                    active={currentStep >= node.step}
                    style={{ top: node.top, left: node.left }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
