import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the Vantage Flow website and purchases."
};

const sections = [
  {
    title: "Acceptance of terms",
    body: "By accessing or using www.vantageflowllc.us, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use this site."
  },
  {
    title: "Orders and payment",
    body: "All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for reasons including suspected fraud, pricing errors, or inventory issues. Prices are listed in USD and are subject to change without notice."
  },
  {
    title: "Product descriptions",
    body: "We attempt to be as accurate as possible in describing products, including color, materials, and fit. We do not warrant that product descriptions or other content are error-free."
  },
  {
    title: "Intellectual property",
    body: "All content on this site, including designs, logos, and photography, is the property of Vantage Flow LLC and may not be reproduced without written permission."
  },
  {
    title: "Limitation of liability",
    body: "Vantage Flow LLC is not liable for any indirect, incidental, or consequential damages arising from your use of this site or its products, to the extent permitted by law."
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of the United States, without regard to conflict-of-law principles."
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms."
  }
];

export default function TermsPage() {
  return (
    <div>
      <PageHeader eyebrow="Legal" title="Terms of service" description="Last updated July 2, 2026." />
      <div className="container-flow max-w-3xl space-y-10 py-16 sm:py-24">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-xl tracking-tightest mb-3">{s.title}</h2>
            <p className="text-sm text-stone-dark dark:text-stone leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
