# Leonida Legend — GTA VI Trophy Guide & Tracker

An offline web app that guides and tracks all **55 PlayStation 5 trophies of
Grand Theft Auto VI**: the full reported trophy list with saved progress,
filters and a spoiler setting, a roadmap to the Platinum, the missable trophy
flagged, and a guide to every trophy written in our own words with its sources
cited.

Built for the make.fun bounty **"Build the best GTA 6 trophy guide"**
(`gta6-trophy-guide-01`).

## Honest status of the trophy list

GTA VI had not launched when this guide was built. The 55-trophy list used
here is the list published on **18 November 2026** from Exophase data and
reported — with matching names, descriptions and grades — by PowerPyx,
GamesRadar+, Push Square and GameMapa (1 Platinum, 2 Gold, 6 Silver,
46 Bronze). Rockstar Games has **not** published an official list, so the app
labels the list as *reported*, and the five hidden trophies whose conditions
nobody has solved yet ("In The Beginning…", "Capital Offense",
"Bad Luck, I Guess", "The Truth Is Out There", "Ten Pin") are honestly marked
**unconfirmed** instead of being given invented instructions.

## Features

- **All 55 trophies** — exact reported name, description and grade, grouped by
  category (Platinum, Completion & Collections, Activities, Side Stories,
  Crime & Police, Money & Property, Open World, Story).
- **Checklist with saved progress** — tick trophies off; progress persists in
  the browser (localStorage), with **Export** / **Import** of progress as a
  JSON file and a Reset button.
- **Search & filters** — full-text search, filter by grade, category,
  earned / not earned, and missable-only.
- **Spoiler setting** — story trophies stay blurred until you earn them
  (toggleable).
- **Roadmap to the Platinum** — the reported 3-step, ~200-hour plan, plus the
  missable warning for *Positive Mental Attitude* (the Chapter 1 meditation
  moment at Jason's house).
- **A guide per trophy** — what to do, where and how, and when it can be
  missed, in our own words, with per-trophy source citations.
- **Fully offline** — one self-contained HTML file; no CDN, no external
  assets, no Rockstar logo or official artwork. The look is original
  (a Leonida sunset theme).

## Layout

| Path | What |
|---|---|
| `index.html` | The guide, standalone at repo root (data inlined — just open it). |
| `app/index.html` | The same guide, in the bounty layout. |
| `app/data/trophies.json` | All 55 trophies with their guides, as data. |
| `main.ts` | Node 22 build: validates the data (55 trophies, grade split, offline check) and writes `out/`. |
| `screenshots/` | Real renders of the guide (added at submission). |
| `transcripts/` | Build-session notes. |
| `LICENSE` | MIT. |

## Run it

Just open `index.html` (or `app/index.html`) in a desktop browser — no server,
no network needed.

Build/validate with Node.js 22.18+:

```
node main.ts
```

This checks the trophy data and writes a deployable copy to `out/`.

## Sources

- Push Square — *GTA 6 Trophy Guide & Roadmap* — https://www.pushsquare.com/guides/gta-6-trophy-guide-and-roadmap
- GameMapa — *All 55 GTA 6 Trophies* (cross-check of PowerPyx & GamesRadar+) — https://gamemapa.com/en/gta-6/guides/gta-6-trophy-achievement-list/
- GTA Vice City Hub — *GTA 6 Achievements* — https://www.gtavicecityhub.com/achievements
- GTA Scoop — *GTA 6 Trophies & Achievements: Full List of 55* — https://gtascoop.com/guides/gta-6-trophies-achievements/
- EGamers.io — *GTA 6 Trophy List: All 55 Trophies* — https://egamers.io/gta-6-trophy-list-all-55-trophies-and-achievements-plus-the-hardest-ones/

Guide text is original writing informed by these sources; nothing is copied.

## Submission notes (for the entering agent)

- `vendor/makefun-frontend.ts` must be copied from the official bounty kit
  unchanged before submitting — it is not part of this build.
- Add 3–4 real screenshots of the guide under `screenshots/`.
- Fan-made project; not affiliated with Rockstar Games or Take-Two
  Interactive.
