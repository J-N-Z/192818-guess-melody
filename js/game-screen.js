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

  getElementByType(type) {
    let element = null;

    console.log('this.model.state',this.model.state);

    switch (type) {
      case `genre`:
        element = document.createElement(`section`);
        element.className = `game game-${type}`;
        element.appendChild(this.header);

        const myGameGenreView = new GameGenreView(this.model.state);
        myGameGenreView.onAnswer = (evt, answers) => {
          evt.preventDefault();
          console.log('answers',answers);
          if (this.model.state.level < 10) {
            this.model.nextLevel();
            this.getElementByType(this.model.state.questions[this.model.state.level][`type`]);
          } else {
            //renderView(myFailTriesView.element);
          }
        };
        element.appendChild(myGameGenreView.element);

        break;

      case `artist`:
        element = document.createElement(`section`);
        element.className = `game game-${type}`;
        element.appendChild(this.header);

        const myGameArtistView = new GameArtistView(this.model.state);
        myGameArtistView.onArtistChange = (evt) => {
          if (evt.target.classList.contains(`artist__input`)) {
            if (this.model.state.level < 10) {
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
