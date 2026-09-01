import { resolveSoon } from './needle-utils.js';

const API = 'https://jsonplaceholder.typicode.com';

function getJson(path, callback) {
  resolveSoon(callback, `${API}${path}`);
}

function fetchUser(id, callback) {
  getJson(`/users/${id}`, callback);
}

function fetchPostsForUser(userId, callback) {
  getJson(`/posts?userId=${userId}`, callback);
}

fetchUser(1, (userError, user) => {
  if (userError) {
    console.error('unable to load user:', userError.message);
    return;
  }

  console.log('loaded user:', user.name);
  fetchPostsForUser(user.id, (postsError, posts) => {
    if (postsError) {
      console.error('unable to load posts:', postsError.message);
      return;
    }

    console.log('loaded posts:', posts.length, {
      postCount: posts.length,
      firstTitle: posts[0].title,
    });
  });
});
