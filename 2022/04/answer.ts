const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2022/day/4

// First try: Not working due to implicit type conversion?
// Idea was to create a long string containing all numbers between the two numbers in the assignment.
// const translateAssingments = (s) => {
//   const first = s.slice(0, s.indexOf('-'));
//   const second = s.slice(s.indexOf('-') + 1);
//   const calcNumbers = (a, b) => {
//     let n = '';
//     for (let i = Number(a); i < Number(b); i++) {
//       n += `${i},`;
//     }
//     return n;
//   };
//   return first !== second ? `${calcNumbers(first, second)}${second}` : first;
// };

// console.log(
//   input
//     .split('\n')
//     .map((l) => l.split(',').map((assingment) => translateAssingments(assingment)))
//     .filter((e) => e[1].includes(e[0]) || e[0].includes(e[1])).length
// );

const solution1 = input
.split('\n')
.map((l) => l.split(',').map((s) => s.split('-')))
.filter(
  (l) =>
    (Number(l[0][0]) >= Number(l[1][0]) && Number(l[0][1]) <= Number(l[1][1])) ||
    (Number(l[1][0]) >= Number(l[0][0]) && Number(l[1][1]) <= Number(l[0][1]))
).length;

// Bonus
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
