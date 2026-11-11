import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(import.meta.dirname);
const port = Number(process.env.PORT) || 8080;

const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
};

async function resolveFile(urlPath) {
    const filePath = normalize(join(root, decodeURIComponent(urlPath)));

    if (!filePath.startsWith(root)) {
        return null;
    }

    const info = await stat(filePath).catch(() => null);

    if (info?.isDirectory()) {
        return resolveFile(join(urlPath, 'index.html'));
    }

    return info?.isFile() ? filePath : null;
}

createServer(async (req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost');

    if (pathname !== '/' && !pathname.endsWith('/') && (await stat(join(root, pathname)).catch(() => null))?.isDirectory()) {
        res.writeHead(301, { Location: `${pathname}/` }).end();
        return;
    }

    const filePath = await resolveFile(pathname);

    if (!filePath) {
        res.writeHead(404, { 'Content-Type': 'text/plain' }).end('404 Not Found');
        return;
    }

    res.writeHead(200, {
        'Content-Type': contentTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
        'Cache-Control': 'no-store',
    });
    res.end(await readFile(filePath));

    console.log(`${req.method} ${pathname}`);
}).listen(port, () => {
    console.log(`Serving ${root} at http://localhost:${port}`);
});
