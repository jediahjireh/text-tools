"use client";

import type React from "react";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  Palette,
  Quote,
  Strikethrough,
  Table,
  Underline,
} from "lucide-react";

import ColorPicker from "@/components/tools/editor/ColorPicker";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditorToolbarProps {
  onFormat: (command: string, value?: string) => void;
  formats: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    heading: number;
    align: string;
    list: string;
    link: boolean;
    color: string;
    backgroundColor: string;
  };
  onLinkClick: () => void;
  onImageClick: () => void;
  onTableClick: () => void;
  setFormats: React.Dispatch<
    React.SetStateAction<{
      bold: boolean;
      italic: boolean;
      underline: boolean;
      strikethrough: boolean;
      heading: number;
      align: string;
      list: string;
      link: boolean;
      color: string;
      backgroundColor: string;
    }>
  >;
}

export default function EditorToolbar({
  onFormat,
  formats,
  onLinkClick,
  onImageClick,
  onTableClick,
  setFormats: _setFormats,
}: EditorToolbarProps) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-1 rounded-md border p-1">
      <TooltipProvider>
        {/* text formatting */}
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.bold ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("bold")}
                type="button"
              >
                <Bold className="h-4 w-4" />
                <span className="sr-only">Bold</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.italic ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("italic")}
                type="button"
              >
                <Italic className="h-4 w-4" />
                <span className="sr-only">Italic</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.underline ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("underline")}
                type="button"
              >
                <Underline className="h-4 w-4" />
                <span className="sr-only">Underline</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.strikethrough ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("strikeThrough")}
                type="button"
              >
                <Strikethrough className="h-4 w-4" />
                <span className="sr-only">Strikethrough</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Strikethrough</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        {/* headings */}
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.heading === 1 ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("heading", "1")}
                type="button"
              >
                <Heading1 className="h-4 w-4" />
                <span className="sr-only">Heading 1</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.heading === 2 ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("heading", "2")}
                type="button"
              >
                <Heading2 className="h-4 w-4" />
                <span className="sr-only">Heading 2</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.heading === 3 ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("heading", "3")}
                type="button"
              >
                <Heading3 className="h-4 w-4" />
                <span className="sr-only">Heading 3</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        {/* alignment */}
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.align === "left" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("justifyLeft")}
                type="button"
              >
                <AlignLeft className="h-4 w-4" />
                <span className="sr-only">Align Left</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.align === "center" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("justifyCenter")}
                type="button"
              >
                <AlignCenter className="h-4 w-4" />
                <span className="sr-only">Align Center</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Center</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.align === "right" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("justifyRight")}
                type="button"
              >
                <AlignRight className="h-4 w-4" />
                <span className="sr-only">Align Right</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.align === "justify" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("justifyFull")}
                type="button"
              >
                <AlignJustify className="h-4 w-4" />
                <span className="sr-only">Justify</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Justify</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        {/* lists */}
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.list === "unordered" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("insertUnorderedList")}
                type="button"
              >
                <List className="h-4 w-4" />
                <span className="sr-only">Bullet List</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.list === "ordered" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("insertOrderedList")}
                type="button"
              >
                <ListOrdered className="h-4 w-4" />
                <span className="sr-only">Numbered List</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.list === "checklist" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("insertChecklist")}
                type="button"
              >
                <CheckSquare className="h-4 w-4" />
                <span className="sr-only">Checklist</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Checklist</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        {/* block formatting */}
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("blockquote")}
                type="button"
              >
                <Quote className="h-4 w-4" />
                <span className="sr-only">Quote</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quote</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onFormat("formatBlock", "pre")}
                type="button"
              >
                <Code className="h-4 w-4" />
                <span className="sr-only">Code Block</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Code Block</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        {/* insert elements */}
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={formats.link ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={onLinkClick}
                type="button"
              >
                <Link className="h-4 w-4" />
                <span className="sr-only">Insert Link</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={onImageClick}
                type="button"
              >
                <ImageIcon className="h-4 w-4" />
                <span className="sr-only">Insert Image</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Image</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={onTableClick}
                type="button"
              >
                <Table className="h-4 w-4" />
                <span className="sr-only">Insert Table</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Table</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        {/* colours */}
        <div className="flex flex-wrap gap-1">
          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    type="button"
                  >
                    <Palette className="h-4 w-4" />
                    <span className="sr-only">Text Color</span>
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Text Color</TooltipContent>
            </Tooltip>
            <PopoverContent className="w-64">
              <ColorPicker
                onSelectColor={(color) => onFormat("foreColor", color)}
                onSelectBgColor={(color) => onFormat("hiliteColor", color)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </TooltipProvider>
    </div>
  );
}
