import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  // .claude/** bevat Claude Code worktrees met hun eigen .next-builds; eslint liep daar
  // uit zijn geheugen op de gebundelde chunks.
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "**/.claude/**"]
}];

export default eslintConfig;
