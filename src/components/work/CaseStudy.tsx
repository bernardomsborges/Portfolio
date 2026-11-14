import Image from "next/image";
import type { ProjectHighlight, ProjectSection } from "@/content/types";
import type { Locale } from "@/i18n/config";

type HighlightsProps = { items: ProjectHighlight[]; locale: Locale; label: string };

/** Headline numbers shown between the cover and the case study. */
export function CaseStudyHighlights({ items, locale, label }: HighlightsProps) {
  return (
    <section aria-label={label} className="mt-10">
      <dl className="grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.value} className="flex flex-col-reverse gap-2 bg-paper p-5 sm:p-6">
            <dt className="text-sm leading-snug text-mute">{item.label[locale]}</dt>
            <dd className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

type SectionsProps = {
  sections: ProjectSection[];
  locale: Locale;
  labels: { excerpt: string };
};

/** Case-study chapters: text, optional rule list, code excerpt and screenshots. */
export function CaseStudySections({ sections, locale, labels }: SectionsProps) {
  return (
    <div className="mt-16 space-y-20">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-title`}
          className="scroll-mt-24"
        >
          <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[16rem_1fr]">
            <h2
              id={`${section.id}-title`}
              className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl"
            >
              {section.title[locale]}
            </h2>
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink/85">
              {section.body[locale].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.points && (
                <ul className="space-y-3 border-l-2 border-line pl-5 text-base">
                  {section.points[locale].map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
              {section.code && (
                <figure className="overflow-hidden rounded-xl bg-ink text-paper ring-1 ring-white/10">
                  <figcaption className="border-b border-line-dark px-4 py-2.5 font-mono text-xs text-mute-dark">
                    <span className="sr-only">{labels.excerpt}: </span>
                    {section.code.file}
                  </figcaption>
                  <pre
                    tabIndex={0}
                    className="overflow-x-auto p-4 text-[0.8rem] leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-paper"
                  >
                    <code className={`language-${section.code.language}`}>
                      {section.code.source}
                    </code>
                  </pre>
                </figure>
              )}
            </div>
          </div>

          {section.shots && (
            <div className="mt-10 space-y-8">
              {section.shots.map((shot) => (
                <figure key={shot.src}>
                  <div className="overflow-hidden rounded-2xl bg-mist ring-1 ring-line">
                    <Image
                      src={shot.src}
                      alt={shot.alt[locale]}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 1152px) 1024px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  {shot.caption && (
                    <figcaption className="mt-3 text-sm text-mute">
                      {shot.caption[locale]}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
