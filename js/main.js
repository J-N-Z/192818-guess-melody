import FailTimeView from './fail-time.js';
import FailTriesView from './fail-tries.js';
import ResultSuccessView from './result-success.js';
import ModalConfirmView from './modal-confirm.js';
import ModalErrorView from './modal-error.js';
import data from './data';
import application from './application';


const INITIAL_STATE = data;

let state;


export const startGame = () => {
  state = Object.assign({}, INITIAL_STATE);

  nextLevel(state.questions[state.level][`type`]);
  startTimer();
};

// const tick = () => {
//   state = Object.assign({}, state, {
//     time: state.time - 1000
//   });
//   updateHeader();
// };


let timer;

const startTimer = () => {
  timer = setTimeout(() => {
    tick();
    startTimer();
  }, 1000);
};

const stopTimer = () => clearTimeout(timer);


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

// function replay(evt) {
//   evt.preventDefault();
//   application.showWelcome();
// }


application.showWelcome();
