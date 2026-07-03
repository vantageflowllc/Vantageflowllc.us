import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Shipping & Returns",
  description: "Vantage Flow shipping timelines, costs, and return policy."
};

export default function ShippingReturnsPage() {
  return (
    <div>
      <PageHeader eyebrow="Support" title="Shipping & returns" />
      <div className="container-flow max-w-3xl space-y-12 py-16 sm:py-24">
        <section>
          <h2 className="font-display text-2xl tracking-tightest mb-4">Shipping</h2>
          <div className="space-y-3 text-sm text-stone-dark dark:text-stone leading-relaxed">
            <p>
              Orders are processed within 1–2 business days. Free standard
              shipping is included on all US orders over $150; orders under
              $150 ship for a flat $12 fee.
            </p>
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className="border-b border-ink dark:border-bone text-left">
                  <th className="py-2 pr-4 font-medium">Method</th>
                  <th className="py-2 pr-4 font-medium">Timeline</th>
                  <th className="py-2 font-medium">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr>
                  <td className="py-2 pr-4">Standard</td>
                  <td className="py-2 pr-4">3–5 business days</td>
                  <td className="py-2">Free over $150 / $12</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Express</td>
                  <td className="py-2 pr-4">1–2 business days</td>
                  <td className="py-2">$28</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">International</td>
                  <td className="py-2 pr-4">7–14 business days</td>
                  <td className="py-2">Calculated at checkout</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-tightest mb-4">Returns</h2>
          <div className="space-y-3 text-sm text-stone-dark dark:text-stone leading-relaxed">
            <p>
              We accept returns of unworn, unwashed items with original tags
              attached within 30 days of delivery. Footwear must be returned
              in its original box.
            </p>
            <p>
              Start a return from your account's order history, or contact
              support for a prepaid return label. Refunds are issued to the
              original payment method within 5–7 business days of us
              receiving your return.
            </p>
            <p>
              Final sale items, gift cards, and worn items are not eligible
              for return.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-tightest mb-4">Exchanges</h2>
          <p className="text-sm text-stone-dark dark:text-stone leading-relaxed">
            Size and color exchanges are free within the continental US.
            Start an exchange from your order history and we'll ship the new
            item as soon as your return is scanned by the carrier.
          </p>
        </section>
      </div>
    </div>
  );
}
