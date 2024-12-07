const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);
const encoder = new TextEncoder();

// Solution for https://adventofcode.com/2024/day/06

// const positionMap = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`.split('\n').map(line => line.split(''));
const positionMap = input.split('\n').map(line => line.split(''));

type Position = {
  x: number;
  y: number;
}

type Direction = {
  x: number;
  y: number;
  key: string;
  char: string;
}

const rightDirection: Direction = {x: 1, y: 0, key: 'right', char: '>'};
const leftDirection: Direction = {x: -1, y: 0, key: 'left', char: "<"};
const upDirection: Direction = {x: 0, y: -1, key: 'up', char: '^'};
const downDirection: Direction = {x: 0, y: 1, key: 'down', char: 'v'};
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
const movePointer = (oldPos: Position, direction: Direction): Position => {
  positionMap[oldPos.y][oldPos.x] = traveledPosChar;

  const newPos: Position = {x: oldPos.x + direction.x, y: oldPos.y + direction.y};
  if (isInBounds(newPos) && positionMap[newPos.y][newPos.x] !== collisionChar) {
    switch (direction.key) {
      case 'right':
        positionMap[newPos.y][newPos.x] = rightDirection.char;
        break;
      case 'left':
        positionMap[newPos.y][newPos.x] = leftDirection.char;
        break;
      case 'up':
        positionMap[newPos.y][newPos.x] = upDirection.char;
        break;
      case 'down':
        positionMap[newPos.y][newPos.x] = downDirection.char;
        break;
    }
  }
  return newPos;
}

/**
 * Rotates a direction 90 degrees clockwise.
 *
 * @param direction The direction to rotate.
 * @returns Rotated direction.
 */
const rotateDirection = (direction: Direction): Direction => {
  switch (direction.key) {
    case rightDirection.key:
      return downDirection;
    case downDirection.key:
      return leftDirection;
    case leftDirection.key:
      return upDirection;
    default:
      return rightDirection
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
  const nextChar = positionMap[nextPos.y]?.[nextPos.x];

  if(!nextChar || nextChar === noCollisionChar || nextChar === traveledPosChar) return direction;

  // Only other chars in position map are collisionChars
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
    case rightDirection.char:
      return rightDirection;
    case leftDirection.char:
      return leftDirection;
    case upDirection.char:
      return upDirection;
    default:
      return downDirection;
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

/**
 * Returns the start position of the pointer on the map.
 *
 * @returns position of the pointer's starting location or null if not found.
 */
const getPointerStartPos = (): Position | null => {
  let pointerPos: Position | null = null;
  positionMap.some((row, rowIndex) => {
    const upColumIndex = row.indexOf(upDirection.char)
    if(upColumIndex !== -1) pointerPos = {x: upColumIndex, y: rowIndex};
  });
  return pointerPos;
}

/**
 *  Simulates the pointer movement in the position map by continuously updating its position and direction until a stopping condition is met.
 */
const simulatePointerMovement = () => {
  let pointerPos = getPointerStartPos();
  if(!pointerPos) throw new Error('Pointer start position could not be found!');

  while(isInBounds(pointerPos)) {
    const direction = parsePointerDirection(pointerPos);
    const nextDirection = getNextPointerDirection(pointerPos, direction);

    const newPointerPos = movePointer(pointerPos, nextDirection);

    // Set pointer pos to not risk endlessly looping!
    pointerPos = newPointerPos;
  }

  return
}


// Part 1
simulatePointerMovement();
Deno.writeFileSync('output.txt', encoder.encode(positionMap.map(row => row.join('')).join('\n')));
const solution1 = getTraveledLocationCount();

// Part 2
const solution2 = '';

// Answer
console.log([`${solution1}`, `${solution2}`]);