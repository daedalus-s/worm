# Worm

Worm helps you apply to jobs faster. You paste a job description. Worm writes a tailored resume and cover letter that you can paste into [Overleaf](https://www.overleaf.com) to make PDFs.

It also keeps a list of the jobs you generated materials for, and a simple dashboard of which companies and roles you have applied to most.

You do not need to be a programmer to install it. Follow the steps in order. If a step asks you to type something, copy it exactly.

---

## What you need first

1. A computer with Windows, Mac, or Linux.
2. A [Cursor](https://cursor.com) account. Worm uses Cursor to write each resume.
3. About 15 minutes.

---

## Step 1. Install Node.js

Node.js is a free program that lets Worm run on your computer.

1. Open [https://nodejs.org](https://nodejs.org).
2. Download the **LTS** version. Worm needs version **22.13** or newer.
3. Run the installer. Keep the default options. Make sure the box that says something like **Add to PATH** is checked.
4. Restart your computer if the installer asks you to.

To check that it worked:

1. On Windows, click Start, type `PowerShell`, and open **Windows PowerShell**.
2. On a Mac, open **Terminal**.
3. Type this and press Enter:

```
node -v
```

You should see a version number such as `v22.17.0` or `v24.7.0`. If you see an error, Node.js is not installed yet. Install it again and open a new PowerShell or Terminal window.

---

## Step 2. Open the Worm folder

1. Download or copy the Worm project onto your computer if you do not already have it.
2. In File Explorer (Windows) or Finder (Mac), go into the `worm` folder. You should see files named `package.json` and `README.md`.
3. In that folder’s address bar on Windows, type `powershell` and press Enter. A black or blue window opens already pointed at Worm.
4. On a Mac, open Terminal, type `cd ` (with a space after cd), drag the `worm` folder onto the window, and press Enter.

---

## Step 3. Install Worm

In that same window, type this and press Enter:

```
npm install
```

Wait until it finishes. The first time can take a minute or two. You should get your prompt back with no red error at the end.

---

## Step 4. Get a Cursor API key

This key is like a password that lets Worm ask Cursor to write your resume. Keep it private. Do not email it or put it in a public place.

1. Sign in at [https://cursor.com/dashboard/api](https://cursor.com/dashboard/api).
2. Create a **user API key**.
3. Copy the key. It usually starts with `cursor_` or similar. You will only see the full key once, so paste it somewhere safe for a moment.

---

## Step 5. Put the key on your computer

Worm reads a private file named `.env.local`. That file stays on your machine.

**Easiest way (no typing commands):**

1. In the `worm` folder, find the file named `.env.example`.
2. Make a copy of it in the same folder.
3. Rename the copy to `.env.local`  
   (the name must start with a dot: `.env.local`).
4. Open `.env.local` in Notepad (Windows) or TextEdit (Mac).
5. Find the line that says `CURSOR_API_KEY=`.
6. Paste your key right after the equals sign, with no spaces. It should look like:

```
CURSOR_API_KEY=paste_your_key_here
CURSOR_MODEL=composer-2.5
```

7. Save the file and close it.

**Or, in PowerShell or Terminal**, from the `worm` folder:

```
copy .env.example .env.local
```

Then open `.env.local` and paste your key as above.

On a Mac or Linux computer, the copy command is:

```
cp .env.example .env.local
```

Leave `CURSOR_CLOUD_REPO_URL` blank. You do not need it for normal use.

---

## Step 6. Start Worm

In the same PowerShell or Terminal window, still inside the `worm` folder, type:

```
npm run dev
```

Leave this window open. When it is ready, you will see a line that mentions `localhost:3000`.

---

## Step 7. Open the app

1. Open Chrome, Edge, or Safari.
2. Go to [http://localhost:3000](http://localhost:3000).
3. You should see **Worm** with a box for a job description.

If the page will not load, look at the PowerShell or Terminal window. If it shows an error, the most common causes are:

- You are not in the `worm` folder.
- You skipped `npm install`.
- `.env.local` is missing or the API key line is empty.

To stop Worm later, click the PowerShell or Terminal window and press `Ctrl+C`. To start it again, open the folder and run `npm run dev` once more.

---

## How to use Worm

### Generate a resume and cover letter

1. Open [http://localhost:3000](http://localhost:3000).
2. Paste the full job description.
3. Type the **company** and **role** if you know them. This helps the tracker later.
4. Check **High priority** if this application matters more. That uses Grok 4.6 High when your Cursor account has it. Leave it unchecked for a normal Composer 2.5 run.
5. Check **Skip cover letter** if you only want a resume.
6. Click **Write Overleaf resume + cover letter** (or **Write Overleaf resume** if you skipped the letter).
7. Wait. This can take a few minutes. Keep the browser tab open. When it finishes, Worm plays a short chime and shows the text.
8. Click **Copy Overleaf code** or **Download .tex**.

### Turn that text into a PDF

1. Go to [https://www.overleaf.com](https://www.overleaf.com) and sign in (free account is fine).
2. Click **New Project** → **Blank Project**.
3. Open the file named `main.tex` on the left.
4. Select all of the old text, delete it, and paste what Worm gave you.
5. Set the compiler to **pdfLaTeX** if you are asked.
6. Click **Recompile**.
7. Download the PDF from Overleaf.

Do this once for the resume and once for the cover letter (or use two files in the same project).

### Tracker

Open [http://localhost:3000/tracker](http://localhost:3000/tracker).

Every successful generate is saved here: company, job description, the resume text, and the date it was created. Open a row to copy the resume again. Check **Response** when you hear back from that company.

### Dashboard

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

This shows how many applications you have, which companies you applied to most, and which roles you applied to most.

Your list is stored only on this computer, in a file named `data/applications.json`. It is not uploaded anywhere by Worm itself.

---

## If something goes wrong

| What you see | What to try |
| --- | --- |
| `node` is not recognized | Install Node.js again, then close and reopen PowerShell. |
| `npm install` fails | Make sure you are inside the `worm` folder. Check your internet connection and try once more. |
| The website says the API key is missing | Open `.env.local` and confirm `CURSOR_API_KEY=` has your key on the same line, then stop Worm with `Ctrl+C` and run `npm run dev` again. |
| Generate fails or never finishes | Confirm you are signed into Cursor and the key is a **user** API key from [the API dashboard](https://cursor.com/dashboard/api). Try a shorter job description. |
| No sound when it finishes | Turn the volume up and keep the Worm tab in front. Click Generate at least once in that tab so the browser allows sound. |
| Overleaf shows a compile error | Make sure you pasted the **entire** resume or cover letter, from `\documentclass` through `\end{document}`, and that the compiler is pdfLaTeX. |

---

## For later (optional)

You can watch each run in Cursor: open the agents list and set **Filter → Source → SDK**.

If you connect GitHub in Cursor and want the cloud agent to also read this project from the repo, add these lines to `.env.local`:

```
CURSOR_CLOUD_REPO_URL=https://github.com/daedalus-s/worm.git
CURSOR_CLOUD_REPO_REF=main
```

Most people can leave those blank.

The writing rules live in `profile/AGENT_INSTRUCTIONS.md`. Worm may rephrase your real experience so it matches the job posting. It should not invent employers, dates, or numbers.

- `profile/resume-template.tex` — master resume
- `profile/cover-letter-template.tex` — cover letter starting point
- `profile/EXPERIENCE.md` — jobs, projects, and GitHub work
- `profile/LINKS.md` — LinkedIn, Medium, GitHub, YouTube, and certificate links
