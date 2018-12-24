import {Time} from './constants.js';
import {LIVES} from './constants.js';


const MISTAKES_FACTOR = 2;

export const renderView = (view) => {
  const sectionMain = document.querySelector(`.main`);

  sectionMain.innerHTML = ``;
  sectionMain.appendChild(view);
};


export const calculateTotalScore = (answersArr, lives) => {
  const mistakes = LIVES - lives;
  const fastAnswers = answersArr.filter((answer) => answer < Time.MAX_FOR_FAST_ANSWER).length;

  const totalScore = answersArr.length - mistakes * MISTAKES_FACTOR + fastAnswers;

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


export const decreaseLives = (lives) => (lives > 0) ? --lives : false;


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
