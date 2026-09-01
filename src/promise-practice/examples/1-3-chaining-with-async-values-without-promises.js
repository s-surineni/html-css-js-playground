import { resolveSoon } from './needle-utils.js';

const API = 'https://jsonplaceholder.typicode.com';

function fetchUser(id, callback) {
  resolveSoon(callback, `${API}/users/${id}`);
}

function fetchPostsForUser(userId, callback) {
  resolveSoon(callback, `${API}/posts?userId=${userId}`);
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
