#!/usr/bin/env node
import { execSync } from "node:child_process";

function run(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

function runSafe(cmd) {
  try {
    return run(cmd);
  } catch {
    return "";
  }
}

function detectBaseRef() {
  const candidates = ["origin/main", "origin/master", "main", "master"];
  for (const ref of candidates) {
    const exists = runSafe(`git rev-parse --verify --quiet ${ref}`);
    if (exists) {
      const base = runSafe(`git merge-base HEAD ${ref}`);
      if (base) return { label: ref, sha: base };
    }
  }

  const root = runSafe("git rev-list --max-parents=0 HEAD | head -n 1");
  return { label: "root", sha: root };
}

function collectBinaryRows(rangeArg) {
  const diffOutput = runSafe(`git diff ${rangeArg} --numstat`);
  if (!diffOutput) return [];

  return diffOutput
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/\s+/);
      return { added: parts[0], removed: parts[1], file: parts.slice(2).join(" ") };
    })
    .filter((x) => x.added === "-" && x.removed === "-");
}

const mode = process.argv[2] ?? "staged";

if (mode === "staged") {
  const rows = collectBinaryRows("--cached");
  if (rows.length === 0) {
    console.log("No binary files in staged changes. ✅");
    process.exit(0);
  }

  console.error("Binary files detected in staged changes:\n");
  rows.forEach((r) => console.error(` - ${r.file}`));
  console.error("\nFix: unstage/remove binaries from this PR before creating it.");
  process.exit(1);
}

if (mode === "branch") {
  const base = detectBaseRef();
  if (!base.sha) {
    console.error("Could not determine a base commit to compare against.");
    process.exit(1);
  }

  const rows = collectBinaryRows(`${base.sha}..HEAD`);
  if (rows.length === 0) {
    console.log(`No binary files in branch diff against ${base.label}. ✅`);
    process.exit(0);
  }

  console.error(`Binary files detected in branch diff (base: ${base.label} @ ${base.sha.slice(0, 7)}):\n`);
  rows.forEach((r) => console.error(` - ${r.file}`));
  console.error(
    "\nThis is why PR tooling may show 'Binary files are not supported'.\n" +
      "Create a text-only PR (or split binaries to another branch/PR)."
  );
  process.exit(1);
}

console.error("Usage: node scripts/check-no-binaries.mjs [staged|branch]");
process.exit(1);
