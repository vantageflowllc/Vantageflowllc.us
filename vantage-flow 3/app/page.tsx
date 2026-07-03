import Hero from "@/components/Hero";
import CollectionGrid from "@/components/CollectionGrid";
import ProductRail from "@/components/ProductRail";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { products } from "@/lib/data";

export default function HomePage() {
  const newArrivals = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const trending = [...products]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 8);

  return (
    <>
      <Hero />
      <CollectionGrid />
      <ProductRail eyebrow="Right Now" title="Trending Now" products={trending} />
      <ProductRail eyebrow="Just In" title="New Arrivals" products={newArrivals} />
      <ProductRail eyebrow="Customer Favorites" title="Best Sellers" products={bestSellers} />
      <Testimonials />
      <Newsletter />
    </>
  );
}
