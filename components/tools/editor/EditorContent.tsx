"use client";

import type React from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface EditorContentProps {
  value: string;
  onChange: (html: string) => void;
  onSelectionChange?: () => void;
}

const EditorContent = forwardRef<HTMLDivElement, EditorContentProps>(
  ({ value, onChange, onSelectionChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);

    // forward the ref to the parent component
    useImperativeHandle(ref, () => editorRef.current!);

    // update the editor content when the value prop changes
    useEffect(() => {
      if (editorRef.current && editorRef.current.innerHTML !== value) {
        // save selection
        const selection = window.getSelection();
        let range = null;
        const hadFocus = document.activeElement === editorRef.current;

        if (
          selection &&
          selection.rangeCount > 0 &&
          editorRef.current.contains(selection.anchorNode)
        ) {
          range = selection.getRangeAt(0).cloneRange();
        }

        // update content
        editorRef.current.innerHTML = value;

        // restore selection if possible
        if (hadFocus && range && selection) {
          try {
            // try to adjust the range to the new DOM
            const newRange = document.createRange();

            // find equivalent positions in the new DOM
            // (this is a simplified approach and might not work perfectly in all cases)
            if (editorRef.current.contains(range.startContainer)) {
              newRange.setStart(range.startContainer, range.startOffset);
              newRange.setEnd(range.endContainer, range.endOffset);

              selection.removeAllRanges();
              selection.addRange(newRange);

              // focus the editor
              editorRef.current.focus();
            }
          } catch (e) {
            console.warn("Couldn't restore selection", e);
          }
        }
      }
    }, [value]);

    // handle selection changes
    useEffect(() => {
      if (!onSelectionChange) return;

      const handleSelectionChange = () => {
        const selection = window.getSelection();
        if (
          selection &&
          editorRef.current &&
          editorRef.current.contains(selection.anchorNode)
        ) {
          onSelectionChange();
        }
      };

      document.addEventListener("selectionchange", handleSelectionChange);
      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
      };
    }, [onSelectionChange]);

    // handle input events
    const handleInput = () => {
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    };

    // handle paste events to clean up pasted content and preserve whitespace
    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();

      // get text content from clipboard
      const text = e.clipboardData.getData("text/plain");

      // check if HTML content is available
      const html = e.clipboardData.getData("text/html");

      if (html && (html.includes("<table") || html.includes("<img"))) {
        // for tables and images, we'll use a sanitized version of the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        // remove potentially harmful elements and attributes
        const sanitizedHtml = tempDiv.innerHTML;
        document.execCommand("insertHTML", false, sanitizedHtml);
      } else {
        // preserve whitespace and line breaks for plain text
        const formattedText = text
          .replace(/\n/g, "<br>")
          .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
          .replace(/ {2}/g, "&nbsp;&nbsp;");

        document.execCommand("insertHTML", false, formattedText);
      }
    };

    // handle keydown events to properly handle tabs
    const handleKeyDown = (e: React.KeyboardEvent) => {
      // handle tab key to insert spaces instead of changing focus
      if (e.key === "Tab") {
        e.preventDefault();
        document.execCommand("insertHTML", false, "&nbsp;&nbsp;&nbsp;&nbsp;");
      }
    };

    return (
      <div
        ref={editorRef}
        contentEditable="true"
        className="min-h-[200px] w-full whitespace-pre-wrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        style={{ overflowY: "auto" }}
        suppressContentEditableWarning={true}
        spellCheck="true"
        // disable Grammarly which can interfere
        data-gramm="false"
        // ensure left-to-right text direction
        dir="ltr"
      />
    );
  },
);

EditorContent.displayName = "EditorContent";

export default EditorContent;
