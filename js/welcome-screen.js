import WelcomeView from './welcome';
import Application from './application';


export default class WelcomeScreen {
  constructor() {
    this.welcomeView = new WelcomeView();
    this.welcomeView.onStart = () => Application.showGame();
  }

  get element() {
    return this.welcomeView.element;
  }
}
