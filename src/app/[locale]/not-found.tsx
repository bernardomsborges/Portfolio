import { ButtonLink } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <main id="content" className="px-4 pt-6 sm:px-6">
      <Frame className="flex flex-col items-center px-6 py-24 text-center md:py-32">
        <p className="font-display text-[clamp(5rem,20vw,12rem)] leading-none font-bold text-outline">
          404
        </p>
        <h1 className="mt-6 font-display text-3xl font-bold uppercase sm:text-4xl">
          {dict.notFound.title}
        </h1>
        <p className="mt-3 max-w-md text-mute">{dict.notFound.text}</p>
        <ButtonLink href={`/${locale}`} className="mt-8">
          {dict.notFound.cta}
        </ButtonLink>
      </Frame>
    </main>
  );
}
