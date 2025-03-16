import { FlatCompat } from "@eslint/eslintrc";
import prettierConfig from "eslint-config-prettier";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import prettierPlugin from "eslint-plugin-prettier";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", ".git/**"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
      prettier: prettierPlugin,
    },
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          prefix: "@",
        },
      ],
      "prettier/prettier": "error",
    },
  },
  // ensure prettier rules don't conflict with eslint
  prettierConfig,
];

export default eslintConfig;
