import { defineConfig } from "vite";
import { readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

function collectHtmlInputs(dir, prefix = "") {
  const inputs = {};

  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const key = prefix ? `${prefix}/${name}` : name;

    if (statSync(path).isDirectory()) {
      Object.assign(inputs, collectHtmlInputs(path, key));
      continue;
    }

    if (name.endsWith(".html")) {
      const inputKey = key.replace(/\.html$/, "");
      inputs[inputKey] = resolve(path);
    }
  }

  return inputs;
}

export default defineConfig({
  appType: "mpa",
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
        privacy: resolve(root, "privacy.html"),
        terms: resolve(root, "terms.html"),
        ...collectHtmlInputs(resolve(root, "pages"), "pages"),
        ...collectHtmlInputs(resolve(root, "news"), "news"),
      },
    },
  },
});
