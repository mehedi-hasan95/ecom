"use client";

interface ProductSpecsProps {
  specification: Record<string, string>;
}

export default function ProductSpecs({ specification }: ProductSpecsProps) {
  const entries = Object.entries(specification);
  if (!entries.length) return null;
  return (
    <section className="mt-12 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Specifications</h2>

      <div className="rounded-lg border border-border overflow-hidden">
        <div className="grid md:grid-cols-2">
          {entries.map(([key, value], index) => (
            <div
              key={index}
              className={`p-4 border-b border-border 
              ${
                index % 2 === 0 && index !== entries.length - 1
                  ? "md:border-r"
                  : ""
              }
              ${index >= entries.length - 2 ? "" : "md:border-b"}`}
            >
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                {key}
              </div>

              <div className="text-lg font-medium text-foreground">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
