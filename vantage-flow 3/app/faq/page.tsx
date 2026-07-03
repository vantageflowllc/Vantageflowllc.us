import PageHeader from "@/components/PageHeader";
import FAQAccordion from "./FAQAccordion";
import { faqs } from "@/lib/data";

export const metadata = {
  title: "FAQ",
  description: "Answers to common questions about Vantage Flow orders, sizing, and shipping."
};

export default function FAQPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Support"
        title="Frequently asked questions"
        description="Can't find what you're looking for? Contact our support team directly."
      />
      <div className="container-flow max-w-3xl py-16 sm:py-24">
        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}
