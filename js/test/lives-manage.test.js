import {assert} from 'chai';
import {decreaseLives} from '../utils';

const LIVES_1 = 3;
const LIVES_2 = 0;

describe(`Decrease lives`, () => {
  it(`should return 2 when lives is equal 3`, () => {
    assert.equal(2, decreaseLives(LIVES_1));
  });

  it(`should return false when lives is equal 0`, () => {
    assert.equal(0, decreaseLives(LIVES_2));
  });
});
