import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["coverage", "dist", "public/mockServiceWorker.js"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    rules: {
      "react-hooks/set-state-in-effect": "off"
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } }
    }
  },
  {
    files: ["*.config.cjs", "babel.config.cjs", "jest.config.cjs", "cypress.config.cjs"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs"
    }
  },
  {
    files: ["src/tests/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node
      }
    }
  },
  {
    files: ["cypress/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly"
      }
    }
  }
]);
