import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Pill } from "@/components/ui/Pill";
import { projects } from "@/content/projects";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { findProject, nextProject } from "@/lib/portfolio";
import { languageAlternates } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = findProject(projects, slug);
  if (!project) return {};
  const path = `/projects/${slug}`;
  return {
    title: project.title[locale],
    description: project.summary[locale],
    alternates: { canonical: `/${locale}${path}`, languages: languageAlternates(path) },
    openGraph: { images: [{ url: project.cover, width: 1600, height: 1000 }] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const project = findProject(projects, slug);
  if (!project) notFound();

  const next = nextProject(projects, slug);
  const meta = [
    { label: dict.project.year, value: String(project.year) },
    { label: dict.project.role, value: project.role[locale] },
    ...(project.client ? [{ label: dict.project.client, value: project.client }] : []),
  ];

  return (
    <main id="content" className="flex flex-col gap-6 px-4 pt-6 sm:px-6">
      <Frame
        as="article"
        aria-labelledby="project-title"
        className="px-5 py-10 sm:px-10 lg:px-16 lg:py-14"
      >
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-2 text-sm font-medium text-mute hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          {dict.project.back}
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-semibold tracking-wide text-mute uppercase">
              {dict.work.filters[project.category]}
            </p>
            <h1
              id="project-title"
              className="mt-3 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl"
            >
              {project.title[locale]}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-mute">{project.summary[locale]}</p>
          </div>
          {(project.links?.live || project.links?.repo) && (
            <div className="flex flex-wrap gap-2">
              {project.links.live && (
                <ButtonLink href={project.links.live} target="_blank" rel="noopener noreferrer">
                  {dict.project.live}
                  <span className="sr-only">{dict.a11y.opensInNewTab}</span>
                </ButtonLink>
              )}
              {project.links.repo && (
                <ButtonLink
                  href={project.links.repo}
                  variant="light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dict.project.repo}
                  <span className="sr-only">{dict.a11y.opensInNewTab}</span>
                </ButtonLink>
              )}
            </div>
          )}
        </header>

        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl bg-mist ring-1 ring-line">
          <Image
            src={project.cover}
            alt={project.title[locale]}
            fill
            priority
            sizes="(min-width: 1152px) 1024px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[16rem_1fr]">
          <dl className="grid content-start gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-sm text-mute">{item.label}</dt>
                <dd className="mt-1 font-medium">{item.value}</dd>
              </div>
            ))}
            <div className="sm:col-span-3 lg:col-span-1">
              <dt className="text-sm text-mute">{dict.project.stack}</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Pill>{tech}</Pill>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink/85">
            {project.body[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Frame>

      {next && (
        <Frame variant="ink" className="p-0">
          <Link
            href={`/${locale}/projects/${next.slug}`}
            className="group flex items-center justify-between gap-6 px-5 py-10 sm:px-10 lg:px-16"
          >
            <span>
              <span className="block text-sm text-mute-dark">{dict.project.next}</span>
              <span className="mt-2 block font-display text-2xl font-semibold uppercase sm:text-4xl">
                {next.title[locale]}
              </span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-8 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </Frame>
      )}
    </main>
  );
}
