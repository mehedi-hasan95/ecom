"use client";

import { Button } from "@workspace/ui/components/button";
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import { cn } from "@workspace/ui/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

type ColorSelectorProps = {
  name: string;
  control: any;
};

const defaultColors = [
  "#FFFFFF",
  "#000000",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#22D3EE",
];

const isValidHex = (hex: string) => /^[0-9A-F]{6}$/.test(hex);

export const ColorSelector = ({ name, control }: ColorSelectorProps) => {
  const [newColor, setNewColor] = useState("#FFFFFF");
  const [hexInput, setHexInput] = useState("FFFFFF");
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultColors}
      rules={{
        validate: () =>
          hexInput.length === 0 || isValidHex(hexInput)
            ? true
            : "Hex color must be exactly 6 characters",
      }}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`create-product-${name}`}>
            Products Colors (optional)
          </FieldLabel>

          <div className="flex flex-wrap gap-3 items-center">
            {[...defaultColors, ...customColors].map((color) => {
              const isSelected = (field.value || []).includes(color);
              const isLightColor = color.toUpperCase() === "#FFFFFF";

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    field.onChange(
                      isSelected
                        ? field.value.filter((c: string) => c !== color)
                        : [...(field.value || []), color],
                    )
                  }
                  className={cn(
                    "size-7 rounded-md border-2 transition cursor-pointer",
                    isSelected
                      ? "scale-110 border-primary"
                      : "border-transparent",
                    isLightColor && "border-gray-400",
                  )}
                  style={{ backgroundColor: color }}
                />
              );
            })}

            {/* Add button */}
            <button
              type="button"
              className="size-7 flex items-center justify-center rounded-full border-2 cursor-pointer"
              onClick={() => setShowColorPicker((v) => !v)}
            >
              <Plus size={16} />
            </button>

            {/* Picker + Hex input */}
            {showColorPicker && (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={newColor}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    setNewColor(value);
                    setHexInput(value.replace("#", ""));
                  }}
                  className="size-10 p-0 border-none cursor-pointer"
                />

                <input
                  type="text"
                  placeholder="FFFFFF"
                  value={hexInput}
                  onChange={(e) => {
                    let value = e.target.value
                      .toUpperCase()
                      .replace(/[^0-9A-F]/g, "");

                    if (value.length > 6) return;

                    setHexInput(value);

                    if (value.length === 6) {
                      setNewColor(`#${value}`);
                    }
                  }}
                  className="w-24 px-2 py-1 text-sm rounded border"
                />

                <Button
                  type="button"
                  disabled={!isValidHex(hexInput)}
                  onClick={() => {
                    const colorToAdd = `#${hexInput}`;

                    setCustomColors((prev) =>
                      prev.includes(colorToAdd) ? prev : [...prev, colorToAdd],
                    );

                    const current = field.value || [];
                    if (!current.includes(colorToAdd)) {
                      field.onChange([...current, colorToAdd]);
                    }

                    setNewColor("#FFFFFF");
                    setHexInput("FFFFFF");
                    setShowColorPicker(false);
                  }}
                  className="px-3 py-1 text-sm disabled:opacity-50 cursor-pointer"
                >
                  Add
                </Button>
              </div>
            )}
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
