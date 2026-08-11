import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDevice } from '../hooks/useDevice';
import { Terminal, CheckCircle2, CloudLightning, Code2, Database } from 'lucide-react';

export function TechVisual({ scale = 1, opacity = 1 }: { scale?: any; opacity?: any }) {
  const { reducedMotion } = useDevice();
  const [codeLines, setCodeLines] = useState<number>(0);

  // Simulate typing code lines
  useEffect(() => {
    if (reducedMotion) {
      setCodeLines(5);
      return;
    }
    const interval = setInterval(() => {
      setCodeLines((prev) => (prev >= 5 ? 0 : prev + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const CODE_SNIPPETS = [
    "import { architecture } from '@core/system';",
    'const cloudStack = new CloudInfrastructure({',
    "  region: 'us-east-1',",
    '  highAvailability: true,',
    "  aiEngine: 'GPT-4-turbo'",
    '});',
  ];

  return (
    <motion.div
      style={{ scale, opacity }}
      className="border-border/50 relative flex h-[40vh] max-h-[500px] min-h-[350px] w-full flex-col overflow-hidden rounded-2xl border bg-[#0A0A0A]/80 font-mono text-sm shadow-2xl backdrop-blur-xl"
    >
      {/* Fake Mac Window Header */}
      <div className="flex h-10 items-center border-b border-white/5 bg-white/[0.02] px-4">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-text-tertiary mx-auto flex items-center gap-2 text-xs">
          <Terminal className="h-3 w-3" />
          <span>system_deploy.ts</span>
        </div>
      </div>

      <div className="relative flex flex-1 gap-6 p-4 sm:p-6">
        {/* Left Side: Code Editor */}
        <div className="relative z-10 flex flex-1 flex-col gap-2">
          {CODE_SNIPPETS.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: codeLines >= i ? 1 : 0,
                x: codeLines >= i ? 0 : -10,
              }}
              transition={{ duration: 0.3 }}
              className={`text-xs sm:text-sm ${
                line.includes('import')
                  ? 'text-purple-400'
                  : line.includes('const')
                    ? 'text-blue-400'
                    : line.includes("'")
                      ? 'text-green-400'
                      : 'text-gray-300'
              }`}
            >
              <span className="mr-4 text-gray-600 select-none">{i + 1}</span>
              {line}
            </motion.div>
          ))}

          {/* Blinking Cursor */}
          {!reducedMotion && codeLines < 5 && (
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="bg-accent mt-2 ml-8 h-4 w-2"
            />
          )}
        </div>

        {/* Right Side: Deployment Pipeline / Status */}
        <div className="relative z-10 hidden w-48 flex-col gap-4 border-l border-white/5 pl-6 sm:flex">
          <div className="text-text-tertiary mb-2 text-[10px] font-semibold tracking-widest uppercase">
            Live Status
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
              <Code2 className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-text-primary text-xs">API Gateway</span>
              <span className="flex items-center gap-1 text-[10px] text-green-400">
                <CheckCircle2 className="h-3 w-3" /> Online
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10">
              <Database className="h-4 w-4 text-purple-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-text-primary text-xs">Data Lake</span>
              <span className="flex items-center gap-1 text-[10px] text-green-400">
                <CheckCircle2 className="h-3 w-3" /> Synced
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-accent/10 border-accent/20 flex h-8 w-8 items-center justify-center rounded-lg border">
              <CloudLightning className="text-accent h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-text-primary text-xs">AI Engine</span>
              <span className="text-accent-soft flex items-center gap-1 text-[10px]">
                {!reducedMotion ? (
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    Processing...
                  </motion.span>
                ) : (
                  <span>Active</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Decorative background gradients for the IDE */}
        <div className="bg-accent/5 pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full blur-[80px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/5 blur-[80px]" />
      </div>
    </motion.div>
  );
}
