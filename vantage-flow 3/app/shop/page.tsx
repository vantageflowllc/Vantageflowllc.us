import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata = {
  title: "Shop All",
  description:
    "Browse Vantage Flow apparel, footwear, accessories, and lifestyle goods."
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-flow py-24">Loading…</div>}>
      <ShopClient />
    </Suspense>
  );
}
