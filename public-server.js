const http = require("http");

const HOST = process.env.PUBLIC_HOST || "127.0.0.1";
const PORT = Number(process.env.PUBLIC_PORT || 4181);
const UPSTREAM_HOST = "127.0.0.1";
const UPSTREAM_PORT = Number(process.env.UPSTREAM_PORT || 4180);

const PUBLIC_FILES = new Set([
  "/",
  "/index.html",
  "/styles.css",
  "/i18n.js",
  "/shared-config.js",
  "/game.js",
  "/schooltopia.js",
  "/run-recap.js",
  "/share-cover.png",
  "/share-cover.svg",
  "/admin.css",
  "/creator.html",
  "/creator.css",
  "/creator.js",
  "/creator-audio.js",
  "/event-generator.js",
  "/creator-3d-loader.js",
  "/creator-3d.bundle.js",
]);

function isPublicApi(method, pathname) {
  if (method === "GET") {
    return pathname === "/api/health" || pathname === "/api/schools" || pathname === "/api/config";
  }
  if (method === "POST" && pathname === "/api/schools") return true;
  if (method === "PUT" && /^\/api\/schools\/[a-zA-Z0-9_-]+$/.test(pathname)) return true;
  if (method === "POST" && /^\/api\/schools\/[a-zA-Z0-9_-]+\/reset$/.test(pathname)) return true;
  if (method === "POST" && /^\/api\/schools\/[a-zA-Z0-9_-]+\/events\/generate$/.test(pathname)) return true;
  if (["PUT", "DELETE"].includes(method) && /^\/api\/schools\/[a-zA-Z0-9_-]+\/events\/[a-zA-Z0-9_-]+$/.test(pathname)) return true;
  if (method === "POST" && pathname === "/api/sessions/start") return true;
  if (method === "POST" && pathname === "/api/research/delete-client") return true;
  return method === "POST" && /^\/api\/sessions\/[a-zA-Z0-9_-]+\/(choice|end|feedback)$/.test(pathname);
}

function reject(res, status, message) {
  const body = JSON.stringify({ ok: false, error: message });
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(body);
}

function proxy(req, res) {
  const headers = { ...req.headers };
  headers.host = `${UPSTREAM_HOST}:${UPSTREAM_PORT}`;
  headers["x-forwarded-host"] = String(req.headers.host || "public-share");
  delete headers["x-forwarded-for"];

  const upstream = http.request({
    hostname: UPSTREAM_HOST,
    port: UPSTREAM_PORT,
    method: req.method,
    path: req.url,
    headers,
  }, (upstreamResponse) => {
    const responseHeaders = {
      ...upstreamResponse.headers,
      "x-content-type-options": "nosniff",
      "referrer-policy": "same-origin",
      "x-frame-options": "SAMEORIGIN",
    };
    res.writeHead(upstreamResponse.statusCode || 502, responseHeaders);
    upstreamResponse.pipe(res);
  });

  upstream.on("error", () => reject(res, 502, "游戏服务暂时不可用"));
  req.pipe(upstream);
}

const server = http.createServer((req, res) => {
  let url;
  try {
    url = new URL(req.url, "http://public-share");
  } catch {
    return reject(res, 400, "请求无效");
  }

  if (req.method === "GET" && PUBLIC_FILES.has(url.pathname)) return proxy(req, res);
  if (isPublicApi(req.method, url.pathname)) return proxy(req, res);
  return reject(res, 404, "此内容不在公开游戏中");
});

server.listen(PORT, HOST, () => {
  console.log(`Schooltopia public share: http://${HOST}:${PORT}`);
});
