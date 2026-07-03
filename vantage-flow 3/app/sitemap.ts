import { MetadataRoute } from "next";
import { products } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.vantageflowllc.us";
  const staticRoutes = [
    "",
    "/shop",
    "/categories",
    "/stylist",
    "/about",
    "/contact",
    "/faq",
    "/size-guide",
    "/shipping-returns",
    "/privacy-policy",
    "/terms",
    "/cart",
    "/checkout"
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  return [...staticRoutes, ...productRoutes];
}
