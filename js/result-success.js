import AbstractView from './abstract-view';
import {TIME, MOCK_GAME_STATISTICS} from './constants.js';
import {calculateTotalScore, getResults} from './utils.js';


class ResultSuccessView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const timeSpentInSeconds = (TIME - this.state.time) / 1000;
    const minutesSpent = (() => {
      if (timeSpentInSeconds >= 60) {
        return timeSpentInSeconds % 60;
      } else {
        return 0;
      }
    })();
    const secondsSpent = timeSpentInSeconds - minutesSpent * 60;
    const results = calculateTotalScore(this.state.userAnswers, this.state.lives);
    // console.log('results',results);
    const statistics = getResults(MOCK_GAME_STATISTICS, {score: results.totalScore});

    return `
    <section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За ${minutesSpent} минуты и ${secondsSpent} секунд вы набрали ${results.totalScore} баллов (${results.fastAnswers} быстрых), совершив ${results.mistakes} ошибки</p>
    <p class="result__text">${statistics}</p>
    <button class="result__replay" type="button">Сыграть ещё раз</button>
    </section>`;
  }

  bind() {
    const replayBtn = this._el.querySelector(`.result__replay`);
    replayBtn.addEventListener(`click`, () => this.onReplay());
  }

  onReplay() { }
}

export default ResultSuccessView;
