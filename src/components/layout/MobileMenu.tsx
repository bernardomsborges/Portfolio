"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState, type ReactNode } from "react";
import type { NavItem } from "./nav";

type MobileMenuProps = {
  items: NavItem[];
  openLabel: string;
  closeLabel: string;
  navLabel: string;
  /** Extra content at the bottom of the panel (CTA, locale switcher). */
  footer: ReactNode;
};

export function MobileMenu({ items, openLabel, closeLabel, navLabel, footer }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-full bg-ink text-paper"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      <div
        id={panelId}
        hidden={!open}
        // Close after following any link inside the panel (nav, CTA, language).
        onClickCapture={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute inset-x-0 top-full mt-2 rounded-3xl bg-paper p-4 shadow-frame ring-1 ring-line"
      >
        <nav aria-label={navLabel}>
          <ul className="divide-y divide-line">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between py-3 text-lg font-medium"
                >
                  {item.label}
                  {item.count && <span className="text-sm text-mute">[{item.count}]</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 flex items-center justify-between gap-3">{footer}</div>
      </div>
    </div>
  );
}
