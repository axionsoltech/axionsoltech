import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Annotation({
  children,
  type,
  color = "currentColor",
  delay = 0.2,
  strokeWidth = 4,
}: {
  children: React.ReactNode;
  type: "circle" | "underline" | "strikethrough" | "scribble";
  color?: string;
  delay?: number;
  strokeWidth?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        className="absolute pointer-events-none w-full h-full inset-0"
        style={{ 
          color, 
          overflow: "visible", 
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {type === "circle" && (
          <motion.path
            d="M -5,50 C -5,-5 25,-15 50,-15 C 75,-15 105,20 105,50 C 105,105 75,115 50,115 C 25,115 -10,85 -5,50 C 0,15 30,-10 50,-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay, ease: "easeInOut" }}
          />
        )}
        {type === "underline" && (
          <motion.path
            d="M -5,115 Q 30,100 50,115 T 105,105"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth + 3}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
          />
        )}
        {type === "strikethrough" && (
          <motion.path
            d="M -5,50 Q 50,45 105,55"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
          />
        )}
      </svg>
    </span>
  );
}
