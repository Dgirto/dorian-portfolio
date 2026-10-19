# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Vite, deployed on Vercel (set by the user's brief). Plain CSS with custom-property tokens, `lucide-react` for icons, no backend.

## Users

Two audiences, equally weighted (confirmed by the user, 2026-10-18):

- **Recruiters and hiring teams** evaluating Dorian for developer roles (software, AI integration, automation). They skim in under a minute, want to see who he is, what he has actually built, and where his code lives.
- **Freelance clients** who need systems connected: APIs, LLM integrations, automations, monitoring. They want evidence he has shipped similar integrations and an easy way to reach him.

## Product Purpose

A personal portfolio for Dorian Girón Prato that proves, from public evidence, that he builds software that connects systems. Success: a visitor can name what he does after one screen, open a real repository or demo within two clicks, and contact him by email, LinkedIn or GitHub.

## Positioning

Breadth of real, public integration work: dozens of public connector repositories on GitHub (`Dgirto`), each wiring a different external system, plus web apps with live demos. The volume and consistency of that output is the claim no generic portfolio can copy.

## Capabilities and Constraints

- Static single-page site; GitHub public REST API may be called from the browser without a token (rate-limited, must degrade gracefully). No tokens in the frontend.
- No contact form (no backend); contact is via `mailto:` and profile links.
- All personal content lives in `src/data/*` so it can be edited without touching components.
- Undecided/unverified: certifications list, exact job titles and dates from LinkedIn (LinkedIn blocks automated access), profile photo.

## Brand Commitments

- Name: **Dorian Girón Prato**. GitHub: `Dgirto`. LinkedIn: https://www.linkedin.com/in/dorian-giron-prato-30b25a32b/
- Public email approved by the user: gironpratodorian@gmail.com.
- Language of the site: Spanish.

## Evidence on Hand

- Public GitHub repositories under `Dgirto` (only public ones may be shown or named; private repositories must never be mentioned — user instruction).
- Confirmed skills (user statement): React, C/C++, web development, IoT simulation and circuits in Tinkercad, Docker, Git/GitHub, process automation, LLM integrations via API keys, API integrations.
- Not available: testimonials, client logos, metrics, press. None may be fabricated. Certifications and work history must come from the user or LinkedIn and are marked as pending until confirmed.

## Product Principles

1. Every claim points to something a visitor can open.
2. Show volume and range of real work instead of describing it.
3. Never invent dates, employers, certifications, metrics or skill levels.
4. Content is data: editable in one place.

## Accessibility & Inclusion

WCAG 2.2 AA: keyboard navigation, visible focus, sufficient contrast, `prefers-reduced-motion` respected, semantic landmarks and headings.
