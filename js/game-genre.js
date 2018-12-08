import AbstractView from './abstract-view';
import HeaderView from './header.js';


class GameGenreView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const header = new HeaderView(this.state).template;

    const tracks = this.state.questions[0].answers.map((track, index) => `
    <div id="${index}"class="track">
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
    <section class="game game--genre">
    ${header}
    <section class="game__screen">
      <h2 class="game__title">Выберите инди-рок треки</h2>
      <form class="game__tracks">
        ${tracks}
        <button class="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
    </section>`;
  }

  bind() {
    const tracksAudio = [];
    this.state.questions[0].answers.map((track) => {
      tracksAudio.push(new Audio(track.src));
    });

    const tracksForm = this._el.querySelector(`.game__tracks`);
    const answerBtn = this._el.querySelector(`.game__submit`);
    const replayBtn = this._el.querySelector(`.game__back`);

    answerBtn.disabled = true;
    answerBtn.addEventListener(`click`, () => this.onAnswer());

    replayBtn.addEventListener(`click`, () => this.onReplay());

    tracksForm.addEventListener(`change`, (evt) => {
      if (evt.target.classList.contains(`game__input`)) {
        answerBtn.disabled = !this.formValidation();
      }
    });

    // tracksForm.addEventListener(`click`, (evt) => {
    //   if (evt.target.classList.contains(`track__button`)) {
    //     const controlBtn = evt.target;
    //     const trackId = controlBtn.closest(`.track`).id;

    //     if (controlBtn.classList.contains(`track__button--play`)) {
    //       controlBtn.classList.remove(`track__button--play`);
    //       controlBtn.classList.add(`track__button--pause`);
    //       tracksAudio[trackId].play();
    //     } else if (controlBtn.classList.contains(`track__button--pause`)) {
    //       controlBtn.classList.remove(`track__button--pause`);
    //       controlBtn.classList.add(`track__button--play`);
    //       tracksAudio[trackId].pause();
    //     }
    //   }
    // });
  }

  onReplay() { }

  onAnswer() { }

  formValidation() {
    return this._el.querySelectorAll(`.game__input:checked`).length;
  }
}

export default GameGenreView;
