import AbstractView from './abstract-view';

export default class GameGenreView extends AbstractView {
  constructor(state, model) {
    super();
    this.state = state;
    this.model = model;
  }

  get template() {
    const currentQuestion = this.model.data[this.state.level];

    const tracks = currentQuestion.answers.map((track, index) => `
    <div id="${index}"class="track ${this.state.debug && track.genre === currentQuestion.genre ? `debug-correct` : ``}">
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

    return `

    <section class="game__screen">
      <h2 class="game__title">${currentQuestion.question}</h2>
      <form class="game__tracks">
        ${tracks}
        <button class="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  `;
  }

  formValidate() {
    return this._el.querySelectorAll(`.game__input:checked`).length;
  }

  bind() {
    const tracksAudio = [];

    this.model.data[this.state.level].answers.forEach((track) => {
      const audio = this.model.audioData[track.src];
      tracksAudio.push(audio);
    });

    const tracksForm = this._el.querySelector(`.game__tracks`);
    const answerBtn = this._el.querySelector(`.game__submit`);

    answerBtn.disabled = true;
    answerBtn.addEventListener(`click`, (evt) => {
      const checkedInputs = Array.from(this._el.querySelectorAll(`.game__input:checked`));
      const answers = checkedInputs.map((input) => input.value);
      this.onAnswer(evt, answers);
    });

    tracksForm.addEventListener(`change`, (evt) => {
      if (evt.target.classList.contains(`game__input`)) {
        answerBtn.disabled = !this.formValidate();
      }
    });

    tracksForm.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`track__button`)) {
        const controlBtn = evt.target;
        const trackId = controlBtn.closest(`.track`).id;

        if (controlBtn.classList.contains(`track__button--play`)) {
          if (this.state.audio) {
            this.state.audio.pause();
            this.state.audio = null;
          } else {
            this.state.audio = tracksAudio[trackId];
            this.state.audio.play();
          }

          const lastPlaying = this._el.querySelector(`.track__button--pause`);
          if (lastPlaying) {
            lastPlaying.classList.remove(`track__button--pause`);
            lastPlaying.classList.add(`track__button--play`);
          }

          controlBtn.classList.remove(`track__button--play`);
          controlBtn.classList.add(`track__button--pause`);

          this.state.audio = tracksAudio[trackId];
          this.state.audio.play();


        } else if (controlBtn.classList.contains(`track__button--pause`)) {
          controlBtn.classList.remove(`track__button--pause`);
          controlBtn.classList.add(`track__button--play`);

          this.state.audio.pause();
          this.state.audio = null;
        }
      }
    });

    tracksForm.querySelector(`.track__button`).click();
  }

  onAnswer() { }
}
