const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2022/day/6

// Part 1
let solution1;
// I need to offset the index by 4 because the first 4 characters are not part of the solution.
input
    .split('')
    .map((c, i, a) => new Set([c, a[i + 1], a[i + 2], a[i + 3]]))
    .find((a, i, f) => {
      if (a.size === 4) return (solution1 = f.indexOf(a) + 4);
    });


// Part 2
let solution2;
// I need to offset the index by 14 because the first 4 characters are not part of the solution.
input
    .split('')
    .map(
      (c, i, a) =>
        new Set([
          c,
          a[i + 1],
          a[i + 2],
          a[i + 3],
          a[i + 4],
          a[i + 5],
          a[i + 6],
          a[i + 7],
          a[i + 8],
          a[i + 9],
          a[i + 10],
          a[i + 11],
          a[i + 12],
          a[i + 13],
        ])
    )
    .find((a, i, f) => {
      if (a.size === 14) return (solution2 = f.indexOf(a) + 14);
    });

// Answer
console.log([`${solution1}`, `${solution2}`]);
