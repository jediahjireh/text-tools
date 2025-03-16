"use client";

import { useEffect, useRef, useState } from "react";

import { Clipboard, ClipboardCheck, Redo2, Trash2, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TextAreaProps {
  text: string;
  setText: (text: string) => void;
}

export default function TextArea({ text, setText }: TextAreaProps) {
  const [history, setHistory] = useState<string[]>([text]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // track copy status
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (text !== history[historyIndex]) {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), text]);
      setHistoryIndex((prev) => prev + 1);
    }
  }, [text, history, historyIndex]);

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setText(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setText(history[historyIndex + 1]);
    }
  };

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand("copy");
      textareaRef.current.setSelectionRange(0, 0);
      setCopied(true);
      // reset copied status
      setTimeout(() => setCopied(false), 500);
    }
  };

  const handleClear = () => {
    // add the current text to the history if it's not already the latest
    if (text !== history[historyIndex]) {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), text]);
      setHistoryIndex((prev) => prev + 1);
    }
    // clear the text within the text area
    setText("");
  };

  return (
    <div className="space-y-4">
      <textarea
        ref={textareaRef}
        className="h-32 w-full rounded-md border bg-background p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary sm:h-40"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleCopy}
            disabled={!text.trim()}
            className="flex items-center"
            variant="outline"
          >
            {copied ? (
              <ClipboardCheck className="h-4 w-4" />
            ) : (
              <Clipboard className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="flex items-center"
            variant="outline"
          >
            <Undo2 className="mr-2 h-4 w-4" />
            Undo
          </Button>
          <Button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="flex items-center"
            variant="outline"
          >
            <Redo2 className="mr-2 h-4 w-4" />
            Redo
          </Button>
        </div>

        <div>
          <Button
            onClick={handleClear}
            disabled={!text.trim()}
            className="flex items-center"
            variant="outline"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
