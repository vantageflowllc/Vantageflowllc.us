import Link from "next/link";
import FlowLine from "./FlowLine";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/categories", label: "All Categories" },
      { href: "/shop?category=apparel", label: "Apparel" },
      { href: "/shop?category=footwear", label: "Footwear" },
      { href: "/shop?category=accessories", label: "Accessories" },
      { href: "/shop?category=lifestyle", label: "Lifestyle" },
      { href: "/stylist", label: "AI Stylist" }
    ]
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/size-guide", label: "Size Guide" },
      { href: "/shipping-returns", label: "Shipping & Returns" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="container-flow py-16">
        <FlowLine className="h-6 w-32 mb-10" color="#4A7B6C" />
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-xl tracking-tightest font-semibold">
              VANTAGE FLOW
            </p>
            <p className="mt-3 text-sm text-stone max-w-[22ch]">
              Designed for movement. Built to last beyond a season.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-stone mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm hover:text-flow-light transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-dark pt-6 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Vantage Flow LLC. All rights reserved.</p>
          <p>www.vantageflowllc.us</p>
        </div>
      </div>
    </footer>
  );
}
