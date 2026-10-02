"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RgpdBanner() {
  const [visivel, setVisivel] = useState(true);

  if (!visivel) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div
        role="region"
        aria-label="Aviso de privacidade"
        className="mx-auto flex w-full max-w-5xl flex-col gap-4 border border-primary/30 bg-background/95 p-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-end sm:justify-between sm:p-5"
      >
        <p className="max-w-3xl text-sm leading-relaxed text-foreground/90">
          Este site não usa cookies nem guarda nada no teu browser. Se te
          inscreveres, tratamos o teu nome, email e telemóvel só para organizar
          o Love Temple, e só com o teu consentimento.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" asChild className="h-10 rounded-full px-4">
            <Link href="/privacidade">Privacidade</Link>
          </Button>
          <Button onClick={() => setVisivel(false)} className="h-10 rounded-full px-4">
            Compreendi
          </Button>
        </div>
      </div>
    </div>
  );
}
