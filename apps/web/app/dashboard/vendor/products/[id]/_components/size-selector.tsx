import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import { cn } from "@workspace/ui/lib/utils";

const defaultSizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  title?: string;
  className?: string;
  sizes?: string[];
}

export const SizeSelector = <T extends FieldValues>({
  name,
  control,
  title,
  className,
  sizes = defaultSizes,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected: string[] = field.value || [];

        const toggleSize = (size: string) => {
          if (selected.includes(size)) {
            field.onChange(selected.filter((s) => s !== size));
          } else {
            field.onChange([...selected, size]);
          }
        };

        return (
          <Field data-invalid={fieldState.invalid} className={className}>
            {title && <FieldLabel>{title}</FieldLabel>}

            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => {
                const isSelected = selected.includes(size);

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={cn(
                      "px-4 py-2 rounded-md border text-sm font-medium transition cursor-pointer",
                      isSelected
                        ? "border-2 border-primary"
                        : "bg-background border-input text-foreground",
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
