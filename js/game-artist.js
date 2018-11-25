import {getElementFromTemplate} from './utils.js';
import {renderView} from './utils.js';
import resultSuccessView from './result-success.js';
import welcomeView from './welcome.js';
import failTriesView from './fail-tries.js';
import failTimeView from './fail-time.js';
import header from './header.js';
import state from './data';


const artists = state.questions[state.level + 1].answers.map((artist, index) => `
  <div class="artist">
    <input class="artist__input visually-hidden" type="radio" name="answer" value="${artist.name}" id="answer-${index}">
    <label class="artist__name" for="answer-${index}">
      <img class="artist__picture" src="http://placehold.it/134x134" alt="${artist.name}">
      ${artist.name}
    </label>
  </div>`
).join(``);


const template = `
<section class="game game--artist">
  ${header(state)}
<section class="game__screen">
  <h2 class="game__title">Кто исполняет эту песню?</h2>
  <div class="game__track">
    <button class="track__button track__button--play" type="button"></button>
    <audio></audio>
  </div>
  <form class="game__artist">
    ${artists}
  </form>
</section>
</section>`;

const view = getElementFromTemplate(template);
const artistsForm = view.querySelector(`.game__artist`);
const replayBtn = view.querySelector(`.game__back`);

artistsForm.addEventListener(`change`, (evt) => {
  if (evt.target.classList.contains(`artist__input`)) {
    renderView(getRandomEndView());
  }
});

replayBtn.addEventListener(`click`, () => renderView(welcomeView));

function getRandomEndView() {
  const endScreens = [resultSuccessView, failTriesView, failTimeView];
  const randomIndex = Math.floor(Math.random() * endScreens.length);

  return endScreens[randomIndex];
}

export default view;
