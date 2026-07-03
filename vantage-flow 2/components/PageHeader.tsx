export default function PageHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-line dark:border-line-dark py-14 sm:py-20">
      <div className="container-flow">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="font-display text-4xl tracking-tightest sm:text-5xl max-w-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-stone-dark dark:text-stone">{description}</p>
        )}
      </div>
    </div>
  );
}
