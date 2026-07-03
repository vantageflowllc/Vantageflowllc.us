"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="bg-ink-soft py-16 text-bone sm:py-24">
      <div className="container-flow mb-10">
        <p className="eyebrow mb-2 text-stone">What people are saying</p>
        <h2 className="font-display text-3xl sm:text-4xl tracking-tightest">
          Worn daily, not just photographed
        </h2>
      </div>

      <div className="container-flow grid grid-cols-1 gap-6 sm:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border border-line-dark p-6"
          >
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={14}
                  className={idx < t.rating ? "fill-flow-light text-flow-light" : "text-stone-dark dark:text-stone"}
                />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-stone">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-medium">{t.name}</p>
            <p className="text-xs text-stone-dark dark:text-stone">{t.location}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
