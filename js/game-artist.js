import AbstractView from './abstract-view';

export default class GameArtistView extends AbstractView {
  constructor(state, model) {
    super();
    this.state = state;
    this.model = model;
  }

  get currentQuestion() {
    return this.model.data[this.state.level];
  }

  get template() {

    const artists = this.currentQuestion.answers.map((artist, index) => `
    <div class="artist ${this.state.debug && artist.isCorrect ? `debug-correct` : ``}">
      <input class="artist__input visually-hidden" type="radio" name="answer" value="${artist.title}" id="answer-${index}">
      <label class="artist__name" for="answer-${index}">
        <img class="artist__picture" src="${artist.image.url}" alt="${artist.title}">
        ${artist.title}
      </label>
    </div>`
    ).join(``);

    return `
    <section class="game__screen">
      <h2 class="game__title">${this.currentQuestion.question}</h2>
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

    this.state.audio = this.model.audioData[this.currentQuestion.src];

    const controlBtn = this._el.querySelector(`.track__button`);
    controlBtn.addEventListener(`click`, () => {
      if (controlBtn.classList.contains(`track__button--play`)) {
        controlBtn.classList.remove(`track__button--play`);
        controlBtn.classList.add(`track__button--pause`);
        this.state.audio.play();
      } else if (controlBtn.classList.contains(`track__button--pause`)) {
        controlBtn.classList.remove(`track__button--pause`);
        controlBtn.classList.add(`track__button--play`);
        this.state.audio.pause();
      }
    });

    controlBtn.click();
  }

  onArtistChange() { }
}
