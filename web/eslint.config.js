import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";
export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts", ".jsx", ".tsx"],
          moduleDirectory: ["node_modules", "src"], // Ajoutez le répertoire src pour les alias
          map: [
            ["@hooks", "./src/hooks"],
            ["@utils", "./src/utils"],
            ["@assets", "./src/assets"],
            ["@providers", "./src/providers"],
            ["@components", "./src/components"],
            ["@shared", "./src/components/shared"],
            ["@ui", "./src/components/ui"],
            ["@pages", "./src/pages"],
            ["@public", "./public/"],
            ["@", "./src"],
          ],
        },
      },
    },
  },
  ...tailwind.configs["flat/recommended"]
);
