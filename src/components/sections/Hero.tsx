import Image from "next/image";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ButtonLink } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <Frame aria-labelledby="hero-title" className="px-5 pt-10 sm:px-10 md:pt-14 lg:px-14">
      <h1
        id="hero-title"
        className="relative z-0 flex flex-wrap justify-center gap-x-[0.25em] text-center font-display text-[clamp(2.75rem,7.4vw,5.75rem)] leading-[0.9] font-bold tracking-[0.04em] uppercase md:flex-nowrap"
      >
        <span className="text-outline">{profile.firstName}</span>
        <span>{profile.lastName}</span>
      </h1>

      <div className="grid items-end gap-8 pt-8 md:-mt-[3vw] md:grid-cols-[1fr_minmax(0,26rem)_1fr] md:gap-4 md:pt-0 lg:-mt-10 lg:grid-cols-[1fr_minmax(0,36rem)_1fr]">
        <Reveal className="md:pb-12">
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {profile.role[locale]}
          </p>
          <p className="mt-3 max-w-xs text-mute">{profile.tagline[locale]}</p>
          <ButtonLink href={`/${locale}#contact`} className="mt-6">
            {dict.hero.cta}
          </ButtonLink>
        </Reveal>

        <div className="relative z-10 order-last mx-auto w-full max-w-[26rem] mix-blend-multiply md:order-none lg:w-[36rem] lg:max-w-none">
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

        <Reveal delay={0.1} className="relative z-20 md:justify-self-end md:pb-12">
          <SocialLinks
            socials={socials}
            label={dict.a11y.socialLinks}
            newTabLabel={dict.a11y.opensInNewTab}
            className="md:flex-col md:items-end"
          />
        </Reveal>
      </div>
    </Frame>
  );
}
