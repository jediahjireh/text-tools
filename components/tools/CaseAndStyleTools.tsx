"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CaseAndStyleToolsProps {
  text: string;
  setText: (text: string) => void;
}

export default function CaseAndStyleTools({
  text,
  setText,
}: CaseAndStyleToolsProps) {
  const [caseType, setCaseType] = useState("lowercase");
  const [styleType, setStyleType] = useState("camelCase");

  const convertCase = () => {
    switch (caseType) {
      case "lowercase":
        setText(text.toLowerCase());
        break;
      case "uppercase":
        setText(text.toUpperCase());
        break;
      case "titlecase":
        setText(
          text.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
          ),
        );
        break;
      case "sentencecase":
        setText(
          text
            .toLowerCase()
            .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
        );
        break;
    }
  };

  const convertStyle = () => {
    const words =
      text.match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      ) || [];
    switch (styleType) {
      case "camelCase":
        setText(
          words
            .map((word, index) =>
              index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(""),
        );
        break;
      case "snake_case":
        setText(words.map((word) => word.toLowerCase()).join("_"));
        break;
      case "kebab-case":
        setText(words.map((word) => word.toLowerCase()).join("-"));
        break;
    }
  };

  const normaliseText = () => {
    setText(text.replace(/\s+/g, " ").trim());
  };

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Case Converter</h3>
          <div className="flex flex-col space-y-2">
            <Select value={caseType} onValueChange={setCaseType}>
              <SelectTrigger>
                <SelectValue placeholder="Select case type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lowercase">lowercase</SelectItem>
                <SelectItem value="uppercase">UPPERCASE</SelectItem>
                <SelectItem value="titlecase">Title Case</SelectItem>
                <SelectItem value="sentencecase">Sentence case</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={convertCase}>Convert Case</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Naming Convention Converter</h3>
          <div className="flex flex-col space-y-2">
            <Select value={styleType} onValueChange={setStyleType}>
              <SelectTrigger>
                <SelectValue placeholder="Select style type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="camelCase">camelCase</SelectItem>
                <SelectItem value="snake_case">snake_case</SelectItem>
                <SelectItem value="kebab-case">kebab-case</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={convertStyle}>Convert Style</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Text Normaliser</h3>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground lg:mb-4">
              Remove extra spaces and trim whitespace
            </p>
            <Button onClick={normaliseText}>Normalise Text</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
