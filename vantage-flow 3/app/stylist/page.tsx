import PageHeader from "@/components/PageHeader";
import StylistQuiz from "./StylistQuiz";

export const metadata = {
  title: "AI Stylist",
  description: "Answer a few questions and get a personalized Vantage Flow outfit recommendation."
};

export default function StylistPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Personalized"
        title="AI Stylist"
        description="Answer three quick questions and we'll put together a look from the current catalog."
      />
      <div className="container-flow py-16 sm:py-24">
        <StylistQuiz />
      </div>
    </div>
  );
}
