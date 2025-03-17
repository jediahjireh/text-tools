"use client";

import { useState } from "react";

import AnalysisTools from "@/components/tools/AnalysisTools";
import CaseAndStyleTools from "@/components/tools/CaseAndStyleTools";
import CleaningTools from "@/components/tools/CleaningTools";
import StructuralTools from "@/components/tools/StructuralTools";
import TextArea from "@/components/tools/TextArea";
import { ThemeToggle } from "@/components/tools/ThemeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [text, setText] = useState("");

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
            <TextArea text={text} setText={setText} />
          </CardContent>
        </Card>

        <Tabs defaultValue="structural" className="w-full">
          <div className="relative w-full overflow-auto">
            <TabsList className="scrollbar-hidden mb-4 flex w-full justify-between overflow-x-auto pb-1">
              <TabsTrigger
                value="structural"
                className="flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:text-sm"
              >
                Structure
              </TabsTrigger>
              <TabsTrigger
                value="case-style"
                className="flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:text-sm"
              >
                Case
              </TabsTrigger>
              <TabsTrigger
                value="cleaning"
                className="flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:text-sm"
              >
                Clean
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className="flex-1 whitespace-nowrap px-2 py-1.5 text-xs sm:text-sm"
              >
                Stats
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
