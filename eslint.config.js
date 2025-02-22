import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["app/src/**/*.{js,mjs,cjs,ts}"],
    // ignores: ["**/*.config.js"],
    ignores: ["**/eslint.config.js"],
    rules: {
      quotes: ["error", "single"],
      semi: ["error", "always"],
      // "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
      "no-undef": "warn",
    },

  },
  {
    languageOptions: { globals: globals.node },
  },
];