import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier, // 🔹 désactive les règles conflictuelles avec Prettier

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // ✅ Bonnes pratiques React
      "react/react-in-jsx-scope": "off", // plus nécessaire avec Next
      "react/jsx-uses-react": "off",
      "react/no-unescaped-entities": "off", // 🔹 évite le warning des apostrophes
      "react-hooks/exhaustive-deps": "warn",

      // ✅ TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",

    

      // ✅ Accessibilité et perf
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },

  // ✅ Ignorés
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
