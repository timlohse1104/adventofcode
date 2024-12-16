const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2024/day/07

// Part 1
const part1 = '';

// Part 2
const part2 = '';

// Answer
console.log([`${part1}`, `${part2}`]);