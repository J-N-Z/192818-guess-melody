import {FAST_ANSWER_MAX_TIME} from './constants.js';
import {LIVES} from './constants.js';


export const renderView = (view) => {
  const sectionMain = document.querySelector(`.main`);

  sectionMain.innerHTML = ``;
  sectionMain.appendChild(view);
};

export const updateView = (container, view) => {
  container.innerHTML = ``;
  container.appendChild(view);
};

// old version

// export function calculateTotalScore(answersArr, lives) {
//   let totalScore = -1;

//   if (answersArr.length === QUESTIONS_AMOUNT) {
//     const rightAnswers = answersArr.filter((answer) => answer.right);
//     const mistakes = LIVES - lives;
//     const fastAnswers = answersArr.filter((answer) => answer.time < 30);

//     totalScore = rightAnswers.length - mistakes * 2;
//     if (fastAnswers.length > 0) {
//       totalScore += fastAnswers.length;
//     }
//     return totalScore;
//   }

//   return totalScore;
// }

export const calculateTotalScore = (answersArr, lives) => {
  let totalScore = 0;

  const mistakes = LIVES - lives;
  const fastAnswers = answersArr.filter((answer) => answer < FAST_ANSWER_MAX_TIME).length;

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

// old

// export function getResults(statistics, currentResult) {
//   if (currentResult.time === 0) {
//     return `Время вышло! Вы не успели отгадать все мелодии`;
//   }
//   if (currentResult.lives === 0) {
//     return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
//   }

//   const stats = [...statistics];
//   stats.push(currentResult.score);

//   const sortedStats = stats.sort((a, b) => b - a);
//   const rank = sortedStats.indexOf(currentResult.score) + 1;
//   const beatenPercents = (sortedStats.length - rank) / (sortedStats.length - 1) * 100;

//   return `Вы заняли ${rank} место из ${sortedStats.length} игроков. Это лучше, чем у ${beatenPercents}% игроков`;
// }

export const getResults = (statistics, currentResult) => {
  const stats = [...statistics];
  stats.push(currentResult.score);

  const sortedStats = stats.sort((a, b) => b - a);
  const rank = sortedStats.indexOf(currentResult.score) + 1;
  const beatenPercents = (sortedStats.length - rank) / (sortedStats.length - 1) * 100;

  return `Вы заняли ${rank} место из ${sortedStats.length} игроков. Это лучше, чем у ${beatenPercents}% игроков`;
};

export const decreaseLives = (_lives) => {
  if (_lives > 0) {
    _lives--;
  } else {
    return false;
  }

  return _lives;
};

export const timeCountdown = (_seconds) => {
  return --_seconds;
};

export const addLeadZero = (number) => {
  return number.toString().length < 2 ? `0${number}` : number;
};

export const removeDupsInArray = (arr) => {
  let newObj = {};
  arr.forEach((item) => (newObj[item] = item));
  return Object.keys(newObj);
};
