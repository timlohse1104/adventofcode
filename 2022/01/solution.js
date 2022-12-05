'use strict';

import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

// Solution for https://adventofcode.com/2022/day/2

// Bad solution
// const lines = input.split('\n');
// let foo = [];
// let fooSum = 0;
// for (let i = 0; i < lines.length; i++) {
//   if (lines[i]) {
//     fooSum += Number(lines[i]);
//   } else {
//     foo.push(fooSum);
//     fooSum = 0;
//   }
// }
//console.log(foo.sort().reverse()[0]);

// Good solution
console.log(
  'Result of day 1, part 1: ',
  Math.max(
    ...input.split('\n\n').map((line) =>
      line
        .split('\n')
        .map((s) => Number(s))
        .reduce((a, c) => a + c, 0)
    )
  )
);

// Bonus
console.log(
  'Result of day 1, part 2: ',
  input
    .split('\n\n')
    .map((line) =>
      line
        .split('\n')
        .map((s) => Number(s))
        .reduce((a, c) => a + c, 0)
    )
    .sort()
    .reverse()
    .slice(0, 3)
    .reduce((a, c) => a + c, 0)
);

