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
