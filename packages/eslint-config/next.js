import nextPlugin from "eslint-config-next/flat";
import { configs } from "./index.js";

export default [
  ...configs.base,
  ...nextPlugin,
];
