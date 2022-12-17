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
  const tailHistory = [{ x: 0, y: 0 }];

  const getDistance = (lead, follow) => ({ x: Math.abs(lead.x - follow.x), y: Math.abs(lead.y - follow.y) });

  const makeMove = (direction) => {
    const directions = { U: { x: 0, y: 1 }, D: { x: 0, y: -1 }, L: { x: -1, y: 0 }, R: { x: 1, y: 0 } };
    // Move head first
    head.x += Math.sign(directions[direction].x);
    head.y += Math.sign(directions[direction].y);
    headHistory.push({ ...head });
    // Move tail according to distance between head and tail
    if (Math.abs(head.x - tail.x) === 2) tail.x += Math.sign(directions[direction].x);
    if (Math.abs(head.y - tail.y) === 2) tail.y += Math.sign(directions[direction].y);
    tailHistory.push({ ...tail });

    const distanceNode = getDistance(head, tail);
    if (distanceNode.x > 1) moveX(tail, tailHistory, '', distanceNode);
    if (distanceNode.y > 1) moveY(tail, tailHistory, '', distanceNode);
  };

  for (const movement of movements) {
    if (movement.distance > 1) {
      for (let i = 1; i <= movement.distance; i++) {
        makeMove(movement.direction);
      }
    } else {
      makeMove(movement.direction);
    }
  }

  return tailHistory;
}
const tailHistory = calcTailHistory(movements);

console.log(tailHistory.length);
const xY = new Set();
const uniqueTailHistory = tailHistory.filter((entry) => {
  if (xY.has(entry.x && entry.y)) {
    return false;
  }
  xY.add(entry.x, entry.y);
  return true;
});
console.log('unique', uniqueTailHistory.length);

