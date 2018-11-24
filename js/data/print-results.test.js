import {assert} from 'chai';

const gameStatistics = [4, 5, 8, 10, 11];

function getResults(statistics, currentResult) {
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

const gamerResults1 = {
  score: 10,
  lives: 3,
  time: 0
};

const gamerResults2 = {
  score: 10,
  lives: 0,
  time: 50
};

const gamerResults3 = {
  score: 20,
  lives: 2,
  time: 50
};

const gamerResults4 = {
  score: 3,
  lives: 2,
  time: 50
};

describe(`Print gamer results`, () => {
  it(`should return "end time" text when results time is equal 0`, () => {
    assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, getResults(gameStatistics, gamerResults1));
  });

  it(`should return "end attempts" text when results lives is equal 0`, () => {
    assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, getResults(gameStatistics, gamerResults2));
  });

  it(`should return 1 rank of 6 gamers, 100% result`, () => {
    assert.equal(`Вы заняли 1 место из 6 игроков. Это лучше, чем у 100% игроков`, getResults(gameStatistics, gamerResults3));
  });

  it(`should return 6 rank of 6 gamers, 0% result`, () => {
    assert.equal(`Вы заняли 6 место из 6 игроков. Это лучше, чем у 0% игроков`, getResults(gameStatistics, gamerResults4));
  });
});
