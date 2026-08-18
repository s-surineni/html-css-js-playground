const API = process.env.MOCK_API_URL ?? 'http://localhost:4000';

async function getJson(path) {
  const response = await fetch(`${API}${path}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${path}`);
  }
  return response.json();
}

function getUser(id = 1) {
  return getJson(`/users/${id}`);
}

function getPosts(userId) {
  return getJson(`/posts?userId=${userId}`);
}

function getComments(postId) {
  return getJson(`/comments?postId=${postId}`);
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
  })
  .catch((error) => {
    console.error('Request failed — is the mock API running?', error.message);
  });
