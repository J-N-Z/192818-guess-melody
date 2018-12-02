import AbstractView from './abstract-view';

class FailTimeView extends AbstractView {
  get element() {
    return `
    <section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Увы и ах!</h2>
    <p class="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
    </section>`;
  }

  bind() {
    const replayBtn = this._el.querySelector(`.result__replay`);
    replayBtn.addEventListener(`click`, () => this.onReplay());
  }

  onReplay() { }
}

export default FailTimeView;
