const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2022/day/2

// Bad solution
// const lines = input.split('\n');
// let foo = [];
// let fooSum = 0;
// for (let i = 0; i < lines.length; i++) {
//   if (lines[i]) {
//     fooSum += Number(lines[i]);
//   } else {
//     foo.push(fooSum);
//     fooSum = 0;
//   }
// }
//console.log(foo.sort().reverse()[0]);

// Part 1
export const part1 =  Math.max(
  ...input.split('\n\n').map((line) =>
    line
      .split('\n')
      .map((s) => Number(s))
      .reduce((a, c) => a + c, 0)
  )
).toString();

// Part 2
export const part2 = input
.split('\n\n')
.map((line) =>
  line
    .split('\n')
    .map((s) => Number(s))
    .reduce((a, c) => a + c, 0)
)
.sort()
.reverse()
.slice(0, 3)
.reduce((a, c) => a + c, 0).toString();

// Debugging
// console.log([`${part1}`, `${part2}`]);
