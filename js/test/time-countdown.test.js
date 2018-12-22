import {assert} from 'chai';
import {timeCountdown} from '../utils';

const seconds = 300;

describe(`Time countdown`, () => {
  it(`result of time countdown should be below then start value`, () => {
    assert.isBelow(timeCountdown(seconds), seconds);
  });
});
