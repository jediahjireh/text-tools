"use client";

import { useEffect, useRef, useState } from "react";

import { Clipboard, ClipboardCheck, Redo, Trash2, Undo } from "lucide-react";

import EditorContent from "@/components/tools/editor/EditorContent";
import EditorToolbar from "@/components/tools/editor/EditorToolbar";
import ImageDialog from "@/components/tools/editor/ImageDialog";
import LinkDialog from "@/components/tools/editor/LinkDialog";
import TableDialog from "@/components/tools/editor/TableDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RichTextEditorProps {
  text: string;
  setText: (text: string) => void;
  html: string;
  setHtml: (html: string) => void;
}

export default function RichTextEditor({
  text,
  setText,
  html,
  setHtml,
}: RichTextEditorProps) {
  const [history, setHistory] = useState<string[]>([html || ""]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showTableDialog, setShowTableDialog] = useState(false);

  // Track current formatting state
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    heading: 0,
    align: "left",
    list: "",
    link: false,
    color: "",
    backgroundColor: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   if (text && (!html || html === "<div></div>" || html === "<p></p>")) {
  //     // Convert plain text to HTML, preserving whitespace
  //     const formattedText = text
  //       .replace(/\n/g, "<br>")
  //       .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
  //       .replace(/ {2}/g, "&nbsp;&nbsp;");

  //     setHtml(`<div>${formattedText}</div>`);
  //   }
  // }, [text, html, setHtml]);

  // add to history when html changes
  useEffect(() => {
    if (html && html !== history[historyIndex]) {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), html]);
      setHistoryIndex((prev) => prev + 1);
    }
  }, [html, history, historyIndex]);

  // handle content changes from the editor
  const handleContentChange = (newHtml: string) => {
    setHtml(newHtml);

    // extract plain text for other tools
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = newHtml;
    const plainText = tempDiv.textContent || "";
    setText(plainText);
  };

  // check formatting state based on current selection
  const checkFormatting = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const parentElement = findParentElement(
      selection.getRangeAt(0).commonAncestorContainer,
    );

    setFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikethrough: document.queryCommandState("strikeThrough"),
      heading: getHeadingLevel(parentElement),
      align: document.queryCommandState("justifyCenter")
        ? "center"
        : document.queryCommandState("justifyRight")
          ? "right"
          : document.queryCommandState("justifyFull")
            ? "justify"
            : "left",
      list: isInList(parentElement),
      link: document.queryCommandState("createLink"),
      color: document.queryCommandValue("foreColor"),
      backgroundColor: document.queryCommandValue("hiliteColor"),
    });
  };

  // helper function to find parent element
  const findParentElement = (node: Node | null): HTMLElement | null => {
    if (!node) return null;
    if (node.nodeType === Node.TEXT_NODE) {
      return node.parentElement;
    }
    return node as HTMLElement;
  };

  // helper function to determine heading level
  const getHeadingLevel = (element: HTMLElement | null): number => {
    if (!element) return 0;

    let current = element;
    while (current) {
      const tagName = current.tagName?.toLowerCase();
      if (tagName === "h1") return 1;
      if (tagName === "h2") return 2;
      if (tagName === "h3") return 3;

      // don't traverse beyond the editor
      if (current === editorRef.current) break;

      current = current.parentElement as HTMLElement;
    }

    return 0;
  };

  // helper function to check if in a list
  const isInList = (element: HTMLElement | null): string => {
    if (!element) return "";

    let current = element;
    while (current) {
      const tagName = current.tagName?.toLowerCase();
      if (tagName === "ul") {
        // Check if it's a checklist
        if (current.classList.contains("checklist")) {
          return "checklist";
        }
        return "unordered";
      }
      if (tagName === "ol") return "ordered";

      // Don't traverse beyond the editor
      if (current === editorRef.current) break;

      current = current.parentElement as HTMLElement;
    }

    return "";
  };

  // apply formatting command
  const handleFormat = (command: string, value = "") => {
    if (!editorRef.current) return;

    // focus the editor first
    editorRef.current.focus();

    // save selection
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    // handle special cases
    switch (command) {
      case "heading":
        applyHeading(Number.parseInt(value));
        break;
      case "blockquote":
        toggleBlockquote();
        break;
      case "formatBlock":
        toggleFormatBlock(value);
        break;
      case "insertUnorderedList":
        toggleList("ul");
        break;
      case "insertOrderedList":
        toggleList("ol");
        break;
      case "insertChecklist":
        toggleChecklist();
        break;
      case "insertHTML":
        document.execCommand(command, false, value);
        break;
      default:
        document.execCommand(command, false, value);
    }

    // update content and check formatting
    if (editorRef.current) {
      handleContentChange(editorRef.current.innerHTML);
      checkFormatting();
    }
  };

  // add this new function to toggle format blocks like pre (code)
  const toggleFormatBlock = (blockType: string) => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const parentElement = findParentElement(range.commonAncestorContainer);

    // check if we're already in this block type
    let inBlock = false;
    let current = parentElement;

    while (current && current !== editorRef.current) {
      if (current.tagName?.toLowerCase() === blockType.toLowerCase()) {
        inBlock = true;
        break;
      }
      current = current.parentElement as HTMLElement;
    }

    if (inBlock) {
      // remove the block formatting
      document.execCommand("formatBlock", false, "<p>");
    } else {
      // apply the block formatting
      document.execCommand("formatBlock", false, `<${blockType}>`);
    }
  };

  // apply heading formatting
  const applyHeading = (level: number) => {
    if (!editorRef.current) return;

    // focus the editor
    editorRef.current.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    // get the current heading level
    const currentHeadingLevel = getHeadingLevel(
      findParentElement(range.commonAncestorContainer),
    );

    // if already at this heading level, remove it (convert to paragraph)
    if (currentHeadingLevel === level) {
      document.execCommand("formatBlock", false, "<p>");
    } else {
      // apply the heading
      document.execCommand("formatBlock", false, `<h${level}>`);
    }

    // update content and check formatting
    if (editorRef.current) {
      handleContentChange(editorRef.current.innerHTML);
      checkFormatting();
    }
  };

  // toggle blockquote
  const toggleBlockquote = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const parentElement = findParentElement(range.commonAncestorContainer);

    // check if we're already in a blockquote
    let inBlockquote = false;
    let current = parentElement;

    while (current && current !== editorRef.current) {
      if (current.tagName?.toLowerCase() === "blockquote") {
        inBlockquote = true;
        break;
      }
      current = current.parentElement as HTMLElement;
    }

    if (inBlockquote) {
      // remove blockquote
      document.execCommand("formatBlock", false, "p");
    } else {
      // apply blockquote
      document.execCommand("formatBlock", false, "blockquote");
    }
  };

  // toggle list (ordered or unordered)
  const toggleList = (listType: "ul" | "ol") => {
    if (!editorRef.current) return;

    // focus the editor
    editorRef.current.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const parentElement = findParentElement(range.commonAncestorContainer);

    // check if we're already in this type of list
    const currentListType = isInList(parentElement);
    const command =
      listType === "ul" ? "insertUnorderedList" : "insertOrderedList";

    if (
      (listType === "ul" && currentListType === "unordered") ||
      (listType === "ol" && currentListType === "ordered")
    ) {
      // we're already in this type of list, so remove it
      document.execCommand(command, false);
    } else {
      // if we're in a different type of list, first remove that list
      if (
        currentListType === "unordered" ||
        currentListType === "ordered" ||
        currentListType === "checklist"
      ) {
        const removeCommand =
          currentListType === "ordered"
            ? "insertOrderedList"
            : "insertUnorderedList";
        document.execCommand(removeCommand, false);
      }

      // now apply the new list type
      document.execCommand(command, false);
    }

    // update content and check formatting
    if (editorRef.current) {
      handleContentChange(editorRef.current.innerHTML);
      checkFormatting();
    }
  };

  // toggle checklist
  const toggleChecklist = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const parentElement = findParentElement(range.commonAncestorContainer);

    // check if we're already in a checklist
    const listType = isInList(parentElement);

    if (listType === "checklist") {
      // remove checklist
      let current = parentElement;
      while (current && current !== editorRef.current) {
        if (
          current.tagName?.toLowerCase() === "ul" &&
          current.classList.contains("checklist")
        ) {
          // convert to paragraph
          const items = current.querySelectorAll("li");
          const fragment = document.createDocumentFragment();

          items.forEach((item) => {
            const p = document.createElement("p");
            p.innerHTML = item.innerHTML.replace(/<input[^>]*>/g, "").trim();
            fragment.appendChild(p);
          });

          current.parentNode?.replaceChild(fragment, current);
          break;
        }
        current = current.parentElement as HTMLElement;
      }
    } else {
      // create checklist from selection
      const selectedText = selection.toString();

      if (selectedText) {
        // convert it if already in a list
        if (listType === "unordered" || listType === "ordered") {
          let current = parentElement;
          while (current && current !== editorRef.current) {
            if (
              current.tagName?.toLowerCase() === "ul" ||
              current.tagName?.toLowerCase() === "ol"
            ) {
              const newList = document.createElement("ul");
              newList.className = "checklist";

              const items = current.querySelectorAll("li");
              items.forEach((item) => {
                const newItem = document.createElement("li");
                newItem.innerHTML = `<input type="checkbox"> ${item.innerHTML}`;
                newList.appendChild(newItem);
              });

              current.parentNode?.replaceChild(newList, current);
              break;
            }
            current = current.parentElement as HTMLElement;
          }
        } else {
          // create new checklist
          const lines = selectedText.split("\n");
          let html = '<ul class="checklist">';

          lines.forEach((line) => {
            if (line.trim()) {
              html += `<li><input type="checkbox"> ${line}</li>`;
            }
          });

          html += "</ul>";
          document.execCommand("insertHTML", false, html);
        }
      } else {
        // Insert empty checklist
        document.execCommand(
          "insertHTML",
          false,
          '<ul class="checklist"><li><input type="checkbox"> </li></ul>',
        );
      }
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      const previousHtml = history[historyIndex - 1];
      setHtml(previousHtml);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      const nextHtml = history[historyIndex + 1];
      setHtml(nextHtml);
    }
  };

  // copy formatted content
  const handleCopy = () => {
    if (html) {
      navigator.clipboard.writeText(html).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  const handleClear = () => {
    setHtml("");
    setText("");
  };

  if (!mounted) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="h-32 w-full animate-pulse rounded-md border bg-muted" />
        </CardContent>
      </Card>
    );
  }

  // update link dialog on insert handler
  const handleLinkInsert = (url: string, linkText: string) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    const selection = window.getSelection();
    if (!selection) return;

    // Create a preview element for the link
    const previewText = linkText || url;

    // If text is selected, create a link with that text
    // Otherwise, create a link with the provided text or the URL
    if (selection.toString().trim() === "") {
      // No text selected, insert new link with preview
      const linkHtml = `
        <div class="link-container" style="margin: 0.5em 0;">
          <a href="${url}" title="${url}" target="_blank" rel="noopener noreferrer">${previewText}</a>
          <div class="link-preview" style="display: flex; align-items: center; max-width: 100%; border: 1px solid #ddd; border-radius: 4px; padding: 8px; margin-top: 4px; background-color: #f9f9f9;">
            <div style="overflow: hidden; text-overflow: ellipsis;">
              <div style="font-size: 0.9em; color: #0066cc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${url}</div>
              <div style="font-size: 0.8em; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Link preview</div>
            </div>
          </div>
        </div>
      `;
      document.execCommand("insertHTML", false, linkHtml);
    } else {
      // Text selected, create link with selected text
      document.execCommand("createLink", false, url);

      // Add title and target attributes to the created link
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const linkElement = range.commonAncestorContainer.parentElement;
        if (linkElement && linkElement.tagName === "A") {
          linkElement.setAttribute("title", url);
          linkElement.setAttribute("target", "_blank");
          linkElement.setAttribute("rel", "noopener noreferrer");
        }
      }
    }

    // update content and check formatting
    handleContentChange(editorRef.current.innerHTML);
    checkFormatting();
  };

  // update the ImageDialog onInsert handler
  const handleImageInsert = (url: string, alt: string) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    // create image with caption if alt text is provided
    let imageHtml = "";
    if (alt) {
      imageHtml = `
        <figure class="image-container" style="text-align: center; margin: 1em 0;">
          <img src="${url}" alt="${alt}" style="max-width: 100%; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
          <figcaption style="font-size: 0.9em; color: #666; margin-top: 0.5em;">${alt}</figcaption>
          <div class="image-source" style="font-size: 0.8em; color: #999; margin-top: 0.2em;">${url}</div>
        </figure>
      `;
    } else {
      imageHtml = `
        <figure class="image-container" style="text-align: center; margin: 1em 0;">
          <img src="${url}" alt="" style="max-width: 100%; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
          <div class="image-source" style="font-size: 0.8em; color: #999; margin-top: 0.2em;">${url}</div>
        </figure>
      `;
    }

    document.execCommand("insertHTML", false, imageHtml);

    // update content
    handleContentChange(editorRef.current.innerHTML);
  };

  // update the table dialog on insert handler
  const handleTableInsert = (rows: number, cols: number) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    // generate table HTML with editable cells
    let tableHtml = `
      <div class="table-container" style="margin: 1em 0; overflow-x: auto;">
        <table border="1" style="width:100%; border-collapse: collapse; border: 1px solid #ddd;">
    `;

    // add header row
    tableHtml += "<thead><tr>";
    for (let j = 0; j < cols; j++) {
      tableHtml += `<th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2; text-align: left;">Header ${j + 1}</th>`;
    }
    tableHtml += "</tr></thead><tbody>";

    // add data rows
    for (let i = 1; i < rows; i++) {
      tableHtml += "<tr>";
      for (let j = 0; j < cols; j++) {
        tableHtml += `<td style="padding: 8px; border: 1px solid #ddd;">Cell ${i}-${j + 1}</td>`;
      }
      tableHtml += "</tr>";
    }
    tableHtml += "</tbody></table></div>";

    document.execCommand("insertHTML", false, tableHtml);

    // update content
    handleContentChange(editorRef.current.innerHTML);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <EditorToolbar
            onFormat={handleFormat}
            formats={formats}
            onLinkClick={() => setShowLinkDialog(true)}
            onImageClick={() => setShowImageDialog(true)}
            onTableClick={() => setShowTableDialog(true)}
            setFormats={setFormats}
          />

          <div className="mt-2">
            <EditorContent
              ref={editorRef}
              value={html}
              onChange={handleContentChange}
              onSelectionChange={checkFormatting}
            />
          </div>

          <LinkDialog
            open={showLinkDialog}
            onOpenChange={setShowLinkDialog}
            onInsert={handleLinkInsert}
          />

          <ImageDialog
            open={showImageDialog}
            onOpenChange={setShowImageDialog}
            onInsert={handleImageInsert}
          />

          <TableDialog
            open={showTableDialog}
            onOpenChange={setShowTableDialog}
            onInsert={handleTableInsert}
          />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="flex items-center"
            variant="outline"
          >
            <Undo className="mr-2 h-4 w-4" />
            Undo
          </Button>
          <Button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="flex items-center"
            variant="outline"
          >
            <Redo className="mr-2 h-4 w-4" />
            Redo
          </Button>
          <Button
            onClick={handleClear}
            disabled={!text.trim()}
            className="flex items-center"
            variant="outline"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>

        <div>
          <Button
            onClick={handleCopy}
            disabled={!text.trim()}
            className="flex items-center"
            variant="outline"
          >
            {copied ? (
              <ClipboardCheck className="mr-2 h-4 w-4" />
            ) : (
              <Clipboard className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  );
}
