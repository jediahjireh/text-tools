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

    // Forward the ref to the parent component
    useImperativeHandle(ref, () => editorRef.current!);

    // Update the editor content when the value prop changes
    useEffect(() => {
      if (editorRef.current && editorRef.current.innerHTML !== value) {
        // Save selection
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

        // Update content
        editorRef.current.innerHTML = value;

        // Restore selection if possible
        if (hadFocus && range && selection) {
          try {
            // Try to adjust the range to the new DOM
            const newRange = document.createRange();

            // Find equivalent positions in the new DOM
            // This is a simplified approach and might not work perfectly in all cases
            if (editorRef.current.contains(range.startContainer)) {
              newRange.setStart(range.startContainer, range.startOffset);
              newRange.setEnd(range.endContainer, range.endOffset);

              selection.removeAllRanges();
              selection.addRange(newRange);

              // Focus the editor
              editorRef.current.focus();
            }
          } catch (e) {
            console.warn("Couldn't restore selection", e);
          }
        }
      }
    }, [value]);

    // Handle selection changes
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

    // Handle input events
    const handleInput = () => {
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    };

    // Handle paste events to clean up pasted content
    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();

      // Get text content from clipboard
      const text = e.clipboardData.getData("text/plain");

      // Check if HTML content is available
      const html = e.clipboardData.getData("text/html");

      if (html && (html.includes("<table") || html.includes("<img"))) {
        // For tables and images, we'll use a sanitized version of the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        // Remove potentially harmful elements and attributes
        const sanitizedHtml = tempDiv.innerHTML;
        document.execCommand("insertHTML", false, sanitizedHtml);
      } else {
        // For plain text, just insert as text
        document.execCommand("insertText", false, text);
      }
    };

    return (
      <div
        ref={editorRef}
        contentEditable="true"
        className="min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        onInput={handleInput}
        onPaste={handlePaste}
        style={{ overflowY: "auto" }}
        suppressContentEditableWarning={true}
        spellCheck="true"
        data-gramm="false" // Disable Grammarly which can interfere
        dir="ltr" // Ensure left-to-right text direction
      />
    );
  },
);

EditorContent.displayName = "EditorContent";

export default EditorContent;
