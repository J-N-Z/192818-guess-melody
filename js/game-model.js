import INITIAL_STATE from './data';


export default class GameModel {
  constructor() {
    this.restart();
  }

  get state() {
    return this._state;
  }

  restart() {
    this._state = INITIAL_STATE;
  }

  nextLevel() {
    this._state = Object.assign({}, this._state, {level: this._state.level + 1});
  }

  isOutOfLives() {
    return this._state.lives <= 0;
  }

  // tick() {
  //   this._state = tick(this._state);
  // }
}
