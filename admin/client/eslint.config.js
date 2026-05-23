import js from "@eslint/js"
import globals from "globals"
import pluginVue from "eslint-plugin-vue"
import json from "@eslint/json"
import markdown from "@eslint/markdown"
import css from "@eslint/css"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    ignores: [
      "node_modules",
      "dist",
      "coverage",
      "**/*.min.js",
      "**/vendor/**",
    ],
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    extends: [js.configs.recommended, ...pluginVue.configs["flat/recommended"]],
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": ["off"],
    },
  },

  {
    files: ["**/*.json"],
    language: "json/json",
    extends: [json.configs.recommended],
  },

  {
    files: ["**/*.md"],
    language: "markdown/commonmark",
    extends: [markdown.configs.recommended],
  },

  {
    files: ["**/*.css"],
    language: "css/css",
    extends: [css.configs.recommended],
    rules: {
      "css/no-important": "warn",
    },
  },
])
