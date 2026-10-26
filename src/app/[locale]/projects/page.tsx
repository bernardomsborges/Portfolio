import type { Metadata } from "next";
import { Frame } from "@/components/ui/Frame";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { projectBrowserLabels } from "@/components/work/labels";
import { ProjectBrowser } from "@/components/work/ProjectBrowser";
import { projects } from "@/content/projects";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { languageAlternates } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return {
    title: dict.work.allTitle,
    description: dict.work.allDescription,
    alternates: { canonical: `/${locale}/projects`, languages: languageAlternates("/projects") },
  };
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <main id="content" className="px-4 pt-6 sm:px-6">
      <Frame
        aria-labelledby="projects-title"
        className="px-5 pt-20 pb-10 sm:px-10 md:pt-28 lg:px-16"
      >
        <SectionTitle
          as="h1"
          id="projects-title"
          title={dict.work.allTitle}
          ghost={dict.work.ghost}
          align="center"
        />
        <p className="mx-auto mt-5 max-w-xl text-center text-mute">{dict.work.allDescription}</p>
        <div className="mt-12">
          <ProjectBrowser projects={projects} locale={locale} labels={projectBrowserLabels(dict)} />
        </div>
      </Frame>
    </main>
  );
}
