import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import type { Project } from "@/content/types";
import type { Locale } from "@/i18n/config";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  labels: { real: string; open: string };
  priority?: boolean;
};

export function ProjectCard({ project, locale, labels, priority }: ProjectCardProps) {
  const title = project.title[locale];

  return (
    <article className="group relative flex h-full flex-col rounded-2xl bg-paper p-2.5 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.35)] ring-1 ring-line transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-mist">
        <Image
          src={project.cover}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 540px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
        {project.category === "real" && (
          <span className="absolute top-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-[0.7rem] font-semibold tracking-wide uppercase backdrop-blur">
            {labels.real}
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-paper text-ink opacity-0 shadow-pill transition duration-300 group-hover:scale-100 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-6" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-2 pt-4 pb-2">
        <h3 className="text-lg leading-snug font-medium text-balance sm:text-xl">
          {/* The whole card is clickable via the stretched link. */}
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:outline-ink"
          >
            {title}
            <span className="sr-only"> — {labels.open}</span>
          </Link>
        </h3>
        <ul className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Pill>{tag}</Pill>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
