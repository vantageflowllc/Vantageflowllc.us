"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FlowLineProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
  once?: boolean;
}

/**
 * The Vantage Line: a single continuous stroke used across the site as the
 * brand's signature — section dividers, nav underline, loading state, and
 * the hero. It represents "vantage point" (sightline) and "flow" (motion).
 */
export default function FlowLine({
  className = "",
  color = "currentColor",
  strokeWidth = 1.5,
  once = true
}: FlowLineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 24"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M0 12 C 60 2, 100 22, 160 12 S 260 2, 320 12 S 380 20, 400 12"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once, amount: 0.6 }}
        transition={
          shouldReduceMotion
            ? { duration: 0.01 }
            : { duration: 1.4, ease: [0.65, 0, 0.35, 1] }
        }
      />
    </svg>
  );
}
