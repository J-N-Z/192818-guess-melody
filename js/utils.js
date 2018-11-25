const QUESTIONS_AMOUNT = 10;
const LIVES = 3;

export function getElementFromTemplate(str) {
  const element = document.createElement(`div`);
  element.innerHTML = str;

  return element;
}

export function renderView(view) {
  const sectionMain = document.querySelector(`.main`);

  sectionMain.innerHTML = ``;
  sectionMain.appendChild(view);
}

export function calculateTotalScore(answersArr, lives) {
  let totalScore = -1;

  if (answersArr.length === QUESTIONS_AMOUNT) {
    const rightAnswers = answersArr.filter((answer) => answer.right);
    const mistakes = LIVES - lives;
    const fastAnswers = answersArr.filter((answer) => answer.time < 30);

    totalScore = rightAnswers.length - mistakes * 2;
    if (fastAnswers.length > 0) {
      totalScore += fastAnswers.length;
    }
    return totalScore;
  }

  return totalScore;
}

export function getResults(statistics, currentResult) {
  if (currentResult.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  if (currentResult.lives === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  const stats = [...statistics];
  stats.push(currentResult.score);

  const sortedStats = stats.sort((a, b) => b - a);
  const rank = sortedStats.indexOf(currentResult.score) + 1;
  const beatenPercents = (sortedStats.length - rank) / (sortedStats.length - 1) * 100;

  return `Вы заняли ${rank} место из ${sortedStats.length} игроков. Это лучше, чем у ${beatenPercents}% игроков`;
}

export function decreaseLives(_lives) {
  if (_lives > 0) {
    _lives--;
  } else {
    return false;
  }

  return _lives;
}

export function timeCountdown(_seconds) {
  return --_seconds;
}

export function addLeadZero(number) {
  return number.toString().length < 2 ? `0${number}` : number;
}
