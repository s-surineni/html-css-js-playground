import { resolveSoonWithPromise } from './needle-utils.js';

const API = 'https://jsonplaceholder.typicode.com';

function getJson(path) {
  return resolveSoonWithPromise(`${API}${path}`);
}

function fetchUser(id) {
  return getJson(`/users/${id}`);
}

function fetchPostsForUser(userId) {
  return getJson(`/posts?userId=${userId}`);
}

// Each then returns the next request. The chain waits for that promise,
// then passes the JSON body into the following then.
const userPostsPromise = fetchUser(1)
  .then((user) => {
    console.log('loaded user:', user.name);
    return fetchPostsForUser(user.id);
  })
  .then((posts) => {
    console.log('loaded posts:', posts.length);
    return {
      postCount: posts.length,
      firstTitle: posts[0].title,
    };
  });
