import { cp, rm } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createServer, request } from "node:http";
import { tmpdir } from "node:os";
import { extname, isAbsolute, join, relative, resolve } from "node:path";
import { mkdtemp } from "node:fs/promises";
import { startProdServer } from "../node_modules/vinext/dist/server/prod-server.js";

const source = resolve("dist");
const runtime = await mkdtemp(join(tmpdir(), "lernwerkstatt-games-"));

// OneDrive marks generated files as reparse points. Vinext's production asset
// scanner deliberately ignores those entries, so stage the immutable build in
// a normal temporary directory for local production verification.
await cp(source, runtime, { recursive: true });

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOSTNAME ?? "0.0.0.0";
const internal = await startProdServer({ port: 0, host: "127.0.0.1", outDir: runtime, purpose: "internal" });
const clientRoot = resolve(runtime, "client");
const contentTypes = { ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".mp3": "audio/mpeg" };

// Vinext 0.0.50 stores Windows cache keys with backslashes and consequently
// returns 404 for its own /assets URLs. Serve immutable client assets here and
// proxy all RSC/SSR traffic to the unmodified production handler.
const server = createServer(async (incoming, outgoing) => {
  const pathname = new URL(incoming.url ?? "/", "http://local").pathname;
  if (pathname.startsWith("/assets/")) {
    const file = resolve(clientRoot, `.${decodeURIComponent(pathname)}`);
    const childPath = relative(clientRoot, file);
    if (childPath.startsWith("..") || isAbsolute(childPath)) {
      outgoing.writeHead(403).end();
      return;
    }
    try {
      outgoing.writeHead(200, {
        "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      createReadStream(file).pipe(outgoing);
    } catch {
      outgoing.writeHead(404).end();
    }
    return;
  }
  const proxy = request({
    hostname: "127.0.0.1",
    port: internal.port,
    path: incoming.url,
    method: incoming.method,
    headers: incoming.headers,
  }, (response) => {
    outgoing.writeHead(response.statusCode ?? 500, response.headers);
    response.pipe(outgoing);
  });
  proxy.on("error", () => outgoing.writeHead(502).end("Die Anwendung konnte nicht geladen werden."));
  incoming.pipe(proxy);
});
await new Promise((ready) => server.listen(port, host, ready));

let closing = false;
async function close() {
  if (closing) return;
  closing = true;
  server.close(async () => {
    internal.server.close();
    await rm(runtime, { recursive: true, force: true });
    process.exit(0);
  });
}

process.on("SIGINT", close);
process.on("SIGTERM", close);
