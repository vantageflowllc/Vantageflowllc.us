interface SizeRow {
  size: string;
  chest?: string;
  waist?: string;
  hip?: string;
  us?: string;
  eu?: string;
  uk?: string;
}

export default function SizeGuideTable({
  title,
  columns,
  rows
}: {
  title: string;
  columns: { key: keyof SizeRow; label: string }[];
  rows: SizeRow[];
}) {
  return (
    <div className="mb-12">
      <h3 className="font-display text-xl tracking-tightest mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink dark:border-bone">
              {columns.map((c) => (
                <th key={c.key} className="py-3 pr-6 text-left font-medium uppercase tracking-wide text-xs">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.size} className="border-b border-line dark:border-line-dark">
                {columns.map((c) => (
                  <td key={c.key} className="py-3 pr-6 text-stone-dark dark:text-stone">
                    {r[c.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
