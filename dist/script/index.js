/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 83:
/***/ (function(__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(462);
/* harmony import */ var _modules_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(556);
/* harmony import */ var _modules_blog_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(847);
/* harmony import */ var _modules_article_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(604);





/***/ }),

/***/ 604:
/***/ (function() {

const postPage = document.querySelector('.article__wrapper-text');
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

/***/ }),

/***/ 847:
/***/ (function() {

const postsList = document.querySelector('.list');
const navList = document.querySelector('.nav__list');
const getPostData = async () => {
  const pageParams = new URLSearchParams(location.search);
  const postPage = pageParams.get('page');
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${postPage === null ? 1 : postPage}`);
  const result = await response.json();
  return {
    data: result.data,
    pagination: result.meta.pagination,
    ueserId: result.data.user_id
  };
};
const createPostList = async () => {
  const posts = await getPostData();
  let postItem = '';
  for (let i = 0; i < posts.data.length; i++) {
    postItem += `
      <li class="list__item item">
        <div class="item__image-wrapper">
          <img class="item__image" src="https://loremflickr.com/400/400?${i + 1}" alt="Картинка к посту">
        </div>
        <div class="item__desc-wrapper">
          <h2 class="item__title">
            <a ="item__link" href="article.html?id=${posts.data[i].id}">
              ${posts.data[i].title}
            </a>
          </h2>
          <p class="item__date"></p>
          <div class="item__icons-wrapper">
            <span class="item__icons-review"></span>
            <span class="item__icons-comment"></span>
          </div>
        </div>
      </li>
    `;
    postsList.innerHTML = postItem;
  }
};
const createPostNav = async () => {
  const pagination = await getPostData();
  let postNav = '';
  for (let i = 1; i < pagination.pagination.pages; i++) {
    postNav += `
    <li class="nav__item">
      <a href="blog.html?page=${i}" class="nav__link">
        ${i}
      </a>
    </li>
    `;
    navList.innerHTML = postNav;
    navList.style.overflow = 'auto';
  }
};
getPostData();
if (postsList) createPostList();
if (navList) createPostNav();

/***/ }),

/***/ 556:
/***/ (function() {

const button = document.querySelector('.header__menu');
const modal = document.querySelector('.modal');
button.addEventListener('click', () => {
  modal.classList.toggle('modal_none');
  if (modal.classList.contains('modal_none')) {
    button.setAttribute('aria-expanded', false);
  } else {
    button.setAttribute('aria-expanded', true);
  }
});

/***/ }),

/***/ 462:
/***/ (function() {

const timerBlock = document.querySelector('.timer');
const setTimer = deadline => {
  // получить элементы со страницы

  const timerBlockDay = document.querySelector('.timer-day');
  const timerBlockHour = document.querySelector('.timer-hour');
  const timerBlockMin = document.querySelector('.timer-min');
  const timerTextDay = document.querySelector('.timer-day-txt');
  const timerTextHour = document.querySelector('.timer-hour-txt');
  const timerTextMin = document.querySelector('.timer-min-txt');
  const timerText = document.querySelector('.hero__promo-time-end');

  // меняет время окончания акции по времени
  const changeTimezone = (timezone, timeRemaining = 0) => {
    const date = new Date();
    const currentTimezone = date.getTimezoneOffset();
    const changeTimezone = timeRemaining + currentTimezone * 60 * 1000 + timezone * 60 * 60 * 1000;
    return changeTimezone;
  };

  // получить оставшееся время до дедлайна
  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    let timeRemaining = dateStop - dateNow;

    // меняет время окончания акции по времени +3 от гринвича
    timeRemaining = changeTimezone(+3, timeRemaining);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    let hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    let minutes = Math.floor(timeRemaining / 1000 / 60 % 60);

    // склоняет дни, часы минуты
    const declensionNum = function (num, words) {
      const result = num === 1 || num > 20 && num % 10 === 1 ? words[0] : num > 1 && num < 5 || num % 10 > 1 && num % 10 < 5 ? words[1] : words[2];
      return result;
    };

    // делает двузначным часы и минуты
    const formatTime = (h, min) => {
      if (min < 10) {
        min = `0${min}`;
      }
      if (h < 10) {
        h = `0${h}`;
      }
    };
    timerTextDay.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
    timerTextHour.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
    timerTextMin.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);

    // меняем на двузначное число часы и минуты
    formatTime(hours, minutes);
    return {
      timeRemaining,
      days,
      minutes,
      hours
    };
  };

  /* Замена кода изменения цвета (оставил только красный) */
  const setStyleTimer = (days, hours) => {
    if (days === 0 && hours < 24) {
      timerBlock.style.backgroundColor = 'red';
      timerText.style.backgroundColor = 'red';
    }
  };
  const start = () => {
    const timer = getTimeRemaining();

    // вызов изменений стиля таймера
    setStyleTimer(timer.days, timer.hours);

    // вставить таймер в верстку
    timerBlockDay.textContent = timer.days;
    timerBlockHour.textContent = timer.hours;
    timerBlockMin.textContent = timer.minutes;

    // вставить склонение слов таймера в верстку
    timerTextDay.lastChild.textContent = ' ' + timerTextDay.dataset.title;
    timerTextHour.lastChild.textContent = ' ' + timerTextHour.dataset.title;
    timerTextMin.lastChild.textContent = ' ' + timerTextMin.dataset.title;

    // обновляет время
    const intervalId = setTimeout(start, 1000);

    // убирает таймер на 00:00:00
    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      timerBlock.innerHTML = '';
      timerText.innerHTML = '';
    }
  };

  // запуск кода таймера
  start();
};

// запуск плагина таймера
// Находит датасет атрибут и запускает таймер по нему
document.addEventListener('DOMContentLoaded', () => {
  const serchElem = document.querySelector('[data-deadline]');
  if (serchElem) setTimer(timerBlock.dataset.deadline);
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(462);
/******/ 	__webpack_require__(556);
/******/ 	__webpack_require__(847);
/******/ 	__webpack_require__(604);
/******/ 	var __webpack_exports__ = __webpack_require__(83);
/******/ 	
/******/ })()
;