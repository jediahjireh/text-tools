import React from "react";

export default function CharacterCounter({ text }: { text: string }) {
  return (
    <div className="bg-pink-200 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-pink-700 mb-2">
        Character Counter
      </h2>
      <p className="text-2xl font-bold text-pink-600">{text.length}</p>
    </div>
  );
}
