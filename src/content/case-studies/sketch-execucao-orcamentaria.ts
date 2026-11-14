import type { Project, ProjectShot } from "../types";

const dir = "/projects/sketch-execucao-orcamentaria";

function diagram(
  file: string,
  height: 900 | 1000,
  alt: ProjectShot["alt"],
  caption: ProjectShot["caption"],
): ProjectShot {
  return { src: `${dir}/${file}.webp`, width: 1600, height, alt, caption };
}

export const sketchExecucaoOrcamentaria: Project = {
  slug: "sketch-execucao-orcamentaria",
  title: {
    pt: "Sketch de gestão — Automatizando a execução orçamentária de um órgão público",
    en: "Delivery sketch — Automating budget execution in a public agency",
  },
  summary: {
    pt: "Um cenário hipotético conduzido de ponta a ponta: das entrevistas com servidores ao diagnóstico AS-IS, à concepção do TO-BE, à arquitetura, às tecnologias e ao plano de entrega de um sistema para notas fiscais, empenhos e contratos.",
    en: "A hypothetical scenario run end to end: from interviews with public servants to the AS-IS diagnosis, the TO-BE design, the architecture, the technology choices and the delivery plan for a system handling invoices, budget commitments and contracts.",
  },
  body: {
    pt: [
      "Este não é um sistema que já construí: é um exercício de como eu conduziria um projeto de software do zero, do primeiro contato com o cliente até o piloto. Escolhi um cenário do setor público porque ele junta tudo o que torna um projeto difícil — regras legais, sistemas legados, muitas pessoas envolvidas e pouca margem para erro com dinheiro.",
      "O cliente hipotético é a área de orçamento e finanças de uma secretaria estadual. Ela paga fornecedores de cerca de 180 contratos ativos, recebe perto de 600 notas fiscais por mês e controla tudo com e-mail, processos no SEI, planilhas e redigitação no sistema financeiro oficial. O pedido do cliente chega vago, como quase sempre: “precisamos automatizar as notas e não perder mais prazo de contrato”.",
      "Os números do cenário são hipóteses que o discovery confirmaria ou derrubaria. O que importa aqui é o método: entender as pessoas e o processo antes de escolher a tecnologia, e deixar cada decisão registrada com o seu porquê.",
    ],
    en: [
      "This isn't a system I've built: it's an exercise in how I would run a software project from scratch, from the first client meeting to the pilot. I picked a public-sector scenario because it combines everything that makes a project hard — legal rules, legacy systems, many stakeholders and little room for error with money.",
      "The hypothetical client is the budget and finance department of a state agency. It pays suppliers on about 180 active contracts, receives around 600 invoices a month and runs everything on email, case files in SEI (the government's electronic records system), spreadsheets and re-keying into the official financial system. The request arrives vague, as it almost always does: “we need to automate invoices and stop missing contract deadlines”.",
      "The scenario's numbers are hypotheses that discovery would confirm or discard. What matters here is the method: understand the people and the process before picking technology, and record every decision along with its reason.",
    ],
  },
  category: "exploration",
  tags: ["Gestão", "GovTech", "Arquitetura"],
  stack: [
    "Discovery",
    "BPMN",
    "C4 Model",
    "ADRs",
    "Scrum",
    "Next.js",
    "FastAPI",
    "PostgreSQL",
    "Keycloak",
    "OpenTelemetry",
  ],
  year: 2026,
  role: { pt: "Gestão de projeto & arquitetura", en: "Project management & architecture" },
  client: "Cenário hipotético",
  cover: `${dir}/cover.webp`,
  featured: true,
  highlights: [
    {
      value: "7",
      label: {
        pt: "perfis entrevistados, do ordenador de despesa ao controle interno",
        en: "stakeholder profiles interviewed, from budget authority to internal audit",
      },
    },
    {
      value: "3 → 1",
      label: {
        pt: "digitações de cada nota fiscal: a meta do TO-BE",
        en: "times each invoice is typed in: the TO-BE target",
      },
    },
    {
      value: "120 dias",
      label: {
        pt: "de antecedência no primeiro alerta de fim de contrato",
        en: "of notice before a contract expires, on the first alert",
      },
    },
    {
      value: "20 sem.",
      label: {
        pt: "da primeira entrevista ao piloto em uma unidade",
        en: "from the first interview to a pilot in one unit",
      },
    },
  ],
  sections: [
    {
      id: "dominio",
      title: {
        pt: "1. Entender o domínio antes do problema",
        en: "1. Learn the domain before the problem",
      },
      body: {
        pt: [
          "Antes de qualquer reunião com o cliente, estudo o domínio para conseguir fazer boas perguntas. No setor público, toda despesa segue o mesmo caminho, definido pela Lei 4.320/1964: primeiro o empenho reserva o dinheiro no orçamento; depois a liquidação confirma que o serviço foi entregue, com a nota fiscal atestada pelo fiscal do contrato; só então vem o pagamento.",
          "Em volta desse ciclo está o contrato, regido pela Lei 14.133/2021. Ele tem gestor e fiscal designados, vigência, valor e saldo; os aditivos mudam prazo e valor, e os pagamentos precisam respeitar uma ordem cronológica. Saber isso muda a conversa: em vez de “o que vocês querem que o sistema faça?”, posso perguntar “onde, nesse ciclo, as coisas travam?”.",
        ],
        en: [
          "Before any client meeting, I study the domain so I can ask good questions. In the Brazilian public sector, every expense follows the same path, set by Law 4.320/1964: first a commitment (empenho) reserves the money in the budget; then settlement (liquidação) confirms the service was delivered, with the invoice signed off by the contract's inspector; only then comes payment.",
          "Around that cycle sits the contract, governed by Law 14.133/2021. It has an assigned manager and inspector, a term, a value and a remaining balance; amendments change term and value, and payments must follow chronological order. Knowing this changes the conversation: instead of “what do you want the system to do?”, I can ask “where in this cycle do things get stuck?”.",
        ],
      },
      shots: [
        diagram(
          "01-ciclo-da-despesa",
          900,
          {
            pt: "Diagrama do ciclo da despesa pública: empenho, liquidação e pagamento, com o contrato em volta",
            en: "Diagram of the public expenditure cycle: commitment, settlement and payment, with the contract around it",
          },
          {
            pt: "O ciclo que o sistema precisa respeitar — e acelerar.",
            en: "The cycle the system has to respect — and speed up.",
          },
        ),
      ],
    },
    {
      id: "entrevistas",
      title: { pt: "2. Entrevistas e discovery", en: "2. Interviews and discovery" },
      body: {
        pt: [
          "O discovery dura três semanas e começa por quem vive o problema. Mapeio as partes interessadas e entrevisto cada perfil separadamente: o ordenador de despesa (o patrocinador), a chefia do orçamento, a equipe do financeiro, gestores e fiscais de contrato, a contabilidade, o controle interno e a TI do órgão. Cada um vê um pedaço diferente do mesmo processo — e sente dores diferentes.",
          "As entrevistas são semiestruturadas: um roteiro curto, muito espaço para histórias concretas e nenhuma pergunta sobre solução. Além de ouvir, acompanho um ciclo real de pagamento do início ao fim (shadowing), leio os procedimentos e normativos internos e levanto números do sistema: quantas notas, quantos contratos, quanto tempo cada etapa leva.",
        ],
        en: [
          "Discovery takes three weeks and starts with the people who live the problem. I map stakeholders and interview each profile separately: the budget authority (the sponsor), the budget team lead, the finance team, contract managers and inspectors, accounting, internal audit and the agency's IT. Each sees a different slice of the same process — and feels different pains.",
          "Interviews are semi-structured: a short script, plenty of room for concrete stories and no questions about solutions. Besides listening, I follow one real payment from start to finish (shadowing), read internal procedures and regulations and pull numbers from the system: how many invoices, how many contracts, how long each step takes.",
        ],
      },
      code: {
        file: "discovery/roteiro-de-entrevista.md",
        language: "md",
        source: `## Roteiro — fiscal de contrato (45 min)

1. Me conte como foi a última nota fiscal que você atestou,
   do momento em que ela chegou até sair da sua mesa.
2. O que você precisou conferir? Onde buscou cada informação?
3. Qual foi a última vez que algo deu errado nesse caminho?
   O que aconteceu depois?
4. Como você sabe quanto ainda resta de saldo no contrato?
5. Como fica sabendo que um contrato está perto de vencer?
6. Se pudesse mudar uma única coisa amanhã, qual seria?

Regra: perguntar sobre o passado concreto, nunca sobre a solução.`,
      },
      points: {
        pt: [
          "Entregável do discovery: mapa de partes interessadas, processo AS-IS em BPMN validado com quem executa, lista de dores priorizada e números de base para medir o antes e o depois.",
          "Achado típico desse tipo de entrevista: o fiscal atesta sem ver o saldo do empenho, e o financeiro descobre o problema só na liquidação — dias depois.",
        ],
        en: [
          "Discovery deliverables: a stakeholder map, the AS-IS process in BPMN validated with the people who run it, a prioritized pain list and baseline numbers to measure before and after.",
          "A typical finding from interviews like these: inspectors sign off invoices without seeing the commitment's balance, and finance only finds the problem at settlement — days later.",
        ],
      },
    },
    {
      id: "as-is-to-be",
      title: { pt: "3. Do AS-IS ao TO-BE", en: "3. From AS-IS to TO-BE" },
      body: {
        pt: [
          "O diagnóstico AS-IS mostra o caminho real de uma nota: ela chega por e-mail ou papel, vira um processo no SEI, alguém confere à mão contra uma planilha de empenhos, o fiscal atesta por despacho e o financeiro redigita tudo no sistema oficial. A mesma informação é digitada três vezes, o saldo vive numa planilha e a vigência dos contratos depende da memória de uma pessoa.",
          "O TO-BE não troca o sistema financeiro oficial — ele continua sendo a fonte da verdade contábil. O novo sistema orquestra o caminho até ele: captura a nota eletrônica pelo XML ou pela chave de acesso, valida a autenticidade na SEFAZ, vincula nota, empenho e contrato, mostra o saldo na hora, leva o atesto para dentro do sistema com prazo e lembrete e entrega a liquidação pré-preenchida, numa fila que respeita a ordem cronológica.",
        ],
        en: [
          "The AS-IS diagnosis shows an invoice's real path: it arrives by email or on paper, becomes a case file in SEI, someone checks it by hand against a commitments spreadsheet, the inspector signs off by memo and finance re-keys everything into the official system. The same data is typed three times, the balance lives in a spreadsheet and contract terms depend on one person's memory.",
          "The TO-BE doesn't replace the official financial system — it remains the accounting source of truth. The new system orchestrates the path to it: it captures the electronic invoice from its XML or access key, validates it with the state tax authority (SEFAZ), links invoice, commitment and contract, shows the balance instantly, brings the inspector's sign-off into the system with a deadline and reminder, and hands over a pre-filled settlement, in a queue that follows chronological order.",
        ],
      },
      shots: [
        diagram(
          "02-as-is-to-be",
          1000,
          {
            pt: "Comparação entre o processo atual, com seis etapas manuais e quatro dores, e o processo proposto, automatizado",
            en: "Comparison between the current process, with six manual steps and four pain points, and the proposed automated process",
          },
          {
            pt: "Mesmas etapas legais, menos trabalho manual: a nota é digitada uma vez só.",
            en: "Same legal steps, less manual work: each invoice is entered only once.",
          },
        ),
      ],
    },
    {
      id: "concepcao",
      title: { pt: "4. Concepção da ideia e do MVP", en: "4. Shaping the idea and the MVP" },
      body: {
        pt: [
          "Com o TO-BE desenhado, transformo a ideia em decisões de produto. Primeiro, princípios que orientam todo o resto: o sistema oficial segue como fonte da verdade; nenhum pagamento é decidido automaticamente; toda ação fica registrada para auditoria; e a interface precisa ser acessível, porque servidores públicos têm necessidades diversas.",
          "Depois, o recorte do MVP com MoSCoW. Obrigatório: cadastro de contratos e empenhos importados do sistema oficial, captura e validação de NF-e, vínculo com saldo, fluxo de atesto e fila de liquidação. Desejável: alertas de vigência, saldo e certidões. Fica para depois: notas de serviço (NFS-e), integração de escrita com o sistema financeiro e aplicativo móvel para fiscais. Um protótipo navegável é testado com cinco servidores antes de qualquer linha de código de produção.",
        ],
        en: [
          "With the TO-BE drawn, I turn the idea into product decisions. First, principles that guide everything else: the official system stays the source of truth; no payment is decided automatically; every action is recorded for auditing; and the interface must be accessible, because public servants have diverse needs.",
          "Then the MVP cut, using MoSCoW. Must have: contracts and commitments imported from the official system, NF-e capture and validation, linking with balance, sign-off workflow and settlement queue. Should have: alerts for contract terms, balances and tax certificates. Later: service invoices (NFS-e), write integration with the financial system and a mobile app for inspectors. A clickable prototype is tested with five servants before any production code is written.",
        ],
      },
      code: {
        file: "api/app/domain/alertas_contrato.py",
        language: "python",
        source: `AVISOS_VIGENCIA = (120, 90, 60, 30)  # dias antes do fim
SALDO_MINIMO = Decimal("0.20")       # 20% do valor atualizado

def alertas_do_contrato(contrato: Contrato, hoje: date) -> list[Alerta]:
    alertas = []
    dias = (contrato.fim_vigencia - hoje).days
    if dias in AVISOS_VIGENCIA:
        alertas.append(Alerta.vigencia(contrato, dias))
    if contrato.saldo < contrato.valor_atualizado * SALDO_MINIMO:
        alertas.append(Alerta.saldo_baixo(contrato))
    # Alerta avisa; quem decide prorrogar ou aditivar é o gestor.
    return alertas`,
      },
      points: {
        pt: [
          "Métricas de sucesso definidas antes do código: tempo médio da nota até a liquidação, notas com retrabalho, pagamentos fora da ordem cronológica e contratos que venceram sem aviso.",
          "Primeiro alerta de vigência com 120 dias: o tempo realista para decidir entre prorrogar e abrir uma nova contratação.",
        ],
        en: [
          "Success metrics set before any code: average time from invoice to settlement, invoices needing rework, payments out of chronological order and contracts that expired without warning.",
          "First contract-term alert at 120 days: a realistic lead time to decide between extending and starting a new procurement.",
        ],
      },
    },
    {
      id: "arquitetura",
      title: { pt: "5. Concepção da arquitetura", en: "5. Designing the architecture" },
      body: {
        pt: [
          "Desenho a arquitetura no modelo C4, começando pela visão de containers. A escolha central é um monólito modular, e não microsserviços: o time é pequeno, o domínio é um só e quem vai manter o sistema depois é a TI do órgão. Uma aplicação web conversa com uma API; um worker separado cuida de tudo o que é lento ou externo — consultas à SEFAZ, importação de empenhos, alertas agendados.",
          "Os sistemas do governo ficam do lado de fora, atrás de adaptadores isolados que só o worker chama. Se o sistema financeiro sair do ar ou a SEFAZ demorar, o usuário continua trabalhando e a integração tenta de novo depois. Cada mudança relevante vira um evento numa trilha de auditoria que só aceita inclusões, pensada para o controle interno e para o tribunal de contas.",
        ],
        en: [
          "I design the architecture with the C4 model, starting from the container view. The central choice is a modular monolith, not microservices: the team is small, there is one domain and the agency's IT will maintain the system afterwards. A web app talks to an API; a separate worker handles everything slow or external — SEFAZ lookups, commitment imports, scheduled alerts.",
          "Government systems stay outside, behind isolated adapters that only the worker calls. If the financial system goes down or SEFAZ is slow, users keep working and the integration retries later. Every relevant change becomes an event in an append-only audit trail, designed for internal audit and the court of accounts.",
        ],
      },
      code: {
        file: "docs/adr/0003-integracao-com-sistema-financeiro.md",
        language: "md",
        source: `# ADR 0003 — Integração com o sistema financeiro oficial

Status: aceito

## Contexto
O sistema financeiro do estado não tem API de escrita. Há exportação
diária de empenhos e importação de lotes de liquidação por arquivo.

## Decisão
Ler empenhos pela exportação diária e gerar lotes de liquidação para
importação, via adaptador no worker. Nada é gravado direto no sistema.

## Consequências
+ Sem dependência de API que não existe; o sistema oficial segue soberano.
- Saldo pode ter até um dia de atraso: a tela mostra a data da última carga.`,
      },
      shots: [
        diagram(
          "03-arquitetura",
          1000,
          {
            pt: "Diagrama de containers: usuários, aplicação web, API, worker, banco, armazenamento e sistemas externos como SEFAZ, SEI e PNCP",
            en: "Container diagram: users, web app, API, worker, database, storage and external systems such as SEFAZ, SEI and PNCP",
          },
          {
            pt: "Sistemas do governo ficam do lado de fora, atrás de adaptadores no worker.",
            en: "Government systems stay outside, behind adapters in the worker.",
          },
        ),
      ],
    },
    {
      id: "tecnologias",
      title: { pt: "6. Tecnologias e por quê", en: "6. Technologies and why" },
      body: {
        pt: [
          "Cada tecnologia é escolhida pelo problema e por quem vai mantê-la depois. No setor público, a pergunta “a TI do órgão consegue sustentar isso daqui a cinco anos?” pesa tanto quanto desempenho.",
        ],
        en: [
          "Each technology is chosen for the problem and for whoever maintains it afterwards. In the public sector, the question “can the agency's IT sustain this five years from now?” weighs as much as performance.",
        ],
      },
      points: {
        pt: [
          "Next.js + React: renderização no servidor, boa base para acessibilidade (eMAG e WCAG) e um ecossistema fácil de contratar.",
          "Python + FastAPI: Python lida bem com XML de NF-e e PDFs; Pydantic valida cada entrada e o OpenAPI documenta a API sozinho.",
          "PostgreSQL: transações para dinheiro, JSONB para guardar o XML interpretado e uma fila simples com SELECT … FOR UPDATE SKIP LOCKED, sem mais um serviço para operar.",
          "Keycloak (OIDC): login único integrado ao Active Directory do órgão ou ao gov.br, com perfis por papel.",
          "Armazenamento de objetos compatível com S3 para os XMLs e PDFs, e OpenTelemetry para logs, métricas e rastreio das integrações.",
          "Tudo em contêineres, implantável no datacenter do órgão ou numa nuvem de governo — com os dados no Brasil, como pede a LGPD.",
        ],
        en: [
          "Next.js + React: server rendering, a good foundation for accessibility (eMAG and WCAG) and an ecosystem that's easy to hire for.",
          "Python + FastAPI: Python handles NF-e XML and PDFs well; Pydantic validates every input and OpenAPI documents the API on its own.",
          "PostgreSQL: transactions for money, JSONB to keep the parsed XML and a simple queue using SELECT … FOR UPDATE SKIP LOCKED, with no extra service to run.",
          "Keycloak (OIDC): single sign-on tied to the agency's Active Directory or gov.br, with role-based profiles.",
          "S3-compatible object storage for XMLs and PDFs, and OpenTelemetry for logs, metrics and tracing of integrations.",
          "Everything in containers, deployable in the agency's datacenter or a government cloud — with data kept in Brazil, as data-protection law (LGPD) expects.",
        ],
      },
    },
    {
      id: "metodologia",
      title: { pt: "7. Metodologia e governança", en: "7. Methodology and governance" },
      body: {
        pt: [
          "O time é enxuto: eu na gestão do projeto e liderança técnica, dois desenvolvedores full-stack, um designer em meio período e um servidor do órgão como product owner — de preferência alguém do financeiro, com autoridade para priorizar. Qualidade é responsabilidade do time todo, não de uma etapa no final.",
          "Depois do discovery, trabalho em Scrum com sprints de duas semanas. A cadência fixa ajuda o órgão a planejar a agenda dos servidores para as revisões, que são feitas com quem vai usar o sistema, e não só com a chefia. Em paralelo, o discovery continua em menor escala para validar o que vem a seguir.",
        ],
        en: [
          "The team is lean: me as project manager and tech lead, two full-stack developers, a part-time designer and an agency servant as product owner — ideally someone from finance, with authority to prioritize. Quality is the whole team's job, not a step at the end.",
          "After discovery, we work in Scrum with two-week sprints. A fixed cadence helps the agency plan servants' time for reviews, which happen with the people who will use the system, not just management. In parallel, discovery continues on a smaller scale to validate what comes next.",
        ],
      },
      points: {
        pt: [
          "Definição de pronto: testes automatizados, revisão de código, critérios de acessibilidade, nada de dado pessoal em log e documentação atualizada.",
          "Governança: status semanal com semáforo (verde, amarelo, vermelho) para o patrocinador e comitê mensal para decisões de escopo.",
          "Mudanças de escopo entram no backlog e trocam de lugar com outra entrega: prazo e qualidade ficam fixos, o escopo é o que se negocia.",
          "Transferência de conhecimento contínua para a TI do órgão: pareamento, ADRs e runbooks — o sistema não pode depender de quem o construiu.",
        ],
        en: [
          "Definition of done: automated tests, code review, accessibility criteria, no personal data in logs and up-to-date documentation.",
          "Governance: a weekly red-amber-green status for the sponsor and a monthly committee for scope decisions.",
          "Scope changes go into the backlog and swap places with another deliverable: deadline and quality stay fixed, scope is what gets negotiated.",
          "Continuous knowledge transfer to the agency's IT: pairing, ADRs and runbooks — the system can't depend on whoever built it.",
        ],
      },
    },
    {
      id: "riscos",
      title: { pt: "8. Riscos e como lidar com eles", en: "8. Risks and how to handle them" },
      body: {
        pt: [
          "Riscos são levantados no discovery, ganham um responsável e são revistos a cada sprint. Os principais deste cenário:",
        ],
        en: [
          "Risks are raised during discovery, get an owner and are reviewed every sprint. The main ones in this scenario:",
        ],
      },
      points: {
        pt: [
          "O sistema financeiro não tem API → um experimento técnico na semana 1 confirma o que é possível; o plano B é integração por arquivo (ADR 0003).",
          "Resistência à mudança → servidores no desenho desde a primeira entrevista, piloto em uma unidade e treinamento no posto de trabalho.",
          "Troca de gestão ou de equipe → patrocínio documentado, decisões registradas em ADR e entregas de valor a cada duas semanas.",
          "Certificado digital e acesso à SEFAZ dependem de trâmites do órgão → pedido aberto já no discovery, com a TI como responsável.",
          "Dados de contratos desatualizados → saneamento dos cadastros como parte do piloto, com relatório de inconsistências.",
        ],
        en: [
          "The financial system has no API → a technical spike in week 1 confirms what's possible; plan B is file-based integration (ADR 0003).",
          "Resistance to change → servants involved in the design from the first interview, a pilot in one unit and on-the-job training.",
          "A change of administration or team → documented sponsorship, decisions recorded as ADRs and value delivered every two weeks.",
          "Digital certificates and SEFAZ access depend on agency paperwork → requested during discovery, owned by IT.",
          "Outdated contract data → cleaning the records as part of the pilot, with an inconsistency report.",
        ],
      },
    },
    {
      id: "roadmap",
      title: { pt: "9. Roadmap e critérios de sucesso", en: "9. Roadmap and success criteria" },
      body: {
        pt: [
          "São 20 semanas da primeira entrevista ao piloto: três de discovery, três de concepção, quatro sprints de MVP, duas de homologação com servidores e quatro de piloto em uma unidade gestora. Cada marco tem um critério objetivo — o mapa AS-IS validado por quem executa, o protótipo aprovado nos testes com usuários, o MVP homologado.",
          "No fim do piloto vem a decisão de expandir ou não, tomada com as métricas definidas na concepção comparadas aos números de base do discovery. Se o tempo da nota até a liquidação não cair e o retrabalho não diminuir, o projeto volta para a prancheta antes de crescer.",
        ],
        en: [
          "It's 20 weeks from the first interview to the pilot: three of discovery, three of design, four MVP sprints, two of acceptance testing with servants and four of piloting in one unit. Each milestone has an objective criterion — the AS-IS map validated by the people who run it, the prototype approved in user tests, the MVP accepted.",
          "The pilot ends with a go/no-go decision on expanding, made by comparing the metrics defined during design against discovery's baseline. If invoice-to-settlement time doesn't drop and rework doesn't shrink, the project goes back to the drawing board before it grows.",
        ],
      },
      shots: [
        diagram(
          "04-roadmap",
          900,
          {
            pt: "Cronograma de 20 semanas com discovery, concepção, quatro sprints, homologação, piloto e quatro marcos",
            en: "20-week timeline with discovery, design, four sprints, acceptance testing, pilot and four milestones",
          },
          {
            pt: "Cada fase termina num marco com critério objetivo.",
            en: "Each phase ends in a milestone with an objective criterion.",
          },
        ),
      ],
    },
    {
      id: "licoes",
      title: { pt: "O que este sketch mostra", en: "What this sketch shows" },
      body: {
        pt: [
          "Tecnologia é a parte mais fácil de trocar num projeto; entendimento errado do processo é a mais cara. Por isso a ordem aqui é sempre a mesma: pessoas, processo, decisões de produto, arquitetura e só então ferramentas.",
          "No setor público, isso pesa ainda mais. O sistema precisa respeitar a lei antes de ser elegante, conviver com os sistemas oficiais em vez de competir com eles e continuar de pé quando o time que o construiu já tiver ido embora.",
        ],
        en: [
          "Technology is the easiest part of a project to change; misunderstanding the process is the most expensive. That's why the order here is always the same: people, process, product decisions, architecture and only then tools.",
          "In the public sector this matters even more. The system must comply with the law before it's elegant, coexist with official systems instead of competing with them and keep running after the team that built it has moved on.",
        ],
      },
    },
  ],
};
