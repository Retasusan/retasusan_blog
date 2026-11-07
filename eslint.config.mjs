import js from "@eslint/js";
import ts from "typescript-eslint";
import vue from "eslint-plugin-vue";

export default ts.config(
  { ignores: ["node_modules/**", ".next/**", ".nuxt/**", ".output/**", "src/content/generated.ts", "public/**", "coverage/**"] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: ts.parser, extraFileExtensions: [".vue"] } },
    rules: { "vue/multi-word-component-names": "off" },
  },
  { rules: { "no-undef": "off" } },
);
