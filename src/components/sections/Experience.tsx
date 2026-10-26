import { Frame } from "@/components/ui/Frame";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { experience } from "@/content/experience";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { format, formatPeriod, yearsOfExperience } from "@/lib/portfolio";
import { getToday } from "@/lib/site";
import { ExperienceList } from "./ExperienceList";

export async function Experience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const years = yearsOfExperience(experience, new Date(await getToday()));
  const rows = experience.map((e) => ({
    company: e.company,
    role: e.role[locale],
    period: formatPeriod(e, locale, dict.experience.present),
    image: e.image,
  }));

  return (
    <Frame
      variant="ink"
      id="experience"
      aria-labelledby="experience-title"
      className="px-5 pt-16 pb-8 sm:px-10 md:pt-24 lg:px-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle
          id="experience-title"
          title={dict.experience.title}
          ghost={dict.experience.ghost}
          tone="light"
          className="flex-1"
        />
        <p className="relative text-paper/85">{format(dict.experience.years, { n: years })}</p>
      </div>
      <div className="mt-10 md:mt-12">
        <ExperienceList rows={rows} />
      </div>
    </Frame>
  );
}
