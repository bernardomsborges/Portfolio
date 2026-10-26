import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { getToday } from "@/lib/site";

export async function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date(await getToday()).getFullYear();

  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-10 text-sm text-ink/70 sm:flex-row sm:px-6">
      <p>
        © {year} {profile.firstName} {profile.lastName}. {dict.footer.rights}
      </p>
      <a
        href="#top"
        className="inline-flex items-center gap-1.5 font-medium text-ink hover:underline"
      >
        {dict.footer.backToTop}
        <ArrowUp aria-hidden="true" className="size-4" />
      </a>
    </footer>
  );
}
