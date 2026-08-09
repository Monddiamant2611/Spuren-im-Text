import { spawn } from "node:child_process";
import { resolve } from "node:path";

const env = { ...process.env, NO_PROXY: [process.env.NO_PROXY, "127.0.0.1", "localhost"].filter(Boolean).join(",") };
const server = spawn(process.execPath, [resolve("node_modules/vinext/dist/cli.js"), "dev", "--configLoader", "runner", "--hostname", "127.0.0.1", "--port", "4173"], { env, stdio: "inherit" });

async function waitForServer() {
  for (let attempt = 0; attempt < 180; attempt += 1) {
    try {
      const response = await fetch("http://127.0.0.1:4173");
      if (response.ok) return;
    } catch { /* server is still compiling */ }
    await new Promise((resolveWait) => setTimeout(resolveWait, 500));
  }
  throw new Error("Der lokale Testserver wurde nicht rechtzeitig bereit.");
}

try {
  await waitForServer();
  const runner = spawn(process.execPath, [resolve("node_modules/@playwright/test/cli.js"), "test", ...process.argv.slice(2)], {
    env: { ...env, PW_SKIP_SERVER: "1" },
    stdio: "inherit",
  });
  const exitCode = await new Promise((resolveExit) => runner.on("exit", (code) => resolveExit(code ?? 1)));
  process.exitCode = exitCode;
} finally {
  server.kill("SIGTERM");
}
