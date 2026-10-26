import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Sky } from "@/components/ui/Sky";
import { profile } from "@/content/profile";
import { locales, localeTags } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { languageAlternates, siteUrl } from "@/lib/site";
import { fontVariables } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#c9c9c9",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const name = `${profile.firstName} ${profile.lastName}`;
  const title = `${name} — ${profile.role[locale]}`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${name}` },
    description: dict.meta.description,
    applicationName: `${name} · ${dict.meta.title}`,
    authors: [{ name }],
    alternates: { canonical: `/${locale}`, languages: languageAlternates() },
    openGraph: {
      type: "website",
      siteName: name,
      title,
      description: dict.meta.description,
      locale: localeTags[locale].replace("-", "_"),
      url: `/${locale}`,
    },
    twitter: { card: "summary_large_image", title, description: dict.meta.description },
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <html lang={localeTags[locale]} className={fontVariables}>
      <body id="top">
        <a
          href="#content"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {dict.a11y.skipToContent}
        </a>
        <Sky />
        <Header locale={locale} dict={dict} />
        {children}
        <Footer dict={dict} />
      </body>
    </html>
  );
}
