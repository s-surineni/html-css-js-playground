import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const PORT = Number(process.env.MOCK_API_PORT) || 4000;
const LATENCY_MS = Number(process.env.MOCK_API_LATENCY_MS) || 50;
const dbPath = new URL(
  '../src/promise-practice/examples/db.json',
  import.meta.url,
);

async function readDb() {
  return JSON.parse(await readFile(dbPath, 'utf8'));
}

function sendJson(res, status, body) {
  const payload = JSON.stringify(body, null, 2);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(payload);
}

function notFound(res) {
  sendJson(res, 404, { error: 'Not found' });
}

async function handle(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const db = await readDb();

  // GET /users/:id
  const userMatch = url.pathname.match(/^\/users\/(\d+)$/);
  if (userMatch) {
    const user = db.users.find((row) => row.id === Number(userMatch[1]));
    if (!user) return notFound(res);
    return sendJson(res, 200, user);
  }

  // GET /posts?userId=
  if (url.pathname === '/posts') {
    const userId = Number(url.searchParams.get('userId'));
    const posts = Number.isNaN(userId)
      ? db.posts
      : db.posts.filter((row) => row.userId === userId);
    return sendJson(res, 200, posts);
  }

  // GET /comments?postId=
  if (url.pathname === '/comments') {
    const postId = Number(url.searchParams.get('postId'));
    const comments = Number.isNaN(postId)
      ? db.comments
      : db.comments.filter((row) => row.postId === postId);
    return sendJson(res, 200, comments);
  }

  if (url.pathname === '/health') {
    return sendJson(res, 200, { ok: true });
  }

  notFound(res);
}

const server = createServer((req, res) => {
  setTimeout(() => {
    handle(req, res).catch((error) => {
      console.error(error);
      sendJson(res, 500, { error: error.message });
    });
  }, LATENCY_MS);
});

server.listen(PORT, () => {
  console.log(`Mock API listening on http://localhost:${PORT}`);
  console.log('Routes:');
  console.log('  GET /users/:id');
  console.log('  GET /posts?userId=');
  console.log('  GET /comments?postId=');
  console.log('  GET /health');
});
