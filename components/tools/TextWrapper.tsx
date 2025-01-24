"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TextWrapperProps {
  text: string;
  setText: (text: string) => void;
}

export default function TextWrapper({ text, setText }: TextWrapperProps) {
  const [wrapLength, setWrapLength] = useState(20);

  // word-based text wrapping logic
  const wrapText = () => {
    const words = text.split(/\s+/);
    let wrappedText = "";
    let currentLine = "";

    for (const word of words) {
      if ((currentLine + word).length > wrapLength) {
        wrappedText += (wrappedText ? "\n" : "") + currentLine.trim();
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    }

    wrappedText += (wrappedText ? "\n" : "") + currentLine.trim();
    setText(wrappedText);
  };

  return (
    <div className="bg-pink-200 p-4 rounded-md object-contain w-full h-full">
      <h2 className="text-lg font-semibold text-pink-700 mb-2">
        Text Wrapper (Word-Based)
      </h2>
      <div className="flex space-x-2 mb-2">
        <Input
          type="number"
          value={wrapLength}
          onChange={(e) => setWrapLength(Number(e.target.value))}
          className="w-20 border-2 border-pink-300 rounded-md"
        />
        <Button
          onClick={wrapText}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Wrap Text
        </Button>
      </div>
    </div>
  );
}
