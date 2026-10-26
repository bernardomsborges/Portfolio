import Image from "next/image";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ButtonLink } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
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
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center">
        {profile.available && <StatusBadge label={dict.status.available} />}
        <h2
          id="contact-title"
          className="mt-6 font-display text-4xl font-bold tracking-tight text-balance uppercase sm:text-5xl md:text-6xl"
        >
          {dict.contact.title}
        </h2>
        <p className="mt-5 text-ink/75 sm:text-lg">{dict.contact.text}</p>
        <ButtonLink href={`mailto:${profile.email}`} className="mt-8 px-6 py-3">
          {dict.contact.cta}
        </ButtonLink>
      </Reveal>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-2.5 md:mt-24 md:justify-between">
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
        <SocialLinks
          socials={socials}
          label={dict.a11y.socialLinks}
          newTabLabel={dict.a11y.opensInNewTab}
          className="justify-center md:gap-4"
        />
      </div>
    </Frame>
  );
}
