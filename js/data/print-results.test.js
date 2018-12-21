import {assert} from 'chai';
import {getResults} from '../utils';

const gameStatistics = [4, 5, 8, 10, 11];

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
  it(`should return 1 rank of 6 gamers, 100% result`, () => {
    assert.equal(`Вы заняли 1 место из 6 игроков. Это лучше, чем у 100% игроков`, getResults(gameStatistics, gamerResults3));
  });

  it(`should return 6 rank of 6 gamers, 0% result`, () => {
    assert.equal(`Вы заняли 6 место из 6 игроков. Это лучше, чем у 0% игроков`, getResults(gameStatistics, gamerResults4));
  });
});
