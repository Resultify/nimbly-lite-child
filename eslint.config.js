import globals from "globals";
import js from "@eslint/js";
import css from "@eslint/css";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([".tmp/", "temp/", "dist/", "theme/assets/"]),
  { name: "global files", files: ["**/*.{js,mjs}"] },
  {
    name: "global language options",
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    name: "global linter options",
    files: ["**/*.{js,mjs}"],
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
  },
  {
    name: "global js recommended rules",
    files: ["**/*.{js,mjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "off",
      "no-duplicate-imports": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      eqeqeq: "error",
      "prefer-object-spread": "error",
      "no-useless-rename": "error",
    },
  },
  {
    files: ["**/*.css"],
    ignores: ["theme/assets/**", "theme/css/**"],
    plugins: {
      css,
    },
    language: "css/css",
    rules: {
      "css/no-empty-blocks": "error",
      "css/no-duplicate-imports": "error",
      "css/no-invalid-at-rules": "error",
      "css/no-invalid-properties": "error",
      "css/require-baseline": ["error", { available: "newly" }]
    }
  },
]);
// Run to debug: bunx eslint --inspect-config
