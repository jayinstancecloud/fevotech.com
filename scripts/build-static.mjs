import { cpSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "dist");

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const files = [
  "index.html",
  "privacy.html",
  "terms.html",
  "styles.css",
  "dropdown.js",
  "favicon.svg",
];

const dirs = ["assets", "pages", "news"];

for (const file of files) {
  cpSync(join(root, file), join(out, file));
}

for (const dir of dirs) {
  cpSync(join(root, dir), join(out, dir), { recursive: true });
}

console.log("Static site copied to dist/");
