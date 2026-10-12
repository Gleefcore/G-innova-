const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const DEFAULT_PORT = 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.vcf': 'text/vcard; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const REDIRECTS = {
  '/carte': '/carte.html',
  '/portfolio': '/projets.html',
  '/realisation': '/projets.html'
};

function serveFile(res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 - Erreur interne du serveur');
      return;
    }
    res.writeHead(statusCode, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Vérifier les redirections
  if (REDIRECTS[pathname]) {
    res.writeHead(301, { Location: REDIRECTS[pathname] });
    res.end();
    return;
  }

  // Traiter le chemin
  let normalizedPath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let fullPath = path.join(ROOT_DIR, normalizedPath);

  // Vérification de sécurité (ne pas sortir du répertoire racine)
  if (!fullPath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 - Accès interdit');
    return;
  }

  fs.stat(fullPath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      fullPath = path.join(fullPath, 'index.html');
      fs.stat(fullPath, (errIndex, statsIndex) => {
        if (!errIndex && statsIndex.isFile()) {
          serveFile(res, fullPath);
        } else {
          serve404(res);
        }
      });
      return;
    }

    if (!err && stats.isFile()) {
      serveFile(res, fullPath);
      return;
    }

    // Essayer avec l'extension .html
    if (path.extname(fullPath) === '') {
      const htmlPath = fullPath + '.html';
      if (fs.existsSync(htmlPath)) {
        serveFile(res, htmlPath);
        return;
      }
    }

    serve404(res);
  });
});

function serve404(res) {
  const errorPage = path.join(ROOT_DIR, '404.html');
  if (fs.existsSync(errorPage)) {
    serveFile(res, errorPage, 404);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 - Page non trouvée');
  }
}

function startServer(port) {
  server.listen(port, () => {
    console.log(`====================================================`);
    console.log(`🚀 Site G-INNOVA actif sur localhost !`);
    console.log(`👉 Accès : http://localhost:${port}/`);
    console.log(`====================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Le port ${port} est déjà utilisé, test du port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Erreur du serveur :', err);
    }
  });
}

const PORT = parseInt(process.env.PORT, 10) || DEFAULT_PORT;
startServer(PORT);
