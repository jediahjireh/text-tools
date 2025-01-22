"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Undo2, Redo2, Copy, CopyCheck } from "lucide-react";

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
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <Button
          onClick={handleUndo}
          variant={"link"}
          disabled={historyIndex <= 0}
          className="text-pink-500 hover:text-pink-700 disabled:opacity-50"
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleRedo}
          variant={"link"}
          disabled={historyIndex >= history.length - 1}
          className="text-pink-500 hover:text-pink-700 disabled:opacity-50"
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>
      <textarea
        ref={textareaRef}
        className="w-full h-32 p-2 border-2 border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          onClick={handleCopy}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          {copied ? (
            <CopyCheck className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
