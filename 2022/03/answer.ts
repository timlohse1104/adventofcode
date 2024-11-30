const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2022/day/3

/**
 * Calculates the priority of rucksack reorganisation.
 *
 * priorities: a-z -> 1-26
 * priorities: A-Z -> 27-52
 *
 * @param {string} c A string containing a single character.
 * @returns {number} A number matching the priority of rucksack reorganisation.
 */
const getPriority = (c) => (c.charCodeAt(0) > 96 ? c.charCodeAt(0) - 96 : c.charCodeAt(0) - 38);

/**
 * Calculates the added priority of rucksack reorganisation.
 *
 * new Set create a collection if unique values:
 * https://www.geeksforgeeks.org/sets-in-javascript/
 *
 * @param {[string]} l An array containing two strings.
 * @returns {number} A number matching the added priority of rucksack reorganisation.
 */
const calculateDuplicateValue = (l) => {
  return [...new Set(l[0])].reduce((a, c) => {
    return a + ((l.length === 3 ? l[1].includes(c) && l[2].includes(c) : l[1].includes(c)) ? getPriority(c) : 0);
  }, 0);
};

console.log(
  'Result of day 3, part 1: ',
  input
    .split('\n')
    .map((line) => `${line.slice(0, line.length / 2)},${line.slice(line.length / 2)}`.split(','))
    .reduce((a, c) => a + calculateDuplicateValue(c), 0)
);

// Bonus
const lines = input.split('\n');
let tempArr = [];
const result = lines.map((line) => {
  if (tempArr.length === 3) tempArr = [];
  tempArr.push(line);
  if (tempArr.length === 3) return tempArr;
});
console.log(
  'Result of day 3, part 2: ',
  result
    .filter((l) => l)
    .map((l) => calculateDuplicateValue(l))
    .reduce((a, c) => a + c)
);
