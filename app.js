const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "0.0.0.0";
const port = Number(process.env.PORT) || 3000;

const publicRoot = path.resolve(__dirname, "public");

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

function resolvePublicPath(urlPath) {
  let pathname = decodeURIComponent(urlPath.split("?")[0]);
  if (pathname === "/") pathname = "/index.html";

  const relative = pathname.replace(/^\/+/, "");
  const fullPath = path.resolve(publicRoot, relative);

  const relToPublic = path.relative(publicRoot, fullPath);
  if (relToPublic.startsWith("..") || path.isAbsolute(relToPublic)) {
    return null;
  }

  return fullPath;
}

const server = http.createServer((req, res) => {
  const fullPath = resolvePublicPath(req.url);

  if (!fullPath) {
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Forbidden");
    return;
  }

  fs.stat(fullPath, (err, st) => {
    if (err || !st.isFile()) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Not found");
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const type = mime[ext] || "application/octet-stream";

    fs.readFile(fullPath, (readErr, data) => {
      if (readErr) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Server error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", type);
      res.end(data);
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
