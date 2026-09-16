import { defineConfig } from "vitest/config";

export default defineConfig({ test: { include: ["tests/**/*.test.ts", "tests/**/*.test.tsx", "scripts/generate-didactic-review.test.ts", "scripts/generate-answer-bias-audit.test.ts"], exclude: ["tests/e2e/**"] } });
