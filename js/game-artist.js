import AbstractView from './abstract-view';
import header from './header.js';
import state from './data';

class GameArtistView extends AbstractView {
  get template() {
    const artists = state.questions[5].answers.map((artist, index) => `
    <div class="artist">
      <input class="artist__input visually-hidden" type="radio" name="answer" value="${artist.name}" id="answer-${index}">
      <label class="artist__name" for="answer-${index}">
        <img class="artist__picture" src="http://placehold.it/134x134" alt="${artist.name}">
        ${artist.name}
      </label>
    </div>`
    ).join(``);

    return `
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
  }

  bind() {
    const artistsForm = this._el.querySelector(`.game__artist`);
    const replayBtn = this._el.querySelector(`.game__back`);

    artistsForm.addEventListener(`change`, (evt) => this.onArtistChange(evt));

    replayBtn.addEventListener(`click`, () => this.onReplay());
  }

  onReplay() { }

  onArtistChange() { }
}


export default GameArtistView;
