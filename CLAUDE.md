@AGENTS.md

## Project conventions

- Content lives in `src/content/*.ts`; UI strings in `src/i18n/dictionaries/{pt,en}.ts` (pt is the source of truth).
- Locale comes from `getLocale()` / `getDictionary()` in `src/i18n/dictionaries.ts` (uses `next/root-params`).
- Cache Components is on: no `dynamicParams`/`runtime` exports; wrap `new Date()` in a `"use cache"` function (see `getToday()` in `src/lib/site.ts`).
- Keep logic pure in `src/lib` and test it with Vitest; user flows go in `e2e/` (Playwright).
- Run `npm run check` before committing; `npm run test:e2e` for UI changes.
