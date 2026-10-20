// Minimal zero-dependency static file server for Railway / local.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "public");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let filePath = path.normalize(path.join(ROOT, urlPath));

    // Prevent path traversal outside ROOT.
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }

    // Directory -> index.html
    if (urlPath === "/" || urlPath.endsWith("/")) {
      filePath = path.join(filePath, "index.html");
    }

    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        // SPA-style fallback to index.html for unknown routes.
        const fallback = path.join(ROOT, "index.html");
        return fs.readFile(fallback, (e, data) => {
          if (e) {
            res.writeHead(404);
            return res.end("Not found");
          }
          res.writeHead(200, { "Content-Type": TYPES[".html"] });
          res.end(data);
        });
      }

      const ext = path.extname(filePath).toLowerCase();
      const type = TYPES[ext] || "application/octet-stream";
      const headers = { "Content-Type": type };
      // Revalidate HTML/CSS/JS every load so updates show immediately;
      // long cache only for heavy static assets (images, fonts).
      if (ext === ".html" || ext === ".css" || ext === ".js") {
        headers["Cache-Control"] = "no-cache";
      } else {
        headers["Cache-Control"] = "public, max-age=86400";
      }
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
    });
  } catch (e) {
    res.writeHead(500);
    res.end("Server error");
  }
});

server.listen(PORT, () => {
  console.log(`Samurai site running on port ${PORT}`);
});
