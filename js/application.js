import WelcomeView from './welcome';
import {renderView} from './utils.js';
import {startGame} from './main.js';

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeView();
    welcome.onStart = () => startGame();
    renderView(welcome.element);
  }

}
