import type { Project, ProjectShot } from "../types";

const dir = "/projects/autogestor";

/** All screenshots share the browser width; only the landing page is taller. */
function shot(
  file: string,
  alt: ProjectShot["alt"],
  caption?: ProjectShot["caption"],
  height = 737,
): ProjectShot {
  return { src: `${dir}/${file}.webp`, width: 1554, height, alt, caption };
}

export const autogestor: Project = {
  slug: "autogestor",
  title: {
    pt: "AutoGestor — O ateliê digital do autônomo",
    en: "AutoGestor — The freelancer's digital studio",
  },
  summary: {
    pt: "Gestão de clientes e finanças para MEIs prestadores de serviço: calcula quanto cobrar, publica uma vitrine que capta pedidos, avisa quando um orçamento come a margem e mostra o dinheiro que entrou de verdade.",
    en: "Client and finance management for Brazilian sole proprietors (MEIs) who sell services: it works out what to charge, publishes a storefront that captures requests, warns when a quote eats into the margin and shows the money that actually came in.",
  },
  body: {
    pt: [
      "O Brasil tem mais de 16 milhões de microempreendedores individuais. Muitos são ótimos no que fazem e péssimos em cobrar por isso: definem preço copiando o vizinho, esquecem as horas gastas respondendo cliente e fazendo orçamento, e no fim do mês não sabem se tiveram lucro. A gestão fica espalhada entre caderno, planilha e conversas soterradas no WhatsApp.",
      "O AutoGestor parte de uma tese simples: gerenciar precisa ser consequência de vender, e não uma tarefa a mais. Por isso o produto é organizado em volta do fluxo do cliente — da vitrine que capta o pedido ao orçamento, à aprovação e ao recebimento — em vez de ser um mini-ERP cheio de cadastros.",
      "Fiz o produto inteiro: estratégia, desenho de produto, arquitetura e código, em um monorepo com 14 decisões registradas como ADR. A seguir, a jornada real de uma profissional nova, com prints do sistema rodando e dados fictícios — do primeiro clique na página inicial ao primeiro dinheiro no caixa.",
    ],
    en: [
      "Brazil has over 16 million sole proprietors (MEIs). Many are great at their craft and bad at charging for it: they copy competitors' prices, forget the hours spent answering clients and writing quotes, and by month-end don't know whether they made a profit. Management is scattered across notebooks, spreadsheets and chats buried in WhatsApp.",
      "AutoGestor starts from a simple thesis: managing should be a consequence of selling, not an extra chore. So the product is organized around the client flow — from the storefront that captures the request to the quote, the approval and the payment — rather than being a mini-ERP full of forms.",
      "I built the whole product: strategy, product design, architecture and code, in a monorepo with 14 decisions recorded as ADRs. Below is a real journey of a new professional, with screenshots of the running system and fictitious data — from the first click on the landing page to the first money in the till.",
    ],
  },
  category: "real",
  tags: ["SaaS", "Fintech", "MEI"],
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Fastify",
    "PostgreSQL",
    "Drizzle ORM",
    "Better Auth",
    "Zod",
    "Tailwind CSS",
    "Cloudflare",
    "Sentry",
    "Docker",
  ],
  year: 2026,
  role: { pt: "Produto, design & full-stack", en: "Product, design & full-stack" },
  client: "Produto próprio",
  cover: `${dir}/cover.webp`,
  featured: true,
  highlights: [
    {
      value: "5 min",
      label: {
        pt: "do cadastro à vitrine publicada, com o preço já calculado",
        en: "from sign-up to a published storefront, price already worked out",
      },
    },
    {
      value: "R$ 0",
      label: {
        pt: "em IA para precificar e alertar: tudo é fórmula no código",
        en: "spent on AI for pricing and alerts: it's all formulas in code",
      },
    },
    {
      value: "14",
      label: {
        pt: "decisões de arquitetura registradas como ADR",
        en: "architecture decisions recorded as ADRs",
      },
    },
    {
      value: "1.100+",
      label: {
        pt: "testes automatizados entre regras, API e interface",
        en: "automated tests across rules, API and interface",
      },
    },
  ],
  sections: [
    {
      id: "calculadora",
      title: { pt: "1. Quanto vale a sua hora?", en: "1. What's your hour worth?" },
      body: {
        pt: [
          "A porta de entrada não é um formulário de cadastro: é uma calculadora aberta na página inicial. Três perguntas — quanto você precisa para viver, quanto gasta para trabalhar e quantas horas quer trabalhar — e o visitante descobre o próprio Valor/Hora Seguro e quanto deixa de cobrar por ano em horas invisíveis. É a ferramenta virando marketing: o produto se apresenta resolvendo um problema antes de pedir qualquer coisa.",
          "A conta parece simples, mas carrega decisões. Ela soma o DAS do MEI aos custos, desconta as horas que ninguém paga (atender, orçar, divulgar) e reserva uma margem de lucro. Para uma designer que precisa de R$ 5.000 para viver, gasta R$ 600 para trabalhar e quer 35 horas por semana, a hora segura sai a R$ 66,95 — e as horas invisíveis somam R$ 36,5 mil por ano que ela não está cobrando.",
          "Tudo isso é cálculo determinístico, no código. Nada de IA para fazer conta: custo zero por uso e o mesmo resultado sempre. Os valores são tratados em centavos e o arredondamento acontece uma vez só, no final, para não acumular erro.",
        ],
        en: [
          "The entry point isn't a sign-up form: it's an open calculator on the landing page. Three questions — how much you need to live on, how much you spend to work and how many hours you want to work — and the visitor learns their Safe Hourly Rate and how much they fail to charge each year in invisible hours. It's the tool doubling as marketing: the product introduces itself by solving a problem before asking for anything.",
          "The maths looks simple but carries decisions. It adds the MEI monthly tax (DAS) to costs, discounts the hours nobody pays for (answering, quoting, promoting) and reserves a profit margin. For a designer who needs R$ 5,000 to live, spends R$ 600 to work and wants 35 hours a week, the safe rate comes out at R$ 66.95 — and invisible hours add up to R$ 36.5k a year she isn't charging.",
          "All of it is deterministic calculation, in code. No AI doing arithmetic: zero cost per use and the same result every time. Values are handled in cents and rounding happens only once, at the end, so errors don't pile up.",
        ],
      },
      code: {
        file: "shared/src/precificacao.ts",
        language: "ts",
        source: `export function valorHoraSeguroExato(entrada: EntradaValorHora): Resultado<number> {
  const horas = horasFaturaveis(entrada); // horas do mês × (1 − horas invisíveis)
  if (!horas.ok) return horas;
  if (entrada.margemSegura + entrada.aliquotaImpostos >= 1) {
    return falha("MARGEM_MAIS_IMPOSTO_ACIMA_DE_100");
  }
  const fatorLiquido = 1 - entrada.margemSegura - entrada.aliquotaImpostos;
  return { ok: true, valor: entrada.custoFixo / (horas.valor * fatorLiquido) };
}`,
      },
      shots: [
        shot(
          "01-landing",
          {
            pt: "Página inicial do AutoGestor com o título “Cobre o que o seu trabalho vale” e um orçamento aprovado ilustrado",
            en: "AutoGestor landing page with the headline “Charge what your work is worth” and an illustrated approved quote",
          },
          {
            pt: "A página inicial fala a língua do público: cobrar certo, sem jargão de gestão.",
            en: "The landing page speaks its audience's language: charging right, no management jargon.",
          },
          783,
        ),
        shot(
          "02-calculadora",
          {
            pt: "Calculadora aberta com custo de vida, custo de trabalho e horas semanais, mostrando Valor/Hora Seguro de R$ 66,95",
            en: "Open calculator with living cost, work cost and weekly hours, showing a Safe Hourly Rate of R$ 66.95",
          },
          {
            pt: "Sem cadastro: R$ 66,95 por hora e R$ 36,5 mil por ano em horas invisíveis.",
            en: "No sign-up: R$ 66.95 an hour and R$ 36.5k a year in invisible hours.",
          },
        ),
      ],
    },
    {
      id: "onboarding",
      title: {
        pt: "2. Da conta criada à vitrine no ar",
        en: "2. From new account to live storefront",
      },
      body: {
        pt: [
          "O maior risco de um SaaS para pequenos negócios está nos primeiros minutos: o usuário entra, encontra telas vazias pedindo configuração e vai embora. Por isso o cadastro leva direto a um assistente de três etapas, desenhado para entregar valor em menos de cinco minutos.",
          "A primeira etapa já chega preenchida com os números da calculadora. Na segunda, a profissional escolhe um modelo do seu nicho — aqui, Projeto de Interiores — e o preço sai calculado com a hora dela. Na terceira, a vitrine aparece num preview de celular e é publicada com um clique, com o link pronto para colar na bio do Instagram.",
        ],
        en: [
          "The biggest risk for a small-business SaaS is the first few minutes: users sign up, find empty screens asking for setup and leave. So sign-up leads straight into a three-step wizard designed to deliver value in under five minutes.",
          "Step one arrives pre-filled with the calculator's numbers. In step two, the professional picks a template for her niche — here, Interior Design — and the price is computed from her hourly rate. In step three, the storefront shows up in a phone preview and goes live with one click, with a link ready to paste into her Instagram bio.",
        ],
      },
      shots: [
        shot(
          "03-wizard-financeiro",
          {
            pt: "Etapa 1 do assistente com os números da calculadora já preenchidos e o Valor/Hora de R$ 66,95",
            en: "Wizard step 1 with the calculator's numbers pre-filled and the R$ 66.95 hourly rate",
          },
          {
            pt: "Etapa 1: nada é digitado duas vezes — os números vieram da calculadora.",
            en: "Step 1: nothing is typed twice — the numbers came from the calculator.",
          },
        ),
        shot(
          "04-wizard-servico",
          {
            pt: "Etapa 2 do assistente com o modelo Projeto de Interiores, 45 horas e Preço Recomendado de R$ 3.012,63",
            en: "Wizard step 2 with the Interior Design template, 45 hours and a Recommended Price of R$ 3,012.63",
          },
          {
            pt: "Etapa 2: 45 horas × hora segura = R$ 3.012,63 de Preço Recomendado.",
            en: "Step 2: 45 hours × safe rate = R$ 3,012.63 Recommended Price.",
          },
        ),
        shot(
          "05-wizard-vitrine",
          {
            pt: "Etapa 3 do assistente com o endereço da vitrine e um preview de celular da página pública",
            en: "Wizard step 3 with the storefront address and a phone preview of the public page",
          },
          {
            pt: "Etapa 3: a vitrine em preview de celular, pronta para publicar.",
            en: "Step 3: the storefront in a phone preview, ready to publish.",
          },
        ),
        shot(
          "06-vitrine-no-ar",
          {
            pt: "Janela de comemoração “Sua Vitrine está no ar!” com o link e botões para copiar e compartilhar no WhatsApp",
            en: "Celebration dialog “Your storefront is live!” with the link and buttons to copy and share on WhatsApp",
          },
          {
            pt: "O momento “aha”: menos de cinco minutos depois do cadastro.",
            en: "The “aha” moment: under five minutes after sign-up.",
          },
        ),
      ],
    },
    {
      id: "vitrine",
      title: {
        pt: "3. A vitrine e o primeiro pedido",
        en: "3. The storefront and the first request",
      },
      body: {
        pt: [
          "A vitrine é a única parte do sistema aberta ao público, e também a que mais pode receber tráfego: um post que viraliza no Instagram traz milhares de visitas para um usuário que talvez nem pague. Por isso ela é gerada como página estática (ISR do Next.js) e servida pelo cache da Cloudflare. Uma visita não consulta o banco nem gasta servidor; o cache só é renovado quando a profissional muda a vitrine ou um preço.",
          "O cliente escolhe o serviço e pede um orçamento num formulário curto. Esse é o ponto mais exposto a abuso, então tem várias camadas: Cloudflare Turnstile, um campo invisível que só robôs preenchem, limite de cinco pedidos por hora por IP e um teto de tamanho. No banco, o papel público não escreve em tabela nenhuma: ele só pode chamar uma única função, que valida tudo e grava o cliente e o orçamento.",
        ],
        en: [
          "The storefront is the only part of the system open to the public, and the one that can get the most traffic: an Instagram post that goes viral brings thousands of visits for a user who might not even pay. So it's generated as a static page (Next.js ISR) and served from Cloudflare's cache. A visit never touches the database or uses server time; the cache is only refreshed when the professional changes the storefront or a price.",
          "The client picks a service and asks for a quote in a short form. That's the most abuse-prone spot, so it has several layers: Cloudflare Turnstile, an invisible field only bots fill in, a limit of five requests per hour per IP and a size cap. In the database, the public role can't write to any table: it can only call one function, which validates everything and stores the client and the quote.",
        ],
      },
      shots: [
        shot(
          "07-vitrine-publica",
          {
            pt: "Vitrine pública da Marina Alves com o serviço Projeto de Interiores, o que está incluso e o botão Pedir Orçamento",
            en: "Marina Alves's public storefront with the Interior Design service, what's included and the Request a Quote button",
          },
          {
            pt: "A vitrine: escopo claro e preço de partida antes do primeiro contato.",
            en: "The storefront: clear scope and a starting price before the first contact.",
          },
        ),
        shot(
          "08-pedido-orcamento",
          {
            pt: "Formulário de pedido de orçamento com nome, WhatsApp, serviço, mensagem, prazo e consentimento",
            en: "Quote request form with name, WhatsApp, service, message, deadline and consent",
          },
          {
            pt: "O pedido do cliente: rápido, com consentimento explícito para o contato.",
            en: "The client's request: quick, with explicit consent to be contacted.",
          },
        ),
      ],
    },
    {
      id: "kanban",
      title: { pt: "4. Kanban e o alerta de margem", en: "4. Kanban and the margin alert" },
      body: {
        pt: [
          "O pedido chega no Kanban da profissional como rascunho, marcado como vindo da vitrine. Ela abre o orçamento, ajusta o que precisar e negocia. Aqui está o diferencial do produto: o sistema guarda o Preço Recomendado de quando o serviço entrou no orçamento e compara com o valor proposto.",
          "Ao dar um desconto para R$ 2.600, aparece na hora: “14% abaixo da Margem Segura”. E, ao mover o card para Enviado, o sistema pergunta se ela quer enviar mesmo assim, mostrando os R$ 412,63 que deixam de cobrir as horas invisíveis. A decisão continua sendo dela — o produto só garante que seja uma decisão consciente.",
          "Para falar com o cliente, um botão abre o WhatsApp com a mensagem do orçamento já escrita, por um link wa.me. Não há integração paga com a Meta: zero custo por mensagem e nenhum risco de bloqueio do número da profissional.",
        ],
        en: [
          "The request lands on the professional's Kanban board as a draft, tagged as coming from the storefront. She opens the quote, adjusts what she needs and negotiates. Here's the product's edge: the system stores the Recommended Price from when the service was added to the quote and compares it with the proposed amount.",
          "When she discounts it to R$ 2,600, it shows up instantly: “14% below the Safe Margin”. And when she moves the card to Sent, the system asks whether she wants to send it anyway, showing the R$ 412.63 that no longer covers her invisible hours. The decision is still hers — the product just makes sure it's a conscious one.",
          "To reach the client, a button opens WhatsApp with the quote message already written, through a wa.me link. There's no paid Meta integration: zero cost per message and no risk of the professional's number being blocked.",
        ],
      },
      code: {
        file: "shared/src/precificacao.ts",
        language: "ts",
        source: `/** Desvio de Margem: fração (−0,15 = 15% abaixo do Preço Recomendado). */
export function desvioDeMargem(entrada: {
  precoProposto: number;
  precoRecomendado: number;
}): Resultado<number> {
  if (!(entrada.precoRecomendado > 0)) return falha("PRECO_RECOMENDADO_ZERADO");
  return {
    ok: true,
    valor: (entrada.precoProposto - entrada.precoRecomendado) / entrada.precoRecomendado,
  };
}`,
      },
      shots: [
        shot(
          "09-kanban-lead",
          {
            pt: "Kanban com quatro colunas e o pedido da Paula Ribeiro em Rascunho, com as etiquetas Novo e Vitrine",
            en: "Kanban with four columns and Paula Ribeiro's request in Draft, tagged New and Storefront",
          },
          {
            pt: "O pedido da vitrine vira um card de rascunho, sem ninguém digitar nada.",
            en: "The storefront request becomes a draft card without anyone typing anything.",
          },
          400,
        ),
        shot(
          "10-alerta-margem",
          {
            pt: "Editor de orçamento com o preço proposto de R$ 2.600 e o aviso “14% abaixo da Margem Segura”",
            en: "Quote editor with a proposed price of R$ 2,600 and the warning “14% below the Safe Margin”",
          },
          {
            pt: "O alerta de margem aparece enquanto ela digita o desconto.",
            en: "The margin alert shows up while she types the discount.",
          },
          560,
        ),
        shot(
          "11-enviar-mesmo-assim",
          {
            pt: "Confirmação “Enviar mesmo assim?” explicando que o orçamento está R$ 412,63 abaixo da Margem Segura",
            en: "Confirmation “Send anyway?” explaining the quote is R$ 412.63 below the Safe Margin",
          },
          {
            pt: "Na hora de enviar, o custo do desconto em reais — sem bloquear a decisão.",
            en: "At send time, the cost of the discount in reais — without blocking the decision.",
          },
        ),
      ],
    },
    {
      id: "financeiro",
      title: { pt: "5. Aprovado, recebido, no caixa", en: "5. Approved, received, in the till" },
      body: {
        pt: [
          "Quando o cliente aprova, o sistema pergunta como ela vai receber: à vista, sinal de 50% e o resto na entrega, ou outra divisão. As parcelas entram em A Receber com o vencimento. A aprovação é reversível — dá para reabrir o orçamento, desde que nenhum recebimento já tenha sido registrado.",
          "O financeiro segue o regime de caixa, e essa foi uma decisão consciente. O lucro do mês conta o dinheiro que entrou, não o orçamento aprovado. Um número que não bate com o extrato do banco destrói a confiança de quem já não sabe se teve lucro; o aprovado e ainda não pago aparece separado, como A Receber.",
          "A aba MEI em dia acompanha o teto anual de faturamento e monta o relatório mensal de receitas brutas exigido do MEI, a partir dos próprios recebimentos. O teto fica numa tabela datada com a fonte legal; como a mudança de valor para 2027 ainda aguardava sanção, um teste passa a falhar se esse valor entrar em vigor sem confirmação na fonte oficial.",
        ],
        en: [
          "When the client approves, the system asks how she'll be paid: in full, a 50% deposit with the rest on delivery, or another split. Installments go into Receivables with due dates. Approval is reversible — the quote can be reopened as long as no payment has been recorded yet.",
          "Finance follows cash-basis accounting, and that was a deliberate decision. Monthly profit counts money that came in, not approved quotes. A number that doesn't match the bank statement destroys the trust of someone who already doesn't know if they made a profit; approved-but-unpaid shows separately, as Receivables.",
          "The “MEI up to date” tab tracks the annual revenue cap and builds the monthly gross-revenue report the MEI must keep, from her own payments. The cap lives in a dated table with its legal source; since the new 2027 value was still awaiting presidential sign-off, a test starts failing if that value takes effect without confirmation from the official source.",
        ],
      },
      points: {
        pt: [
          "Planos com travas no backend: o gratuito tem até 10 orçamentos por mês e 3 serviços na vitrine; o backend responde 402 e o front só reflete.",
          "Lead acima da trava nunca é perdido: fica guardado e escondido por uma política de RLS restritiva, e aparece no upgrade ou na virada do mês.",
          "A projeção de fluxo de caixa dos próximos três meses é um recurso do plano pago — o gratuito vê o histórico.",
        ],
        en: [
          "Plans with limits enforced by the backend: the free tier gets up to 10 quotes a month and 3 services on the storefront; the backend returns 402 and the front end just reflects it.",
          "A lead above the limit is never lost: it's held back and hidden by a restrictive RLS policy, and shows up on upgrade or at the start of the next month.",
          "The three-month cash-flow projection is a paid feature — the free tier sees the history.",
        ],
      },
      shots: [
        shot(
          "12-plano-recebimento",
          {
            pt: "Janela “Como você vai receber?” com sinal de 50% e entrega de 50%, cada parcela com valor e vencimento",
            en: "Dialog “How will you be paid?” with a 50% deposit and 50% on delivery, each with amount and due date",
          },
          {
            pt: "Ao aprovar: sinal de R$ 1.300 hoje e R$ 1.300 na entrega.",
            en: "On approval: a R$ 1,300 deposit today and R$ 1,300 on delivery.",
          },
        ),
        shot(
          "13-mei-em-dia",
          {
            pt: "Tela MEI em dia com o teto anual de R$ 81 mil, 2% usado, e o relatório mensal de receitas brutas",
            en: "MEI up-to-date screen with the R$ 81k annual cap, 2% used, and the monthly gross revenue report",
          },
          {
            pt: "Teto do MEI e relatório mensal preenchidos a partir dos recebimentos.",
            en: "MEI cap and monthly report filled in from the payments.",
          },
        ),
        shot(
          "14-fluxo-de-caixa",
          {
            pt: "Fluxo de caixa com entradas, saídas e saldo por mês, e o aviso de que a projeção é do plano pago",
            en: "Cash flow with income, expenses and balance per month, and a notice that projections are a paid feature",
          },
          {
            pt: "Regime de caixa: só conta o que entrou. A projeção fica para o plano pago.",
            en: "Cash basis: only what came in counts. Projections are a paid feature.",
          },
        ),
      ],
    },
    {
      id: "clientes",
      title: {
        pt: "6. O cliente e o mês num relance",
        en: "6. The client and the month at a glance",
      },
      body: {
        pt: [
          "Cada cliente ganha uma ficha com o histórico de orçamentos, recebimentos, taxa de aprovação e linha do tempo de anotações — e o sistema sugere marcar como VIP quem está entre os melhores. O telefone que aparece ali é guardado cifrado no banco.",
          "A tela de Início responde três perguntas do dia: quanto entrou, quanto falta para cobrir o custo fixo do mês e quem precisa de um contato hoje. O “termômetro do mês” usa o mesmo custo fixo da calculadora, então a meta é a vida real da profissional, não um número genérico.",
        ],
        en: [
          "Each client gets a record with quote history, payments, approval rate and a notes timeline — and the system suggests marking top clients as VIP. The phone number shown there is stored encrypted in the database.",
          "The Home screen answers three daily questions: how much came in, how much is still missing to cover the month's fixed cost and who needs a follow-up today. The “month thermometer” uses the same fixed cost as the calculator, so the target is the professional's real life, not a generic number.",
        ],
      },
      shots: [
        shot(
          "15-ficha-cliente",
          {
            pt: "Ficha da cliente Paula Ribeiro com valor contratado, taxa de aprovação, a receber e sugestão de marcar como VIP",
            en: "Client record for Paula Ribeiro with contracted value, approval rate, receivables and a VIP suggestion",
          },
          {
            pt: "Ficha do cliente: origem na vitrine, valores e o próximo passo.",
            en: "Client record: came from the storefront, values and the next step.",
          },
        ),
        shot(
          "16-inicio",
          {
            pt: "Tela de Início com o termômetro do mês em 23%, lucro do mês de R$ 1.300 e A Receber",
            en: "Home screen with the month thermometer at 23%, monthly profit of R$ 1,300 and receivables",
          },
          {
            pt: "Início: R$ 1.300 de R$ 5.686,05 do custo fixo do mês.",
            en: "Home: R$ 1,300 of the month's R$ 5,686.05 fixed cost.",
          },
        ),
      ],
    },
    {
      id: "seguranca",
      title: {
        pt: "7. Dados de um, só para esse um",
        en: "7. One person's data, only for that person",
      },
      body: {
        pt: [
          "Todos os profissionais vivem no mesmo banco PostgreSQL, então o isolamento não pode depender de alguém lembrar de filtrar uma consulta. Cada tabela tem Row Level Security forçado — nem o dono da tabela escapa — e o backend só acessa dados dentro de uma transação que informa ao banco qual profissional está logado. Sem esse contexto, a consulta volta vazia: o sistema falha fechado.",
          "Os papéis do banco são separados por função: um para migrações, um para o app, um só para login e um só para a leitura pública da vitrine, nenhum com permissão de ignorar o RLS. Um teste quebra o CI se alguma tabela nova aparecer sem política. Registro de outro profissional responde 404, e não 403, para não confirmar que ele existe.",
          "Dados pessoais dos clientes — CPF, telefone, e-mail, endereço — são cifrados na aplicação com AES-256-GCM, com o identificador da chave guardado junto para permitir rotação. Para buscar um cliente pelo telefone sem decifrar nada, uma coluna ao lado guarda um HMAC do valor normalizado (blind index). Se só o banco vazar, nenhum CPF ou telefone fica exposto.",
        ],
        en: [
          "Every professional lives in the same PostgreSQL database, so isolation can't depend on someone remembering to filter a query. Every table has forced Row Level Security — not even the table owner bypasses it — and the backend only touches data inside a transaction that tells the database who is logged in. Without that context, queries come back empty: the system fails closed.",
          "Database roles are split by job: one for migrations, one for the app, one just for login and one just for the storefront's public reads, none allowed to bypass RLS. A test breaks CI if a new table shows up without a policy. Another professional's record returns 404, not 403, so it doesn't even confirm it exists.",
          "Clients' personal data — tax ID, phone, email, address — is encrypted in the application with AES-256-GCM, with the key ID stored alongside to allow rotation. To find a client by phone without decrypting anything, a column next to it stores an HMAC of the normalized value (a blind index). If only the database leaks, no tax ID or phone number is exposed.",
        ],
      },
      code: {
        file: "backend/database/migrations/0005_rls_clientes.sql",
        language: "sql",
        source: `ALTER TABLE "clientes" ENABLE ROW LEVEL SECURITY;
-- FORCE: nem o dono da tabela escapa da política.
ALTER TABLE "clientes" FORCE ROW LEVEL SECURITY;

-- USING vale para ler, alterar e excluir; WITH CHECK impede
-- gravar (ou mover) uma linha para outro Profissional.
CREATE POLICY "isolamento" ON "clientes"
  USING ("profissional_id" = app_profissional_id())
  WITH CHECK ("profissional_id" = app_profissional_id());`,
      },
      points: {
        pt: [
          "Senhas com argon2id; login e sessões com Better Auth, num schema que só o papel de autenticação enxerga.",
          "LGPD na prática: termos e privacidade, exportação dos próprios dados e exclusão de conta, inclusive no plano gratuito.",
          "Logs e erros (Sentry) sem dados pessoais, health check que testa o banco e backup cifrado com roteiro de restauração.",
        ],
        en: [
          "Passwords hashed with argon2id; login and sessions via Better Auth, in a schema only the auth role can see.",
          "Data protection in practice: terms and privacy, exporting your own data and deleting your account, free tier included.",
          "Logs and errors (Sentry) free of personal data, a health check that tests the database and encrypted backups with a restore runbook.",
        ],
      },
    },
    {
      id: "engenharia",
      title: { pt: "Por trás das telas", en: "Behind the screens" },
      body: {
        pt: [
          "É um monorepo com pnpm em três pacotes: o front em Next.js 16 com Tailwind e componentes no padrão shadcn; a API em Fastify, a única que acessa o banco; e um pacote compartilhado só com regras de negócio puras — precificação, planos, teto do MEI, mensagens de WhatsApp —, usado pelos dois lados e coberto por centenas de testes.",
          "A infraestrutura foi desenhada para um ticket baixo: tudo roda em Docker numa VPS de custo fixo, orquestrada pelo Dokploy, com a vitrine servida pelo cache da Cloudflare. O app também funciona como PWA, para quem trabalha na rua pelo celular. O trabalho foi organizado em issues e pull requests pequenos, e as decisões que mudam a arquitetura viraram ADRs.",
        ],
        en: [
          "It's a pnpm monorepo with three packages: the Next.js 16 front end with Tailwind and shadcn-style components; the Fastify API, the only thing that touches the database; and a shared package holding only pure business rules — pricing, plans, the MEI cap, WhatsApp messages —, used by both sides and covered by hundreds of tests.",
          "The infrastructure was designed for a low price point: everything runs in Docker on a fixed-cost VPS, orchestrated by Dokploy, with the storefront served from Cloudflare's cache. The app also works as a PWA, for people who work on the go from their phones. Work was organized in small issues and pull requests, and architecture-changing decisions became ADRs.",
        ],
      },
    },
    {
      id: "proximos-passos",
      title: { pt: "Próximos passos", en: "What's next" },
      body: {
        pt: [
          "Três frentes estão no roteiro. Um servidor MCP (Model Context Protocol), para que assistentes de IA consultem e operem o AutoGestor em nome da profissional — lançar uma despesa, ver o que falta receber —, com as mesmas regras de acesso do app. Um chatbot no WhatsApp, para quem vive no celular resolver o dia a dia sem abrir o painel. E pagamentos integrados com split, para o cliente pagar o sinal direto pela vitrine e o card andar sozinho no Kanban.",
          "Nos três casos vale a mesma regra que guiou o produto até aqui: a IA entra onde ajuda a conversar, nunca onde a conta precisa ser exata — e cada nova peça tem que caber no custo de uma assinatura de baixo valor.",
        ],
        en: [
          "Three fronts are on the roadmap. An MCP (Model Context Protocol) server, so AI assistants can query and operate AutoGestor on the professional's behalf — logging an expense, checking what's still to be received — under the same access rules as the app. A WhatsApp chatbot, so people who live on their phones can handle the day without opening the dashboard. And integrated payments with split, so clients can pay the deposit straight from the storefront and the card moves on the Kanban by itself.",
          "The same rule that has guided the product so far applies to all three: AI comes in where it helps with conversation, never where the maths has to be exact — and every new piece has to fit the cost of a low-priced subscription.",
        ],
      },
    },
  ],
};
