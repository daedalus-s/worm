# Experience corpus for tailored resumes

Canonical employment dates, titles, and bullets come from `resume-template.tex`. Prefer those over LinkedIn when they conflict. LinkedIn and GitHub add color, extra internships, and project names you may surface only when they are truthful and relevant.

Do not invent employers, titles, dates, customers, revenue, uptime, or percentages. You may rephrase existing bullets so job-description keywords appear naturally.

## Current role

**Solution Architect & AI Labs Lead**, HatchWorks AI — Remote, US  
November 2025 – Present

- Partnered with the CTO on technical direction for 20+ client engagements from discovery through delivery: architectures, staffing estimates, scoped proposals for AI-native and cloud-native platforms.
- Worked with private-equity stakeholders to modernize processes across 100+ portfolio companies while remaining industry-compliance aware.
- Designed AI-native workflows with foundation models, embeddings, agentic orchestration, LangChain, Vertex AI.
- Early-stage prototyping and architecture handoffs spanning full-stack, data engineering, and agentic engineering.
- Build-versus-buy / toolset recommendations across GCP, AWS, Azure; reusable patterns and accelerators.
- Major contributor to **GenDD** (Generative Driven Development): org-wide AI delivery automation for 150+ software-development tasks. 347 AI hours reclaimed / month. 75% productivity gain with <3% defect rate. https://hatchworks.com/generative-driven-development/
- Major contributor to a private **health benefits CRM** (`https://github.com/hatchworks/health-crm`): multi-stakeholder insights and dashboards for healthcare spend and plans across benefit years. Primary users are PE-firm stakeholders with portfolio-wide healthcare visibility; also serves portfolio companies, medical and pharmacy plan brokers, benefits advisors, benefits consultants, and CHROs.
- Environment: Python, TypeScript, React, Node.js, FastAPI, LangChain, GCP (Vertex AI, BigQuery, Cloud Run, Cloud SQL, GCS, Secret Manager), AWS, Docker, Terraform, CI/CD, Kubernetes, Gemini, Anthropic, Firebase Auth, PostgreSQL, Agile/Scrum.

LinkedIn split (do not create a second HatchWorks job on the resume): Solutions Architect & Pre-Sales Engineer from Nov 2025; AI Labs Lead from Apr 2026. Keep the combined resume title unless a JD is specifically a pre-sales / sales-engineer role, in which case lead with pre-sales language already present in the HatchWorks and R3/Akamai bullets.

### HatchWorks GitHub and private work

Public work account: https://github.com/sreenikethaathreya-hw (HatchWorks org member)

- **health-crm** (`https://github.com/hatchworks/health-crm`) — major personal contribution. Private HatchWorks product. Do not claim it is public. Do not invent customer names, revenue, uptime, or metrics beyond what is listed here.

  Product: a health benefits CRM that gives stakeholders targeted insights and dashboards about healthcare spend and plans across multiple benefit years.

  Stakeholders: private-equity firms and their portfolio companies; medical plan brokers and pharmacy plan brokers of those portfolio companies; benefits advisors; benefits consultants; CHROs. The main target group is PE-firm stakeholders, who can see healthcare details for every company in their portfolio.

  Frontend: React 19, Vite 8, TypeScript 7, Tailwind CSS 4, Radix UI (shadcn-style), TanStack Query v5, React Router v7.

  Backend: Python 3.12, FastAPI, SQLAlchemy 2 (async), Pydantic v2.

  Database: PostgreSQL 15 on Cloud SQL. Local development connects to the dev instance through the Cloud SQL Auth Proxy.

  Migrations: Alembic (async).

  Auth: Firebase Auth (email/password plus optional MFA), Firebase Admin SDK for JWT verification, server-side sessions.

  Storage: Google Cloud Storage with v4 signed upload and download URLs.

  Infrastructure: Terraform on GCP — Cloud Run, Cloud SQL, GCS, Secret Manager, Firebase Hosting, Artifact Registry, Cloud Logging.

  CI/CD: GitHub Actions — quality gate, approval-based deploys, post-deploy and scheduled smoke tests.

  When a JD mentions healthcare, benefits, CRM, private equity, dashboards, spend analytics, React, FastAPI, Firebase, Cloud Run, or PostgreSQL, include 1–2 HatchWorks bullets drawn from this product. Do not add a separate employer named health-crm.
- **adksolutionsaccelerator** (`https://github.com/sreenikethaathreya-hw/adksolutionsaccelerator`, TypeScript) — HatchWorks AI production-ready template for AI agent apps. Google ADK multi-agent backend (FastAPI, Python 3.12) + React 18 / TypeScript / Tailwind frontend. Separate Cloud Run containers, SSE streaming, multimodal uploads (PDF, Excel, images) via Gemini 2.0 / Vertex AI, Secret Manager, IAM, CORS. Root coordinator routes to specialized agents: Financial Analysis, Market Research, AI Opportunity, KPI Development. Template integrations listed in the README include Google and Salesforce-style service hooks — do not claim a live Salesforce production deployment from this repo alone.
- **SRS-Saris-multi-agent** (`https://github.com/sreenikethaathreya-hw/SRS-Saris-multi-agent`, Python) — “Saris Agent” for real-estate knowledge-base management. Google ADK, Python 3.12, Vertex AI (`us-central1`), optional Egnyte file integration (client-credentials or implicit OAuth), `adk web` local UI, Cloud Run deploy (`saris-agent-service-dev`) with Cloud SQL. README notes follow-ups: sub-agents for Egnyte reads, stronger root-agent orchestration, training on SRS data, PDF compose.
- **n8ndemo** (`https://github.com/sreenikethaathreya-hw/n8ndemo`) — n8n automation demo. Public repo; no README body as of Aug 2026. Mention n8n only; do not invent workflows.
- **racetrac-poc-2** (`https://github.com/sreenikethaathreya-hw/racetrac-poc-2`, TypeScript) — client POC. No README body as of Aug 2026. Do not invent the client’s product, metrics, or stack beyond TypeScript.
- **single-pane-poc** (`https://github.com/sreenikethaathreya-hw/single-pane-poc`) — single-pane operations / observability POC. No README body as of Aug 2026.
- **parallelvsserial** (`https://github.com/sreenikethaathreya-hw/parallelvsserial`, Python) — same large-file parallel vs serial max-finder benchmark as the personal repo (see Projects).

Use these names only when the JD matches (healthcare CRM, ADK, multi-agent, n8n, single pane of glass, retail/ops POCs, real estate / knowledge base, Egnyte). Do not claim they are public if they are not. Do not invent stars, users, or production metrics.

## Prior full-time roles

**Software Engineer**, i-Link Solutions — Chantilly, VA  
Dec 2024 – November 2025

- Led technical solutions for **Lantern**, ONC HealthIT open-source FHIR API endpoint monitoring (https://lantern.healthit.gov/?tab=dashboard_tab). Also a contributor to `onc-healthit/lantern-back-end` (Go).
- Worked with healthcare providers, payers, and government health agencies (Assistant Secretary for Technology Policy / HHS context).
- Event-driven cloud-native platform processing millions of healthcare API calls daily with 99.9% uptime; HIPAA and 21st Century Cures Act.
- Technical demos to C-level, IT leadership, and clinical teams.
- Mentored junior engineers on architecture, microservices, Agile.
- Environment: Go, Python, PostgreSQL, RabbitMQ, Docker, Kubernetes, microservices, healthcare IT, FHIR.

**Pre-Sales Engineer**, R3 — Manhattan, NY  
June 2023 – Apr 2024

- Closed a $4 million enterprise deal via technical pre-sales.
- POCs for enterprise blockchain (R3 Corda); customer analysis reports; regulatory alignment.
- Build-versus-buy across AWS / GCP / Azure.
- Environment: Kotlin, Python, Go, R3 Corda, AWS, GCP, Kubernetes, Docker, Terraform, Jenkins, GitHub Actions.

**Solutions Architect**, Akamai Technologies Inc. — Bengaluru, India  
Nov 2021 – July 2022

- Pre-sales for CDN, security, web performance; influenced $20M+ in enterprise deals.
- Demos/POCs: CDN optimization, DDoS mitigation, WAF, performance.
- Environment: CDN, DDoS, WAF, web performance, security analysis, automation, global infrastructure.

**Application Security Engineer**, Cognizant Technology Solutions — Bengaluru, India  
Aug 2020 – Nov 2021

- Security assessments that reduced vulnerabilities by 30%.
- Customer-facing security presentations; compliance guidance.
- Environment: Linux, Python, DevOps, CI/CD, security auditing, vulnerability assessment, penetration testing, incident response.

## Paid side projects

**AI Security Researcher**, Ackuity.ai — Fairfax, VA  
Sep 2024 – Jan 2025

- Access-control frameworks for Amazon Bedrock; metadata filtering and RBAC for doctor-patient data; 90% reduction in unauthorized access risk; HIPAA.
- React dashboards + Python backend for Bedrock; claimed 200% developer productivity increase.
- Technical writing totaling ~3000 reads on Medium and LinkedIn.
- LLM vulnerability assessment / pentest for healthcare AI.

**Lead Software Developer**, Amore Nidra Inc. — Los Angeles, CA  
Sept 2024 – Dec 2024  
https://amorenidra.com

- E-commerce platform from scratch; 60% faster page loads; 70% faster ops workflows.
- Shopify apps, Node.js, GraphQL; 45% AOV increase; 200% online sales increase.
- 95%+ test coverage; GitHub Actions CI/CD.

## Education

- Rutgers University, MS Computer Science, Sept 2022 – May 2024, GPA 3.875/4.0
- PES University, B.Tech Computer Science, Aug 2016 – June 2020, GPA 3.5/4.0

## Additional internships (LinkedIn; omit unless the JD is internship/research/maritime/healthcare-content)

- Summer Intern, FrontM — Jun 2019 – Sep 2019, London. Ship-to-shore collaboration platform.
- Research Intern, Centre for Cloud Computing and Big Data, PES University — May 2018 – Jul 2019, Bengaluru.
- Digital Media Intern, DoveMed Ltd. — Jun 2016 – Sep 2016. Health content.

## Projects (resume + GitHub)

Personal GitHub: https://github.com/daedalus-s (login `daedalus-s`, display name Sreeniketh Aathreya Pradeep Kumar, bio “Create > Consume”, public site sreenikethaathreya.com). Profile still lists company as i-Link Solutions — treat HatchWorks as current employer. 31 public repos as of Aug 2026. Do not invent star counts as achievements (most repos have 0–1 stars). Cirq is a fork of Google’s quantum circuit framework, not original authorship.

### Resume-featured (keep on most tailored resumes; rewrite bullets to match the JD)

**AI-Native Medical Content Platform (medbloggen)** — https://medbloggen.xyz · https://github.com/daedalus-s/medical-blog-generation (Python) · Medium 2024-09-05  
Live product for drug-manufacturer marketing automation: user enters a drug name and positioning details; Brave Search API finds competitor pages; BeautifulSoup scrapes them; a comparative study is written; Anthropic generates the blog; Stability AI / Stable Diffusion generates a copyright-free image from a derived prompt; HTTP response returns post + image + image prompt. Stack from the article: React.js frontend; AWS Lambda (Python) + API Gateway; Anthropic; Stability AI; S3 + CloudFront; Route 53; Serverless Framework; GitHub Actions. Resume template also describes FastAPI + TypeScript — both framings are in the corpus; prefer the JD’s stack language without inventing extra services.

**RAG-Powered E-commerce / RAGOps (prorecsa)** — https://prorecsa.co · https://github.com/daedalus-s/ragops-doc (JavaScript) · Medium 2024-08-17  
RAGOps demo: conversational product search over a JSON catalog scraped from ~15,000 Amazon toy listings. Stack: React frontend on S3 + CloudFront; two AWS Lambda layers for embeddings, retrieve, and generate; API Gateway; Pinecone; Voyage AI embeddings; Anthropic Claude; DynamoDB for user responses; CloudWatch; GitHub Actions. Article frames four RAGOps pillars: development, deployment, monitoring, continuous improvement. IaC (Terraform/CloudFormation) was planned, not fully implemented — do not claim complete Terraform for this project.

**Enterprise Agentic AI Framework / Dota 2 MCP gameplay coach** — https://github.com/daedalus-s/dota2-mcp-server (JavaScript/TypeScript, MIT, 1 star) · Medium 2025-07-23 · YouTube https://www.youtube.com/watch?v=op2gTYyFb5U · LinkedIn “Vibecode” post  
MCP (Anthropic Model Context Protocol, JSON-RPC) server that turns Claude Desktop into a Dota 2 coach over the OpenDota API. Host/client/server: Claude Desktop host, tool-calling client, MCP server with HTTP POST + SSE, OpenDota as the live data source. Features from README/article: player search and behavioral pattern analysis; hero/item matchup matrices with statistical significance; draft recommendations with confidence scoring; patch/meta analysis by skill bracket; professional pick/ban; item-build extraction. Setup: Node 18+, `npm install && npm run build`, Claude Desktop `claude_desktop_config.json`. Resume may title this as an enterprise agentic/MCP framework (truthful protocol work) without requiring the JD to mention Dota. Do not invent “millions of users”; LinkedIn says it processes match records via OpenDota.

**Cloud-Native AI Security Platform (Bedrock ACL)** — https://github.com/daedalus-s/bedrock-acl-metadata (Python) · Medium 2024-12-09 · LinkedIn Pulse  
RBAC for Amazon Bedrock Knowledge Bases so one document store / one KB can serve multiple departments without building a KB per tenant. Three methods in the article: (1) S3 object metadata files associated with chunks, (2) custom Bedrock ingestion-pipeline Lambda that copies `x-amz-meta-role` from the source object onto each chunk before Pinecone ingest, (3) post-ingestion Pinecone metadata updates. Also the Ackuity.ai side-project: metadata filtering / doctor-patient RBAC, React dashboards + Python backend, HIPAA framing, ~3000 combined Medium+LinkedIn reads for the writing. Resume may call this an AI governance / ACL platform. Do not invent a 90% risk reduction unless using the existing Ackuity bullet.

### Hollywoo — multi-agent video analysis (strong match for multimodal / RAG / agents)

**fireworks-video-discussion** — https://github.com/daedalus-s/fireworks-video-discussion (Python, MIT, 1 star) · Medium 2025-09-06 · YouTube https://www.youtube.com/watch?v=KBs_3V0OAgU · LinkedIn Hollywoo post  
FastAPI + HTML/JS/CSS app: user uploads video (and optional subtitles); configurable frame count and interval; vision model analyzes frames; optional subtitle text model; 3–4 named agents (Alex, Maya, Jordan, Affan) hold a multi-round discussion from user-defined roles (cinematographer, critic, lighting, marketing, etc.); all insights upserted to Pinecone with timestamps for RAG/chat (“what happened at 15s?”, “what did Maya think?”). Models hosted on Fireworks.ai: GPT-OSS-120B, Llama 4 Maverick, Qwen3-235B (open-source, chosen for later fine-tuning and cost; article says development/testing was under $5 with promotional credits). OpenCV for frame extraction. Agent templates: film, educational, marketing. Demo in the YouTube video uses a Mavericks/Luka Dončić clip with 10 frames / 3 rounds. Surface this when the JD wants multimodal, video, RAG, Pinecone, FastAPI, multi-agent, or Fireworks.

### Other public personal repos (mention only when keywords match; do not invent READMEs)

- **Crude** — https://github.com/daedalus-s/Crude (Python). GitHub description: “Agent-orchestrated Database Ops”.
- **dungeons-adk** — https://github.com/daedalus-s/dungeons-adk (JavaScript). Multi-agent D&D session manager on Google ADK: recorder, transcription (GCP Speech-to-Text), event extraction, summarizer, persona/vision (GCP Vision), OCR/stat parser (Tesseract.js backup), Google Sheets sync with DM approval gate, GroupMe bot, guardrails/PII scrub. Frontend: React Native (Expo), SQLite, WebSocket. Backend: Node/Express, MongoDB, Redis. Use for ADK / multi-agent / mobile / speech / OCR JDs. Do not invent production user counts.
- **threat-gdg-adk** — https://github.com/daedalus-s/threat-gdg-adk (Python). Home threat detection on Google ADK (agent-starter-pack 0.15.7): 5-camera vision (Gemini 2.5), sensors (smartwatch vitals, accelerometer, audio, smoke), Pinecone temporal store, orchestrator with escalation. FastAPI. Weapon / fall / fire / intrusion classification.
- **threat-detection-gdg** — https://github.com/daedalus-s/threat-detection-gdg (Python). Related agentic home-security variant: camera agents, Kafka, Docker (Zookeeper/Kafka/Kafka UI), Google AI Studio, Pinecone, WebSocket frontend, Node 18+ frontend. Same domain as threat-gdg-adk; pick one on the resume.
- **szns-adk-a2a** — https://github.com/daedalus-s/szns-adk-a2a. “Hello World” for Google ADK + Agent2Agent (A2A): `haiku-app` (agent-starter-pack) plus `a2a_validator` and `a2a_utilities` services (uvicorn A2A endpoints). Python 3.10+, uv, Cloud Run. Use when JD mentions A2A / ADK / multi-service agents.
- **parallelvsserial** — https://github.com/daedalus-s/parallelvsserial (Python). Large-file max-number finder / I/O benchmark (Apple Silicon M4): single vs multi-thread, disk throughput and per-core CPU, generators for pattern vs random data. Use for systems / performance / parallelism JDs.
- **MovieRecommendationCDL** — https://github.com/daedalus-s/MovieRecommendationCDL (Jupyter, 1 star). Collaborative Deep Learning recommender: Stacked Denoising Autoencoders + matrix factorization on MovieLens (~1M ratings, 6k+ users, 3k+ movies). Reported recall 0.33 at top-300. Academic; use for recsys / deep learning JDs only.
- **raid-learning-project** — https://github.com/daedalus-s/raid-learning-project. Hands-on Linux RAID (mdadm) learning repo: RAID 0/1/5/6/10, failure/recovery, fio/hdparm, Bash/Python. Linux/WSL2. Not a production storage product.
- **resume-website** — https://github.com/daedalus-s/resume-website (HTML, “CloudResume Challenge”). Live site https://sreenikethaathreya.com. Medium 2024-07-31: S3 static site, CloudFront + ACM HTTPS, Route 53 custom domain, Lambda + API Gateway + DynamoDB visitor counter, CodePipeline (GitHub source, CodeBuild/pytest, S3 deploy + CloudFront invalidation), CloudWatch, X-Ray, WAF, IAM, SES, SNS. Author noted IaC was deferred. Use for AWS / DevOps / CloudFront JDs.
- **worm** — https://github.com/daedalus-s/worm (TypeScript). This app: paste a JD, Cursor cloud agent emits Overleaf-ready LaTeX resume + cover letter; application tracker + dashboard. Next.js. Mention only for agentic SDLC / developer-tools / Next.js JDs. Do not present it as a shipped SaaS with users.
- Repos with little or no public README as of Aug 2026 (name + language only; do not invent product stories): **bedrock-acl-metadata** (Python; described via Medium above), **medical-blog-generation** (Python; described via Medium), **ragops-doc** (JavaScript; described via Medium), **kb-project** (Python), **akk-portfolio-website** (HTML), **basketball-community** (Python), **CodeAdvisor**, **comp-assist**, **Fangeon**, **interview-eval**, **sharepoint-api-exp** (Python), **SkinLesion**, **MLOpsProject** (Jupyter), **QuantumPulse** (Jupyter), **Face-DigitClassify** (Python), **ElderlyAssistanceSCR** (Jupyter), **SelfieLessActs** (Python), **personality_assessment** (HTML).
- **Cirq** — fork of Google’s NISQ quantum circuit framework. Do not list as a personal product.

## Writing (Medium + LinkedIn)

Medium profile: https://medium.com/@sreenikethaathreya — six posts as of Aug 2026. Combined ~3000 reads is already claimed for the Bedrock Medium + LinkedIn pair; do not invent per-article view counts.

1. **Hollywoo — AI Video analysis** (2025-09-06) — https://medium.com/@sreenikethaathreya/hollywoo-ai-video-analysis-5eae37ca7e16 — pipeline, Fireworks models, Pinecone RAG, GitHub + YouTube demo.
2. **Get Good at using AI, Noob** (2025-07-23) — https://medium.com/@sreenikethaathreya/get-good-at-using-ai-noob-5d2576203112 — MCP explainer (NxM problem, host/client/server, vs APIs/function-calling/plugins) + Dota coach. Demo: https://www.youtube.com/watch?v=op2gTYyFb5U
3. **Building a permission-aware GenAI Application on Amazon Bedrock** (2024-12-09) — https://medium.com/@sreenikethaathreya/building-a-permission-aware-genai-application-on-amazon-bedrock-8fdc2410dd43 — three RBAC methods for Bedrock KBs (S3 metadata, pipeline Lambda, post-ingestion Pinecone). LinkedIn: https://www.linkedin.com/pulse/building-permission-aware-genai-application-amazon-bedrock-aathreya-g7nme/
4. **Medical Blog Writing Using GenAI** (2024-09-05) — https://medium.com/@sreenikethaathreya/medical-blog-writing-using-genai-0b7e78b6032f — medbloggen.xyz architecture.
5. **From RAGs to Riches?** (2024-08-17) — https://medium.com/@sreenikethaathreya/from-rags-to-riches-bba8a671d5e6 — RAGOps journey; prorecsa.co.
6. **Cloud Resume Challenge** (2024-07-31) — https://medium.com/@sreenikethaathreya/cloud-resume-challenge-c4f17c3d53ff — Forrest Brazeal challenge write-up for sreenikethaathreya.com.

## YouTube

Channel: https://www.youtube.com/@sreenikethaathreya7555 (author name Sreeniketh Aathreya). Channel listing pages are JS-rendered; only these videos were verified via oembed / article links. Do not invent additional titles or view counts.

- **Dota2 MCP Server and Coaching Application** — https://www.youtube.com/watch?v=op2gTYyFb5U
- **Hollywoo - Video Analysis and Chat** — https://www.youtube.com/watch?v=KBs_3V0OAgU — walkthrough of upload, agents (Alex/Maya/Jordan), Fireworks models, Pinecone chat, NBA demo clip.

## LinkedIn (public profile notes)

https://www.linkedin.com/in/sreeniketh-aathreya-16800b122/ — headline “Solutions Architect | AI Labs Lead @ Hatchworks AI”; Reston, VA; ~1,600 followers. About text is stale relative to HatchWorks (still mentions i-Link / just-graduated Rutgers); prefer resume-template dates and HatchWorks title.

Verified original posts to cite as talking points (not extra jobs):

- Joined HatchWorks as Solutions Architect & Pre-Sales Engineer serving the office of the CTO (Nov 2025).
- GCP Professional Machine Learning Engineer (Nov 2025) and Professional Data Engineer (Jan 2026) announcement posts.
- Hollywoo video-analysis launch (Sep 2025) with YouTube demo.
- Dota 2 MCP “Vibecode” launch (Jul 2025): TypeScript, Claude Desktop, OpenDota, GitHub, Medium, YouTube.
- Reposts of HatchWorks GenDD / Google ADK production lessons (parallel tool calls, schema enforcement). Use as familiarity with HatchWorks public messaging, not as personal metrics.

LinkedIn internships and certs: see Education / Additional internships and LINKS.md. Prefer resume-template employment dates over LinkedIn when they differ (i-Link Dec 2024–Nov 2025 on the resume vs Jun 2024–Nov 2025 on LinkedIn).

## Skills inventory (reorder to match the JD; do not add skills that are not listed here)

Languages/frameworks: Python, Python 3.12, Python 3.10, Go, JavaScript, TypeScript, TypeScript 7, Bash, React, React 18, React 19, React Native, Expo, Kotlin, SQL, C, C++, Java, YAML, Node.js, Node.js 18+, FastAPI, Express, Spring, PHP, WordPress, RShiny, HTML5, CSS3, XML, GraphQL, REST, Vite, Vite 8, Tailwind CSS, Tailwind CSS 4, Radix UI, shadcn, TanStack Query, TanStack Query v5, React Router, React Router v7, SQLAlchemy, SQLAlchemy 2, Pydantic, Pydantic v2, Alembic, Next.js, Serverless Framework, BeautifulSoup, OpenCV, Tesseract.js

Data/cloud: AWS (EC2, RDS, Lambda, CloudFormation, ELB, ElastiCache, CloudWatch, Aurora, Bedrock, Knowledge Bases, S3, CloudFront, API Gateway, Route 53, ACM, IAM, DynamoDB, CodePipeline, CodeBuild, X-Ray, WAF, SES, SNS, CLI), GCP (Cloud Run, App Engine, Secret Manager, Vertex AI, Gemini Enterprise, Gemini 2.0, Gemini 2.5, Model Garden, BigQuery, Cloud SQL, Cloud SQL Auth Proxy, GCS, Firebase Hosting, Artifact Registry, Cloud Logging, Speech-to-Text, Vision API, AI Studio, CLI), Azure (evaluation/recommendation experience, not deep hands-on as primary cloud), Docker, Kubernetes, Helm, Terraform, Ansible Tower, Jenkins, GitHub Actions, GitLab, Prometheus, Grafana, Databricks, PostgreSQL, PostgreSQL 15, MySQL, Oracle, MS Access, MongoDB, Redis, SQLite, data lakes, vector databases, Pinecone, RabbitMQ, Kafka, Google Cloud Storage, v4 signed URLs, WebSocket, SSE

AI: Google ADK, Agent2Agent (A2A), Anthropic, Claude Desktop, Llama3, Llama 4 Maverick, GPT-OSS-120B, Qwen3-235B, Gemini Enterprise, Gemini 2.0, Gemini 2.5, LangChain, TensorFlow, embeddings, Voyage AI, RAG, RAGOps, agentic orchestration, MCP, Model Context Protocol, NLP, computer vision, OpenCV, reinforcement learning, Fireworks.ai, Stability AI, Stable Diffusion, Brave Search API, OpenDota API, n8n, collaborative deep learning, stacked denoising autoencoders

Architecture/security/healthcare: microservices, API-first, event-driven, solution diagramming, build-vs-buy, TCP/IP, DNS, TLS/SSL, HTTP/HTTPS, CDN, edge computing, Bot Defender, WAF, DDoS, HIPAA, FHIR, healthcare interoperability, medical device security, RBAC, IAM, Firebase Auth, Firebase Admin SDK, JWT, MFA, server-side sessions, health benefits CRM, healthcare spend analytics, PE portfolio healthcare visibility, Bedrock metadata filtering, Egnyte

Process: SDLC, Agile, Scrum, pre-sales, POCs, CARs, C-level presentations, technical writing, conference/demo videos

## Talking points for cover letters

- Outcome-driven architect who can sell and deliver: $10M+ technical sales support historically; $4M R3 close; $20M+ Akamai influence; HatchWorks 20+ engagements.
- AI Labs Lead appointed for lean, creative AI solutions that scale.
- Healthcare + government (Lantern / ONC / FHIR / HIPAA) plus HatchWorks health benefits CRM for PE portfolios (spend and plan dashboards across benefit years) plus fintech/blockchain (R3) plus edge/security (Akamai) plus AI-native consulting.
- Writer and teacher: six Medium posts (Bedrock RBAC, RAGOps, medbloggen, Cloud Resume Challenge, MCP/Dota coach, Hollywoo video agents), LinkedIn Pulse on Bedrock, YouTube demos of MCP and Hollywoo, customer workshops.
- F1/OPT with H1B lottery picked — mention only if the posting asks about work authorization.
