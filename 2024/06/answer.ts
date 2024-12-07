const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2024/day/06

const positionMap = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.split('\n').map(line => line.split(''));

type Position = {
  x: number;
  y: number;
}

type Direction = {
  x: number;
  y: number;
  key: string;
}

const right: Direction = {x: 1, y: 0, key: 'right'};
const left: Direction = {x: -1, y: 0, key: 'left'};
const up: Direction = {x: 0, y: -1, key: 'up'};
const down: Direction = {x: 0, y: 1, key: 'down'};
const noCollisionChar = '.';
const collisionChar = '#';
const traveledPosChar = 'X';

/**
 * Calculates if a given position is within the bounds of the position map.
 *
 * @param position The position to check.
 * @returns boolean indicating if the position is within bounds.
 */
const isInBounds = (position: Position) => {
  return  position.x >= 0 && position.x < positionMap.length && position.y >= 0 && position.y < positionMap[0].length
}

/**
 * Moves the pointer within the position map.
 *
 * @param oldPos The old position of the pointer to move from.
 * @param newPos The new position of the pointer to move to.
 * @param direction The pointer direction the pointer is moving in.
 */
const movePointer = (oldPos: Position, newPos: Position, direction: Direction) => {
  // add . at old position in map
  positionMap[oldPos.y][oldPos.x] = traveledPosChar;
  // move ^ to next location
  switch (direction.key) {
    case 'right':
      positionMap[newPos.y][newPos.x] = '>';
      break;
    case 'left':
      positionMap[newPos.y][newPos.x] = '<';
      break;
    case 'up':
      positionMap[newPos.y][newPos.x] = '^';
      break;
    case 'down':
      positionMap[newPos.y][newPos.x] = 'v';
      break;
  }
}

/**
 * Rotates a direction 90 degrees clockwise.
 *
 * @param direction The direction to rotate.
 * @returns Rotated direction.
 */
const rotateDirection = (direction: Direction): Direction => {
  switch (direction.key) {
    case 'right':
      return down;
    case 'down':
      return left;
    case 'left':
      return up;
    default:
      return right
  }
}

/**
 * Calculates the next pointer direction based on the current map character.
 *
 * @param position The current position of the pointer.
 * @param direction The current direction of the pointer.
 * @returns The next pointer direction after evaluating the current map character.
 */
const getNextPointerDirection = (position: Position, direction: Direction): Direction => {
  const nextPos = {x: position.x + direction.x, y: position.y + direction.y};
  const nextChar = positionMap[nextPos.y][nextPos.x];

  if(nextChar === noCollisionChar || nextChar === traveledPosChar) return direction;

  return rotateDirection(direction);
}

/**
 * Parses the current cursor direction.
 *
 * @param pointerPos Current pointer position.
 * @returns The parsed direction based on the current map character.
 */
const parsePointerDirection = (pointerPos: Position): Direction => {
  const currentChar = positionMap[pointerPos.y][pointerPos.x];
  switch (currentChar) {
    case '>':
      return right;
    case '<':
      return left;
    case '^':
      return up;
    default:
      return down;
  }
}

/**
 * Calculates the number of positions the pointer has traveled over, marked by 'X'.
 *
 * @returns The number of traveled locations as marked on the map.
 */
const getTraveledLocationCount = (): number => {
  return positionMap.reduce((count, row) => count + row.filter(char => char === traveledPosChar).length, 0);
}

// Part 1
const solution1 = '';

// Part 2
const solution2 = '';

// Answer
console.log([`${solution1}`, `${solution2}`]);