import HeaderView from './header.js';
import GameGenreView from './game-genre.js';
import GameArtistView from './game-artist.js';
import Application from './application.js';
import {TIME_TO_WARNING} from './constants.js';


export default class GameScreen {
  constructor(model) {
    this.model = model;

    this.headerView = new HeaderView(this.model.state);
    this.headerView.onReplay = () => {
      this.model.stopPlaying();
      this.stopGame();
      Application.showWelcome();
    };
    this.header = this.headerView.element;

    this.root = document.createElement(`div`);
    this._timer = null;
    this.beginQuestionTime = 0;
  }

  updateHeader() {
    const gameEl = document.querySelector(`.game`);
    if (gameEl) {
      gameEl.children[0].remove();

      this.headerView = new HeaderView(this.model.state);
      this.headerView.onReplay = () => {
        this.model.stopPlaying();
        this.stopGame();
        Application.showWelcome();
      };
      this.header = this.headerView.element;

      if (this.model.state.time < TIME_TO_WARNING) {
        const timerEl = this.header.querySelector(`.timer__value`);
        if (!timerEl.classList.contains(`timer__value--finished`)) {
          timerEl.classList.add(`timer__value--finished`);
        }
      }

      gameEl.insertBefore(this.header, gameEl.children[0]);
    }
  }

  _tick() {
    if (this.model.state.time > 0) {
      this.model.tick();
      this.updateHeader();
      this._timer = setTimeout(() => this._tick(), 1000);
    } else {
      Application.showFailTime();
    }
  }

  isAnswerCorrect(userAnswer) {
    const currentType = this.model.data[this.model.state.level][`type`];
    if (currentType === `genre`) {
      const currentQuestion = this.model.data[this.model.state.level];
      const currentQuestionAnswers = currentQuestion[`answers`];
      const rightAnswers = currentQuestionAnswers.filter((answer) => answer.genre === currentQuestion.genre);

      if (userAnswer.length === rightAnswers.length) {
        return userAnswer.every((answer) => rightAnswers.some((rightAnswer) => answer === rightAnswer[currentType]));
      }
    } else if (currentType === `artist`) {
      const currentQuestion = this.model.data[this.model.state.level];
      const currentQuestionAnswers = currentQuestion[`answers`];
      const rightAnswer = currentQuestionAnswers.filter((answer) => answer.isCorrect)[0];

      return userAnswer === rightAnswer.title;
    }

    return false;
  }

  doWrongAnswer() {
    // если ответ неправильный уменьшаем жизни или рендерим экран поражения
    if (this.model.state.lives > 0) {
      this.model.decreaseLives();
      this.updateHeader();
    } else {
      this.stopGame();
      this.model.stopPlaying();
      Application.showFailTries();
    }
  }

  getElementByType(type) {
    let element = null;

    switch (type) {
      case `genre`:
        element = document.createElement(`section`);
        element.className = `game game-${type}`;
        element.appendChild(this.header);

        const myGameGenreView = new GameGenreView(this.model.state, this.model);
        myGameGenreView.onAnswer = (evt, answer) => {
          evt.preventDefault();

          if (this.isAnswerCorrect(answer)) {
            // записать в userAnswers время ответа
            const answerTime = this.beginQuestionTime - this.model.state.time;
            this.model.state.userAnswers.push(answerTime);

            this.model.stopPlaying();

            // переключаемся на следующий вопрос, если они остались
            if (this.model.state.level < this.model.data.length - 1) {
              this.model.getNextLevel();
              this.getElementByType(this.model.data[this.model.state.level][`type`]);
            } else {
              this.stopGame();
              Application.showStats(this.model);
            }
          } else {
            this.doWrongAnswer();
          }
        };

        element.appendChild(myGameGenreView.element);
        break;

      case `artist`:
        element = document.createElement(`section`);
        element.className = `game game-${type}`;
        element.appendChild(this.header);

        const myGameArtistView = new GameArtistView(this.model.state, this.model);
        myGameArtistView.onArtistChange = (evt, answer) => {
          if (evt.target.classList.contains(`artist__input`)) {

            if (this.isAnswerCorrect(answer)) {
              const answerTime = this.beginQuestionTime - this.model.state.time;
              this.model.state.userAnswers.push(answerTime);

              this.model.stopPlaying();

              // переключаемся на следующий вопрос, если они остались
              if (this.model.state.level < this.model.data.length - 1) {
                this.model.getNextLevel();
                this.getElementByType(this.model.data[this.model.state.level][`type`]);
              } else {
                this.stopGame();
                Application.showStats(this.model);
              }
            } else {
              this.doWrongAnswer();
            }
          }
        };

        element.appendChild(myGameArtistView.element);
        break;
    }

    // фиксация начала отсчета времени на вопрос
    this.beginQuestionTime = this.model.state.time;

    this.changeContentView(element);
    return this.root;
  }

  startGame() {
    this._tick();
  }

  stopGame() {
    clearTimeout(this._timer);
  }

  changeContentView(element) {
    if (this.root.children[0]) {
      this.root.children[0].remove();
    }

    this.root.appendChild(element);
  }
}
