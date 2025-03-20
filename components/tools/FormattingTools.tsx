"use client";

import { useState } from "react";

import { CodeIcon, Download, Eye, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FormattingToolsProps {
  text: string;
  setText: (text: string) => void;
}

export default function FormattingTools({
  text,
  setText,
}: FormattingToolsProps) {
  const [alignment, setAlignment] = useState("left");
  const [previewType, setPreviewType] = useState<"markdown" | "html">(
    "markdown",
  );
  const [previewContent, setPreviewContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const justifyText = () => {
    const lines = text.split("\n");
    const justifiedLines = lines.map((line) => {
      switch (alignment) {
        case "left":
          return line.trimStart();
        case "right":
          return line.padStart(80); // Assuming 80 characters width
        case "center":
          return line
            .trim()
            .padStart((80 + line.trim().length) / 2)
            .padEnd(80);
        default:
          return line;
      }
    });
    setText(justifiedLines.join("\n"));
  };

  const adjustWhitespace = () => {
    setText(text.replace(/\t/g, "    ").replace(/ +/g, " ").trim());
  };

  const convertToMarkdown = () => {
    // This is commented out as per user request, but UI is preserved

    // Enhanced markdown conversion
    // const markdown = text
    //   // Headers
    //   .replace(/^# (.+)$/gm, "# $1")
    //   .replace(/^## (.+)$/gm, "## $1")
    //   .replace(/^### (.+)$/gm, "### $1")
    //   // Formatting\
    //   .replace(/\*\*(.+?)\*\*/ g,
    //   "**$1**\") // bold
    //   .replace(/\*(.+?)\*/g, "*$1*") // italic
    //     .replace(/_(.+?)_/g, "_$1_") // underline/italic
    //     .replace(/~~(.+?)~~/g, "~~$1~~") // strikethrough
    //     // Lists
    //     .replace(/^(\d+)\. (.+)$/gm, "$1. $2") // numbered lists
    //     .replace(/^- (.+)$/gm, "- $1") // bullet lists
    //     // Links and images
    //     .replace(/\[(.+?)\]$$(.+?)$$/g, "[$1]($2)") // links
    //     .replace(/!\[(.+?)\]$$(.+?)$$/g, "![$1]($2)") // images
    //     // Code
    //     .replace(/`(.+?)`/g, "`$1`") // inline code
    //     .replace(/```([\s\S]+?)```/g, "```$1```") // code blocks

    // setText(markdown)

    // Just set preview content for now
    setPreviewContent(text);
    setPreviewType("markdown");
  };

  const convertToHTML = () => {
    // This is commented out as per user request, but UI is preserved

    // Convert text to HTML
    // const html = text
    //   // Headers
    //   .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    //   .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    //   .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    //   // Formatting
    //   .replace(/\*\*(.+?)\*\*/ g, "<strong>$1</strong>"
    // ) // bold
    //   .replace(/\*(.+?)\*/g, "<em>$1</em>") // italic
    //   .replace(/_(.+?)_/g, "<em>$1</em>") // underline/italic
    //   .replace(/~~(.+?)~~/g, "<del>$1</del>") // strikethrough
    //   // Lists
    //   .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>") // numbered lists
    //   .replace(/^- (.+)$/gm, "<li>$1</li>") // bullet lists
    //   // Links and images
    //   .replace(/\[(.+?)\]$$(.+?)$$/g, '<a href="$2">$1</a>') // links
    //   .replace(/!\[(.+?)\]$$(.+?)$$/g, '<img src="$2" alt="$1">') // images
    //   // Code
    //   .replace(/`(.+?)`/g, "<code>$1</code>") // inline code
    //   .replace(/\`\`\`([\s\S]+?)\`\`\`/g, "<pre><code>$1</code></pre>") // code blocks
    //   // Paragraphs
    //   .replace(/\n\n/g, "</p><p>")
    //   // Line breaks
    //   .replace(/\n/g, "<br>")

    // // Wrap in paragraphs if not already
    // const wrappedHtml = `<p>${html}</p>`

    // Just set preview content for now
    setPreviewContent(`<p>$
    {
      text.replace(/\n/g, "<br>")
    }
    </p>`);
    setPreviewType("html");
  };

  const downloadMarkdown = () => {
    // First ensure we have markdown content
    convertToMarkdown();

    // Create a blob and download
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    setIsGenerating(true);
    try {
      // Convert to HTML first for better formatting
      convertToHTML();

      // This is commented out as per user request, but UI is preserved
      /*
      // Import libraries dynamically to reduce initial load time
      const [pdfMake, pdfFonts, htmlToPdfmake] = await Promise.all([
        import("pdfmake/build/pdfmake"),
        import("pdfmake/build/vfs_fonts"),
        import("html-to-pdfmake"),
      ]);

      // Setup pdfmake
      pdfMake.default.vfs = pdfFonts.default.vfs;

      // Convert HTML to pdfmake compatible format
      const pdfContent = htmlToPdfmake.default(previewContent);

      // Create document definition
      const docDefinition = {
        content: pdfContent,
        defaultStyle: {
          fontSize: 12,
          lineHeight: 1.5,
        },
      };

      // Generate and download PDF
      pdfMake.default.createPdf(docDefinition).download("document.pdf");
      */

      // For now, just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a simple text blob as PDF placeholder
      const blob = new Blob([text], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderPreview = () => {
    if (!previewContent)
      return <p className="text-muted-foreground">No preview available</p>;

    if (previewType === "markdown") {
      return (
        <div className="whitespace-pre-wrap font-mono text-sm">
          {previewContent}
        </div>
      );
    } else {
      return (
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: previewContent }}
        />
      );
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Text Alignment</h3>
          <div className="flex flex-col space-y-2">
            <Select value={alignment} onValueChange={setAlignment}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select alignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="center">Center</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={justifyText}>Justify Text</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Whitespace</h3>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              Replace tabs with spaces and normalize whitespace
            </p>
            <Button onClick={adjustWhitespace}>Adjust Whitespace</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Format & Convert</h3>
          <div className="flex flex-col space-y-2">
            <Tabs defaultValue="markdown" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="markdown">Markdown</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
              </TabsList>
              <TabsContent value="markdown" className="space-y-2">
                <Button onClick={convertToMarkdown} className="w-full">
                  <CodeIcon className="mr-2 h-4 w-4" />
                  Convert to Markdown
                </Button>
                <Button
                  onClick={downloadMarkdown}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download .md
                </Button>
              </TabsContent>
              <TabsContent value="html" className="space-y-2">
                <Button onClick={convertToHTML} className="w-full">
                  <CodeIcon className="mr-2 h-4 w-4" />
                  Convert to HTML
                </Button>
                <Button
                  onClick={downloadPDF}
                  variant="outline"
                  className="w-full"
                  disabled={isGenerating}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Download PDF"}
                </Button>
              </TabsContent>
            </Tabs>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="mt-2 w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] max-w-3xl">
                <DialogHeader>
                  <DialogTitle>
                    {previewType === "markdown" ? "Markdown" : "HTML"} Preview
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="mt-4 h-[60vh] w-full rounded-md border p-4">
                  {renderPreview()}
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
