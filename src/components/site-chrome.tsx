import Link from "next/link";
import { Button } from "@/components/ui/button";
import { evento } from "@/lib/evento";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-primary/15 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-2xl italic tracking-tight text-foreground"
        >
          {evento.nome}
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/#templo"
            className="hidden text-foreground/75 transition-colors hover:text-foreground sm:inline"
          >
            O templo
          </Link>
          <Link
            href="/#acordos"
            className="hidden text-foreground/75 transition-colors hover:text-foreground md:inline"
          >
            Acordos
          </Link>
          <Button asChild className="h-10 rounded-full px-4">
            <Link href="/#inscricao">Inscrever</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-primary/15">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          {evento.nome} · {evento.dataLabel}
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/privacidade" className="underline-offset-4 hover:underline">
            Privacidade
          </Link>
          <span>Sem cookies</span>
        </p>
      </div>
    </footer>
  );
}
