"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { collections } from "@/lib/data";

export default function CollectionGrid() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-flow mb-8">
        <p className="eyebrow mb-2">Featured Collections</p>
        <h2 className="font-display text-3xl sm:text-4xl tracking-tightest">
          Three ways to move
        </h2>
      </div>

      <div className="container-flow grid grid-cols-1 gap-4 sm:grid-cols-3">
        {collections.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
          >
            <Link
              href={`/shop?collection=${c.slug}`}
              className="group relative block h-full min-h-[280px] overflow-hidden bg-ink"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover opacity-80 transition-transform duration-700 ease-flow group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-bone">
                <p className="font-display text-2xl tracking-tightest sm:text-3xl">{c.name}</p>
                <p className="mt-1 text-sm text-stone max-w-[28ch]">{c.tagline}</p>
                <span className="mt-3 inline-block text-xs uppercase tracking-wide underline underline-offset-4">
                  Shop the collection
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
