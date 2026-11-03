import js from "@eslint/js";

export default {
  configs: {
    base: [
      js.configs.recommended,
      {
        ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/.next/**", "**/routeTree.gen.ts"],
        rules: {
          "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        },
      },
    ],
  },
};
