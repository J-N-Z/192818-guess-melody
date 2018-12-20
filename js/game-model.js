import INITIAL_STATE from './data';
import {decreaseLives} from './utils';

export default class GameModel {
  constructor(data, audioData) {
    this.data = data;
    this.audioData = audioData;
    this.restart();
  }

  get state() {
    return this._state;
  }

  restart() {
    this._state = Object.assign({}, INITIAL_STATE);
    this._state.userAnswers = [];
  }

  nextLevel() {
    this._state = Object.assign({}, this._state, {level: this._state.level + 1});
  }

  isOutOfLives() {
    return this._state.lives <= 0;
  }

  decreaseLives() {
    this._state.lives = decreaseLives(this._state.lives);
  }

  tick() {
    this._state = Object.assign({}, this._state, {time: this._state.time - 1000});
  }
}
