import { readFile } from 'node:fs/promises';

const dbPath = new URL('./db.json', import.meta.url);

// Tiny JSON-file "database" mock — same shape as tools like json-server.
async function readDb() {
  const raw = await readFile(dbPath, 'utf8');
  return JSON.parse(raw);
}

function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

async function getUser(id = 1) {
  const db = await readDb();
  const user = db.users.find((row) => row.id === id);
  return delay(50, user);
}

async function getPosts(userId) {
  const db = await readDb();
  const posts = db.posts.filter((row) => row.userId === userId);
  return delay(50, posts);
}

async function getComments(postId) {
  const db = await readDb();
  const comments = db.comments.filter((row) => row.postId === postId);
  return delay(50, comments);
}

// WITHOUT automatic promise wrapping (Hypothetical Nightmare)
getUser()
  .then((user) => {
    // To do another async step, you'd have to nest:
    getPosts(user.id).then((posts) => {
      getComments(posts[0].id).then((comments) => {
        console.log(comments);
      });
    });
  });
