import {assert} from 'chai';

const QUESTIONS_AMOUNT = 10;
const LIVES = 3;

function calculateTotalScore(answersArr, lives) {
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

const answersArr1 = [
  {right: true, time: 40}
];

const answersArr2 = [
  {right: true, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
];

const answersArr3 = [
  {right: true, time: 10},
  {right: true, time: 10},
  {right: true, time: 10},
  {right: true, time: 10},
  {right: true, time: 10},
  {right: true, time: 10},
  {right: true, time: 10},
  {right: true, time: 10},
  {right: true, time: 10},
  {right: true, time: 10},
];

const answersArr4 = [
  {right: true, time: 40},
  {right: false, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
  {right: false, time: 40},
  {right: true, time: 40},
  {right: false, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
];

const answersArr5 = [
  {right: true, time: 10},
  {right: false, time: 40},
  {right: true, time: 10},
  {right: true, time: 10},
  {right: false, time: 40},
  {right: true, time: 10},
  {right: true, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
  {right: true, time: 40},
];


describe(`Calculate total score`, () => {
  it(`should return -1 when answers amount less then 10`, () => {
    assert.equal(-1, calculateTotalScore(answersArr1, 3));
  });

  it(`should return 10 when all answers are right, but all slowly`, () => {
    assert.equal(10, calculateTotalScore(answersArr2, 3));
  });

  it(`should return 20 when all answers are right and all fast`, () => {
    assert.equal(20, calculateTotalScore(answersArr3, 3));
  });

  it(`should return 1 when 7 answers are right all slowly and 3 mistakes`, () => {
    assert.equal(1, calculateTotalScore(answersArr4, 0));
  });

  it(`should return 8 when 8 answers are right 4 fast 4 slow and 2 mistakes`, () => {
    assert.equal(8, calculateTotalScore(answersArr5, 1));
  });
});


