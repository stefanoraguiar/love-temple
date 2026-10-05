import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { RgpdBanner } from "@/components/rgpd-banner";
import { Footer, Header } from "@/components/site-chrome";
import { evento } from "@/lib/evento";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${evento.nome} · 13 de outubro`,
    template: `%s · ${evento.nome}`,
  },
  description:
    "Primeiro Love Temple da comunidade. 13 de outubro de 2026, das 19h às 23h. Quinze lugares. Contribuição de 20€.",
  robots: { index: false, follow: false },
  openGraph: {
    title: evento.nome,
    description:
      "13 de outubro, 19h às 23h. Quinze lugares, só para a nossa comunidade.",
    locale: "pt_PT",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#14090c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#inscricao"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Saltar para a inscrição
        </a>
        <Header />
        <div className="flex flex-1 flex-col pb-56 sm:pb-36">{children}</div>
        <Footer />
        <RgpdBanner />
      </body>
    </html>
  );
}
