import React from "react";

export default function WordCounter({ text }: { text: string }) {
  // split text by spaces and filter out empty entries to count words accurately
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-pink-200 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-pink-700 mb-2">Word Counter</h2>
      <p className="text-2xl font-bold text-pink-600">{wordCount}</p>
    </div>
  );
}
