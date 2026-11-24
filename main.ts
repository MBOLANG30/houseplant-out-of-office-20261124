import { mkdirSync, writeFileSync } from "node:fs";

// The houseplant's out-of-office reply: one line, 98 characters.
// The joke is carried by the plant's own life: last watered in March,
// and roots already looking for a better windowsill.
const LINE =
  "Out of office: my last drink was in March and my roots are already interviewing other windowsills.";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 120) {
  fail(`entry must be 1-120 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r") || LINE.includes("\t")) {
  fail("entry must be a single line with no tabs");
}
if (LINE !== LINE.trim() || LINE.includes("  ")) {
  fail("entry must not have leading, trailing or double spaces");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(`wrote ${LINE.length} characters to ${outDir}/entry.txt`);
