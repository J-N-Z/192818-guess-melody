
import {renderView} from './utils.js';
import GameModel from './game-model';
import GameScreen from './game-screen';
import WelcomeScreen from './welcome-screen';
import FailTimeView from './fail-time.js';
import FailTriesView from './fail-tries.js';
import ResultSuccessView from './result-success.js';

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    renderView(welcome.element);
  }

  static showGame() {
    const model = new GameModel();
    // console.log('model',model);
    const gameScreen = new GameScreen(model);
    renderView(gameScreen.getElementByType(model.state.questions[model.state.level][`type`]));
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
}
