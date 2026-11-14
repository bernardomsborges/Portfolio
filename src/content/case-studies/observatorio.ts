import type { Project, ProjectShot } from "../types";

const dir = "/projects/observatorio";

/** Screenshots come from two browser sizes, so each one carries its own height. */
function shot(
  file: string,
  height: 737 | 783,
  alt: ProjectShot["alt"],
  caption?: ProjectShot["caption"],
): ProjectShot {
  return { src: `${dir}/${file}.webp`, width: 1554, height, alt, caption };
}

export const observatorio: Project = {
  slug: "observatorio",
  title: {
    pt: "Observatório — Triagem de manifestações com IA e privacidade",
    en: "Observatory — Privacy-first AI triage for citizen feedback",
  },
  summary: {
    pt: "Plataforma whitelabel que anonimiza manifestações de cidadãos, usa IA só como recomendação, coloca pessoas na decisão final e transforma tudo em indicadores sem expor ninguém.",
    en: "A white-label platform that anonymizes citizen feedback, uses AI only as a recommendation, keeps people in charge of the final call and turns it all into indicators without exposing anyone.",
  },
  body: {
    pt: [
      "Ouvidorias recebem todo dia reclamações, elogios, sugestões e denúncias por telefone, e-mail e portais. Esses textos costumam vir cheios de dados pessoais — nome, CPF, telefone — e alguém precisa ler um por um para decidir a área responsável e a urgência. É lento, e o gestor fica sem visão do todo.",
      "O Observatório é uma prova de conceito para esse fluxo. Ele protege o texto antes de qualquer outra coisa, pede à IA uma classificação apenas como sugestão, manda os casos incertos para revisão humana, coleta manifestações de fontes públicas autorizadas em segundo plano e mostra indicadores agregados — nunca o conteúdo individual.",
      "Construí as duas pontas: uma API em Python com worker de coletas e um front-end em Next.js. O produto é whitelabel: nome, slogan e descrição vêm de variáveis de ambiente, sem tocar em componentes. A seguir, a jornada real de um operador, com prints tirados do sistema rodando e dados fictícios.",
    ],
    en: [
      "Ombudsman offices receive complaints, praise, suggestions and reports every day by phone, email and web portals. These texts are usually full of personal data — names, tax IDs, phone numbers — and someone has to read each one to decide the right department and urgency. It's slow, and managers get no big picture.",
      "The Observatory is a proof of concept for that workflow. It protects the text before anything else, asks an AI for a classification only as a suggestion, sends uncertain cases to human review, collects feedback from authorized public sources in the background and shows aggregated indicators — never individual content.",
      "I built both ends: a Python API with a collection worker and a Next.js front end. The product is white-label: name, tagline and description come from environment variables, with no component changes. Below is a real operator journey, with screenshots taken from the running system and fictitious data.",
    ],
  },
  category: "real",
  tags: ["LLM", "LGPD", "Dashboard"],
  stack: [
    "Python",
    "FastAPI",
    "PostgreSQL",
    "SQLAlchemy",
    "Presidio",
    "spaCy",
    "Gemini",
    "Playwright",
    "Next.js",
    "React",
    "TanStack Query",
    "Docker",
  ],
  year: 2026,
  role: { pt: "Full-stack & arquitetura", en: "Full-stack & architecture" },
  client: "Prova de conceito",
  cover: `${dir}/cover.webp`,
  links: { live: "https://whitelabel-observatory.fluxzone.com.br" },
  featured: true,
  highlights: [
    {
      value: "0",
      label: {
        pt: "textos originais enviados à IA ou gravados no banco",
        en: "original texts sent to the AI or stored in the database",
      },
    },
    {
      value: "70%",
      label: {
        pt: "de confiança mínima para a IA classificar; abaixo disso, decide uma pessoa",
        en: "minimum AI confidence to classify; below that, a person decides",
      },
    },
    {
      value: "3",
      label: {
        pt: "fontes públicas de coleta, processadas em segundo plano",
        en: "public collection sources, processed in the background",
      },
    },
    {
      value: "41",
      label: {
        pt: "testes automatizados entre API e interface",
        en: "automated tests across API and interface",
      },
    },
  ],
  sections: [
    {
      id: "acesso",
      title: { pt: "1. Acesso restrito", en: "1. Restricted access" },
      body: {
        pt: [
          "Não existe cadastro público: só um administrador cria usuários. Há dois papéis — o operador trata manifestações e consulta coletas e indicadores; o administrador também gerencia usuários, catálogos, fontes e coletas.",
          "O login passa por um BFF (back-end for front-end) dentro do próprio Next.js. Ele troca e-mail e senha por um JWT na API e guarda o token num cookie HttpOnly. O JavaScript do navegador nunca vê o token: cada chamada vai para o proxy do Next.js, que acrescenta o cabeçalho de autorização ao falar com a API.",
        ],
        en: [
          "There is no public sign-up: only an admin creates users. There are two roles — operators handle feedback and view collections and indicators; admins also manage users, catalogs, sources and collections.",
          "Login goes through a BFF (back-end for front-end) inside Next.js itself. It exchanges email and password for a JWT from the API and keeps the token in an HttpOnly cookie. Browser JavaScript never sees the token: every call goes to the Next.js proxy, which adds the authorization header when talking to the API.",
        ],
      },
      points: {
        pt: [
          "Senhas com Argon2; o token tem validade curta e é conferido pela API em toda chamada (assinatura, usuário e papel).",
          "O proxy também barra rotas administrativas para quem não é admin, como uma camada extra além da validação da API.",
          "A API impede excluir o próprio usuário e o último administrador.",
        ],
        en: [
          "Passwords hashed with Argon2; tokens are short-lived and the API checks signature, user and role on every call.",
          "The proxy also blocks admin routes for non-admins, as an extra layer on top of the API's own checks.",
          "The API refuses to delete your own user or the last remaining admin.",
        ],
      },
      shots: [
        shot(
          "01-login",
          783,
          {
            pt: "Tela de login do Observatório com o formulário de acesso restrito",
            en: "Observatory login screen with the restricted access form",
          },
          {
            pt: "Login: sem cadastro público, só contas criadas por um administrador.",
            en: "Login: no public sign-up, only accounts created by an admin.",
          },
        ),
      ],
    },
    {
      id: "triagem",
      title: { pt: "2. Triagem: privacidade antes da IA", en: "2. Triage: privacy before AI" },
      body: {
        pt: [
          "O operador cola a manifestação, escolhe o canal de origem e decide se quer a ajuda da IA. A regra que guia todo o resto: o texto é protegido no servidor antes de qualquer outra etapa, e só a versão protegida segue adiante.",
          "A anonimização combina duas técnicas. O Microsoft Presidio, com o modelo de português do spaCy, reconhece entidades como nomes de pessoas. Regras próprias pegam formatos brasileiros: CPF, RG (inclusive o de Minas Gerais), telefone e e-mail. Depois, as mesmas expressões passam de novo sobre o resultado, como defesa em profundidade. Cada ocorrência vira um marcador: <CPF>, <EMAIL>, <TELEFONE>, <PESSOA>.",
          "Para não registrar a mesma manifestação duas vezes, a API calcula um HMAC do texto normalizado e recusa repetições da mesma origem. O texto original nem chega a ser gravado: o campo fica nulo até existirem regras formais de criptografia e retenção.",
        ],
        en: [
          "The operator pastes the feedback, picks the source channel and chooses whether to get AI help. The rule behind everything else: the text is protected on the server before any other step, and only the protected version moves on.",
          "Anonymization combines two techniques. Microsoft Presidio, with spaCy's Portuguese model, recognizes entities such as people's names. Custom rules catch Brazilian formats: CPF (tax ID), RG (ID card, including the Minas Gerais format), phone and email. Then the same patterns run again over the result, as defense in depth. Each match becomes a placeholder: <CPF>, <EMAIL>, <TELEFONE>, <PESSOA>.",
          "To avoid logging the same feedback twice, the API computes an HMAC of the normalized text and rejects repeats from the same source. The original text is never even stored: the field stays null until formal encryption and retention rules exist.",
        ],
      },
      code: {
        file: "api/app/services/anonymization_service.py",
        language: "python",
        source: `def anonymize(text: str) -> str:
    results = get_analyzer().analyze(text=text, language="pt")
    anonymized = get_anonymizer().anonymize(
        text=text, analyzer_results=results, operators=operators,
    ).text
    # Defesa em profundidade para os formatos brasileiros.
    anonymized = re.sub(CPF_PATTERN, "<CPF>", anonymized)
    anonymized = re.sub(RG_PATTERN, "<RG>", anonymized)
    anonymized = re.sub(EMAIL_PATTERN, "<EMAIL>", anonymized)
    return re.sub(PHONE_PATTERN, "<TELEFONE>", anonymized)`,
      },
      shots: [
        shot(
          "02-triagem-entrada",
          783,
          {
            pt: "Formulário de triagem com uma manifestação fictícia contendo nome, CPF, telefone e e-mail",
            en: "Triage form with fictitious feedback containing a name, CPF, phone and email",
          },
          {
            pt: "Entrada: uma manifestação fictícia com nome, CPF, telefone e e-mail.",
            en: "Input: fictitious feedback with a name, CPF, phone and email.",
          },
        ),
        shot(
          "03-triagem-resultado",
          783,
          {
            pt: "Resultado da triagem com o texto anonimizado e o aviso de revisão humana obrigatória",
            en: "Triage result showing the anonymized text and the mandatory human review notice",
          },
          {
            pt: "Saída: só a versão protegida volta para a tela. Sem chave de IA configurada, o registro vai direto para revisão humana.",
            en: "Output: only the protected version comes back. With no AI key configured, the record goes straight to human review.",
          },
        ),
      ],
    },
    {
      id: "ia",
      title: {
        pt: "3. IA como recomendação, não como decisão",
        en: "3. AI as a recommendation, not a decision",
      },
      body: {
        pt: [
          "Quando a IA está ligada, o Gemini recebe apenas o texto anonimizado e o catálogo ativo de áreas e assuntos, com seus IDs. A resposta precisa vir em JSON estruturado — tipo (elogio, reclamação, sugestão ou denúncia), área, assunto, urgência, destino sugerido, justificativa e um grau de confiança —, validado por um schema Pydantic.",
          "Um JSON bem formado não basta. A API confere se a área e o assunto existem, estão ativos e pertencem um ao outro. Se a confiança ficar abaixo de 70%, se o provedor falhar, se a resposta for inválida ou se não houver catálogo, a manifestação não recebe uma classificação forçada: fica em revisão humana.",
          "Cada classificação guarda o modelo usado e a versão do prompt, para que seja possível auditar depois por que uma manifestação foi parar em determinada área.",
        ],
        en: [
          "When AI is on, Gemini receives only the anonymized text and the active catalog of areas and subjects, with their IDs. The answer must be structured JSON — type (praise, complaint, suggestion or report), area, subject, urgency, suggested destination, justification and a confidence score — validated by a Pydantic schema.",
          "Well-formed JSON isn't enough. The API checks that the area and subject exist, are active and belong together. If confidence falls below 70%, the provider fails, the answer is invalid or there is no catalog, the feedback isn't force-classified: it stays in human review.",
          "Every classification stores the model used and the prompt version, so it's possible to audit later why a piece of feedback ended up in a given area.",
        ],
      },
      code: {
        file: "api/app/services/manifestation_service.py",
        language: "python",
        source: `classification, model = classify_text(anonymized_text, catalog)
if not is_valid_classification_pair(db, classification.area_id, classification.subject_id):
    raise LlmUnavailableError("Área e assunto fora do catálogo ativo.")

manifestation.requires_human_review = (
    classification.confidence < settings.llm_confidence_threshold  # 0.7
)
manifestation.status = (
    "em_revisao" if manifestation.requires_human_review else "classificado"
)`,
      },
    },
    {
      id: "revisao",
      title: { pt: "4. Revisão humana e prazos", en: "4. Human review and deadlines" },
      body: {
        pt: [
          "Tudo o que a IA não resolveu com segurança cai numa fila de revisão. O operador abre o registro, vê apenas o texto protegido e confirma área, assunto, tipo, urgência, destino e uma justificativa. A API valida de novo a combinação de área e assunto e registra quem revisou e quando.",
          "A urgência define o prazo (SLA), contado em dias úteis: 3 para alta, 10 para média e 20 para baixa, com feriados configuráveis. O operador revisa itens pendentes; o administrador também pode corrigir um item já classificado — para o operador, essa tentativa retorna 403.",
        ],
        en: [
          "Anything the AI couldn't settle safely lands in a review queue. The operator opens the record, sees only the protected text and confirms area, subject, type, urgency, destination and a justification. The API validates the area–subject pair again and records who reviewed it and when.",
          "Urgency sets the deadline (SLA), counted in business days: 3 for high, 10 for medium and 20 for low, with configurable holidays. Operators review pending items; admins can also correct an item that's already classified — for operators, that attempt returns 403.",
        ],
      },
      code: {
        file: "api/app/services/manifestation_service.py",
        language: "python",
        source: `def sla_due_at(urgency: str, registered_at: datetime) -> datetime:
    days = {"alta": 3, "media": 10, "baixa": 20}.get(urgency, 10)
    due_at, added = registered_at, 0
    while added < days:
        due_at += timedelta(days=1)
        if due_at.weekday() < 5 and due_at.date().isoformat() not in holidays:
            added += 1
    return due_at`,
      },
      shots: [
        shot(
          "05-revisao-humana",
          783,
          {
            pt: "Janela de revisão humana com área Saúde, assunto, urgência alta, destino e justificativa",
            en: "Human review dialog with Health area, subject, high urgency, destination and justification",
          },
          {
            pt: "A decisão final é de uma pessoa, com justificativa registrada.",
            en: "A person makes the final call, with a recorded justification.",
          },
        ),
        shot(
          "06-revisao-registrada",
          783,
          {
            pt: "Detalhe da manifestação classificada com a revisão humana registrada e a data",
            en: "Classified feedback detail with the recorded human review and timestamp",
          },
          {
            pt: "Revisão registrada com autor e horário, pronta para auditoria.",
            en: "Review recorded with author and time, ready for auditing.",
          },
        ),
        shot(
          "07-manifestacoes",
          737,
          {
            pt: "Lista de manifestações com origem, área, urgência, status e prazo de SLA",
            en: "Feedback list with source, area, urgency, status and SLA deadline",
          },
          {
            pt: "A lista mostra área, urgência, status e prazo, sem nenhum dado pessoal.",
            en: "The list shows area, urgency, status and deadline, with no personal data.",
          },
        ),
      ],
    },
    {
      id: "coletas",
      title: { pt: "5. Coletas em segundo plano", en: "5. Background collection" },
      body: {
        pt: [
          "Além da digitação manual, o sistema busca manifestações em fontes públicas: o arquivo de dados abertos do Fala.BR (um ZIP com CSV), o portal de Dados Abertos de Minas Gerais (pela API de catálogo do portal) e o Reclame Aqui, lido com um navegador controlado pelo Playwright.",
          "Coletar leva minutos, então não pode prender uma requisição HTTP. A API só registra uma execução como pendente e responde 202 Accepted. Um worker separado reivindica a próxima pendência com SELECT … FOR UPDATE SKIP LOCKED — assim, vários workers nunca pegam a mesma tarefa —, executa com tempo limite e número máximo de tentativas e confere o pedido de cancelamento a cada segundo.",
          "Cada item coletado passa exatamente pelo mesmo caminho da triagem manual: anonimização, deduplicação e classificação. Os logs da execução guardam só metadados e contadores, nunca o conteúdo.",
        ],
        en: [
          "Besides manual entry, the system fetches feedback from public sources: the Fala.BR open-data file (a ZIP with a CSV), the Minas Gerais Open Data portal (through the portal's catalog API) and Reclame Aqui, read with a Playwright-controlled browser.",
          "Collecting takes minutes, so it can't hold an HTTP request open. The API only records an execution as pending and answers 202 Accepted. A separate worker claims the next pending item with SELECT … FOR UPDATE SKIP LOCKED — so multiple workers never grab the same task —, runs it with a timeout and a maximum number of attempts, and checks for a cancel request every second.",
          "Every collected item goes through exactly the same path as manual triage: anonymization, deduplication and classification. Execution logs keep only metadata and counters, never the content.",
        ],
      },
      points: {
        pt: [
          "Uma fonte só fica disponível se estiver ativa, aprovada e com termos de uso e robots.txt revisados — tudo registrado no cadastro da fonte.",
          "O coletor não tenta contornar login, CAPTCHA nem bloqueios de acesso.",
          "Se o worker cair no meio de uma coleta, ao reiniciar ele devolve as execuções interrompidas para a fila.",
        ],
        en: [
          "A source is only available when it's active, approved and has its terms of use and robots.txt reviewed — all recorded on the source itself.",
          "The collector doesn't try to get around logins, CAPTCHAs or access blocks.",
          "If the worker crashes mid-collection, it puts interrupted executions back in the queue on restart.",
        ],
      },
      code: {
        file: "api/app/workers/coleta_worker.py",
        language: "python",
        source: `execution = db.scalar(
    select(CollectionExecution)
    .where(CollectionExecution.state == PENDING)
    .order_by(CollectionExecution.created_at)
    .with_for_update(skip_locked=True)  # nunca dois workers na mesma tarefa
    .limit(1)
)
execution.state = RUNNING
execution.started_at = datetime.now(timezone.utc)
db.commit()`,
      },
      shots: [
        shot(
          "12-fontes",
          737,
          {
            pt: "Cadastro de fontes de coleta com aprovação, termos, robots.txt, limite de itens, timeout e tentativas",
            en: "Collection sources with approval, terms, robots.txt, item limit, timeout and attempts",
          },
          {
            pt: "Cada fonte declara aprovação jurídica e limites operacionais.",
            en: "Each source declares legal approval and operating limits.",
          },
        ),
        shot(
          "11-coletas",
          737,
          {
            pt: "Tela de coletas com fontes disponíveis, fila atual e histórico de execuções",
            en: "Collections screen with available sources, current queue and execution history",
          },
          {
            pt: "Disparo e acompanhamento separados: fila, estado e histórico do worker.",
            en: "Triggering and tracking kept apart: worker queue, state and history.",
          },
        ),
      ],
    },
    {
      id: "observatorio",
      title: { pt: "6. O observatório", en: "6. The observatory" },
      body: {
        pt: [
          "A tela do gestor responde perguntas de gestão: quantas manifestações chegaram, quantas estão dentro do prazo, quanto tempo levam para ser concluídas, o que ainda espera revisão, e como o volume se divide por área, canal e dia da semana.",
          "O ponto central é o que o endpoint de indicadores não devolve: nenhum texto. Ele entrega só contagens, percentuais e séries, calculados no banco, junto com a proveniência — que filtros foram aplicados, quais fontes entraram na conta e quando foi atualizado. Os filtros ficam na URL, então uma visão pode ser compartilhada com um link.",
        ],
        en: [
          "The manager's screen answers management questions: how much feedback came in, how much is within the deadline, how long it takes to close, what's still waiting for review, and how volume splits by area, channel and weekday.",
          "The key point is what the indicators endpoint does not return: any text. It sends only counts, percentages and series, computed in the database, along with provenance — which filters were applied, which sources were counted and when it was updated. Filters live in the URL, so a view can be shared with a link.",
        ],
      },
      shots: [
        shot(
          "08-observatorio",
          783,
          {
            pt: "Observatório com filtros de período, origem e área e cartões de total, SLA, tempo médio e revisões pendentes",
            en: "Observatory with period, source and area filters and cards for total, SLA, average time and pending reviews",
          },
          {
            pt: "Cartões de resumo e filtros de período, origem e área.",
            en: "Summary cards and period, source and area filters.",
          },
        ),
        shot(
          "09-graficos",
          783,
          {
            pt: "Gráficos de evolução das entradas, volume por área, distribuição por origem e mapa semanal",
            en: "Charts for intake over time, volume by area, split by source and weekly map",
          },
          {
            pt: "Volume por área, por canal e por dia — só agregações.",
            en: "Volume by area, channel and day — aggregates only.",
          },
        ),
        shot(
          "10-proveniencia",
          783,
          {
            pt: "Bloco de proveniência informando as fontes, que o texto original não foi incluído e a hora da atualização",
            en: "Provenance block listing the sources, stating the original text was not included and the update time",
          },
          {
            pt: "Proveniência: de onde vieram os números e a garantia de que nenhum texto foi incluído.",
            en: "Provenance: where the numbers came from, and confirmation that no text was included.",
          },
        ),
      ],
    },
    {
      id: "engenharia",
      title: { pt: "Por trás das telas", en: "Behind the screens" },
      body: {
        pt: [
          "O front é um monorepo com Turborepo: o app em Next.js 16 e React 19 e um pacote compartilhado de componentes (shadcn/Base UI). O TanStack Query cuida do estado vindo da API — uma revisão, por exemplo, invalida a lista e os indicadores. Formulários usam React Hook Form com Zod, e adaptadores validam cada resposta da API antes de ela chegar aos componentes.",
          "A API é FastAPI com Pydantic, SQLAlchemy 2 e Alembic: PostgreSQL em produção, SQLite para rodar local. Os schemas aceitam nomes de campo em português e em inglês. Um middleware limita o tamanho do corpo (100 KB) e a taxa de triagens (30 por minuto, contadas no banco) e anexa um ID de correlação a cada requisição. A API e o worker são processos separados que compartilham o banco; tudo roda em Docker e é publicado com Dokploy.",
          "Escrevi também uma página pública de documentação dentro do próprio app, que explica arquitetura, decisões e limites para quem for avaliar o projeto. São 35 testes em Pytest — anonimização, segurança, manifestações, catálogos, coletas, worker e requisitos funcionais — e 6 em Vitest no front.",
        ],
        en: [
          "The front end is a Turborepo monorepo: the Next.js 16 / React 19 app and a shared component package (shadcn/Base UI). TanStack Query handles server state — a review, for example, invalidates the list and the indicators. Forms use React Hook Form with Zod, and adapters validate every API response before it reaches components.",
          "The API is FastAPI with Pydantic, SQLAlchemy 2 and Alembic: PostgreSQL in production, SQLite for local runs. Schemas accept field names in both Portuguese and English. A middleware caps body size (100 KB) and triage rate (30 per minute, counted in the database) and attaches a correlation ID to every request. The API and worker are separate processes sharing the database; everything runs in Docker and is deployed with Dokploy.",
          "I also wrote a public documentation page inside the app, explaining architecture, decisions and limits for whoever reviews the project. There are 35 Pytest tests — anonymization, security, feedback, catalogs, collection, worker and functional requirements — and 6 Vitest tests on the front end.",
        ],
      },
      shots: [
        shot(
          "13-documentacao",
          737,
          {
            pt: "Página pública de documentação explicando como o Observatório foi concebido",
            en: "Public documentation page explaining how the Observatory was designed",
          },
          {
            pt: "A documentação pública faz parte da entrega.",
            en: "The public documentation is part of the deliverable.",
          },
        ),
      ],
    },
    {
      id: "aprendizados",
      title: { pt: "O que aprendi", en: "What I learned" },
      body: {
        pt: [
          "Testar com textos reais mostrou o custo de errar para o lado seguro. O modelo de linguagem às vezes confunde palavras comuns com entidades: em “Liguei para a secretaria”, o “Liguei” virou <LOCATION>, e um nome próprio já saiu rotulado como local. O dado pessoal nunca vazou — mas o texto fica menos legível para quem revisa.",
          "Foi uma escolha consciente: num sistema que lida com dados de cidadãos, mascarar demais é muito melhor do que mascarar de menos. O próximo passo é calibrar isso — restringir as entidades que o Presidio considera e ajustar os limiares de confiança — sem abrir mão das regras próprias, que pegam CPF, telefone e e-mail de forma determinística.",
          "Para sair da prova de conceito, eu priorizaria criptografia e política de retenção para qualquer dado sensível autorizado, trilha de auditoria persistente, rate limit distribuído, SSO institucional e revisão jurídica de cada fonte.",
        ],
        en: [
          "Testing with realistic texts showed the cost of erring on the safe side. The language model sometimes mistakes common words for entities: in “Liguei para a secretaria” (“I called the office”), “Liguei” became <LOCATION>, and a person's name came out labeled as a place. No personal data ever leaked — but the text gets harder to read for the reviewer.",
          "That was a deliberate choice: in a system handling citizens' data, masking too much is far better than masking too little. The next step is calibration — narrowing the entities Presidio considers and tuning confidence thresholds — while keeping the custom rules that catch tax IDs, phones and emails deterministically.",
          "To take it past proof of concept, I'd prioritize encryption and a retention policy for any authorized sensitive data, a persistent audit trail, distributed rate limiting, institutional SSO and a legal review of every source.",
        ],
      },
    },
  ],
};
