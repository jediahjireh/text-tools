"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CleaningToolsProps {
  text: string;
  setText: (text: string) => void;
}

export default function CleaningTools({ text, setText }: CleaningToolsProps) {
  const [profanityList, setProfanityList] = useState<string[]>([]);
  const [filteredProfanity, setFilteredProfanity] = useState<string>("");

  const removeEmojis = () => {
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    setText(text.replace(emojiRegex, ""));
  };

  const removePunctuation = () => {
    setText(text.replace(/[^\w\s]|_/g, ""));
  };

  const removeStopwords = () => {
    const stopwords = new Set([
      "a",
      "an",
      "and",
      "are",
      "as",
      "at",
      "be",
      "by",
      "for",
      "from",
      "has",
      "he",
      "in",
      "is",
      "it",
      "its",
      "of",
      "on",
      "that",
      "the",
      "to",
      "was",
      "were",
      "will",
      "with",
    ]);
    setText(
      text
        .split(" ")
        .filter((word) => !stopwords.has(word.toLowerCase()))
        .join(" "),
    );
  };

  const stripHTMLTags = () => {
    setText(text.replace(/<[^>]*>/g, ""));
  };

  const filterProfanity = () => {
    if (profanityList.length === 0) return;

    // create a regex pattern for each profanity word
    const regex = new RegExp(profanityList.join("|"), "gi");
    const filteredText = text.replace(regex, (match) => {
      // leave the first letter visible and replace the rest with asterisks
      return match.charAt(0) + "*".repeat(match.length - 1);
    });

    setText(filteredText);
  };

  const handleAddProfanity = () => {
    if (filteredProfanity.trim()) {
      setProfanityList([...profanityList, filteredProfanity.trim()]);
      setFilteredProfanity("");
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Remove Special Characters</h3>
          <div className="grid grid-cols-1 gap-2">
            <Button onClick={removeEmojis}>Remove Emojis</Button>
            <Button onClick={removePunctuation}>Remove Punctuation</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Content Cleaning</h3>
          <div className="grid grid-cols-1 gap-2">
            <Button onClick={removeStopwords}>Remove Stopwords</Button>
            <Button onClick={stripHTMLTags}>Strip HTML Tags</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Content Filtering</h3>
          <div className="grid grid-cols-1 gap-2">
            <input
              type="text"
              value={filteredProfanity}
              onChange={(e) => setFilteredProfanity(e.target.value)}
              placeholder="Add profanity word"
              className="border p-2"
            />
            <Button onClick={handleAddProfanity}>Add Profanity Word</Button>
            <Button onClick={filterProfanity}>Filter Profanity</Button>
          </div>
          <div className="mt-2">
            <h4 className="font-medium">Current Profanity List:</h4>
            <ul>
              {profanityList.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
