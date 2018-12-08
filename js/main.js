import {renderView, updateView} from './utils.js';
import WelcomeView from './welcome';
import GameGenreView from './game-genre.js';
import GameArtistView from './game-artist.js';
import FailTimeView from './fail-time.js';
import FailTriesView from './fail-tries.js';
import ResultSuccessView from './result-success.js';
import ModalConfirmView from './modal-confirm.js';
import ModalErrorView from './modal-error.js';
import HeaderView from './header.js';
import data from './data';
import application from './application';

const INITIAL_STATE = data;

let state;

const updateHeader = () => {
  const gameEl = document.querySelector(`.game`);
  gameEl.children[0].remove();
  const header = new HeaderView(state).element;
  gameEl.insertBefore(header, gameEl.children[0]);
  //updateView(container, view);
};

export const startGame = () => {
  state = Object.assign({}, INITIAL_STATE);

  renderView(myGameGenreView.element);
  startTimer();
};

const tick = () => {
  state = Object.assign({}, state, {
    time: state.time - 1000
  });
  updateHeader();
};

let timer;

const startTimer = () => {
  timer = setTimeout(() => {
    tick();
    startTimer();
  }, 1000);
};

const stopTimer = clearTimeout(timer);



const myWelcomeView = new WelcomeView();


const myGameGenreView = new GameGenreView(INITIAL_STATE);
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


//renderView(myWelcomeView.element);

application.showWelcome();
