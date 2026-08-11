import { motion } from 'framer-motion';

interface ArchitectureNodeProps {
  id: string;
  title: string;
  subtitle?: string;
  active: boolean;
  className?: string;
  style?: React.CSSProperties;
  isMobile?: boolean;
}

export function ArchitectureNode({
  id,
  title,
  subtitle,
  active,
  className = '',
  style,
  isMobile = false,
}: ArchitectureNodeProps) {
  return (
    <div
      className={`${isMobile ? 'relative w-full' : 'absolute'} flex flex-col z-10 transition-all duration-700 ease-out ${!isMobile && '-translate-x-1/2 -translate-y-1/2'} ${
        active ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
      } ${className}`}
      style={style}
    >
      <div className="relative group">
        {/* Subtle active glow */}
        <div
          className={`absolute inset-0 bg-accent/20 blur-xl rounded-full transition-opacity duration-700 ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Node Box */}
        <div
          className={`relative flex flex-col items-center justify-center bg-surface/80 backdrop-blur-md border rounded-xl p-4 min-w-[160px] transition-all duration-700 ${
            active
              ? 'border-accent/60 shadow-[0_0_20px_rgba(var(--accent),0.1)]'
              : 'border-border/40'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-2">
            <span
              className={`text-xs font-mono transition-colors duration-700 ${
                active ? 'text-accent' : 'text-text-secondary/50'
              }`}
            >
              {id}
            </span>
            {/* Active indicator dot */}
            <div
              className={`w-2 h-2 rounded-full transition-all duration-700 ${
                active ? 'bg-accent shadow-[0_0_8px_rgba(var(--accent),0.8)]' : 'bg-surface border border-border'
              }`}
            />
          </div>
          <h3
            className={`font-display text-lg font-bold tracking-wider transition-colors duration-700 ${
              active ? 'text-text-primary' : 'text-text-secondary'
            }`}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className={`text-xs uppercase tracking-widest mt-1 transition-colors duration-700 ${
                active ? 'text-text-secondary' : 'text-text-secondary/50'
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
