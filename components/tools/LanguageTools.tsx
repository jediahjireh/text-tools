"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LanguageToolsProps {
  text: string;
  setText: (text: string) => void;
}

export default function LanguageTools({ text, setText }: LanguageToolsProps) {
  const transliterate = () => {
    // very basic transliteration example (Cyrillic to Latin)
    const cyrillicToLatin: Record<string, string> = {
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

  const tokenize = () => {
    // simple word tokenisation
    const tokens = text.match(/\b(\w+)\b/g);
    setText(tokens ? tokens.join("\n") : "");
  };

  const detectLanguage = () => {
    // language detection based on common words and patterns
    const languagePatterns: Record<string, RegExp> = {
      English:
        /\b(the|be|to|of|and|a|in|that|have|I|it|for|not|on|with|he|as|you|do|at)\b/gi,
      Spanish:
        /\b(el|la|de|que|y|en|un|ser|se|no|haber|por|con|su|para|como|estar|tener|le|lo|lo|todo|pero|más|hacer|o|poder|decir|este|ir|otro|ese|la|si|me|ya|ver|porque|dar|cuando|él|muy|sin|vez|mucho|saber|qué|sobre|mi|alguno|mismo|yo|también|hasta)\b/gi,
      French:
        /\b(le|de|un|être|et|à|il|avoir|ne|je|son|que|se|qui|ce|dans|en|du|elle|au|de|ce|le|pour|pas|que|vous|par|sur|faire|plus|dire|me|on|mon|lui|nous|comme|mais|pouvoir|avec|tout|y|aller|voir|en|bien|où|sans|tu|ou|leur|homme|si|deux|mari|moi|vouloir|te|femme|venir|quand|grand|celui)\b/gi,
      German:
        /\b(der|die|und|in|den|von|zu|das|mit|sich|des|auf|für|ist|im|dem|nicht|ein|eine|als|auch|es|an|werden|aus|er|hat|daß|sie|nach|bei|um|am|sind|noch|wie|einem|über|einen|so|zum|war|bis|mehr|durch|man|sein|wurde|sei|hatte|kann|gegen|vom|können|schon|wenn|habe|seine|ihre|dann|unter|wir|soll|ich|eines|ihr|ihm|diese|wurde|wo|will)\b/gi,
      Italian:
        /\b(il|di|che|la|in|e|il|un|a|per|è|sono|su|con|come|da|questo|ma|o|alla|dell|della|uno|anche|sei|mi|lo|ha|le|ne|gli|ci|del|al|tutto|essere|fare|chi|più|fare|dire|dove|cosa|due|stato|loro|così|molto|tutti|tempo|io|quando|bene|qui|ora|sia|altro|te|noi|te|solo|me|tu|mio|stesso|quello|tuo|qualcosa|niente|mai|grazie|sì|no|lui|lei|suo|sua|ogni|ancora|vedere|tanto|poco|oggi|volta|perché|certo|dopo|prima|forse|vero|ecco|va|anni|volta|uomo|giorno|casa|parte|vita|posto|lavoro|caso|punto|mano|modo|momento|occhio|signore|scusa|voi|subito|guarda|meglio|male)\b/gi,
      Portuguese:
        /\b(o|a|de|que|e|do|da|em|um|para|é|com|não|uma|os|no|se|na|por|mais|as|dos|como|mas|foi|ao|ele|das|tem|à|seu|sua|ou|ser|quando|muito|há|nos|já|está|eu|também|só|pelo|pela|até|isso|ela|entre|era|depois|sem|mesmo|aos|ter|seus|quem|nas|me|esse|eles|estão|você|tinha|foram|essa|num|nem|suas|meu|às|minha|têm|numa|pelos|elas|havia|seja|qual|será|nós|tenho|lhe|deles|essas|esses|pelas|este|fosse|dele|tu|te|vocês|vos|lhes|meus|minhas|teu|tua|teus|tuas|nosso|nossa|nossos|nossas|dela|delas|esta|estes|estas|aquele|aquela|aqueles|aquelas|isto|aquilo|estou|está|estamos|estão|estive|esteve|estivemos|estiveram|estava|estávamos|estavam|estivera|estivéramos|esteja|estejamos|estejam|estivesse|estivéssemos|estivessem|estiver|estivermos|estiverem|hei|há|havemos|hão|houve|houvemos|houveram|houvera|houvéramos|haja|hajamos|hajam|houvesse|houvéssemos|houvessem|houver|houvermos|houverem|houverei|houverá|houveremos|houverão|houveria|houveríamos|houveriam|sou|somos|são|era|éramos|eram|fui|foi|fomos|foram|fora|fôramos|seja|sejamos|sejam|fosse|fôssemos|fossem|for|formos|forem|serei|será|seremos|serão|seria|seríamos|seriam|tenho|tem|temos|tém|tinha|tínhamos|tinham|tive|teve|tivemos|tiveram|tivera|tivéramos|tenha|tenhamos|tenham|tivesse|tivéssemos|tivessem|tiver|tivermos|tiverem|terei|terá|teremos|terão|teria|teríamos|teriam)\b/gi,
      Russian: /[а-яА-Я]/g,
      Japanese:
        /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g,
      Chinese: /[\u4e00-\u9fff\uf900-\ufaff]/g,
      Korean:
        /[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\ud7b0-\ud7ff]/g,
      Arabic:
        /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufefc]/g,
      Hindi: /[\u0900-\u097f]/g,
      Thai: /[\u0e00-\u0e7f]/g,
    };

    // count matches for each language
    const languageCounts = Object.entries(languagePatterns).map(
      ([language, pattern]) => {
        const matches = text.match(pattern);
        const count = matches ? matches.length : 0;
        return { language, count };
      },
    );

    // sort by count in descending order
    languageCounts.sort((a, b) => b.count - a.count);

    // language with the highest count
    const detectedLanguage =
      languageCounts[0].count > 0 ? languageCounts[0].language : "Unknown";

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
          <h3 className="text-lg font-medium">Text Tokenizer</h3>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              Break text into individual words
            </p>
            <Button onClick={tokenize}>Tokenize Text</Button>
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
