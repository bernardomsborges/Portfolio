import Image from "next/image";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ButtonLink } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
import { RiseText } from "@/components/ui/RiseText";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import type { Dictionary } from "@/i18n/dictionaries";

export function Contact({ dict }: { dict: Dictionary }) {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <Frame
      variant="glass"
      id="contact"
      aria-labelledby="contact-title"
      className="px-5 py-20 text-center sm:px-10 md:py-28"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        {/* Badge drops in, the title rises word by word, then text and the button follow. */}
        {profile.available && (
          <Reveal from="down">
            <StatusBadge label={dict.status.available} />
          </Reveal>
        )}
        <h2
          id="contact-title"
          className="mt-6 font-display text-4xl font-bold tracking-tight text-balance uppercase sm:text-5xl md:text-6xl"
        >
          <RiseText text={dict.contact.title} delay={0.15} />
        </h2>
        <Reveal as="p" delay={0.45} className="mt-5 text-ink/75 sm:text-lg">
          {dict.contact.text}
        </Reveal>
        <Reveal from="scale" delay={0.6} className="mt-8">
          <ButtonLink href={`mailto:${profile.email}`} className="px-6 py-3">
            {dict.contact.cta}
          </ButtonLink>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-2.5 md:mt-24 md:justify-between">
        <Reveal from="left">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink py-1 pr-4 pl-1 text-sm font-medium text-paper shadow-pill">
            <Image
              src={profile.avatar}
              alt=""
              width={56}
              height={56}
              className="size-7 rounded-full bg-mute-dark object-cover grayscale"
            />
            {fullName}
          </span>
        </Reveal>
        <Reveal from="right" delay={0.1}>
          <SocialLinks
            socials={socials}
            label={dict.a11y.socialLinks}
            newTabLabel={dict.a11y.opensInNewTab}
            className="justify-center md:gap-4"
          />
        </Reveal>
      </div>
    </Frame>
  );
}
