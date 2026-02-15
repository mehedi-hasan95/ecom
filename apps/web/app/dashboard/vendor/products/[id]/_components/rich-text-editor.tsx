"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

interface Props {
  value?: string;
  onChange: (content: string) => void;
}

export const RichTextEditor = ({ value = "", onChange }: Props) => {
  const [quillValue, setQuillValue] = useState(value);

  return (
    <div className="mehedi">
      <ReactQuill
        theme="snow"
        value={quillValue}
        onChange={(content) => {
          setQuillValue(content);
          onChange(content);
        }}
      />
    </div>
  );
};
