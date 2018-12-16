import HeaderView from './header.js';
import GameGenreView from './game-genre.js';
import GameArtistView from './game-artist.js';
import Application from './application.js';


export default class GameScreen {
  constructor(model) {
    this.model = model;

    this.header = new HeaderView(this.model.state).element;
    this.header.onReplay = () => console.log(`to welcome screen`);

    this.root = document.createElement(`div`);
    this._timer = null;
    this.beginQuestionTime = 0;
  }

  updateHeader() {
    const gameEl = document.querySelector(`.game`);
    if (gameEl) {
      gameEl.children[0].remove();
      this.header = new HeaderView(this.model.state).element;
      this.header.onReplay = () => console.log(`to welcome screen`);
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

  wrongAnswer() {
    // если ответ неправильный уменьшаем жизни или рендерим экран поражения
    if (this.model.state.lives > 0) {
      this.model.decreaseLives();
      this.updateHeader();
    } else {
      Application.showFailTries();
    }
  }

  isAnswerCorrect(userAnswer) {
    const currentType = this.model.state.questions[this.model.state.level][`type`];
    if (currentType === `genre`) {
      const currentQuestion = this.model.state.questions[this.model.state.level];
      const currentQuestionAnswers = currentQuestion[`answers`];
      const rightAnswers = currentQuestionAnswers.filter((answer) => answer.genre === currentQuestion.genre);

      if (userAnswer.length === rightAnswers.length) {
        if (userAnswer.every((answer) => rightAnswers.some((rightAnswer) => answer === rightAnswer[currentType]))) {
          console.log(`answer is correct!`);
          return true;
        }
      }
    } else if (currentType === `artist`) {
      const currentQuestion = this.model.state.questions[this.model.state.level];
      const currentQuestionAnswers = currentQuestion[`answers`];
      const rightAnswer = currentQuestionAnswers.filter((answer) => answer.isCorrect)[0];

      if (userAnswer === rightAnswer.title) {
        console.log(`answer is correct!`);
        return true;
      }
    }

    return false;
  }

  getElementByType(type) {
    let element = null;

    console.log('this.model.state', this.model.state);

    switch (type) {
      case `genre`:
        element = document.createElement(`section`);
        element.className = `game game-${type}`;
        element.appendChild(this.header);

        const myGameGenreView = new GameGenreView(this.model.state);
        myGameGenreView.onAnswer = (evt, answer) => {
          evt.preventDefault();
          console.log('answer', answer);

          if (this.isAnswerCorrect(answer)) {
            // записать в userAnswers время ответа
            const answerTime = this.beginQuestionTime - this.model.state.time;
            this.model.state.userAnswers.push(answerTime);

            // переключаемся на следующий вопрос, если они остались
            if (this.model.state.level < this.model.state.questions.length - 1) {
              this.model.nextLevel();
              this.getElementByType(this.model.state.questions[this.model.state.level][`type`]);
            } else {
              Application.showStats(this.model.state);
            }
          } else {
            this.wrongAnswer();
          }
        };

        element.appendChild(myGameGenreView.element);
        break;

      case `artist`:
        element = document.createElement(`section`);
        element.className = `game game-${type}`;
        element.appendChild(this.header);

        const myGameArtistView = new GameArtistView(this.model.state);
        myGameArtistView.onArtistChange = (evt, answer) => {
          if (evt.target.classList.contains(`artist__input`)) {
            console.log('answer', answer);

            if (this.isAnswerCorrect(answer)) {
              const answerTime = this.beginQuestionTime - this.model.state.time;
              this.model.state.userAnswers.push(answerTime);

              // переключаемся на следующий вопрос, если они остались
              if (this.model.state.level < this.model.state.questions.length - 1) {
                this.model.nextLevel();
                this.getElementByType(this.model.state.questions[this.model.state.level][`type`]);
              } else {
                Application.showStats(this.model.state);
              }
            } else {
              this.wrongAnswer();
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
