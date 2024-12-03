const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2022/day/2

/**
 * Matches the input to the resulting value.
 *
 * @param {string} input A string containing A-C in first and X-Z in second position.
 * @returns {number} A number matching the result value of a rock-paper-scissors game.
 */
function calcResult(input: any) {
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
  const key = input as keyof typeof result;
  return result[key];
}

/**
 * Matches the input to the resulting value.
*
* @param {string} input A string containing A-C in first and X-Z in second position.
* @returns {number} A number matching the result value of a rock-paper-scissors game.
*/
function calcBonusResult(input: string) {
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
  const key = input as keyof typeof bonusResult;
  return bonusResult[key];
}

// Part 1
const solution1 = input
.split('\n')
.map((line) => line.replace(' ', ''))
.reduce((a, c) => a + calcResult(c), 0);

// Part 2
const solution2 = input
.split('\n')
.map((line) => line.replace(' ', ''))
.reduce((a, c) => a + calcBonusResult(c), 0);

// Answer
console.log([`${solution1}`, `${solution2}`]);
