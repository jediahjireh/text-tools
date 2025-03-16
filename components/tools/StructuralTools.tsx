"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StructuralToolsProps {
  text: string;
  setText: (text: string) => void;
}

export default function StructuralTools({
  text,
  setText,
}: StructuralToolsProps) {
  const [wrapLength, setWrapLength] = useState(20);
  const [wrapMode, setWrapMode] = useState("word");
  const [indentSize, setIndentSize] = useState(2);
  const [listType, setListType] = useState("bullet");
  const [paragraphLines, setParagraphLines] = useState(4);

  const wrapText = () => {
    // split the text into paragraphs (preserving original line breaks)
    const paragraphs = text.split(/\n/);
    const result = [];

    for (const paragraph of paragraphs) {
      if (paragraph.trim() === "") {
        // preserve empty lines
        result.push("");
        continue;
      }

      // process each paragraph based on the selected wrap mode
      if (wrapMode === "word") {
        // word-based wrapping (preserves whole words)
        let currentLine = "";
        const words = paragraph.split(/\s+/);
        let wrappedParagraph = "";

        for (const word of words) {
          // if adding this word would exceed the wrap length
          if (
            currentLine.length + word.length + 1 > wrapLength &&
            currentLine.length > 0
          ) {
            wrappedParagraph +=
              (wrappedParagraph ? "\n" : "") + currentLine.trim();
            currentLine = word;
          } else {
            currentLine += (currentLine.length > 0 ? " " : "") + word;
          }
        }

        // add the last line if there's anything left
        if (currentLine.trim().length > 0) {
          wrappedParagraph +=
            (wrappedParagraph ? "\n" : "") + currentLine.trim();
        }

        result.push(wrappedParagraph);
      } else {
        // strict mode (cuts words at exact character count)
        let wrappedParagraph = "";
        let remainingText = paragraph;

        while (remainingText.length > 0) {
          // take exactly wrapLength characters
          const chunk = remainingText.substring(0, wrapLength);
          wrappedParagraph += (wrappedParagraph ? "\n" : "") + chunk;
          remainingText = remainingText.substring(wrapLength);
        }

        result.push(wrappedParagraph);
      }
    }

    setText(result.join("\n"));
  };

  const wrapParagraphs = () => {
    // split the text into lines
    const lines = text.split("\n");
    const result = [];

    // process lines in chunks of paragraph lines
    for (let i = 0; i < lines.length; i += paragraphLines) {
      const paragraphChunk = lines.slice(i, i + paragraphLines);
      result.push(paragraphChunk.join("\n"));
    }

    setText(result.join("\n\n"));
  };

  const adjustIndentation = () => {
    const lines = text.split("\n");
    const indentedLines = lines.map((line) => " ".repeat(indentSize) + line);
    setText(indentedLines.join("\n"));
  };

  const formatList = () => {
    const lines = text.split("\n");
    const formattedLines = lines.map((line, index) => {
      // preserve empty lines
      if (line.trim() === "") return line;
      if (listType === "bullet") {
        return `• ${line}`;
      } else {
        return `${index + 1}. ${line}`;
      }
    });
    setText(formattedLines.join("\n"));
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card className="w-full">
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Text Wrapper</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Input
                type="number"
                value={wrapLength}
                onChange={(e) => setWrapLength(Number(e.target.value))}
                className="w-20 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <Select value={wrapMode} onValueChange={setWrapMode}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select wrap mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="word">Word-based</SelectItem>
                    <SelectItem value="strict">Strict</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={wrapText}>Wrap</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Paragraph Wrapper</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Input
                type="number"
                value={paragraphLines}
                onChange={(e) => setParagraphLines(Number(e.target.value))}
                className="w-20 flex-shrink-0"
              />
              <span className="flex items-center">lines each</span>
            </div>
            <Button onClick={wrapParagraphs}>Format</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Indentation</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Input
                type="number"
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="w-20 flex-shrink-0"
              />
              <span className="flex items-center">spaces</span>
            </div>
            <Button onClick={adjustIndentation}>Adjust</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">List Formatter</h3>
          <div className="flex flex-col space-y-2">
            <div className="w-full min-w-0">
              <Select value={listType} onValueChange={setListType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select list type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bullet">Bullet List</SelectItem>
                  <SelectItem value="numbered">Numbered List</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={formatList}>Format</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
