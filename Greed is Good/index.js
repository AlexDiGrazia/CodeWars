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

  const returnScore = () => {
    totals[1] >= 3 ? 1000 : null;
    totals[2] >= 3 ? 200 : null;
    totals[3] >= 3 ? 300 : null;
    totals[4] >= 3 ? 400 : null;
    totals[5] >= 3 ? 500 : null;
    totals[6] >= 3 ? 600 : null;
  };
}

score([5, 1, 3, 4, 1]);