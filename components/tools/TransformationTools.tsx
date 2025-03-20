"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface TransformationToolsProps {
  text: string;
  setText: (text: string) => void;
}

export default function TransformationTools({
  text,
  setText,
}: TransformationToolsProps) {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");

  const reverseText = () => {
    setText(text.split("").reverse().join(""));
  };

  const encodeBase64 = () => {
    setText(btoa(text));
  };

  const decodeBase64 = () => {
    try {
      setText(atob(text));
    } catch (error) {
      alert("Invalid Base64 string");
      console.log(error);
    }
  };

  const findAndReplace = () => {
    setText(text.replace(new RegExp(findText, "g"), replaceText));
  };

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Text Reverser</h3>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              Reverse the characters in your text
            </p>
            <Button onClick={reverseText}>Reverse Text</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Base64</h3>
          <div className="flex flex-col space-y-2">
            <Button onClick={encodeBase64}>Encode Base64</Button>
            <Button onClick={decodeBase64}>Decode Base64</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Find and Replace</h3>
          <div className="flex flex-col space-y-2">
            <Input
              placeholder="Find"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
            />
            <Input
              placeholder="Replace"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
            />
            <Button onClick={findAndReplace}>Find and Replace</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
