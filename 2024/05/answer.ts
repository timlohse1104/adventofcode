const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2024/day/05

// Part 1
const solution1 = '';

// Part 2
const solution2 = '';

// Answer
console.log([`${solution1}`, `${solution2}`]);