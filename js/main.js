'use strict';

renderNavArrows();

const KeyCodes = {
  LEFT: 37,
  RIGHT: 39
};

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
        renderViewByNumber(--viewActiveNumber);
      }
      break;

    case `right`:
      if (viewActiveNumber < views.length) {
        renderViewByNumber(++viewActiveNumber);
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

  const [leftArrowBtn, rightArrowBtn] = document.querySelectorAll(`.arrows__btn`);

  leftArrowBtn.addEventListener(`click`, () => toggleView(`left`));
  rightArrowBtn.addEventListener(`click`, () => toggleView(`right`));
}


// Обработчики клавиатуры
document.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === KeyCodes.RIGHT) {
    toggleView(`right`);
  } else if (evt.keyCode === KeyCodes.LEFT) {
    toggleView(`left`);
  }
});


// Отрисовка начального экрана
renderViewByNumber(0);
