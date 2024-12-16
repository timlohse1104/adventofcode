const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2024/day/06

// const testInput = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`.split('\n').map(line => line.split(''));
const partOneInput = input.split('\n').map(line => line.split(''));
const partTwoInput = JSON.parse(JSON.stringify(partOneInput)) as string[][];

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

/**
 * Calculates if a given position is within the bounds of the position map.
 *
 * @param position The position to check.
 * @returns boolean indicating if the position is within bounds.
 */
// const isInBounds = (position: Position, positionMap: string[][]): boolean => {
//   return  position.x >= 0 && position.x < positionMap.length && position.y >= 0 && position.y < positionMap[0].length
// }
const isInBounds = (position: Position, positionMap: string[][]): boolean => {
  return position.y >= 0 && position.y < positionMap.length
      && position.x >= 0 && position.x < positionMap[0].length;
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
 * Returns the start position of the pointer on the map.
 *
 * @returns position of the pointer's starting location or null if not found.
 */
const getPointerStartPos = (positionMap: string[][]): Position | null => {
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
// const simulatePointerMovement = (
//   positionMap: string[][],
//   detectLoop = false
// ): { map: string[][]; isLoop: boolean } => {
//   let pointerPos = getPointerStartPos(positionMap);
//   if (!pointerPos) throw new Error("Pointer start position could not be found!");

//   const visitedStates = new Set<string>(); // Track visited states as "x,y,direction"
//   let traversedMap: string[][] = [];
//   let isLoopDetected = false;

//   while (isInBounds(pointerPos as Position, positionMap)) {
//     const direction = parsePointerDirection(pointerPos as Position, positionMap);
//     const stateKey = `${pointerPos.x},${pointerPos.y},${direction.key}`;

//     if (detectLoop) {
//       if (visitedStates.has(stateKey)) {
//         // Loop detected if the same state is visited again
//         isLoopDetected = true;
//         break;
//       }
//       visitedStates.add(stateKey);
//     }

//     const nextDirection = getNextPointerDirection(
//       pointerPos as Position,
//       direction,
//       positionMap
//     );

//     const moveOutput = movePointer(
//       pointerPos as Position,
//       nextDirection,
//       positionMap
//     );
//     traversedMap = moveOutput.map;

//     // Update pointer position
//     pointerPos = moveOutput.pos;
//   }

//   return { map: traversedMap, isLoop: isLoopDetected };
// };
const simulatePointerMovement = (
  originalMap: string[][],
  detectLoop = false
): { isLoop: boolean } => {
  // Make a copy so we can replace the starting cell with '.'
  const positionMap = JSON.parse(JSON.stringify(originalMap)) as string[][];

  const startPos = getPointerStartPos(positionMap);
  if (!startPos) throw new Error("Pointer start position could not be found!");
  const startDir = getInitialDirection(positionMap, startPos);

  // Replace the start cell with '.' so guard sees floor
  positionMap[startPos.y][startPos.x] = '.';

  let currentPos = { ...startPos };
  let currentDir = { ...startDir };

  const visitedStates = new Set<string>();
  let isLoopDetected = false;

  while (isInBounds(currentPos, positionMap)) {
    const stateKey = `${currentPos.x},${currentPos.y},${currentDir.key}`;
    if (detectLoop) {
      if (visitedStates.has(stateKey)) {
        isLoopDetected = true;
        break;
      }
      visitedStates.add(stateKey);
    }

    // Check the cell ahead
    const forwardPos = { x: currentPos.x + currentDir.x, y: currentPos.y + currentDir.y };
    if (!isInBounds(forwardPos, positionMap)) {
      // Next step is out of bounds, guard leaves
      break;
    }

    const forwardChar = positionMap[forwardPos.y][forwardPos.x];
    if (forwardChar === '#') {
      // Turn right, don't move this step
      currentDir = rotateDirection(currentDir);
    } else {
      // Move forward
      currentPos = forwardPos;
    }
  }

  return { isLoop: isLoopDetected };
};

/**
 * Simulates the guard's route without modifying obstacles or marking the map.
 * Returns a Set of all visited positions.
 */
function getVisitedPositionsWithoutModifyingMap(originalMap: string[][]): Set<string> {
  const mapCopy = JSON.parse(JSON.stringify(originalMap)) as string[][];
  const startPos = getPointerStartPos(mapCopy);
  if (!startPos) throw new Error("No start position found!");

  const startDir = getInitialDirection(mapCopy, startPos);
  // Replace the start cell with '.'
  mapCopy[startPos.y][startPos.x] = '.';

  const visitedPositions = new Set<string>();
  let currentPos = { ...startPos };
  let currentDir = { ...startDir };

  visitedPositions.add(`${currentPos.x},${currentPos.y}`);

  while (true) {
    const forwardPos = { x: currentPos.x + currentDir.x, y: currentPos.y + currentDir.y };
    if (!isInBounds(forwardPos, mapCopy)) {
      // Guard leaves map
      break;
    }

    const forwardChar = mapCopy[forwardPos.y][forwardPos.x];
    if (forwardChar === '#') {
      // Turn right
      currentDir = rotateDirection(currentDir);
    } else {
      // Move forward
      currentPos = forwardPos;
      visitedPositions.add(`${currentPos.x},${currentPos.y}`);
    }
  }

  return visitedPositions;
}

/**
 * Determines the initial direction of the guard from the starting position.
 */
function getInitialDirection(positionMap: string[][], pointerPos: Position): Direction {
  const currentChar = positionMap[pointerPos.y][pointerPos.x];
  switch (currentChar) {
    case '^': return upDirection;
    case '>': return rightDirection;
    case '<': return leftDirection;
    case 'v': return downDirection;
    default:
      throw new Error("No valid initial direction character found at the guard's start.");
  }
}

/**
 * Runs a simulation of the guard's original route without modifying the map's obstacles or paths.
 * It only turns and moves the guard logically and records visited positions.
 * After determining the start, the starting cell is replaced with '.' so that
 * the guard treats it as empty space.
 */
const getVisitedPositions = (originalMap: string[][]): Set<string> => {
  const mapCopy = JSON.parse(JSON.stringify(originalMap)) as string[][];

  const startPos = getPointerStartPos(mapCopy);
  if (!startPos) throw new Error("Pointer start position not found!");

  const startDir = getInitialDirection(mapCopy, startPos);

  // Replace the starting cell with '.' to ensure consistent behavior
  mapCopy[startPos.y][startPos.x] = '.';

  const visitedPositions = new Set<string>();
  let currentPos = { ...startPos };
  let currentDir = { ...startDir };

  visitedPositions.add(`${currentPos.x},${currentPos.y}`);

  while (true) {
    const forwardPos = { x: currentPos.x + currentDir.x, y: currentPos.y + currentDir.y };

    if (!isInBounds(forwardPos, mapCopy)) {
      // Guard leaves the map
      break;
    }

    const forwardChar = mapCopy[forwardPos.y][forwardPos.x];

    if (forwardChar === '#') {
      // Turn right and don't move
      currentDir = rotateDirection(currentDir);
    } else {
      // Move forward
      currentPos = forwardPos;
      visitedPositions.add(`${currentPos.x},${currentPos.y}`);
    }
  }

  return visitedPositions;
};

/**
 * Attempts to place a single obstruction (`#`) in visited empty spaces to see if it would cause a loop.
 * We only consider cells that were visited in the original run (no obstruction added) to avoid large, irrelevant counts.
 *
 * @param originalMap The original map of the lab (unmodified).
 * @returns The count of positions where placing an obstruction leads to a loop.
 */
const countObstructionPositionsThatCauseLoop = (originalMap: string[][]): number => {
  // Identify the guard's starting position
  const startPos = getPointerStartPos(originalMap);
  if (!startPos) throw new Error("Pointer start position not found!");

  // Get all visited positions in the original scenario
  const visitedPositions = getVisitedPositions(originalMap);

  let loopCount = 0;

  // We'll make a copy of the original map to test placing obstacles
  const mapCopy = JSON.parse(JSON.stringify(originalMap)) as string[][];

  for (const pos of visitedPositions) {
    const [xStr, yStr] = pos.split(',');
    const x = Number(xStr);
    const y = Number(yStr);

    // Skip if this is the start position or not a '.' cell
    if ((x === startPos.x && y === startPos.y) || mapCopy[y][x] !== '.') {
      continue;
    }

    // Place a temporary obstruction
    mapCopy[y][x] = '#';

    // Simulate with detectLoop = true
    const { isLoop } = simulatePointerMovement(JSON.parse(JSON.stringify(mapCopy)), true);
    if (isLoop) {
      loopCount++;
    }

    // Remove the temporary obstruction
    mapCopy[y][x] = '.';
  }

  return loopCount;
};

// Part 1
export const part1 = getVisitedPositionsWithoutModifyingMap(partOneInput).size.toString();

// Part 2
export const part2 = countObstructionPositionsThatCauseLoop(partTwoInput).toString();;

// Answer
console.log([`${part1}`, `${part2}`]);