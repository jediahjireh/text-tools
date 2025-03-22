"use client";

import { useState } from "react";

import AnalysisTools from "@/components/tools/AnalysisTools";
import CaseAndStyleTools from "@/components/tools/CaseAndStyleTools";
import CleaningTools from "@/components/tools/CleaningTools";
import FormattingTools from "@/components/tools/FormattingTools";
import LanguageTools from "@/components/tools/LanguageTools";
import RichTextEditor from "@/components/tools/RichTextEditor";
import StructuralTools from "@/components/tools/StructuralTools";
import { ThemeToggle } from "@/components/tools/ThemeToggle";
import TransformationTools from "@/components/tools/TransformationTools";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">
            Text Tools
          </h1>
          <ThemeToggle />
        </header>

        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <RichTextEditor
              text={text}
              setText={setText}
              html={html}
              setHtml={setHtml}
            />
          </CardContent>
        </Card>

        <Tabs defaultValue="structural" className="w-full">
          <div className="relative w-full overflow-auto">
            <TabsList className="mb-4 inline-flex h-auto w-full flex-nowrap overflow-x-auto pb-1">
              <TabsTrigger
                value="structural"
                className="min-w-[80px] flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:text-sm"
              >
                <span className="hidden md:inline">Structural</span>
                <span className="md:hidden">Structure</span>
              </TabsTrigger>
              <TabsTrigger
                value="case-style"
                className="min-w-[80px] flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:text-sm"
              >
                <span className="hidden md:inline">Case & Style</span>
                <span className="md:hidden">Case</span>
              </TabsTrigger>
              <TabsTrigger
                value="cleaning"
                className="min-w-[80px] flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:text-sm"
              >
                <span className="hidden md:inline">Cleaning</span>
                <span className="md:hidden">Clean</span>
              </TabsTrigger>
              <TabsTrigger
                value="formatting"
                className="min-w-[80px] flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:text-sm"
              >
                <span className="hidden md:inline">Formatting</span>
                <span className="md:hidden">Format</span>
              </TabsTrigger>
              <TabsTrigger
                value="transformation"
                className="min-w-[80px] flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:text-sm"
              >
                <span className="hidden md:inline">Transform</span>
                <span className="md:hidden">Trans</span>
              </TabsTrigger>
              <TabsTrigger
                value="language"
                className="min-w-[80px] flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:text-sm"
              >
                <span className="hidden md:inline">Language</span>
                <span className="md:hidden">Lang</span>
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className="min-w-[80px] flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:text-sm"
              >
                <span className="hidden md:inline">Analysis</span>
                <span className="md:hidden">Stats</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <TabsContent value="structural">
                <StructuralTools text={text} setText={setText} />
              </TabsContent>
              <TabsContent value="case-style">
                <CaseAndStyleTools text={text} setText={setText} />
              </TabsContent>
              <TabsContent value="cleaning">
                <CleaningTools text={text} setText={setText} />
              </TabsContent>
              <TabsContent value="formatting">
                <FormattingTools text={text} setText={setText} />
              </TabsContent>
              <TabsContent value="transformation">
                <TransformationTools text={text} setText={setText} />
              </TabsContent>
              <TabsContent value="language">
                <LanguageTools text={text} setText={setText} />
              </TabsContent>
              <TabsContent value="analysis">
                <AnalysisTools text={text} />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
