import type { Project, ProjectShot } from "../types";

const dir = "/projects/community-split";

/** Every screenshot was captured at the same browser size during the user journey. */
function shot(
  file: string,
  alt: ProjectShot["alt"],
  caption?: ProjectShot["caption"],
): ProjectShot {
  return { src: `${dir}/${file}.webp`, width: 1568, height: 737, alt, caption };
}

export const communitySplit: Project = {
  slug: "community-split",
  title: {
    pt: "Community Split — Contas da casa sem drama",
    en: "Community Split — House bills without the drama",
  },
  summary: {
    pt: "App para quem divide casa: rateia as contas em centavos exatos, fecha o mês e transforma uma teia de dívidas no menor número possível de Pix.",
    en: "An app for people who share a home: it splits bills to the exact cent, closes the month and turns a web of debts into the fewest possible Pix transfers.",
  },
  body: {
    pt: [
      "Quem já morou em república conhece a cena: a Ana paga o mercado, o Bê paga a internet, o Carlão paga a luz — e no fim do mês ninguém sabe quem deve quanto para quem. Cobrar R$ 15 de um amigo é constrangedor, a planilha fica desatualizada e a louça acumula na pia.",
      "O Community Split é o árbitro neutro da casa. Cada morador lança o que pagou, o sistema divide de forma justa, consolida os saldos e diz exatamente quais Pix fazer — já com QR Code e Copia e Cola. De quebra, as tarefas domésticas viram um placar com pontos.",
      "Fiz o produto de ponta a ponta: regras de negócio, API, banco de dados, interface e deploy. Abaixo, a jornada real de um morador, com prints tirados do app rodando, e o que acontece por trás de cada tela.",
    ],
    en: [
      "Anyone who has shared a house knows the scene: Ana buys groceries, Bê pays for the internet, Carlão covers electricity — and by the end of the month nobody knows who owes what to whom. Asking a friend for R$ 15 is awkward, the spreadsheet goes stale and the dishes pile up.",
      "Community Split is the house's neutral referee. Each housemate logs what they paid, the system splits it fairly, consolidates balances and says exactly which Pix transfers to make — QR Code and copy-paste code included. As a bonus, chores become a points leaderboard.",
      "I built the product end to end: business rules, API, database, interface and deployment. Below is a real housemate journey, with screenshots taken from the running app, and what happens behind each screen.",
    ],
  },
  category: "real",
  tags: ["Web App", "Fintech", "Pix"],
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Fastify",
    "PostgreSQL",
    "Drizzle ORM",
    "Zod",
    "Tailwind CSS",
    "Radix UI",
    "Docker",
    "MCP",
  ],
  year: 2026,
  role: { pt: "Produto & full-stack", en: "Product & full-stack" },
  client: "Projeto próprio",
  cover: `${dir}/cover.webp`,
  links: { live: "https://cmmsplit.fluxzone.com.br" },
  featured: true,
  highlights: [
    {
      value: "N − 1",
      label: {
        pt: "Pix, no máximo, para quitar uma casa de N pessoas",
        en: "Pix transfers at most to settle a house of N people",
      },
    },
    {
      value: "3",
      label: {
        pt: "modos de rateio: igual, por cotas e por valores",
        en: "split modes: equal, by shares and by amounts",
      },
    },
    {
      value: "R$ 0,00",
      label: {
        pt: "perdidos em arredondamento — tudo em centavos inteiros",
        en: "lost to rounding — everything in whole cents",
      },
    },
    {
      value: "85",
      label: {
        pt: "testes automatizados entre API e interface",
        en: "automated tests across API and interface",
      },
    },
  ],
  sections: [
    {
      id: "entrar-na-casa",
      title: { pt: "1. Entrar na casa", en: "1. Joining the house" },
      body: {
        pt: [
          "A jornada começa num link de convite enviado pelo WhatsApp. Cada casa tem um código curto (ex.: REP-4921). Quem recebe cria a conta — nome, e-mail, senha e, opcionalmente, a chave Pix onde quer receber — e envia um pedido para entrar.",
          "Ninguém entra sozinho: o pedido fica pendente até um administrador aprovar. Assim um link vazado não coloca um estranho dentro das finanças da casa, e o admin pode renovar o código a qualquer momento, invalidando o anterior.",
        ],
        en: [
          "The journey starts with an invite link sent over WhatsApp. Each house has a short code (e.g. REP-4921). The invitee creates an account — name, email, password and, optionally, the Pix key where they want to be paid — and sends a request to join.",
          "Nobody gets in alone: the request stays pending until an admin approves it. A leaked link can't drop a stranger into the house's finances, and the admin can rotate the code at any time, invalidating the old one.",
        ],
      },
      points: {
        pt: [
          "Senha com 8 a 128 caracteres, maiúscula, minúscula, número e símbolo; guardada com scrypt e sal aleatório.",
          "Sessão em cookies HttpOnly: access token curto + refresh token de 30 dias, salvo só como hash SHA-256 e rotacionado a cada uso.",
          "Papéis por casa (administrador ou morador): a mesma conta pode morar em várias casas.",
        ],
        en: [
          "Passwords of 8 to 128 characters with upper and lower case, a number and a symbol; stored with scrypt and a random salt.",
          "Session in HttpOnly cookies: a short access token plus a 30-day refresh token, stored only as a SHA-256 hash and rotated on every use.",
          "Per-house roles (admin or housemate): one account can live in several houses.",
        ],
      },
      shots: [
        shot(
          "02-convite",
          {
            pt: "Tela de convite com o código REP-4921 e botões Entrar e Criar conta",
            en: "Invite screen showing code REP-4921 with Sign in and Create account buttons",
          },
          {
            pt: "O link de convite já traz o código da casa.",
            en: "The invite link already carries the house code.",
          },
        ),
        shot(
          "01-cadastro",
          {
            pt: "Formulário de cadastro com nome, e-mail, senha e chave Pix opcional",
            en: "Sign-up form with name, email, password and optional Pix key",
          },
          {
            pt: "Cadastro: a chave Pix é opcional e fica visível só para os moradores da casa.",
            en: "Sign-up: the Pix key is optional and visible only to housemates.",
          },
        ),
        shot(
          "11-casa",
          {
            pt: "Página da casa com cinco moradores, papéis, saldos e o painel de convite",
            en: "House page with five housemates, roles, balances and the invite panel",
          },
          {
            pt: "Visão do admin: moradores, papéis, saldos individuais, convite e categorias da casa.",
            en: "Admin view: housemates, roles, individual balances, invite and house categories.",
          },
        ),
      ],
    },
    {
      id: "lancar-despesa",
      title: {
        pt: "2. Lançar uma despesa (e dividir certo)",
        en: "2. Logging an expense (and splitting it right)",
      },
      body: {
        pt: [
          "Lançar uma conta leva segundos: título, valor, categoria, data e quem participa. A parte interessante é o rateio, que tem três modos — igualitário, por cotas (pesos) e por valores definidos à mão.",
          "O detalhe que separa um app sério de uma calculadora é o centavo. R$ 100 divididos por 3 dá 33,333…, e alguém precisa ficar com o centavo que sobra. O Community Split converte tudo para centavos inteiros, divide, e distribui as sobras de forma determinística: no modo igualitário, para os primeiros participantes pela ordem do ID; no modo por cotas, pelo método do maior resto. O resultado sempre fecha exatamente com o total — nunca R$ 99,99, nunca R$ 100,01.",
          "No print abaixo, o churrasco de R$ 250 foi dividido em 8 cotas: quem levou convidados pesa mais. O Lucas, com 3 cotas, paga R$ 93,75; quem tem 1 cota paga R$ 31,25.",
        ],
        en: [
          "Logging a bill takes seconds: title, amount, category, date and who's in. The interesting part is the split, with three modes — equal, by shares (weights) and by hand-set amounts.",
          "What separates a serious app from a calculator is the cent. R$ 100 divided by 3 is 33.333…, and someone has to take the leftover cent. Community Split converts everything to whole cents, divides, and hands out the remainder deterministically: in equal mode, to the first participants by ID order; in share mode, using the largest-remainder method. The result always adds up to the exact total — never R$ 99.99, never R$ 100.01.",
          "In the screenshot below, the R$ 250 barbecue was split into 8 shares: whoever brought guests weighs more. Lucas, with 3 shares, pays R$ 93.75; a single share pays R$ 31.25.",
        ],
      },
      code: {
        file: "backend/src/domain/finance.ts",
        language: "ts",
        source: `// R$ 100,00 ÷ 3 → [33,34, 33,33, 33,33]
const base = Math.floor(totalCentavos / participantes.length);
const centavosRestantes = totalCentavos % participantes.length;
const idsComCentavoExtra = new Set(
  participantes
    .map(({ membroId }) => membroId)
    .sort(compararMembroId)
    .slice(0, centavosRestantes),
);
return participantes.map(({ membroId }) => ({
  membroId,
  valorAtribuido: (base + (idsComCentavoExtra.has(membroId) ? 1 : 0)) / 100,
}));`,
      },
      points: {
        pt: [
          "Valores com mais de duas casas decimais são rejeitados antes de qualquer conta.",
          "No modo por valores, a soma informada precisa bater exatamente com o total.",
          "Conta “pendente” (ainda não paga ao fornecedor) não gera dívida entre moradores; só passa a valer quando alguém registra o pagamento.",
          "Somente o autor ou um admin edita a despesa, e cada edição incrementa uma versão: se duas pessoas editam ao mesmo tempo, a segunda recebe 409 e um aviso para atualizar a página.",
        ],
        en: [
          "Amounts with more than two decimal places are rejected before any maths happens.",
          "In amount mode, the values entered must add up exactly to the total.",
          "A “pending” bill (not yet paid to the supplier) creates no debt between housemates; it only counts once someone records the payment.",
          "Only the author or an admin can edit an expense, and every edit bumps a version: if two people edit at once, the second gets a 409 and a prompt to refresh.",
        ],
      },
      shots: [
        shot(
          "05-nova-despesa-cotas",
          {
            pt: "Formulário de nova despesa com rateio por cotas: Ana 1, Bê 1, Carlão 2, Dani 1 e Lucas 3",
            en: "New expense form split by shares: Ana 1, Bê 1, Carlão 2, Dani 1 and Lucas 3",
          },
          {
            pt: "Rateio por cotas: as porcentagens são só referência; o backend calcula os centavos.",
            en: "Share-based split: percentages are only a hint; the backend computes the cents.",
          },
        ),
        shot(
          "04-despesas-rateio",
          {
            pt: "Lista de despesas de outubro com o rateio do kit de limpeza aberto: R$ 22,50 para cada um",
            en: "October expense list with the cleaning kit split expanded: R$ 22.50 each",
          },
          {
            pt: "Cada despesa mostra quem pagou e quanto coube a cada morador.",
            en: "Each expense shows who paid and each housemate's share.",
          },
        ),
      ],
    },
    {
      id: "fechar-mes",
      title: { pt: "3. Fechar o mês", en: "3. Closing the month" },
      body: {
        pt: [
          "Se os saldos mudassem a cada lançamento, ninguém saberia quando pagar: você faz o Pix e, cinco minutos depois, alguém lança mais uma conta. A solução foi trazer para o app um ritual que as casas já fazem: o fechamento do mês.",
          "Enquanto o mês está aberto, as despesas aparecem e podem ser corrigidas, mas não geram Pix. Quando o administrador fecha o mês, as contas dele ficam congeladas e entram nos saldos. Só então os acertos são sugeridos.",
        ],
        en: [
          "If balances changed with every new bill, nobody would know when to pay: you send the Pix and, five minutes later, someone logs another expense. The fix was to bring a ritual houses already have into the app: closing the month.",
          "While a month is open, expenses show up and can be corrected, but they don't create Pix transfers. When the admin closes the month, its bills are frozen and count towards balances. Only then are settlements suggested.",
        ],
      },
      points: {
        pt: [
          "Meses fecham em ordem; meses vazios no caminho fecham juntos, e um mês anterior com despesas ainda aberto bloqueia o fechamento.",
          "Contas pendentes bloqueiam o fechamento — ou são movidas para o dia 1º do mês seguinte, se o admin escolher.",
          "Mês fechado não aceita lançar, editar, pagar nem excluir despesas; só trocar a categoria, que não mexe em valores.",
          "Só o último mês fechado pode ser reaberto, e apenas se nenhum Pix tiver sido confirmado depois do fechamento (esse Pix pode ter usado aqueles saldos).",
          "Fechar e reabrir travam a casa com SELECT … FOR UPDATE; alterações em despesas pegam a mesma trava em modo compartilhado, então nada escapa no meio do caminho.",
        ],
        en: [
          "Months close in order; empty months along the way close together, and an earlier month with open expenses blocks the close.",
          "Pending bills block the close — or are moved to the 1st of the next month, if the admin chooses.",
          "A closed month won't accept new, edited, paid or deleted expenses; only a category change, which doesn't touch amounts.",
          "Only the last closed month can be reopened, and only if no Pix was confirmed after it closed (that Pix may have used those balances).",
          "Closing and reopening lock the house row with SELECT … FOR UPDATE; expense changes take the same lock in shared mode, so nothing slips through mid-operation.",
        ],
      },
      shots: [
        shot(
          "06-fechamento-mes",
          {
            pt: "Página de acertos com outubro fechado, novembro como próximo mês a fechar e o balanço individual",
            en: "Settlements page with October closed, November next in line and the individual balances",
          },
          {
            pt: "Outubro fechado por Ana; novembro segue aberto e ainda não gera Pix.",
            en: "October closed by Ana; November is still open and creates no Pix yet.",
          },
        ),
      ],
    },
    {
      id: "simplificar-dividas",
      title: {
        pt: "4. Menos Pix: simplificando as dívidas",
        en: "4. Fewer Pix: simplifying debts",
      },
      body: {
        pt: [
          "Em outubro, a casa teve 4 contas pagas por 3 pessoas diferentes, divididas entre 4 moradores. Se cada um pagasse sua parte de cada conta para quem pagou, seriam até 12 transferências. O Community Split resolve com 3.",
          "O truque é olhar para o saldo líquido de cada pessoa: quanto pagou menos quanto consumiu. A Ana pagou R$ 570 e consumiu R$ 232,50, então tem +R$ 337,50 a receber. A Dani não pagou nada e consumiu R$ 232,50: deve −R$ 232,50. Somando todos os saldos, o resultado é sempre zero — o dinheiro só muda de mão.",
          "Com os saldos em mãos, um algoritmo guloso de dois ponteiros ordena devedores e credores do maior para o menor e casa os dois do topo: transfere o menor dos dois valores, zera um deles e avança. Cada passo zera pelo menos uma pessoa, então uma casa com N moradores nunca precisa de mais de N − 1 Pix.",
        ],
        en: [
          "In October, the house had 4 bills paid by 3 different people and split between 4 housemates. If everyone paid their share of each bill to whoever paid it, that would be up to 12 transfers. Community Split does it in 3.",
          "The trick is to look at each person's net balance: what they paid minus what they consumed. Ana paid R$ 570 and consumed R$ 232.50, so she is owed +R$ 337.50. Dani paid nothing and consumed R$ 232.50: she owes −R$ 232.50. Add up every balance and the result is always zero — money only changes hands.",
          "With balances in hand, a greedy two-pointer algorithm sorts debtors and creditors from largest to smallest and matches the two at the top: it transfers the smaller of the two amounts, zeroes one of them and moves on. Every step zeroes at least one person, so a house of N people never needs more than N − 1 Pix transfers.",
        ],
      },
      code: {
        file: "backend/src/domain/finance.ts",
        language: "ts",
        source: `credores.sort((a, b) => b.saldoEmCentavos - a.saldoEmCentavos);
devedores.sort((a, b) => b.saldoEmCentavos - a.saldoEmCentavos);

while (devedorIndex < devedores.length && credorIndex < credores.length) {
  const devedor = devedores[devedorIndex];
  const credor = credores[credorIndex];
  const valorCentavos = Math.min(devedor.saldoEmCentavos, credor.saldoEmCentavos);

  transacoes.push({ devedor, credor, valor: valorCentavos / 100 });

  devedor.saldoEmCentavos -= valorCentavos;
  credor.saldoEmCentavos -= valorCentavos;
  if (devedor.saldoEmCentavos === 0) devedorIndex++;
  if (credor.saldoEmCentavos === 0) credorIndex++;
}`,
      },
      shots: [
        shot(
          "03-visao-geral",
          {
            pt: "Visão geral de outubro: saldo de R$ 337,50 a receber, R$ 930 registrados e 3 Pix pendentes",
            en: "October overview: R$ 337.50 to receive, R$ 930 logged and 3 pending Pix",
          },
          {
            pt: "Depois do fechamento: R$ 930 em contas viram só 3 Pix pendentes.",
            en: "After closing: R$ 930 in bills become just 3 pending Pix transfers.",
          },
        ),
      ],
    },
    {
      id: "pagar-pix",
      title: { pt: "5. Pagar com Pix e confirmar", en: "5. Paying with Pix and confirming" },
      body: {
        pt: [
          "Na tela de acertos, a Dani vê só o que lhe interessa: “pague R$ 232,50 para a Ana”. Ao clicar em Pagar Pix, o app monta o BR Code — o padrão EMV do Banco Central por trás de todo QR Code Pix — com a chave da Ana e o valor exato. A Dani escaneia com o app do banco ou usa o Copia e Cola.",
          "O BR Code é uma sequência de campos no formato ID + tamanho + valor (TLV), terminada por um CRC16-CCITT que o banco usa para validar o código. Gerar isso sem biblioteca exigiu entender a especificação: nomes sem acento, cidade com até 15 caracteres e o checksum calculado sobre o próprio payload.",
          "O dinheiro nunca passa pelo app. Por isso a quitação tem duas etapas: quem pagou informa o Pix, e quem recebeu confirma. Só a confirmação do credor abate os saldos — e o devedor pode cancelar enquanto ela não acontece.",
        ],
        en: [
          "On the settlements screen, Dani sees only what matters to her: “pay R$ 232.50 to Ana”. When she clicks Pay with Pix, the app builds the BR Code — the Central Bank's EMV standard behind every Pix QR Code — with Ana's key and the exact amount. Dani scans it with her bank app or uses the copy-paste code.",
          "A BR Code is a sequence of ID + length + value fields (TLV), ending with a CRC16-CCITT checksum the bank uses to validate it. Generating it without a library meant reading the spec: names without accents, a city of up to 15 characters and a checksum computed over the payload itself.",
          "Money never goes through the app. That's why settling takes two steps: the payer reports the Pix and the payee confirms it. Only the creditor's confirmation updates balances — and the debtor can cancel until that happens.",
        ],
      },
      code: {
        file: "backend/src/domain/pix.ts",
        language: "ts",
        source: `const emvField = (id: string, value: string) =>
  \`\${id}\${value.length.toString().padStart(2, "0")}\${value}\`;

let payload =
  emvField("00", "01") +                       // formato do payload
  emvField("26", emvField("00", "br.gov.bcb.pix") + emvField("01", chave)) +
  emvField("53", "986") +                      // moeda: real
  emvField("54", valor.toFixed(2)) +           // valor exato
  emvField("58", "BR") + emvField("59", nome) + emvField("60", cidade);

return \`\${payload}6304\${crc16(\`\${payload}6304\`)}\`;`,
      },
      shots: [
        shot(
          "07-pix-qrcode",
          {
            pt: "Janela de transferência Pix de Daniela para Ana, R$ 232,50, com QR Code e código Copia e Cola",
            en: "Pix transfer dialog from Daniela to Ana, R$ 232.50, with QR Code and copy-paste code",
          },
          {
            pt: "QR Code e Copia e Cola gerados com a chave do credor e o valor exato.",
            en: "QR Code and copy-paste code built with the creditor's key and the exact amount.",
          },
        ),
        shot(
          "08-aguardando-confirmacao",
          {
            pt: "Pagamento de Dani para Ana aguardando confirmação, com botões Confirmar e Cancelar",
            en: "Dani's payment to Ana awaiting confirmation, with Confirm and Cancel buttons",
          },
          {
            pt: "Do lado da Ana: o Pix informado espera a confirmação de recebimento.",
            en: "On Ana's side: the reported Pix waits for her to confirm receipt.",
          },
        ),
        shot(
          "09-quitado",
          {
            pt: "Histórico mostrando o Pix de R$ 232,50 quitado e o saldo de Daniela zerado",
            en: "History showing the R$ 232.50 Pix settled and Daniela's balance at zero",
          },
          {
            pt: "Confirmado: a Dani fica quitada e o saldo da Ana cai para R$ 105.",
            en: "Confirmed: Dani is settled and Ana's balance drops to R$ 105.",
          },
        ),
      ],
    },
    {
      id: "tarefas",
      title: { pt: "6. Tarefas que viram placar", en: "6. Chores that become a scoreboard" },
      body: {
        pt: [
          "Dinheiro não é a única fonte de atrito. Cada tarefa da casa tem responsável, prazo, frequência (diária a avulsa) e um peso em pontos — de 10 para algo simples a 30 para uma faxina geral. Ao concluir, os pontos vão para o responsável e o ranking do mês atualiza na hora.",
          "A ideia é trocar a bronca pelo reconhecimento: em vez de cobrar quem não lavou a louça, a casa vê quem mais colaborou. Só o responsável ou um admin pode marcar a tarefa como feita, e cada conclusão fica no histórico.",
        ],
        en: [
          "Money isn't the only source of friction. Every chore has an owner, a deadline, a frequency (daily to one-off) and a point weight — from 10 for something quick to 30 for a deep clean. When it's done, the points go to the owner and the monthly leaderboard updates instantly.",
          "The idea is to swap nagging for recognition: instead of calling out whoever skipped the dishes, the house sees who pitched in the most. Only the owner or an admin can mark a chore as done, and every completion is kept in the history.",
        ],
      },
      shots: [
        shot(
          "10-tarefas",
          {
            pt: "Página de tarefas com duas pendentes e o ranking da casa com Ana em primeiro, 15 pontos",
            en: "Chores page with two pending tasks and the house leaderboard led by Ana with 15 points",
          },
          {
            pt: "Tarefa concluída: +15 pontos para a Ana e ranking atualizado.",
            en: "Chore done: +15 points for Ana and an updated leaderboard.",
          },
        ),
      ],
    },
    {
      id: "engenharia",
      title: { pt: "Por trás das telas", en: "Behind the screens" },
      body: {
        pt: [
          "O front é um app Next.js com React, Tailwind e componentes Radix (no estilo shadcn/ui), com gráficos em Recharts e micro-interações em Framer Motion. Ele não fala direto com a API: um proxy em /api encaminha as chamadas para o backend na rede interna, reescrevendo os cookies para o domínio público. O navegador só conhece uma origem, sem CORS e sem token exposto ao JavaScript.",
          "A API é Fastify com TypeScript. Toda entrada passa por schemas Zod, o banco é PostgreSQL acessado via Drizzle ORM, e as migrações rodam sozinhas antes do servidor subir. A documentação OpenAPI/Swagger é gerada a partir das rotas.",
          "As regras de negócio vivem em funções puras (rateio, simplificação, fechamento, permissões, Pix), separadas do acesso ao banco. Isso deixa o núcleo fácil de testar: 58 testes no backend — unitários e de integração contra um Postgres real, incluindo concorrência de pagamento e edição — e mais 27 no front.",
          "Um extra que gostei de construir: a API também é um servidor MCP (Model Context Protocol), com OAuth 2.1 e PKCE. Assistentes de IA, como o Claude, podem listar casas, lançar despesas, pagar contas e concluir tarefas em nome do usuário, limitados aos escopos que ele autorizou. Tudo roda em Docker, publicado via Dokploy.",
        ],
        en: [
          "The front end is a Next.js app with React, Tailwind and Radix components (shadcn/ui style), Recharts charts and Framer Motion micro-interactions. It never talks to the API directly: a proxy under /api forwards calls to the backend over the internal network, rewriting cookies for the public domain. The browser only knows one origin — no CORS, no token exposed to JavaScript.",
          "The API is Fastify with TypeScript. Every input goes through Zod schemas, the database is PostgreSQL via Drizzle ORM, and migrations run on their own before the server starts. OpenAPI/Swagger docs are generated from the routes.",
          "Business rules live in pure functions (splitting, simplification, month closing, permissions, Pix), separate from database access. That keeps the core easy to test: 58 backend tests — unit and integration against a real Postgres, including concurrent payment and edit races — plus 27 on the front end.",
          "An extra I enjoyed building: the API is also an MCP (Model Context Protocol) server, with OAuth 2.1 and PKCE. AI assistants such as Claude can list houses, log expenses, pay bills and complete chores on the user's behalf, limited to the scopes the user granted. Everything runs in Docker, deployed with Dokploy.",
        ],
      },
      points: {
        pt: [
          "Dinheiro sempre em centavos inteiros; reais só na borda, para exibir.",
          "Concorrência tratada no banco: travas de linha nas operações financeiras e versão otimista nas edições.",
          "Erros de domínio com status HTTP certos (400, 403, 404, 409) e mensagens em português para o usuário final.",
        ],
        en: [
          "Money is always whole cents; reais only at the edge, for display.",
          "Concurrency handled in the database: row locks on financial operations and optimistic versioning on edits.",
          "Domain errors map to the right HTTP status (400, 403, 404, 409) with end-user messages in Portuguese.",
        ],
      },
    },
  ],
};
