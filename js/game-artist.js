import AbstractView from './abstract-view';

class GameArtistView extends AbstractView {
  constructor(state, model) {
    super();
    this.state = state;
    this.model = model;
  }

  get template() {
    const currentQuestion = this.model.data[this.state.level];

    const artists = currentQuestion.answers.map((artist, index) => `
    <div class="artist">
      <input class="artist__input visually-hidden" type="radio" name="answer" value="${artist.title}" id="answer-${index}">
      <label class="artist__name" for="answer-${index}">
        <img class="artist__picture" src="http://placehold.it/134x134" alt="${artist.title}">
        ${artist.title}
      </label>
    </div>`
    ).join(``);

    return `
    <section class="game__screen">
      <h2 class="game__title">${currentQuestion.question}</h2>
      <div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        <audio></audio>
      </div>
      <form class="game__artist">
        ${artists}
      </form>
    </section>
`;
  }

  bind() {
    const artistsForm = this._el.querySelector(`.game__artist`);
    artistsForm.addEventListener(`change`, (evt) => {
      const answer = evt.target.value;
      this.onArtistChange(evt, answer);
    });
  }

  onArtistChange() { }
}


export default GameArtistView;
