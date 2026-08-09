import { defineConfig } from "@playwright/test";

const nodeExecutable = JSON.stringify(process.execPath);
process.env.NO_PROXY = [process.env.NO_PROXY, "127.0.0.1", "localhost"].filter(Boolean).join(",");

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 120_000,
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure", actionTimeout: 5_000 },
  webServer: process.env.PW_SKIP_SERVER ? undefined : {
    command: `${nodeExecutable} node_modules/vinext/dist/cli.js dev --configLoader runner --hostname 127.0.0.1 --port 4173`,
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
