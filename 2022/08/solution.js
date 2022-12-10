'use strict';

import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

// Solution for https://adventofcode.com/2022/day/8

// look around
// left/right/top/bottom neighbor? - no: exposed, yes: compare height of alle neighbors -> lower: exposed, higher/equal: not exposed

const grid = input.split('\n').map((l) => l.split('').map((e) => Number(e)));
const getNeighbors = (grid, x, y) => {
  const neighbors = { left: [], right: [], top: [], bottom: [] };
  for (let i = 1; i <= 100; i++) {
    if (grid[y - i]) neighbors.top.push(grid[y - i][x]);
    if (grid[y + i]) neighbors.bottom.push(grid[y + i][x]);
    if (grid[y][x - i] || grid[y][x - i] === 0) neighbors.left.push(grid[y][x - i]);
    if (grid[y][x + i] || grid[y][x + i] === 0) neighbors.right.push(grid[y][x + i]);
  }
  return neighbors;
};

const isExposed = (c, n) => {
  return (
    n.left.filter((e) => e >= c).length === 0 ||
    n.right.filter((e) => e >= c).length === 0 ||
    n.top.filter((e) => e >= c).length === 0 ||
    n.bottom.filter((e) => e >= c).length === 0
  );
};

const getRowExposedCount = (r, y, g) => {
  const foo = r.reduce((a, c, i) => {
    const neighbors = getNeighbors(g, i, y);
    return a + (Object.values(neighbors).filter((n) => n.length > 0).length < 4 ? 1 : isExposed(c, neighbors) ? 1 : 0);
  }, 0);
  console.log('exposedCount', 'line', y, 'is', foo);
  return foo;
};

console.log(grid.reduce((a, c, i, g) => a + getRowExposedCount(c, i, g), 0));

