const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2024/day/1

const getLineDistance = (first: number, second: number) => Math.abs(first - second);

const distances = input.split('\n').map(line => line.split(/\s+/g)).flat();
const firstHalf: number[] = [];
const secondHalf: number[] = [];

for (let i = 0; i < distances.length; i++) {
  if(i % 2 === 0) {
    firstHalf.push(parseInt(distances[i]));
  } else {
    secondHalf.push(parseInt(distances[i]));
  }
}
const sortedDistances = [firstHalf.sort(), secondHalf.sort()];

// Part 1
const solution1 = sortedDistances[0].reduce((acc, firstDistance, index) => acc + getLineDistance(firstDistance, sortedDistances[1][index]),0);

const calcSimilarityScore = (digit: number, compareList: number[]) => {
  return compareList.reduce((acc, value) => {
    if(value === digit) acc++;
    return acc;
  }, 0) * digit;
}

// Part 2
const solution2 = firstHalf.reduce((acc, value) => acc + calcSimilarityScore(value, secondHalf),0);

// Answer
console.log([`${solution1}`, `${solution2}`]);
