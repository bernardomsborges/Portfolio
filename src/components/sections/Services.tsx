import { Frame } from "@/components/ui/Frame";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ServicesAccordion } from "./ServicesAccordion";

export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = services.map((s) => ({
    id: s.id,
    title: s.title[locale],
    description: s.description[locale],
    image: s.image,
  }));

  return (
    <Frame
      variant="bare"
      id="services"
      aria-labelledby="services-title"
      className="overflow-visible px-1 py-16 sm:px-4 md:py-24"
    >
      <SectionTitle id="services-title" title={dict.services.title} />
      <div className="mt-10 md:mt-14">
        <ServicesAccordion items={items} />
      </div>
    </Frame>
  );
}
