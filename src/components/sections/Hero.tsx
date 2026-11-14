import Image from "next/image";
import type { CSSProperties } from "react";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ButtonLink } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

/** Seconds between each letter of the name rising in. */
const LETTER_STAGGER = 0.045;

const delay = (seconds: number) => ({ "--intro-delay": `${seconds}s` }) as CSSProperties;

/** A word whose letters rise one by one out of a mask during the intro. */
function RisingWord({
  word,
  start,
  className,
}: {
  word: string;
  start: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "-mx-[0.04em] -my-[0.1em] inline-block overflow-hidden px-[0.04em] py-[0.1em]",
        className,
      )}
    >
      {Array.from(word).map((letter, i) => (
        <span
          key={i}
          className="intro-letter inline-block"
          style={delay(start + i * LETTER_STAGGER)}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const lastNameStart = 0.1 + profile.firstName.length * LETTER_STAGGER;

  return (
    <Frame aria-labelledby="hero-title" className="px-5 pt-10 sm:px-10 md:pt-14 lg:px-14">
      <h1
        id="hero-title"
        aria-label={fullName}
        className="relative z-0 flex flex-wrap justify-center gap-x-[0.25em] text-center font-display text-[clamp(2.75rem,7.4vw,5.75rem)] leading-[0.9] font-bold tracking-[0.04em] uppercase md:flex-nowrap"
      >
        <span aria-hidden="true" className="contents">
          <RisingWord word={profile.firstName} start={0.1} className="text-outline" />
          <RisingWord word={profile.lastName} start={lastNameStart} />
        </span>
      </h1>

      <div className="grid items-end gap-8 pt-8 md:-mt-[3vw] md:grid-cols-[1fr_minmax(0,26rem)_1fr] md:gap-4 md:pt-0 lg:-mt-10 lg:grid-cols-[1fr_minmax(0,36rem)_1fr]">
        <div className="intro-up md:pb-12" style={delay(0.75)}>
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {profile.role[locale]}
          </p>
          <p className="mt-3 max-w-xs text-mute">{profile.tagline[locale]}</p>
          <ButtonLink href={`/${locale}#contact`} className="mt-6">
            {dict.hero.cta}
          </ButtonLink>
        </div>

        <div className="relative z-10 order-last mx-auto w-full max-w-[26rem] mix-blend-multiply md:order-none lg:w-[36rem] lg:max-w-none">
          <div className="intro-photo" style={delay(0.35)}>
            <Image
              src={profile.photo}
              alt={fullName}
              width={1200}
              height={1429}
              priority
              sizes="(min-width: 1024px) 36rem, (min-width: 768px) 26rem, 90vw"
              className="h-auto w-full grayscale"
            />
          </div>
        </div>

        <div className="intro-up relative z-20 md:justify-self-end md:pb-12" style={delay(0.85)}>
          <SocialLinks
            socials={socials}
            label={dict.a11y.socialLinks}
            newTabLabel={dict.a11y.opensInNewTab}
            className="md:flex-col md:items-end"
          />
        </div>
      </div>
    </Frame>
  );
}
