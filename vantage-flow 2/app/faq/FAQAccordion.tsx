"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQItem } from "@/lib/types";

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-t border-b border-line dark:border-line-dark">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="font-medium pr-4">{item.question}</span>
              {open ? (
                <Minus size={16} className="flex-none" />
              ) : (
                <Plus size={16} className="flex-none" />
              )}
            </button>
            {open && (
              <p className="pb-5 text-sm leading-relaxed text-stone-dark dark:text-stone">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
