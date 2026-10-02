"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-24 text-center">
      <h1 className="font-display text-5xl italic">Algo correu mal</h1>
      <p className="mt-4 text-foreground/75">
        Não foi possível abrir esta página. Podes tentar de novo.
      </p>
      <Button onClick={() => reset()} className="mt-8 h-11 self-center rounded-full px-5">
        Tentar de novo
      </Button>
    </main>
  );
}
