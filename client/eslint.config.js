import js from "@eslint/js"
import pluginVue from "eslint-plugin-vue"
import configPrettier from "eslint-config-prettier"
import globals from "globals"

export default [
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  configPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-console": "warn",
      "vue/multi-word-component-names": "off",
    },
  },
]
