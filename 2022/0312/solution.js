import * as fs from "fs/promises";

const input = await fs.readFile("input.txt", "utf-8");

// priorities: a-z -> 1-26
// const small = 'abcdefghijklmnopqrstuvwxyz';
// Array.from(small).map((char) => console.log(char, char.charCodeAt(0), 'priority: ', char.charCodeAt(0) - 96));
// priorities: A-Z -> 27-52
// const large = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// Array.from(large).map((char) => console.log(char, char.charCodeAt(0), 'priority: ', char.charCodeAt(0) - 38));

const getPrio = (c) =>
  c.charCodeAt(0) > 96 ? c.charCodeAt(0) - 96 : c.charCodeAt(0) - 38;

// new Set create a collection if unique values: https://www.geeksforgeeks.org/sets-in-javascript/
const calculateDuplicateValue = (l) => {
  return [...new Set(l[0])].reduce((a, c) => {
    return (
      a +
      ((
        l.length === 3 ? l[1].includes(c) && l[2].includes(c) : l[1].includes(c)
      )
        ? getPrio(c)
        : 0)
    );
  }, 0);
};

console.log(
  input
    .split("\n")
    .map((line) =>
      `${line.slice(0, line.length / 2)},${line.slice(line.length / 2)}`.split(
        ","
      )
    )
    .reduce((a, c) => a + calculateDuplicateValue(c), 0)
);

// Bonus
const lines = input.split("\n");
let tempArr = [];
const result = lines.map((line) => {
  if (tempArr.length === 3) tempArr = [];
  tempArr.push(line);
  if (tempArr.length === 3) return tempArr;
});
console.log(
  "Bonus: ",
  result
    .filter((l) => l)
    .map((l) => calculateDuplicateValue(l))
    .reduce((a, c) => a + c)
);