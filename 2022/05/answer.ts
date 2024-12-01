const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const moves = decoder.decode(data);

// Solution for https://adventofcode.com/2022/day/5

const stacks = [
  ['L', 'N', 'W', 'T', 'D'],
  ['C', 'P', 'H'],
  ['W', 'P', 'H', 'N', 'D', 'G', 'M', 'J'],
  ['C', 'W', 'S', 'N', 'T', 'Q', 'L'],
  ['P', 'H', 'C', 'N'],
  ['T', 'H', 'N', 'D', 'M', 'W', 'Q', 'B'],
  ['M', 'B', 'R', 'J', 'G', 'S', 'L'],
  ['Z', 'N', 'W', 'G', 'V', 'B', 'R', 'T'],
  ['W', 'G', 'D', 'N', 'P', 'L'],
];

/**
 * Moves a number of items one-by-one from one stack to another.
 *
 * @param {[number]} [number] An array containing three numbers which are movement instructions.
 */
const makeMove = ([amount, start, target]) => {
  for (let i = 0; i < amount; i++) {
    stacks[target - 1].push(stacks[start - 1].pop());
  }
};

moves
  .split('\n')
  .filter((move) => move.match(/m+/))
  .map((move) => move.replace('move ', '').replace(' from ', ',').replace(' to ', ',').split(','))
  .forEach((move) => makeMove(move));
const solution1 = stacks.map((stack) => stack[stack.length - 1]).join('');

// Bonus
const bonusStacks = [
  ['L', 'N', 'W', 'T', 'D'],
  ['C', 'P', 'H'],
  ['W', 'P', 'H', 'N', 'D', 'G', 'M', 'J'],
  ['C', 'W', 'S', 'N', 'T', 'Q', 'L'],
  ['P', 'H', 'C', 'N'],
  ['T', 'H', 'N', 'D', 'M', 'W', 'Q', 'B'],
  ['M', 'B', 'R', 'J', 'G', 'S', 'L'],
  ['Z', 'N', 'W', 'G', 'V', 'B', 'R', 'T'],
  ['W', 'G', 'D', 'N', 'P', 'L'],
];
/**
 * Moves a number of items at a time from one stack to another.
 *
 * @param {[number]} [number] An array containing three numbers which are movement instructions.
 */
const makeBonusMove = ([amount, start, target]) => {
  bonusStacks[target - 1] = [...bonusStacks[target - 1], ...bonusStacks[start - 1].splice(-amount)];
};

moves
  .split('\n')
  .filter((move) => move.match(/m+/))
  .map((move) => move.replace('move ', '').replace(' from ', ',').replace(' to ', ',').split(','))
  .forEach((move) => makeBonusMove(move));
const solution2 = bonusStacks.map((stack) => stack[stack.length - 1]).join('');

console.log([`${solution1}`, `${solution2}`]);
