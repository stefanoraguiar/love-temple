import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-24 text-center">
      <p className="text-xs tracking-[0.24em] text-primary uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl italic">Esta página não existe</h1>
      <p className="mt-4 text-foreground/75">
        O encontro está na página principal.
      </p>
      <Button asChild className="mt-8 h-11 self-center rounded-full px-5">
        <Link href="/">Voltar ao Love Temple</Link>
      </Button>
    </main>
  );
}
