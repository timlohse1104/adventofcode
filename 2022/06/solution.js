'use strict';

import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

// Solution for https://adventofcode.com/2022/day/6

let foundAt;

// I need to offset the index by 4 because the first 4 characters are not part of the solution.
console.log(
  input
    .split('')
    .map((c, i, a) => new Set([c, a[i + 1], a[i + 2], a[i + 3]]))
    .find((a, i, f) => {
      if (a.size === 4) return (foundAt = f.indexOf(a) + 4);
    }),
  foundAt
);

// Bonus
// I need to offset the index by 14 because the first 4 characters are not part of the solution.
console.log(
  input
    .split('')
    .map(
      (c, i, a) =>
        new Set([
          c,
          a[i + 1],
          a[i + 2],
          a[i + 3],
          a[i + 4],
          a[i + 5],
          a[i + 6],
          a[i + 7],
          a[i + 8],
          a[i + 9],
          a[i + 10],
          a[i + 11],
          a[i + 12],
          a[i + 13],
        ])
    )
    .find((a, i, f) => {
      if (a.size === 14) return (foundAt = f.indexOf(a) + 14);
    }),
  foundAt
);

