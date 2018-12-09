import HeaderView from './header.js';
import GameGenreView from './game-genre.js';
import GameArtistView from './game-artist.js';


export default class GameScreen {
  constructor(model) {
    this.model = model;

    this.header = new HeaderView(this.model.state).element;
    this.header.onReplay = () => console.log(`to welcome screen`);

    this.root = document.createElement(`div`);
  }

  // get element() {
  //   return this.root;
  // }

  updateHeader() {
    const gameEl = document.querySelector(`.game`);
    gameEl.children[0].remove();
    this.header = new HeaderView(this.model.state).element;
    gameEl.insertBefore(this.header, gameEl.children[0]);
  }

  isAnswerCorrect(userAnswer) {
    const currentType = this.model.state.questions[this.model.state.level][`type`];
    const rightAnswers = this.model.state.questions[this.model.state.level][`answers`].filter((answer) => answer.isCorrect);
    console.log('rightAnswers', rightAnswers);
    if (userAnswer.length === rightAnswers.length) {
      if (userAnswer.every((answer) => rightAnswers.some((rightAnswer) => answer === rightAnswer[currentType]))) {
        console.log('answer is correct!');
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

            // переключаемся на следующий вопрос, если они остались
            if (this.model.state.level < this.model.state.questions.length - 1) {
              this.model.nextLevel();
              this.getElementByType(this.model.state.questions[this.model.state.level][`type`]);
            } else {
              console.log(`рендер экрана result-success`);
              // рендер экрана result-success
            }
          } else {
            if (this.model.state.lives > 0) {
              this.model.decreaseLives();
              //console.log(this.model.state);
              this.updateHeader();
              // обновить header (хотя он и так каждую секунду обновляется) чтобы игрок сразу увидел уменьшение жизней
            } else {
              console.log(`рендер экрана fail-tries`);
              // рендер экрана fail-tries
            }

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
            this.isAnswerCorrect(answer);
            if (this.model.state.level < this.model.state.questions.length - 1) {
              this.model.nextLevel();
              this.getElementByType(this.model.state.questions[this.model.state.level][`type`]);
            } else {
              //renderView(getRandomEndView());
            }
          }
        };

        element.appendChild(myGameArtistView.element);
        break;
    }

    this.changeContentView(element);

    return this.root;
  }

  changeContentView(element) {
    if (this.root.children[0]) {
      this.root.children[0].remove();
    }

    this.root.appendChild(element);
  }
}
