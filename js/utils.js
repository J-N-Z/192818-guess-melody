import {Time} from './constants.js';
import {LIVES} from './constants.js';


export const renderView = (view) => {
  const sectionMain = document.querySelector(`.main`);

  sectionMain.innerHTML = ``;
  sectionMain.appendChild(view);
};


export const calculateTotalScore = (answersArr, lives) => {
  let totalScore = 0;

  const mistakes = LIVES - lives;
  const fastAnswers = answersArr.filter((answer) => answer < Time.FAST_ANSWER_MAX_TIME).length;

  totalScore = answersArr.length - mistakes * 2;

  if (fastAnswers > 0) {
    totalScore += fastAnswers;
  }

  return {
    totalScore,
    fastAnswers,
    mistakes
  };
};


export const getResults = (statistics, currentResult) => {
  const stats = [...statistics];
  stats.push(currentResult.score);

  const sortedStats = stats.sort((a, b) => b - a);
  const rank = sortedStats.indexOf(currentResult.score) + 1;
  const beatenPercents = Math.round((sortedStats.length - rank) / (sortedStats.length - 1) * 100);

  return `Вы заняли ${rank} место из ${sortedStats.length} игроков. Это лучше, чем у ${beatenPercents}% игроков`;
};


export const decreaseLives = (lives) => {
  if (lives > 0) {
    lives--;
  } else {
    return false;
  }

  return lives;
};


export const timeCountdown = (seconds) => {
  return --seconds;
};


export const addLeadZero = (number) => {
  return number.toString().length < 2 ? `0${number}` : number;
};


export const removeDupsInArray = (arr) => {
  const newObj = {};
  arr.forEach((item) => (newObj[item] = item));
  return Object.keys(newObj);
};
