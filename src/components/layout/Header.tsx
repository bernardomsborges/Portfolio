import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { yearsOfExperience } from "@/lib/portfolio";
import { getToday } from "@/lib/site";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import type { NavItem } from "./nav";

export async function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const years = yearsOfExperience(experience, new Date(await getToday()));
  const home = `/${locale}`;

  const items: NavItem[] = [
    { href: `${home}#work`, label: dict.nav.work, count: String(projects.length) },
    { href: `${home}#services`, label: dict.nav.services, count: String(services.length) },
    { href: `${home}#experience`, label: dict.nav.experience, count: `${years}+` },
    { href: `${home}#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-3 z-40 px-4 sm:top-4 sm:px-6">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full bg-paper/85 py-2 pr-2 pl-2 shadow-pill ring-1 ring-line backdrop-blur-md sm:pl-3">
        <Link
          href={home}
          className="rounded-full"
          aria-label={`${profile.firstName} ${profile.lastName}`}
        >
          {profile.available ? (
            <StatusBadge label={dict.status.available} className="shadow-none ring-0" />
          ) : (
            <span className="px-3 font-display font-bold">
              {profile.firstName} {profile.lastName}
            </span>
          )}
        </Link>

        <nav aria-label={dict.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-4">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-mist"
                >
                  {item.label}
                  {item.count && <span className="ml-1 text-xs text-mute">[{item.count}]</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LocaleSwitcher current={locale} label={dict.a11y.switchLanguage} />
          <ButtonLink href={`${home}#contact`}>{dict.nav.cta}</ButtonLink>
        </div>

        <MobileMenu
          items={items}
          openLabel={dict.a11y.openMenu}
          closeLabel={dict.a11y.closeMenu}
          navLabel={dict.a11y.mainNav}
          footer={
            <>
              <LocaleSwitcher current={locale} label={dict.a11y.switchLanguage} />
              <ButtonLink href={`${home}#contact`}>{dict.nav.cta}</ButtonLink>
            </>
          }
        />
      </div>
    </header>
  );
}
