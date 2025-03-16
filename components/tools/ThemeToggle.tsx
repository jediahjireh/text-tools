"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-10 w-10 rounded-full"
    >
      {theme === "light" ? (
        <Image
          src="/hello-kitty-icon.png"
          alt="Switch to Dark Mode"
          width={28}
          height={28}
          className="transition-all"
        />
      ) : (
        <Image
          src="/batman-icon.png"
          alt="Switch to Light Mode"
          width={24}
          height={24}
          className="transition-all"
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
