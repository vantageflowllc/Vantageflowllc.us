import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Category } from "@/lib/types";
import { products } from "@/lib/data";

export const metadata = {
  title: "Categories",
  description: "Browse Vantage Flow by category — apparel, footwear, accessories, and lifestyle."
};

const categoryMeta: { key: Category; label: string; blurb: string; image: string }[] = [
  {
    key: "apparel",
    label: "Apparel",
    blurb: "Outerwear, knitwear, and tailored basics.",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=900&q=80"
  },
  {
    key: "footwear",
    label: "Footwear",
    blurb: "Sneakers, boots, and everyday leather.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&q=80"
  },
  {
    key: "accessories",
    label: "Accessories",
    blurb: "Bags, hats, and finishing pieces.",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900&q=80"
  },
  {
    key: "lifestyle",
    label: "Lifestyle",
    blurb: "Home and travel goods for everyday carry.",
    image: "https://images.unsplash.com/photo-1602874801007-bd36c0b56166?w=900&q=80"
  }
];

export default function CategoriesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Browse"
        title="Shop by category"
        description="Every category, at a glance."
      />
      <div className="container-flow grid grid-cols-1 gap-4 py-16 sm:grid-cols-2 sm:py-24">
        {categoryMeta.map((c) => {
          const count = products.filter((p) => p.category === c.key).length;
          return (
            <Link
              key={c.key}
              href={`/shop?category=${c.key}`}
              className="group relative block h-72 overflow-hidden bg-ink"
            >
              <Image
                src={c.image}
                alt={c.label}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover opacity-80 transition-transform duration-700 ease-flow group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-bone">
                <p className="font-display text-3xl tracking-tightest">{c.label}</p>
                <p className="mt-1 text-sm text-stone">{c.blurb}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-stone">
                  {count} {count === 1 ? "piece" : "pieces"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
