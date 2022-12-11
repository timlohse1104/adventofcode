"use strict";

import * as fs from "fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

// Solution for https://adventofcode.com/2022/day/9

const moves = input
  .split("\n")
  .map((m) => m.split(" ").map((e, i) => (i === 1 ? Number(e) : e)));

const headPos = { x: 0, y: 0 };
let headHistoryPos = { x: 0, y: 0 };
let tailPos = { x: 0, y: 0 };
const headHistory = [{ x: 0, y: 0 }];
const tailHistory = [{ x: 0, y: 0 }];

const calcDistance = () => {
  let xDistance = headPos.x - tailPos.x;
  let yDistance = headPos.y - tailPos.y;
  return (
    (xDistance < 0 ? -xDistance : xDistance) +
    (yDistance < 0 ? -yDistance - 1 : yDistance - 1)
  );
};

const makeMove = (type, direction) => {
  if (type === "head") {
    switch (direction) {
      case "U":
        headHistoryPos = { ...headPos };
        headPos.y++;
        headHistory.push(headPos);
        break;
      case "D":
        headHistoryPos = { ...headPos };
        headPos.y--;
        headHistory.push(headPos);
        break;
      case "L":
        headHistoryPos = { ...headPos };
        headPos.x--;
        headHistory.push(headPos);
        break;
      case "R":
        headHistoryPos = { ...headPos };
        headPos.x++;
        headHistory.push(headPos);
    }
  } else if (type === "tail") {
    tailPos = { ...headHistoryPos };
    tailHistory.push(tailPos);
  }
};

moves.forEach((m) => {
  if (m[1] > 1) {
    for (let i = 1; i <= m[1]; i++) {
      makeMove("head", m[0]);
      calcDistance() > 1 ? makeMove("tail") : 0;
    }
  } else {
    makeMove("head", m[0]);
    calcDistance() > 1 ? makeMove("tail") : 0;
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
console.log("unique", uniqueTailHistory.length);
