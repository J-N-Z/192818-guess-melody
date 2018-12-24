import AbstractView from './abstract-view';
import {Time} from './constants.js';
import {getResults} from './utils.js';


class ResultSuccessView extends AbstractView {
  constructor(scoreResults, userResults, state) {
    super();
    this.scoreResults = scoreResults;
    this.userResults = userResults;
    this.state = state;
  }

  get template() {
    const timeSpentInSeconds = (Time.TOTAL_TIME - this.state.time) / 1000;
    const minutesSpent = Math.floor(timeSpentInSeconds / 60);
    const secondsSpent = timeSpentInSeconds - minutesSpent * 60;
    const statistics = getResults(this.scoreResults, {score: this.userResults.totalScore});

    return `
    <section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За ${minutesSpent} минуты и ${secondsSpent} секунд вы набрали ${this.userResults.totalScore} баллов (${this.userResults.fastAnswers} быстрых), совершив ${this.userResults.mistakes} ошибки</p>
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
