import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeUrl } from "@/lib/site";

export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${profile.firstName} ${profile.lastName}`,
    jobTitle: profile.role[locale],
    description: profile.tagline[locale],
    url: localeUrl(locale),
    sameAs: socials.map((s) => s.url),
  };

  return (
    <main id="content" className="flex flex-col gap-6 px-4 pt-6 sm:px-6">
      <script
        type="application/ld+json"
        // JSON.stringify output is safe here: content is static, and "<" is escaped below.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero locale={locale} dict={dict} />
      <SelectedWork locale={locale} dict={dict} />
      <Services locale={locale} dict={dict} />
      <Experience locale={locale} dict={dict} />
      <Contact dict={dict} />
    </main>
  );
}
