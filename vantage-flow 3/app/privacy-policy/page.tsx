import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Privacy Policy",
  description: "How Vantage Flow LLC collects, uses, and protects your information."
};

const sections = [
  {
    title: "Information we collect",
    body: "We collect information you provide directly, such as your name, email, shipping address, and payment details when you place an order or create an account. We also collect device and usage information automatically, such as browser type and pages visited, to improve our site."
  },
  {
    title: "How we use your information",
    body: "We use your information to process orders, provide customer support, send order updates, and — with your consent — send marketing communications. We do not sell your personal information to third parties."
  },
  {
    title: "Payment information",
    body: "Payment processing is handled by PCI-compliant third-party providers including Stripe and PayPal. Vantage Flow does not store full payment card numbers on our servers."
  },
  {
    title: "Cookies",
    body: "We use cookies and similar technologies to keep you signed in, remember your cart, and understand how our site is used. You can control cookies through your browser settings."
  },
  {
    title: "Your rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time by contacting support@vantageflowllc.us. Depending on your location, additional rights may apply under laws such as the CCPA or GDPR."
  },
  {
    title: "Contact",
    body: "Questions about this policy can be directed to support@vantageflowllc.us."
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        description="Last updated July 2, 2026."
      />
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
