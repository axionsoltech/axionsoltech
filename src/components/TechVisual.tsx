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
      setCodeLines(prev => (prev >= 5 ? 0 : prev + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const CODE_SNIPPETS = [
    "import { architecture } from '@core/system';",
    "const cloudStack = new CloudInfrastructure({",
    "  region: 'us-east-1',",
    "  highAvailability: true,",
    "  aiEngine: 'GPT-4-turbo'",
    "});",
  ];

  return (
    <motion.div
      style={{ scale, opacity }}
      className="relative w-full h-[40vh] min-h-[350px] max-h-[500px] border border-border/50 rounded-2xl bg-[#0A0A0A]/80 overflow-hidden backdrop-blur-xl flex flex-col font-mono text-sm shadow-2xl"
    >
      {/* Fake Mac Window Header */}
      <div className="h-10 border-b border-white/5 flex items-center px-4 bg-white/[0.02]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto flex items-center gap-2 text-text-tertiary text-xs">
          <Terminal className="w-3 h-3" />
          <span>system_deploy.ts</span>
        </div>
      </div>

      <div className="flex flex-1 p-4 sm:p-6 gap-6 relative">
        {/* Left Side: Code Editor */}
        <div className="flex-1 flex flex-col gap-2 relative z-10">
          {CODE_SNIPPETS.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: codeLines >= i ? 1 : 0,
                x: codeLines >= i ? 0 : -10
              }}
              transition={{ duration: 0.3 }}
              className={`text-xs sm:text-sm ${
                line.includes('import') ? 'text-purple-400' :
                line.includes('const') ? 'text-blue-400' :
                line.includes("'") ? 'text-green-400' : 'text-gray-300'
              }`}
            >
              <span className="text-gray-600 mr-4 select-none">{i + 1}</span>
              {line}
            </motion.div>
          ))}
          
          {/* Blinking Cursor */}
          {!reducedMotion && codeLines < 5 && (
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-accent mt-2 ml-8"
            />
          )}
        </div>

        {/* Right Side: Deployment Pipeline / Status */}
        <div className="hidden sm:flex w-48 flex-col gap-4 border-l border-white/5 pl-6 relative z-10">
          <div className="text-[10px] uppercase tracking-widest text-text-tertiary font-semibold mb-2">Live Status</div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Code2 className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-primary">API Gateway</span>
              <span className="text-[10px] text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Online</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Database className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-primary">Data Lake</span>
              <span className="text-[10px] text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Synced</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
              <CloudLightning className="w-4 h-4 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-primary">AI Engine</span>
              <span className="text-[10px] text-accent-soft flex items-center gap-1">
                {!reducedMotion ? (
                  <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>Processing...</motion.span>
                ) : (
                  <span>Active</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Decorative background gradients for the IDE */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
      </div>
    </motion.div>
  );
}
