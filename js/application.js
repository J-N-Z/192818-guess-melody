
import {renderView} from './utils.js';
import GameModel from './game-model';
import GameScreen from './game-screen';
import WelcomeScreen from './welcome-screen';

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    renderView(welcome.element);
  }

  static showGame() {
    const model = new GameModel();
    console.log('model',model);
    const gameScreen = new GameScreen(model);
    renderView(gameScreen.getElementByType(model.state.questions[model.state.level][`type`]));
  }

}
