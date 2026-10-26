# Portfólio

Portfólio pessoal bilíngue (PT/EN) feito com Next.js 16, React 19, Tailwind CSS 4 e Motion.

## Começando

```bash
npm install
npm run dev        # http://localhost:3000 (redireciona para /pt ou /en)
```

| Script             | O que faz                                    |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Servidor de desenvolvimento                  |
| `npm run build`    | Build de produção (páginas estáticas)        |
| `npm run check`    | Lint + tipos + formatação + testes unitários |
| `npm test`         | Testes unitários e de componentes (Vitest)   |
| `npm run test:e2e` | Testes E2E em desktop e mobile (Playwright)  |
| `npm run format`   | Formata o código com Prettier                |

Copie `.env.example` para `.env.local` e defina `NEXT_PUBLIC_SITE_URL` com o domínio final
(usado em canonical, sitemap e Open Graph).

## Editando o conteúdo

Todo o conteúdo fica em `src/content/`, tipado em `src/content/types.ts`:

| Arquivo         | Conteúdo                                             |
| --------------- | ---------------------------------------------------- |
| `profile.ts`    | Nome, cargo, tagline, e-mail, foto e disponibilidade |
| `projects.ts`   | Projetos (`featured: true` aparece na home)          |
| `services.ts`   | Serviços do acordeão                                 |
| `experience.ts` | Experiência profissional (mais recente primeiro)     |
| `socials.ts`    | Links das redes sociais                              |

Textos nos dois idiomas usam `{ pt: "...", en: "..." }`. Os textos fixos da interface
ficam em `src/i18n/dictionaries/` — o TypeScript garante que `en.ts` tenha as mesmas chaves de `pt.ts`.

Imagens ficam em `public/`. Capas de projeto: 1600×1000 (16:10). Os testes verificam se toda imagem
referenciada existe e se todo projeto está traduzido.

## Estrutura

```
src/
  app/[locale]/        rotas (home, /projects, /projects/[slug]), layout, OG image, 404
  app/                 sitemap, robots, ícone, 404 global
  components/sections  Hero, SelectedWork, Services, Experience, Contact
  components/layout    Header, Footer, menu mobile, seletor de idioma
  components/ui        Button, Pill, Frame, SectionTitle, Reveal...
  content/             dados do portfólio
  i18n/                idiomas, dicionários e regras de rota
  lib/                 lógica pura (filtros, datas) e config do site
  proxy.ts             redireciona para o idioma preferido e devolve 404 real para slugs inválidos
e2e/                   testes Playwright
assets/originals/      imagens originais (não publicadas)
```

## Decisões

- **i18n nativo** do Next (`next/root-params` + dicionários), sem biblioteca extra.
- **Cache Components** ligado: todas as páginas são pré-renderizadas; a data atual (anos de
  experiência, ano do rodapé) vem de uma função com `"use cache"` revalidada diariamente.
- **Server Components por padrão**; só filtro, acordeão, menu, seletor de idioma e animações rodam no cliente.
- **Acessibilidade**: HTML semântico, skip link, `aria-expanded`/`aria-pressed`, foco visível e
  respeito a `prefers-reduced-motion`.
