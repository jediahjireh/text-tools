"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LanguageToolsProps {
  text: string;
  setText: (text: string) => void;
}

export default function LanguageTools({ text, setText }: LanguageToolsProps) {
  const transliterate = () => {
    // This is a very basic transliteration example (Cyrillic to Latin)
    const cyrillicToLatin: { [key: string]: string } = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "kh",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ъ: "",
      ы: "y",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
    };
    setText(
      text
        .toLowerCase()
        .split("")
        .map((char) => cyrillicToLatin[char] || char)
        .join(""),
    );
  };

  const tokenise = () => {
    // Simple word tokenisation
    setText(text.match(/\b(\w+)\b/g)?.join("\n") || "");
  };

  const detectLanguage = () => {
    // This is a very basic language detection based on common words
    const languagePatterns: { [key: string]: RegExp } = {
      English:
        /\b(the|be|to|of|and|a|in|that|have|I|it|for|not|on|with|he|as|you|do|at)\b/gi,
      Spanish:
        /\b(el|la|de|que|y|en|un|ser|se|no|haber|por|con|su|para|como|estar|tener|le|lo|lo|todo|pero|más|hacer|o|poder|decir|este|ir|otro|ese|la|si|me|ya|ver|porque|dar|cuando|él|muy|sin|vez|mucho|saber|qué|sobre|mi|alguno|mismo|yo|también|hasta)\b/gi,
      French:
        /\b(le|de|un|être|et|à|il|avoir|ne|je|son|que|se|qui|ce|dans|en|du|elle|au|de|ce|le|pour|pas|que|vous|par|sur|faire|plus|dire|me|on|mon|lui|nous|comme|mais|pouvoir|avec|tout|y|aller|voir|en|bien|où|sans|tu|ou|leur|homme|si|deux|mari|moi|vouloir|te|femme|venir|quand|grand|celui)\b/gi,
    };

    const languageCounts = Object.entries(languagePatterns).map(
      ([language, pattern]) => {
        const count = (text.match(pattern) || []).length;
        return { language, count };
      },
    );

    const detectedLanguage = languageCounts.reduce((a, b) =>
      a.count > b.count ? a : b,
    ).language;
    alert(`Detected language: ${detectedLanguage}`);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Transliteration</h3>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              Convert Cyrillic to Latin characters
            </p>
            <Button onClick={transliterate}>Transliterate</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Text Tokeniser</h3>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              Break text into individual words
            </p>
            <Button onClick={tokenise}>Tokenise Text</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h3 className="text-lg font-medium">Language Detection</h3>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              Identify the language of the text
            </p>
            <Button onClick={detectLanguage}>Detect Language</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
