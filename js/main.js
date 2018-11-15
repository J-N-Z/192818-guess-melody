'use strict';

renderNavArrows();

const sectionMain = document.querySelector(`.main`);
const views = Array.from(document.querySelectorAll(`template`));

let viewActiveNumber = 0;


// Отрисовка экрана по индексу
function renderViewByNumber(number) {
  const viewTemplate = views[number];
  const view = document.importNode(viewTemplate.content, true);

  sectionMain.innerHTML = ``;
  sectionMain.appendChild(view);
}


// Переключение экранов
function toggleView(direction) {
  switch (direction) {
    case `left`:
      if (viewActiveNumber > 0) {
        viewActiveNumber--;
        renderViewByNumber(viewActiveNumber);
      }
      break;

    case `right`:
      if (viewActiveNumber < views.length) {
        viewActiveNumber++;
        renderViewByNumber(viewActiveNumber);
      }
      break;
  }
}


// Отрисовка навигационных стрелок
function renderNavArrows() {
  const app = document.querySelector(`.app`);

  app.innerHTML += `
    <div class="arrows__wrap">
      <style>
        .arrows__wrap {
          position: absolute;
          top: 135px;
          left: 50%;
          margin-left: -56px;
        }
        .arrows__btn {
          background: none;
          border: 2px solid black;
          padding: 5px 20px;
        }
      </style>
      <button class="arrows__btn"><-</button>
      <button class="arrows__btn">-></button>
    </div>
  `;

  const leftArrowBtn = document.querySelectorAll(`.arrows__btn`)[0];
  const rightArrowBtn = document.querySelectorAll(`.arrows__btn`)[1];

  leftArrowBtn.addEventListener(`click`, () => toggleView(`left`));
  rightArrowBtn.addEventListener(`click`, () => toggleView(`right`));
}


// Обработчики клавиатуры
document.addEventListener(`keydown`, (e) => {
  if (e.keyCode === 39) {
    toggleView(`right`);
  } else if (e.keyCode === 37) {
    toggleView(`left`);
  }
});


// Отрисовка начального экрана
renderViewByNumber(0);
