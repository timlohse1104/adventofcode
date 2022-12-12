'use strict';

import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

// Solution for https://adventofcode.com/2022/day/9

const moves = input.split('\n').map((m) => m.split(' ').map((e, i) => (i === 1 ? Number(e) : e)));

const headPos = { x: 0, y: 0 };
let headHistoryPos = { x: 0, y: 0 };
let tailPos = { x: 0, y: 0 };
const headHistory = [{ x: 0, y: 0 }];
const tailHistory = [{ x: 0, y: 0 }];

const calcDistance = () => {
  let xDistance = Math.abs(headPos.x - tailPos.x);
  let yDistance = Math.abs(headPos.y - tailPos.y);
  return xDistance + yDistance;
};

const makeMove = (type, direction) => {
  if (type === 'head') {
    switch (direction) {
      case 'U':
        headHistoryPos = { x: headPos.x, y: headPos.y };
        headPos.y++;
        headHistory.push({ x: headPos.x, y: headPos.y });
        break;
      case 'D':
        headHistoryPos = { x: headPos.x, y: headPos.y };
        headPos.y--;
        headHistory.push({ x: headPos.x, y: headPos.y });
        break;
      case 'L':
        headHistoryPos = { x: headPos.x, y: headPos.y };
        headPos.x--;
        headHistory.push({ x: headPos.x, y: headPos.y });
        break;
      case 'R':
        headHistoryPos = { x: headPos.x, y: headPos.y };
        headPos.x++;
        headHistory.push({ x: headPos.x, y: headPos.y });
    }
  } else if (type === 'tail') {
    tailPos = { x: headHistoryPos.x, y: headHistoryPos.y };
    tailHistory.push({ x: tailPos.x, y: tailPos.y });
  }
};

moves.forEach((m) => {
  if (m[1] > 1) {
    for (let i = 1; i <= m[1]; i++) {
      makeMove('head', m[0]);
      if (calcDistance() > 1) makeMove('tail');
    }
  } else {
    makeMove('head', m[0]);
    if (calcDistance() > 1) makeMove('tail');
  }
});

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

