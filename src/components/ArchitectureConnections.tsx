import { motion, MotionValue, useTransform } from 'framer-motion';
import { useDevice } from '../hooks/useDevice';

interface ArchitectureConnectionsProps {
  progress: MotionValue<number>;
}

export function ArchitectureConnections({ progress }: ArchitectureConnectionsProps) {
  const { reducedMotion } = useDevice();

  // If reduced motion, we just show them fully drawn.
  // Otherwise, we map scroll progress to pathLengths.
  const p1 = useTransform(progress, [0.2, 0.3], [0, 1]);
  const p2 = useTransform(progress, [0.4, 0.5], [0, 1]);
  const p3 = useTransform(progress, [0.6, 0.7], [0, 1]);
  const p4 = useTransform(progress, [0.7, 0.8], [0, 1]);
  const p5 = useTransform(progress, [0.8, 0.9], [0, 1]);

  const active1 = useTransform(progress, (v) => v >= 0.3);
  const active2 = useTransform(progress, (v) => v >= 0.5);
  const active3 = useTransform(progress, (v) => v >= 0.7);
  const active4 = useTransform(progress, (v) => v >= 0.8);
  const active5 = useTransform(progress, (v) => v >= 0.9);

  const drawStyle = (pathValue: MotionValue<number>) =>
    reducedMotion ? { pathLength: 1 } : { pathLength: pathValue };

  const paths = [
    // PRODUCT -> FRONTEND (10 to 25)
    { id: 1, d: 'M 50,10 L 50,25', p: p1, a: active1 },
    // FRONTEND -> API (25 to 40)
    { id: 2, d: 'M 50,25 L 50,40', p: p2, a: active2 },
    // API -> BACKEND (40 to 60, left 25)
    { id: 3, d: 'M 50,40 L 50,50 L 25,50 L 25,60', p: p3, a: active3 },
    // API -> AI (40 to 60, right 75)
    { id: 4, d: 'M 50,40 L 50,50 L 75,50 L 75,60', p: p3, a: active3 },
    // BACKEND -> DATA (60 to 80, from 25 to 50)
    { id: 5, d: 'M 25,60 L 25,70 L 50,70 L 50,80', p: p4, a: active4 },
    // AI -> DATA (60 to 80, from 75 to 50)
    { id: 6, d: 'M 75,60 L 75,70 L 50,70 L 50,80', p: p4, a: active4 },
    // DATA -> CLOUD (80 to 95)
    { id: 7, d: 'M 50,80 L 50,95', p: p5, a: active5 },
  ];

  return (
    <div className="absolute inset-0 z-0">
      <svg
        className="h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {paths.map((path) => (
          <g key={path.id}>
            {/* Base Line */}
            <motion.path
              d={path.d}
              fill="none"
              stroke="currentColor"
              className="text-border/40"
              strokeWidth="0.5"
              strokeLinejoin="round"
              style={drawStyle(path.p)}
            />
            {/* Active Highlight Line */}
            <motion.path
              d={path.d}
              fill="none"
              stroke="currentColor"
              className="text-accent/60"
              strokeWidth="0.5"
              strokeLinejoin="round"
              style={{
                pathLength: reducedMotion ? 1 : path.p,
                opacity: path.a as any, // Only visible when fully drawn
              }}
            />
            {/* Data Pulse (Animated dash array) */}
            <motion.path
              d={path.d}
              fill="none"
              stroke="currentColor"
              className="text-accent"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeDasharray="1 15"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -32 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              style={{
                opacity: path.a as any,
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
