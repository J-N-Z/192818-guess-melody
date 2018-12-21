
import {renderView, calculateTotalScore, removeDupsInArray} from './utils.js';
import GameModel from './game-model';
import GameScreen from './game-screen';
import WelcomeScreen from './welcome-screen';
import FailTimeView from './fail-time.js';
import FailTriesView from './fail-tries.js';
import ResultSuccessView from './result-success.js';
import LoadingView from './loading-view.js';
// import ModalConfirmView from './modal-confirm.js';
import ModalErrorView from './modal-error.js';

import Loader from './loader.js';

const loadAudio = (src) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src);
    audio.onloadeddata = () => resolve({src, audio});
    audio.onerror = () => reject(`load audio error`);
  });
};

let gameData;
let audioData;

export default class Application {

  static start() {
    const loading = new LoadingView();
    renderView(loading.element);
    Loader.loadData()
      .then((questions) => {
        gameData = questions;
        return questions;
      })
      .then((questions) => {
        let audioSrcArr = [];

        questions.forEach((question) => {
          if (question.type === `artist`) {
            audioSrcArr.push(question.src);
          } else {
            question.answers.forEach((answer) => {
              audioSrcArr.push(answer.src);
            });
          }
        });
        // console.log('audioSrcArr', audioSrcArr);

        const shakedAudioSrcArr = removeDupsInArray(audioSrcArr);

        // console.log('shakedAudioSrcArr', shakedAudioSrcArr);

        return shakedAudioSrcArr.map((src) => loadAudio(src));
      })
      .then((audioPromises) => Promise.all(audioPromises))
      .then((audioObjects) => {
        const audioMappedObject = {};
        audioObjects.forEach((obj) => {
          audioMappedObject[[obj.src]] = obj.audio;
        });
        return (audioData = audioMappedObject);
      })
      .then(() => Application.showWelcome())
      .catch(Application.showError);
  }

  static showWelcome() {
    const welcome = new WelcomeScreen();
    renderView(welcome.element);
  }

  static showGame() {
    const model = new GameModel(gameData, audioData);
    const gameScreen = new GameScreen(model);
    renderView(gameScreen.getElementByType(model.data[model.state.level][`type`]));
    gameScreen.startGame();
  }

  static showFailTries() {
    const failTries = new FailTriesView();
    failTries.onReplay = () => Application.showGame();
    renderView(failTries.element);
  }

  static showFailTime() {
    const failTime = new FailTimeView();
    failTime.onReplay = () => Application.showGame();
    renderView(failTime.element);
  }

  static showStats(model) {
    const loading = new LoadingView();
    renderView(loading.element);

    const userResults = calculateTotalScore(model.state.userAnswers, model.state.lives);

    Loader.saveResults(userResults.totalScore)
      .then(() => Loader.loadResults())
      .then((scoreResults) => {
        const mappedScoreResults = scoreResults.map((item) => item.score);
        const stats = new ResultSuccessView(mappedScoreResults, userResults, model.state);
        stats.onReplay = () => Application.showGame();
        renderView(stats.element);
      });
  }

  static showError(error) {
    const modalError = new ModalErrorView(error);
    renderView(modalError.element);
  }
}
