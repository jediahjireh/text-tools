"use client";

import { useState } from "react";
import TextArea from "@/components/tools/TextArea";
import CharacterCounter from "@/components/tools/CharacterCounter";
import EmojiRemover from "@/components/tools/EmojiRemover";
import TextWrapper from "@/components/tools/TextWrapper";
import WordCounter from "@/components/tools/WordCounter";

export default function Home() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 relative">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CharacterCounter text={text} />
          <WordCounter text={text} />
        </div>
        <h1 className="text-3xl font-bold text-pink-500 text-center comic-sans-ms">
          Text Tools
        </h1>
        <TextArea text={text} setText={setText} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmojiRemover text={text} setText={setText} />
          <TextWrapper text={text} setText={setText} />
        </div>
      </div>
    </div>
  );
}
