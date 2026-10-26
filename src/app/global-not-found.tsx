import type { Metadata } from "next";
import Link from "next/link";
import pt from "@/i18n/dictionaries/pt";
import en from "@/i18n/dictionaries/en";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

/** Shown for URLs that match no route at all (bypasses the [locale] layout). Bilingual on purpose. */
export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="grid min-h-dvh place-items-center bg-sky p-4">
        <main className="w-full max-w-xl rounded-frame bg-paper px-6 py-20 text-center shadow-frame">
          <p className="font-display text-8xl font-bold text-outline">404</p>
          <h1 className="mt-6 font-display text-2xl font-bold uppercase">{pt.notFound.title}</h1>
          <p lang="en" className="mt-1 text-mute">
            {en.notFound.title}
          </p>
          <div className="mt-8 flex justify-center gap-3 text-sm font-semibold">
            <Link href="/pt" className="rounded-full bg-ink px-5 py-2.5 text-paper">
              {pt.notFound.cta}
            </Link>
            <Link href="/en" lang="en" className="rounded-full px-5 py-2.5 ring-1 ring-line">
              {en.notFound.cta}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
