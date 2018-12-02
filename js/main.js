import {renderView} from './utils.js';
import WelcomeView from './welcome';
import GameGenreView from './game-genre.js';
import GameArtistView from './game-artist.js';
import FailTimeView from './fail-time.js';
import FailTriesView from './fail-tries.js';
import ResultSuccessView from './result-success.js';
import ModalConfirmView from './modal-confirm.js';
import ModalErrorView from './modal-error.js';
import state from './data';


const myWelcomeView = new WelcomeView();
myWelcomeView.onStart = () => renderView(myGameGenreView.element);

const myGameGenreView = new GameGenreView();
myGameGenreView.onReplay = () => replay();
myGameGenreView.onAnswer = () => {
  if (state.level < 10) {
    state.level++;
    renderView(myGameArtistView.element);
  } else {
    renderView(myFailTriesView.element);
  }
};


const myGameArtistView = new GameArtistView();
myGameArtistView.onReplay = () => replay();
myGameArtistView.onArtistChange = (evt) => {
  if (evt.target.classList.contains(`artist__input`)) {
    if (state.level < 10) {
      state.level++;
      renderView(myGameGenreView.element);
    } else {
      renderView(getRandomEndView());
    }
  }
};


const myFailTimeView = new FailTimeView();
myFailTimeView.onReplay = () => replay();


const myFailTriesView = new FailTriesView();
myFailTriesView.onReplay = () => replay();


const myResultSuccessView = new ResultSuccessView();
myResultSuccessView.onReplay = () => replay();


const myModalConfirmView = new ModalConfirmView();
myModalConfirmView.onConfirm = () => replay();
myModalConfirmView.onCancel = () => console.log(`Игрок продолжает игру`);


const myModalErrorView = new ModalErrorView();


function getRandomEndView() {
  const endScreens = [myResultSuccessView, myFailTriesView, myFailTimeView];
  const randomIndex = Math.floor(Math.random() * endScreens.length);

  return endScreens[randomIndex][`element`];
}

function replay() {
  renderView(myWelcomeView.element);
}


renderView(myWelcomeView.element);
