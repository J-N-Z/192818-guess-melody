
import {renderView} from './utils.js';
import GameModel from './game-model';
import GameScreen from './game-screen';
import WelcomeScreen from './welcome-screen';
import FailTimeView from './fail-time.js';
import FailTriesView from './fail-tries.js';
import ResultSuccessView from './result-success.js';
import LoadingView from './loading-view.js';
// import ModalConfirmView from './modal-confirm.js';
import ModalErrorView from './modal-error.js';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status} ${response.text}`);
  }
};

let gameData;

export default class Application {

  static start() {
    const loading = new LoadingView();
    renderView(loading.element);
    fetch(`https://es.dump.academy/guess-melody/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => (gameData = data))
      .then(() => Application.showWelcome())
      .catch(Application.showError);
  }

  static showWelcome() {
    const welcome = new WelcomeScreen();
    renderView(welcome.element);
  }

  static showGame() {
    const model = new GameModel(gameData);
    const gameScreen = new GameScreen(model);
    renderView(gameScreen.getElementByType(model.data[model.state.level][`type`]));
    gameScreen.startGame();
  }

  static showFailTries() {
    const failTries = new FailTriesView();
    failTries.onReplay = () => Application.showWelcome();
    renderView(failTries.element);
  }

  static showFailTime() {
    const failTime = new FailTimeView();
    failTime.onReplay = () => Application.showWelcome();
    renderView(failTime.element);
  }

  static showStats(state) {
    const stats = new ResultSuccessView(state);
    stats.onReplay = () => Application.showWelcome();
    renderView(stats.element);
  }

  static showError(error) {
    const modalError = new ModalErrorView(error);
    renderView(modalError.element);
  }
}
