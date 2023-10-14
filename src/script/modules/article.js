const postPage = document.querySelector('.article__wrapper-text');

// export const loadArticles = async (url = 'https://gorest.co.in/public-api/posts') => {
//   const result = await fetch(url);
//   const data = await result.json();
//   return data;
// };

const pageParams = new URLSearchParams(window.location.search);
const postId = pageParams.get('id');

const createPostPage = async () => {
  let postContent = '';


  /* Запрос конкретного поста по id */
  const response = await fetch(`https://gorest.co.in/public-api/posts/${postId}`);
  const result = await response.json();
  // console.log('result ', result);
  const post = result.data;

  /* Запрос автора конкретного поста по userid */
  const responseIdUser = await fetch(`https://gorest.co.in/public-api/users/${result.data.user_id}`);
  const userId = await responseIdUser.json();
  // console.log('userId :', userId);
  // console.log('userId.Data :', userId.data.message === 'Resource not found');

  /* Рендер конкретного поста */
  postContent = `
        <h2 class="article__title">${post.title}</h2>
        <p class="article__text article__text_mb150">${post.body}</p>
        <div class="article__naw-wrap">
          <a class="article__back-link" href="/blog.html">К списку статей</a>
          <p class="article__autor">
            ${userId.user_id ? userId.user_id : 'Автор не загрузился'} 
          </p>
    `;

  if (postPage) postPage.innerHTML = postContent;
};

/* вызываем функцию создания поста только если определили URL Params */
if (pageParams.size !== 0) createPostPage();

