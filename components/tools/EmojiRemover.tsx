import React from "react";
import { Button } from "@/components/ui/button";

export default function EmojiRemover({
  text,
  setText,
}: {
  text: string;
  setText: (text: string) => void;
}) {
  const removeEmojis = () => {
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    const cleanText = text.replace(emojiRegex, "");
    setText(cleanText);
  };

  return (
    <div className="bg-pink-200 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-pink-700 mb-2">
        Emoji Remover
      </h2>
      <Button
        onClick={removeEmojis}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
      >
        Remove Emojis
      </Button>
    </div>
  );
}
