'use strict';

import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

// Solution for https://adventofcode.com/2022/day/9

const movements = input
  .split('\n')
  .map((m) => m.split(' '))
  .map((e) => ({
    direction: e[0],
    distance: Number(e[1]),
  }));

function calcTailHistory(movements) {
  let head = { x: 0, y: 0 };
  let tail = { x: 0, y: 0 };
  const headHistory = [{ x: 0, y: 0 }];
  const tailHistory = new Set();
  tailHistory.add('x: 0, y: 0');

  const getDistance = (lead, follow) => ({ x: lead.x - follow.x, y: lead.y - follow.y });

  const makeMove = (direction) => {
    const directions = { U: { x: 0, y: 1 }, D: { x: 0, y: -1 }, L: { x: -1, y: 0 }, R: { x: 1, y: 0 } };
    const { x, y } = directions[direction];
    head.x += Math.sign(x);
    head.y += Math.sign(y);
    headHistory.push({ ...head });
    const distance = getDistance(head, tail);
    if (Math.abs(distance.x) > 1 || Math.abs(distance.y) > 1) {
      tail.x += Math.sign(distance.x);
      tail.y += Math.sign(distance.y);
      tailHistory.add(`x: ${tail.x}, y: ${tail.y}`);
    }
  };

  for (const movement of movements) {
    if (movement.distance > 1) {
      for (let i = 0; i < movement.distance; i++) {
        makeMove(movement.direction);
      }
    } else {
      makeMove(movement.direction);
    }
  }

  return tailHistory;
}
const tailHistory = calcTailHistory(movements);
console.log(tailHistory.size);
