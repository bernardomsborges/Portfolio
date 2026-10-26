import { ButtonLink } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectBrowser } from "@/components/work/ProjectBrowser";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { projectBrowserLabels } from "@/components/work/labels";

export function SelectedWork({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const featured = projects.filter((p) => p.featured);

  return (
    <Frame
      id="work"
      aria-labelledby="work-title"
      className="px-5 pt-20 pb-10 sm:px-10 md:pt-28 lg:px-16"
    >
      <SectionTitle
        id="work-title"
        title={dict.work.title}
        ghost={dict.work.ghost}
        align="center"
      />
      <div className="mt-12 md:mt-16">
        <ProjectBrowser
          projects={featured}
          locale={locale}
          labels={projectBrowserLabels(dict)}
          action={
            <ButtonLink href={`/${locale}/projects`} variant="light">
              {dict.work.viewAll}
            </ButtonLink>
          }
        />
      </div>
    </Frame>
  );
}
