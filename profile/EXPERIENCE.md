# Experience corpus for tailored resumes

Canonical employment dates, titles, and bullets come from `resume-template.tex` and the source resume. Prefer those over LinkedIn when they conflict.

Do not invent employers, titles, dates, customers, revenue, uptime, or percentages. You may rephrase existing bullets so job-description keywords appear naturally.

Do not claim a faculty or Assistant Professor title. The SJBR paper footnote labels both authors that way; Manognya was an MSc student at Stella Maris College at the time.

There is no US work-authorization line. She is India-based. Mention work authorization only if the posting asks, and then only as India-based / Indian citizen — do not invent visa status.

GitHub `https://github.com/manudeep21` is listed on LinkedIn. Contents are unverified. Link only. Do not invent repo names, stars, or project descriptions.

## Identity

**Manognya Pradeep** (She/Her)  
Training Planning & Scheduling Executive | MSc Bioinformatics  
Gurugram / New Delhi, India  
+91-91139-46216 · manudeep1111@gmail.com  
https://www.linkedin.com/in/manognya-pradeep-960aa7210

Resume summary (source of truth for positioning): experienced TSP Executive with a strong background in aviation operations, customer support, and training scheduling at Airbus India Training Centre. Skilled in managing complex operational workflows, coordinating cross-functional stakeholders, and delivering customer service in a fast-paced global environment. Quick to learn and adapt to new technologies, with a strong aptitude for travel management systems, including GDS platforms such as Sabre and Travelport. Seeking to leverage operational expertise, problem-solving abilities, and a customer-centric approach.

## Track A — Aviation training operations / scheduling / customer support

**TSP Executive**, Airbus India Training Centre — Gurugram, Haryana  
July 2025 – Present (full-time)

Airbus India Training Centre (AITC) is the joint venture between Airbus and Air India. LinkedIn announcement (17 Aug 2025) frames the org as setting global benchmarks in aviation safety, quality, and flight training. Use that as company context only; do not invent org metrics.

Stakeholders: instructors, Central Operations, Finance, Quality, Airbus internal teams, airline customers. Primary point of contact for 50+ customer and stakeholder interactions weekly.

Canonical bullets (rephrase for the JD; do not invent extra numbers):

- Managed end-to-end scheduling and coordination for 15+ pilot training programs per month, ensuring 100% on-time training delivery for airline customers while maintaining high customer satisfaction.
- Worked extensively with aviation scheduling and operational systems to coordinate pilot training schedules, resource allocation, and customer requests, enabling quick adaptation to industry-standard GDS platforms such as Sabre and Travelport.
- Acted as the primary point of contact for 50+ customer and stakeholder interactions weekly, resolving scheduling conflicts and operational queries by collaborating with instructors, Central Operations, Finance, Quality, and Airbus internal teams, significantly reducing turnaround time for issue resolution.
- Processed and resolved time-sensitive schedule modifications and last-minute customer requests with minimal operational disruption, maintaining service continuity in a fast-paced aviation environment.
- Coordinated the allocation of simulators, instructors, classrooms, and training resources for multiple concurrent programs, maximizing resource utilization and preventing scheduling conflicts.
- Worked with cross-functional teams to troubleshoot complex operational issues, ensuring rapid resolution and seamless customer experience while consistently meeting operational SLAs.
- Prepared and maintained 100% accurate operational documentation, training reports, and scheduling records, enabling informed business decisions and ensuring audit readiness.
- Partnered with Finance to process subcontracted simulator invoices, ensuring timely invoice reconciliation and uninterrupted vendor support.
- Supported customer audits and internal quality reviews by maintaining compliance with aviation and organizational standards, contributing to successful audit outcomes.
- Managed multiple high-priority tasks simultaneously in a global, customer-facing environment, consistently meeting deadlines while delivering proactive communication and exceptional customer service.
- Built long-term relationships with airline customers and internal stakeholders through timely updates, proactive issue resolution, and transparent communication, contributing to improved customer experience and stakeholder satisfaction.

When a JD mentions scheduling, resource allocation, SLA, audit, invoice reconciliation, CRM, customer support, aviation, simulator, training operations, or stakeholder management, lead with this role and keep most of these bullets.

## Track B — Bioinformatics / research

**Bioinformatics Intern**, IIT Madras — Chennai  
May 2023 – July 2023

Resume dates (05/2023–07/2023) win over LinkedIn (May–Jun 2023). Department context from LinkedIn: Medical. Do not invent a lab name, PI, or grant.

Canonical bullets:

- Designed and executed a comprehensive research plan to perform Whole Genome Sequencing (WGS) of *Acinetobacter baylyi* using computational analysis to identify potential genetic pathways for renewable energy synthesis.
- Integrated whole genome sequencing protocols to analyze the genetic makeup of *Acinetobacter baylyi*, ensuring accurate and reproducible genomic analysis.
- Conducted sequencing quality assessments using FastQC and optimized raw sequencing reads with Trimmomatic, ensuring high-quality data for downstream analysis.
- Performed accurate genome alignment using BWA-MEM and organized BAM datasets using SortSAM to streamline genomic data processing.
- Enhanced variant calling accuracy by compiling and analyzing genetic mutations using the MAGE Genoscope Browser, supporting reliable interpretation of sequencing results.

### Publication — first author (Oct 2024)

**Comparative Analysis for Bioremediation of Plastic and Dye Degradation.** Manognya Pradeep, Pujaa B. *Saudi Journal of Biomedical Research* 9(8):168-174, 1 October 2024. DOI https://doi.org/10.36348/sjbr.2024.v09i08.001

Comparative whole-genome analysis of two environmental bacteria for bioremediation: *Anoxybacillus* sp. PDR2 (thermophile; industrial dye degradation) and *Pseudomonas* sp. B10 (PET / polyethylene terephthalate degradation). Goal: identify genome-level mutations vs. reference strains that may explain plastic and dye degradation.

Methods (truthful inventory — mention only what is in the paper):

- Data: raw reads from SRA (SRR8835125 / plastic-degrading isolates; SRR10820142 / azo-dye thermophilic bacillus) and NCBI Genome references (GCF_001187595.1 *Anoxybacillus gonensis*; GCF_000009225.2).
- Platform: Galaxy (UseGalaxy), open-source web analysis.
- QC / preprocess: FastQC (plastic set 2,147,878 sequences, 59% GC; dye set 10,689,622 sequences, 48% GC), Cutadapt, MarkDuplicates.
- Alignment: BWA-MEM to *Pseudomonas fluorescens* and *Anoxybacillus gonensis*; SortSam; BAM output.
- Variant calling: FreeBayes, bcftools-mpileup / call / annotate, VarScan, Sniffles (structural variants), iVar.
- Plastic structural variants (Sniffles, NC_012660.1): 11 variants — 6 deletions, 3 inversions, 2 duplications.
- Dye structural variants (NZ_CP012152.1): 7 variants — 4 inversions, 3 duplications.
- iVar annotation: dye variants in DNA replication initiation ATPase; plastic variants in chromosomal replication initiator protein DnaA.
- Conclusion in paper: adaptive laboratory evolution produces genetic modifications; both strains are candidates for lab-evolved bioremediation of dyes and plastics. Do not invent degradation percentages or wet-lab results beyond this computational analysis.
- Cited once (Folia Microbiologica 2025). Do not invent additional citation counts.

SJBR author line says "Assistant Professor, Stella Maris College" for both authors. That is the corresponding author's affiliation style. Manognya was an MSc student. Never claim faculty rank.

### Publication — co-author (Feb 2025)

**Phytochemical Analysis and Ocular Benefits of *Terminalia chebula* Extracts for Myopia Treatment: In vitro and In silico Approaches.** Shahin Farzan T K, Nishna Sarkar, Manognya Pradeep, Pujaa B. *International Journal of Biochemistry Research & Review* 34(1):103-115, 6 February 2025. DOI https://doi.org/10.9734/ijbcrr/2025/v34i1952 · HAL https://hal.science/hal-05048534

Department of Bioinformatics, Stella Maris College, Chennai. Collaborative among all authors.

Methods (truthful inventory):

- Soxhlet extraction of *T. chebula* (Haritaki) seed powder with methanol, hexane, and ethyl acetate (10 g powder, 200 ml each solvent; 1 mL extract per solvent).
- GC-MS: 103 distinct bioactive-compound profiles. Methanol rich in phenolics/flavonoids; hexane in fatty acids/lipids; ethyl acetate mixed flavonoids/terpenoids/phenolics.
- Antioxidant: DPPH at 517 nm (methanol 28.5%, ethyl acetate 25%, n-hexane 22.3% at 0.5 mg) and TCA at 700 nm (methanol 35.7%, ethyl acetate 26.5%, n-hexane 23.6%).
- Anti-inflammatory assay at 600 nm (methanol 40%, ethyl acetate 36.4%, n-hexane 30%).
- In silico ADME and toxicity in Discovery Studio (HIA, BBB, Lipinski, rat oral LD50, ocular irritation). Ligands selected: 19/36 ethyl acetate, 28/51 hexane, 18/19 methanol.
- Molecular docking: LibDock in Discovery Studio against myopia-related proteins 7LBG, 5DSG, 5AER, 1BY4. Notable scores from the paper: Naratriptan N-Oxide (ethyl acetate) with 5AER 125.834; Doxylamine (methanol) with 5DSG 92.64; 7-Chloro-6-[4-(diethylamino)phenyl]-5,8-quinolinedione (ethyl acetate) with 1BY4 127.959.
- Conclusion: methanol and ethyl acetate extracts show the strongest antioxidant/anti-inflammatory and docking signals; groundwork for future pre-clinical work. Do not claim a clinical myopia treatment or a marketed drug.

### Certification

**Computer Aided Drug Design**, NPTEL. Listed on LinkedIn. No public verify URL. Keep the line; do not invent a certificate ID or score.

When a JD mentions WGS, NGS, variant calling, Galaxy, FastQC, BWA, BAM, molecular docking, ADME, GC-MS, Discovery Studio, drug design, phytochemistry, bioremediation, or comparative genomics, lead with Track B and include both publications.

## Track C — Travel / GDS aptitude

The resume summary states a strong aptitude for travel management systems, including GDS platforms such as Sabre and Travelport, and that aviation scheduling work enabled quick adaptation to those platforms.

Encode as **familiarity / aptitude, not certified hands-on operation**. Do not claim Sabre or Travelport certification, PNR production volumes, or airline GDS desk experience. When a JD is travel-operations / GDS / airline customer support, you may:

- Lead with Airbus scheduling, last-minute changes, SLA, customer contact, and documentation.
- Mention aptitude for Sabre/Travelport as a learning transfer from aviation scheduling systems.
- Do not list Sabre or Travelport as a mastered skill on the same footing as documented Airbus work.

## Education

- Master of Science in Bioinformatics, Stella Maris College (Autonomous), Chennai, Tamil Nadu — July 2022 – May 2024
- Bachelor of Science in Bioinformatics, REVA University, Bengaluru, Karnataka — August 2019 – July 2022

No GPAs published. Do not invent them.

## Skills inventory (reorder to match the JD; do not add skills that are not listed here)

Operations and customer: Cross-functional Collaboration, Customer Relationship Management (CRM), Customer Support, Documentation & Process Compliance, Operations Coordination, Problem Solving & Troubleshooting, Scheduling & Planning, Stakeholder Management, Time Management & Multitasking, Written & Verbal Communication, SLA adherence, audit readiness, invoice reconciliation, resource allocation (simulators, instructors, classrooms), last-minute schedule change handling, vendor/Finance coordination

Bioinformatics and research: Whole Genome Sequencing (WGS), FastQC, Trimmomatic, BWA-MEM, SortSAM / SortSam, BAM, MAGE Genoscope Browser, variant calling, Galaxy / UseGalaxy, Cutadapt, MarkDuplicates, FreeBayes, bcftools, VarScan, Sniffles, iVar, SRA, NCBI Genome, comparative genomics, bioremediation genomics, Soxhlet extraction, GC-MS, DPPH, TCA, anti-inflammatory assay, ADME, toxicity prediction, Lipinski's Rule of Five, Discovery Studio, LibDock, molecular docking, Computer Aided Drug Design (CADD), phytochemical analysis, *Terminalia chebula*, *Acinetobacter baylyi*, *Anoxybacillus*, *Pseudomonas*, PET / polyethylene terephthalate, azo dyes

Travel systems (aptitude only): Sabre, Travelport, GDS, travel management systems

Languages: English, German, Hindi, Kannada, Tamil

## Keyword-to-evidence map

Use this to pick bullets. A keyword may map to more than one bullet; pick the strongest 3–6.

| JD keyword | Surface |
| --- | --- |
| scheduling, planning, training calendar, roster | Airbus 15+ programs/month, 100% on-time; resource allocation of simulators/instructors/classrooms |
| resource allocation, capacity, utilization | Simulator / instructor / classroom coordination; conflict prevention |
| customer support, CRM, stakeholder, airline customer | 50+ weekly interactions; relationship-building bullet |
| last-minute / irregular operations / disruption | Time-sensitive schedule modifications with minimal operational disruption |
| SLA, turnaround, issue resolution | Cross-functional troubleshooting; SLA bullet; reduced turnaround with internal teams |
| audit, compliance, quality, documentation | 100% accurate operational documentation; customer audits and internal quality reviews |
| invoice, finance, vendor, reconciliation | Finance partnership on subcontracted simulator invoices |
| aviation, flight training, simulator, pilot training, Airbus | Entire Track A; AITC as Airbus–Air India JV |
| GDS, Sabre, Travelport, travel operations | Track C aptitude + Airbus scheduling systems bullet. Do not claim certification |
| WGS, NGS, sequencing, genomics | IIT Madras *A. baylyi* WGS bullets |
| FastQC, Trimmomatic, BWA, BAM, alignment | IIT Madras QC/alignment bullets; also SJBR Galaxy pipeline |
| variant calling, SNP, indel, VCF | IIT Madras MAGE / mutations; SJBR FreeBayes, bcftools, VarScan, Sniffles, iVar |
| Galaxy, bioinformatics pipeline | SJBR first-author paper methods |
| bioremediation, plastic, PET, dye, pollution | SJBR first-author paper |
| molecular docking, Discovery Studio, LibDock, ADME, CADD, drug design | IJBCRR *T. chebula* paper + NPTEL CADD |
| GC-MS, phytochemistry, antioxidant, DPPH, myopia, natural product | IJBCRR paper |
| German / multilingual | Languages line |

## Talking points for cover letters

**Aviation / operations / customer / travel JDs**

- TSP Executive at Airbus India Training Centre (Airbus–Air India JV) owning end-to-end scheduling for 15+ pilot training programs per month with 100% on-time delivery.
- Primary contact for 50+ weekly customer and stakeholder interactions across instructors, Central Operations, Finance, Quality, and airline customers.
- Resource allocation of simulators, instructors, and classrooms; last-minute change handling; SLA and audit-ready documentation; Finance invoice reconciliation for subcontracted simulators.
- Aptitude for GDS (Sabre, Travelport) as a transfer from aviation scheduling systems — phrase as learning agility, not certified desk experience.

**Bioinformatics / research / pharma / CADD JDs**

- MSc Bioinformatics (Stella Maris) and BSc Bioinformatics (REVA); IIT Madras internship on WGS of *Acinetobacter baylyi* (FastQC, Trimmomatic, BWA-MEM, SortSAM, MAGE).
- First-author computational genomics paper on bioremediation of PET plastic and industrial dyes (Galaxy, multi-caller variant analysis).
- Co-author in vitro + in silico *Terminalia chebula* / myopia study (Soxhlet, GC-MS, DPPH/TCA, ADME, LibDock in Discovery Studio).
- NPTEL Computer Aided Drug Design.

**Either track**

- Cross-functional, customer-facing operator who also publishes computational biology work. Lead with the track the JD wants; mention the other as breadth, not as a distraction.
- Languages: English, German, Hindi, Kannada, Tamil — useful for global airline or research teams.
- India-based (Gurugram / New Delhi). No OPT/H1B line.
