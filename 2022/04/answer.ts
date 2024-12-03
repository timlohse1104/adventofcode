const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2022/day/4

// Part 1
const solution1 = input
.split('\n')
.map((l) => l.split(',').map((s) => s.split('-')))
.filter(
  (l) =>
    (Number(l[0][0]) >= Number(l[1][0]) && Number(l[0][1]) <= Number(l[1][1])) ||
    (Number(l[1][0]) >= Number(l[0][0]) && Number(l[1][1]) <= Number(l[0][1]))
).length;

// Part 2
const solution2 = input
.split('\n')
.map((l) => l.split(',').map((s) => s.split('-')))
.filter(
  (l) =>
    (Number(l[0][0]) >= Number(l[1][0]) && Number(l[0][0]) <= Number(l[1][1])) ||
    (Number(l[0][1]) >= Number(l[1][0]) && Number(l[0][1]) <= Number(l[1][1])) ||
    (Number(l[1][0]) >= Number(l[0][0]) && Number(l[1][0]) <= Number(l[0][1])) ||
    (Number(l[1][1]) >= Number(l[0][0]) && Number(l[1][1]) <= Number(l[0][1]))
).length;

// Answer
console.log([`${solution1}`, `${solution2}`]);
