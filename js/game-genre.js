import {getElementFromTemplate} from './utils.js';
import {renderView} from './utils.js';
import gameArtistView from './game-artist.js';
import welcomeView from './welcome.js';
import failTriesView from './fail-tries.js';
import header from './header.js';
import state from './data';

window.state = state;


const tracks = state.questions[0].answers.map((track, index) => `
<div class="track">
  <button class="track__button track__button--play" type="button"></button>
  <div class="track__status">
    <audio src="${track.src}"></audio>
  </div>
  <div class="game__answer">
    <input class="game__input visually-hidden" type="checkbox" name="answer" value="${track.genre}" id="answer-${index}">
    <label class="game__check" for="answer-${index}">Отметить</label>
  </div>
</div>`
).join(``);

const template = `
<section class="game game--genre">
${header(state)}
<section class="game__screen">
  <h2 class="game__title">Выберите инди-рок треки</h2>
  <form class="game__tracks">
    ${tracks}
    <button class="game__submit button" type="submit">Ответить</button>
  </form>
</section>
</section>`;

const view = getElementFromTemplate(template);
const tracksForm = view.querySelector(`.game__tracks`);
const answerBtn = view.querySelector(`.game__submit`);
const replayBtn = view.querySelector(`.game__back`);

answerBtn.disabled = true;
answerBtn.addEventListener(`click`, () => {
  if (state.level < 10) {
    state.level++;
    renderView(gameArtistView);
  } else {
    renderView(failTriesView);
  }
});

replayBtn.addEventListener(`click`, () => renderView(welcomeView));

tracksForm.addEventListener(`change`, (evt) => {
  if (evt.target.classList.contains(`game__input`)) {
    answerBtn.disabled = !formValidation();
  }
});

// для перехода дальше хотя бы один чекбокс должен быть включен
function formValidation() {
  return view.querySelectorAll(`.game__input:checked`).length;
}

export default view;
