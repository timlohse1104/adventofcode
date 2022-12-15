'use strict';

import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

// Solution for https://adventofcode.com/2022/day/9

const moves = input.split('\n').map((m) => m.split(' ').map((e, i) => (i === 1 ? Number(e) : e)));

let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };
const headHistory = [{ x: 0, y: 0 }];
const tailHistory = [{ x: 0, y: 0 }];

const getDistance = (lead, follow) => {
  return { x: Math.abs(lead.x - follow.x), y: Math.abs(lead.y - follow.y) };
};

const move = (node, nodeHistory, directionString, directionNode) => {
  const directions = { U: { x: 0, y: 1 }, D: { x: 0, y: -1 }, L: { x: -1, y: 0 }, R: { x: 1, y: 0 } };
  node.x += directionNode ? directionNode.x : directions[directionString].x;
  node.y += directionNode ? directionNode.y : directions[directionString].y;
  nodeHistory.push({ ...node });
};

moves.forEach((m) => {
  console.log(m);
  if (m[1] > 1) {
    for (let i = 1; i <= m[1]; i++) {
      move(head, headHistory, m[0]);
      const distanceNode = getDistance(head, tail);
      if (distanceNode.x > 1 || distanceNode.y > 1) move(tail, tailHistory, '', distanceNode);
    }
  } else {
    move(head, headHistory, m[0]);
    const distanceNode = getDistance(head, tail);
    if (distanceNode.x > 1 || distanceNode.y > 1) move(tail, tailHistory, '', distanceNode);
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

