import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import FlowLine from "@/components/FlowLine";

export const metadata = {
  title: "About Us",
  description: "The story, values, and craft behind Vantage Flow LLC."
};

const values = [
  {
    title: "Built for movement",
    body: "Every silhouette is tested against how people actually move — commuting, traveling, training — not just how it photographs standing still."
  },
  {
    title: "Materials first",
    body: "We source mid-weight wools, technical shells, and full-grain leathers chosen for how they perform over years, not just seasons."
  },
  {
    title: "Fewer, better pieces",
    body: "We release three focused collections a year instead of a constant drop cycle, so each piece earns a permanent place in your wardrobe."
  }
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About Vantage Flow"
        title="Fashion engineered for the way you actually live"
        description="Vantage Flow LLC designs apparel, footwear, and accessories from a simple premise: clothing should move as well as it looks."
      />

      <section className="container-flow grid grid-cols-1 gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden bg-bone-dim dark:bg-ink-soft">
          <Image
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&q=80"
            alt="Vantage Flow design studio"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <FlowLine className="mb-6 h-6 w-32" color="#2F5D50" />
          <h2 className="font-display text-3xl tracking-tightest sm:text-4xl">
            Started by people tired of choosing between form and function
          </h2>
          <p className="mt-4 text-stone-dark dark:text-stone leading-relaxed">
            Vantage Flow LLC was founded to close the gap between technical
            performance wear and clothing you'd actually want to wear every
            day. We work with mills and factories that share our standard for
            material quality, and we test every piece in the field before it
            ships — not just on a runway.
          </p>
          <p className="mt-4 text-stone-dark dark:text-stone leading-relaxed">
            The name comes from two ideas we design around: vantage, the
            clear view that comes from good design, and flow, the freedom of
            movement that comes from getting the fit right.
          </p>
        </div>
      </section>

      <section className="bg-ink-soft py-16 text-bone sm:py-24">
        <div className="container-flow">
          <p className="eyebrow mb-2 text-stone">What guides us</p>
          <h2 className="font-display text-3xl tracking-tightest sm:text-4xl mb-10">
            Three commitments behind every product
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="border-t border-line-dark pt-5">
                <h3 className="font-display text-xl tracking-tightest mb-2">{v.title}</h3>
                <p className="text-sm text-stone leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
