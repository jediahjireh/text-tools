"use client";

import { Card, CardContent } from "@/components/ui/card";

interface AnalysisToolsProps {
  text: string;
}

export default function AnalysisTools({ text }: AnalysisToolsProps) {
  const characterCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text.trim() ? text.split("\n").length : 0;
  const paragraphCount = text.trim() ? text.split(/\n\s*\n/).length : 0;

  // average reading speed: 200 words per minute
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <p className="text-sm text-muted-foreground">Characters</p>
          <p className="text-4xl font-bold text-primary">{characterCount}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <p className="text-sm text-muted-foreground">Words</p>
          <p className="text-4xl font-bold text-primary">{wordCount}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <p className="text-sm text-muted-foreground">Lines</p>
          <p className="text-4xl font-bold text-primary">{lineCount}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <p className="text-sm text-muted-foreground">Paragraphs</p>
          <p className="text-4xl font-bold text-primary">{paragraphCount}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <p className="text-sm text-muted-foreground">Reading Time</p>
          <p className="text-4xl font-bold text-primary">
            {readingTimeMinutes} min
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
