import * as fs from 'fs/promises';

const moves = await fs.readFile('input.txt', 'utf-8');
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

const makeMove = ([amount, start, target]) => {
  console.log(`Move ${amount} from ${start} to ${target}`);
  for (let i = 0; i < amount; i++) {
    stacks[target - 1].push(stacks[start - 1].pop());
  }
};

moves
  .split('\n')
  .filter((move) => move.match(/m+/))
  .map((move) => move.replace('move ', '').replace(' from ', ',').replace(' to ', ',').split(','))
  .forEach((move, i) => makeMove(move));
console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));

