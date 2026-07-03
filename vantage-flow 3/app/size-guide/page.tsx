import PageHeader from "@/components/PageHeader";
import SizeGuideTable from "@/components/SizeGuideTable";

export const metadata = {
  title: "Size Guide",
  description: "Find your fit with the Vantage Flow apparel and footwear size guide."
};

const apparelRows = [
  { size: "XS", chest: '34–35"', waist: '27–28"', hip: '34–35"' },
  { size: "S", chest: '36–37"', waist: '29–30"', hip: '36–37"' },
  { size: "M", chest: '38–40"', waist: '31–33"', hip: '38–40"' },
  { size: "L", chest: '41–43"', waist: '34–36"', hip: '41–43"' },
  { size: "XL", chest: '44–46"', waist: '37–39"', hip: '44–46"' },
  { size: "XXL", chest: '47–49"', waist: '40–42"', hip: '47–49"' }
];

const footwearRows = [
  { size: "7", us: "7", eu: "40", uk: "6" },
  { size: "8", us: "8", eu: "41", uk: "7" },
  { size: "9", us: "9", eu: "42", uk: "8" },
  { size: "10", us: "10", eu: "43", uk: "9" },
  { size: "11", us: "11", eu: "44", uk: "10" },
  { size: "12", us: "12", eu: "45", uk: "11" }
];

export default function SizeGuidePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fit"
        title="Size guide"
        description="All measurements are body measurements in inches, not garment measurements. If you're between sizes, we recommend sizing up for a relaxed fit."
      />
      <div className="container-flow max-w-3xl py-16 sm:py-24">
        <SizeGuideTable
          title="Apparel"
          rows={apparelRows}
          columns={[
            { key: "size", label: "Size" },
            { key: "chest", label: "Chest" },
            { key: "waist", label: "Waist" },
            { key: "hip", label: "Hip" }
          ]}
        />
        <SizeGuideTable
          title="Footwear"
          rows={footwearRows}
          columns={[
            { key: "us", label: "US" },
            { key: "eu", label: "EU" },
            { key: "uk", label: "UK" }
          ]}
        />
        <div className="border border-line dark:border-line-dark p-6">
          <h3 className="font-medium mb-2">How to measure</h3>
          <ul className="list-disc space-y-1 pl-4 text-sm text-stone-dark dark:text-stone">
            <li>Chest: measure around the fullest part of your chest, under your arms.</li>
            <li>Waist: measure around your natural waistline, keeping the tape comfortably loose.</li>
            <li>Hip: measure around the fullest part of your hips.</li>
            <li>Footwear: measure your foot length in the evening, when feet are largest.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
