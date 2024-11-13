/* Greed is a dice game played with five six-sided dice. Your mission, should you choose to accept it, is to score a throw according to these rules. You will always be given an array with five six-sided dice values.

 Three 1's => 1000 points
 Three 6's =>  600 points
 Three 5's =>  500 points
 Three 4's =>  400 points
 Three 3's =>  300 points
 Three 2's =>  200 points
 One   1   =>  100 points
 One   5   =>   50 point
A single die can only be counted once in each roll. For example, a given "5" can only count as part of a triplet (contributing to the 500 points) or as a single 50 points, but not both in the same roll.

Example scoring

 Throw       Score
 ---------   ------------------
 5 1 3 4 1   250:  50 (for the 5) + 2 * 100 (for the 1s)
 1 1 1 3 1   1100: 1000 (for three 1s) + 100 (for the other 1)
 2 4 4 5 4   450:  400 (for three 4s) + 50 (for the 5)
Note: your solution must not modify the input array. */

function score(dice) {
  const hashMap = new Map();

  for (let score of dice) {
    hashMap.has(score)
      ? hashMap.set(score, hashMap.get(score) + 1)
      : hashMap.set(score, 1);
  }

  const totals = Object.fromEntries(hashMap);

  const removeTriplet = (value) => {
    const newArray = dice.map((number) => number);
    for (let i = 0; i < 3; i++) {
      const index = newArray.indexOf(value);
      newArray.splice(index, 1);
    }
    return newArray;
  };

  const tripletCounter = (dieFace) => {
    if (totals[dieFace] >= 3) {
      const multiple = [2, 3, 4, 5, 6].includes(dieFace) ? 100 : 1000;
      const numbersLeft = removeTriplet(dieFace);
      return { score: dieFace * multiple, numbersLeft };
    }
  };

  const returns = (totals) => {
    const diceFaces = [1, 2, 3, 4, 5, 6];
    let returnValue;
    for (let face of diceFaces) {
      tripletCounter(face);
    }
  };

  const returnScore = (totals) => {
    if (totals[1] >= 3) {
      const numbersLeft = removeTriplet(1);
      return { score: 1000, numbersLeft };
    }
    if (totals[2] >= 3) {
      const numbersLeft = removeTriplet(2);
      return { score: 200, numbersLeft };
    }
    if (totals[3] >= 3) {
      const numbersLeft = removeTriplet(3);
      return { score: 300, numbersLeft };
    }
    if (totals[4] >= 3) {
      const numbersLeft = removeTriplet(4);
      return { score: 400, numbersLeft };
    }
    if (totals[5] >= 3) {
      const numbersLeft = removeTriplet(5);
      return { score: 500, numbersLeft };
    }
    if (totals[6] >= 3) {
      const numbersLeft = removeTriplet(6);
      return { score: 600, numbersLeft };
    } else {
      return { score: 0, numbersLeft: dice };
    }
  };

  const processing = returnScore(totals);

  function remainder(numbersLeft) {
    let sum = 0;
    for (let number of numbersLeft) {
      if (number === 1) {
        sum = sum + 100;
      }
      if (number === 5) {
        sum = sum + 50;
      }
    }
    return sum;
  }
  const lastTwoNumbersSum = remainder(processing.numbersLeft);

  const answer = lastTwoNumbersSum + processing.score;
  console.log({ answer });
}

score([2, 4, 4, 5, 4]);
