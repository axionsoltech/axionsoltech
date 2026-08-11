import { useRef, useState } from 'react';

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
      className={`${isMobile ? 'relative w-full' : 'absolute'} z-10 flex flex-col transition-all duration-700 ease-out ${!isMobile && '-translate-x-1/2 -translate-y-1/2'} ${
        active ? 'scale-100 opacity-100' : 'scale-95 opacity-30'
      } ${className}`}
      style={style}
    >
      <div className="group relative">
        {/* Subtle active glow */}
        <div
          className={`bg-accent/20 absolute inset-0 rounded-full blur-xl transition-opacity duration-700 ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Node Box */}
        <div
          className={`bg-surface/80 relative flex min-w-[160px] flex-col items-center justify-center rounded-xl border p-4 backdrop-blur-md transition-all duration-700 ${
            active
              ? 'border-accent/60 shadow-[0_0_20px_rgba(var(--accent),0.1)]'
              : 'border-border/40'
          }`}
        >
          <div className="mb-2 flex w-full items-center justify-between">
            <span
              className={`font-mono text-xs transition-colors duration-700 ${
                active ? 'text-accent' : 'text-text-secondary/50'
              }`}
            >
              {id}
            </span>
            {/* Active indicator dot */}
            <div
              className={`h-2 w-2 rounded-full transition-all duration-700 ${
                active
                  ? 'bg-accent shadow-[0_0_8px_rgba(var(--accent),0.8)]'
                  : 'bg-surface border-border border'
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
              className={`mt-1 text-xs tracking-widest uppercase transition-colors duration-700 ${
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
