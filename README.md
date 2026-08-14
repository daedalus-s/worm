# Worm

Paste a job description. A [Cursor cloud agent](https://cursor.com/docs/sdk/typescript) extracts keywords, maps them onto Sreeniketh Aathreya's real experience, and returns Overleaf-ready LaTeX for a resume and a cover letter.

## Setup

1. Node.js 22.13 or newer (this machine can use the current Node 24 install).
2. Create a Cursor user API key at [Cursor Dashboard → API Keys](https://cursor.com/dashboard/api).
3. Copy environment variables:

```bash
cp .env.example .env.local
```

Put the key in `.env.local`:

```
CURSOR_API_KEY=cursor_...
CURSOR_MODEL=composer-2.5
```

Leave `CURSOR_CLOUD_REPO_URL` blank to run a **no-repo cloud agent**. Profile files in `profile/` are injected into the prompt either way.

To also clone this repository into the cloud VM (so the agent can read `profile/` from disk), connect GitHub in Cursor and set:

```
CURSOR_CLOUD_REPO_URL=https://github.com/daedalus-s/worm.git
CURSOR_CLOUD_REPO_REF=main
```

No-repo cloud agents must be enabled on the Cursor account. Repository-scoped API keys cannot create them.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Paste a posting, optionally add company and role, and generate.

Each run shows up in the Cursor agents list. Use **Filter → Source → SDK**.

## Overleaf

1. Copy the Resume.tex (or Cover-letter.tex) panel.
2. Create a new project on [overleaf.com](https://www.overleaf.com).
3. Replace `main.tex` with the copied source.
4. Compile with **pdfLaTeX**.

The resume template uses `fontawesome5`, `paracol`, `titlesec`, and Charter. Those are available on Overleaf's TeX Live image.

## What the agent is allowed to do

Instructions live in `profile/AGENT_INSTRUCTIONS.md`. The agent may rephrase and reorder real experience so posting keywords appear. It must not invent employers, dates, metrics, or tools.

Canonical materials:

- `profile/resume-template.tex` — master Overleaf resume
- `profile/cover-letter-template.tex` — cover letter skeleton
- `profile/EXPERIENCE.md` — jobs, projects, GitHub, HatchWorks `health-crm`
- `profile/LINKS.md` — LinkedIn, Medium, GitHub, YouTube, cert URLs
