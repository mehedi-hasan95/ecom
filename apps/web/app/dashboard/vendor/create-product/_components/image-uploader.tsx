"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { CloudUpload, X, Image as Placeholder } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";

interface ImageUploadProps {
  value: File[];
  onChange: (files: File[]) => void;
  onBlur?: () => void;
  disabled?: boolean;
  maxFiles?: number;
}

export const ImageUploader = ({
  value,
  onChange,
  onBlur,
  disabled,
  maxFiles = 10,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || disabled) return;

    const images = Array.from(files).filter((f) => f.type.startsWith("image/"));

    const next = [...value, ...images].slice(0, maxFiles);
    onChange(next);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const next = value.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Preview */}
      <div className="flex-1/3 min-w-0">
        {value.length > 0 && value[0] ? (
          <div className="space-y-4">
            <div className="relative w-full h-96 rounded-lg overflow-hidden border">
              <Image
                src={URL.createObjectURL(value[0])}
                alt="Primary image"
                fill
                className="object-cover"
              />
              <Button
                type="button"
                onClick={() => removeImage(0)}
                disabled={disabled}
                variant={"destructive"}
                className="absolute top-2 right-2 p-1 text-white"
              >
                <X size={20} />
              </Button>
            </div>

            {value.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {value.slice(1).map((file, index) => (
                  <div
                    key={file.name + index}
                    className="relative h-24 rounded-lg overflow-hidden border group"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      onClick={() => removeImage(index + 1)}
                      disabled={disabled}
                      variant={"destructive"}
                      className="absolute top-1 right-1 p-0.5 bg-black/70 text-white opacity-0 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="h-40 rounded-lg border-2 border-dashed flex flex-col items-center justify-center bg-sidebar">
            <Placeholder size={35} className="text-gray-500" />
            <p className="text-gray-500">No images added yet</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex-1 min-w-0 space-y-4">
        <label
          className={cn(
            "flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer bg-sidebar border-sidebar-accent hover:bg-sidebar/70 transition-colors",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudUpload size={30} className="text-gray-500" />
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF (max {maxFiles})
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            disabled={disabled}
            className="hidden"
            onChange={(e) => handleFiles(e.currentTarget.files)}
            onBlur={onBlur}
          />
        </label>
        {value.length > 0 && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">{value.length}</span> image
              {value.length !== 1 ? "s" : ""} selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
