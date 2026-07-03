"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FlowLine from "./FlowLine";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden bg-ink text-bone">
      <Image
        src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1800&q=80"
        alt="Vantage Flow Fall collection outerwear on model"
        fill
        priority
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      <div className="container-flow relative z-10 pb-14 pt-32 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow text-stone mb-4"
        >
          Fall / Winter Collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
          className="font-display text-[15vw] leading-[0.88] tracking-tightest sm:text-[9vw] lg:text-[7.5vw]"
        >
          MOVE
          <br />
          FORWARD
        </motion.h1>

        <FlowLine className="mt-6 h-8 w-40" color="#4A7B6C" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <p className="max-w-[38ch] text-sm text-stone sm:text-base">
            Apparel, footwear, and accessories engineered for the way people
            actually move through their day.
          </p>
          <div className="flex gap-3">
            <Link href="/shop" className="btn-primary bg-bone text-ink hover:bg-flow hover:text-bone">
              Shop New Arrivals
            </Link>
            <Link
              href="/shop?category=footwear"
              className="btn-secondary border-bone text-bone hover:bg-bone hover:text-ink"
            >
              Footwear
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
