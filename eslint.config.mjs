import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  // .claude/** bevat Claude Code worktrees met hun eigen .next-builds; eslint liep daar
  // uit zijn geheugen op de gebundelde chunks.
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "**/.claude/**"]
}, {
  // Alle interne navigatie moet locale-bewust zijn: gebruik de wrappers uit
  // @/i18n/navigation, anders verliest een link op /nl zijn prefix.
  files: ["src/**/*.{ts,tsx}"],
  ignores: ["src/i18n/**", "src/app/(studio)/**", "src/app/api/**"],
  rules: {
    "no-restricted-imports": ["error", {
      paths: [
        { name: "next/link", message: "Gebruik `Link` uit @/i18n/navigation." },
        {
          name: "next/navigation",
          importNames: ["usePathname", "useRouter", "redirect", "permanentRedirect"],
          message: "Gebruik de locale-bewuste variant uit @/i18n/navigation.",
        },
      ],
    }],
  },
}];

export default eslintConfig;
