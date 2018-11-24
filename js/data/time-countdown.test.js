import {assert} from 'chai';
import {timeCountdown} from '../utils';

let seconds = 300;

describe(`Time countdown`, () => {
  it(`result of time countdown should be below then start value`, () => {
    assert.isBelow(timeCountdown(seconds), seconds);
  });
});
