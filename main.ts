// main.ts — build script for the GTA VI trophy guide (make.fun bounty gta6-trophy-guide-01)
// Runs on Node.js 22.18+ (runs .ts directly). Validates the trophy data and
// writes a deployable copy of the static guide to out/.
//
//   node main.ts
//
// The guide itself is app/ (index.html + data/trophies.json). It is fully
// static and offline; this script only checks it and copies it to out/.

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dataPath = join(root, "app", "data", "trophies.json");
const htmlPath = join(root, "app", "index.html");

type Trophy = {
  id: number; name: string; grade: string; category: string;
  description: string; guide: string; missable: boolean;
  hidden: boolean; story: boolean; effort: number; sources: string[];
};

function fail(msg: string): never {
  console.error("BUILD FAILED: " + msg);
  process.exit(1);
}

const data = JSON.parse(readFileSync(dataPath, "utf8")) as { trophies: Trophy[] };
const trophies = data.trophies;

// --- Validation -----------------------------------------------------------
if (trophies.length !== 55) fail(`expected 55 trophies, found ${trophies.length}`);
const ids = new Set(trophies.map((t) => t.id));
if (ids.size !== 55) fail("trophy ids are not unique");
const grades: Record<string, number> = {};
for (const t of trophies) {
  for (const f of ["name", "grade", "category", "description", "guide"] as const) {
    if (!t[f]) fail(`trophy ${t.id} is missing field ${f}`);
  }
  if (!Array.isArray(t.sources) || t.sources.length === 0) fail(`trophy ${t.id} cites no sources`);
  grades[t.grade] = (grades[t.grade] ?? 0) + 1;
}
const want: Record<string, number> = { Platinum: 1, Gold: 2, Silver: 6, Bronze: 46 };
for (const g of Object.keys(want)) {
  if (grades[g] !== want[g]) fail(`grade ${g}: expected ${want[g]}, found ${grades[g] ?? 0}`);
}

const html = readFileSync(htmlPath, "utf8");
if (/<script[^>]+src=|<link[^>]+href=/i.test(html)) fail("index.html loads external assets; the guide must be fully offline");
if (!html.includes("localStorage")) fail("index.html lost its saved-progress code");

// --- Emit out/ -------------------------------------------------------------
const outDir = join(root, "out");
mkdirSync(join(outDir, "data"), { recursive: true });
copyFileSync(htmlPath, join(outDir, "index.html"));
copyFileSync(dataPath, join(outDir, "data", "trophies.json"));
writeFileSync(join(outDir, "BUILD-INFO.txt"),
  `Built by main.ts on Node ${process.version}\nTrophies: 55 (Platinum 1, Gold 2, Silver 6, Bronze 46)\nOpen out/index.html in a desktop browser — works offline.\n`);

console.log("OK: 55 trophies validated (1 Platinum, 2 Gold, 6 Silver, 46 Bronze). Guide written to out/.");
if (!existsSync(join(root, "vendor", "makefun-frontend.ts"))) {
  console.log("Note: vendor/makefun-frontend.ts is added from the official bounty kit at submission time.");
}
