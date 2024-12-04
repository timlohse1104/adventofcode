const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2024/day/4

type Position = {
  x: number;
  y: number
}

type Direction = {
  x: number;
  y: number;
}

const letterMatrix = input.split('\n').map(line => line.split(''));
const targetWord = "XMAS";
const targetWordArray = targetWord.split('');
/* All possible directions:
* top-center,
* top-right
* center-right
* bottom-right
* bottom-center
* bottom-left
* center-left
* top-left
**/
const directions: Direction[] = [{x: 0, y: -1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: -1, y: 1}, {x: -1, y: 0}, {x: -1, y: -1}]

const isNextLetterValid = (origin: string, target: string) => {
  if(!(targetWordArray.includes(origin))) return false;
  const originLetterIndex = targetWordArray.indexOf(origin);
  return targetWordArray[originLetterIndex + 1] === target;
}
const isLetterInBounds = (position: Position) => {
  return  position.x >= 0 && position.x < letterMatrix.length && position.y >= 0 && position.y < letterMatrix[0].length
}
const isWordInDirection = (firstLetterPos: Position, direction: Direction): boolean => {
  let lastLetterPos: Position = {x: firstLetterPos.x, y: firstLetterPos.y};
  for(let i = 1; i < targetWordArray.length; i++) {
    const nextLetterPos = {x: lastLetterPos.x + direction.x, y: lastLetterPos.y + direction.y}
    if(!isLetterInBounds(nextLetterPos)) return false;
    const lastLetter = letterMatrix[lastLetterPos.y][lastLetterPos.x];
    const nextLetter = letterMatrix[nextLetterPos.y][nextLetterPos.x];
    if(!isNextLetterValid(lastLetter, nextLetter)) return false;
    lastLetterPos = nextLetterPos;
  }
  return true;
}
const isValidFirstLetter = (letter: string) => {
  return targetWordArray[0] === letter;
}
const searchValidWordsFromPosition = (letterPos: Position): number => {
  return directions.reduce((acc, direction) => acc + (isWordInDirection(letterPos, direction) ? 1 : 0), 0);
}

console.log(letterMatrix.reduce((acc, line, lineIndex) =>
  acc + line.reduce((acc, letter, letterIndex) => acc + (isValidFirstLetter(letter) ? searchValidWordsFromPosition({y: lineIndex, x: letterIndex}): 0), 0), 0));

// Part 1
const solution1 = '';

// Part 2
const solution2 = '';

// Answer
console.log([`${solution1}`, `${solution2}`]);
