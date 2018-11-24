import {assert} from 'chai';

let seconds = 300;

function timeCountdown(_seconds) {
  return --_seconds;
}

describe(`Time countdown`, () => {
  it(`result of time countdown should be below then start value`, () => {
    assert.isBelow(timeCountdown(seconds), seconds);
  });
});
