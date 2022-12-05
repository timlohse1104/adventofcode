'use strict';

import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

// Solution for https://adventofcode.com/2022/day/2

/**
 * Matches the input to the resulting value.
 *
 * @param {string} input A string containing A-C in first and X-Z in second position.
 * @returns {number} A number matching the result value of a rock-paper-scissors game.
 */
function calcResult(input) {
  // A: Rock, B: Paper, C: Scissors
  // X: Rock, Y: Paper, Z: Scissors
  // 0: Loss, 3: Draw, 6: Win
  // 1: Rock, 2: Paper, 3: Scissors
  const result = {
    AX: 4,
    AY: 8,
    AZ: 3,
    BX: 1,
    BY: 5,
    BZ: 9,
    CX: 7,
    CY: 2,
    CZ: 6,
  };
  return result[input];
}

console.log(
  'Result of day 2, part 1: ',
  input
    .split('\n')
    .map((line) => line.replace(' ', ''))
    .reduce((a, c) => a + calcResult(c), 0)
);

// Bonus
/**
 * Matches the input to the resulting value.
 *
 * @param {string} input A string containing A-C in first and X-Z in second position.
 * @returns {number} A number matching the result value of a rock-paper-scissors game.
 */
function calcBonusResult(input) {
  // A: Rock, B: Paper, C: Scissors
  // X: Lose, Y: Draw, Z: Win
  // 0: Loss, 3: Draw, 6: Win
  // 1: Rock, 2: Paper, 3: Scissors
  const bonusResult = {
    AX: 3,
    AY: 4,
    AZ: 8,
    BX: 1,
    BY: 5,
    BZ: 9,
    CX: 2,
    CY: 6,
    CZ: 7,
  };
  return bonusResult[input];
}

console.log(
  'Result of day 2, part 2: ',
  input
    .split('\n')
    .map((line) => line.replace(' ', ''))
    .reduce((a, c) => a + calcBonusResult(c), 0)
);

