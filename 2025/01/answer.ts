const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2025/day/1



// Part 1
export const part1 = 'foo';

// Part 2
export const part2 = 'bar';

// Debugging
console.log([`${part1}`, `${part2}`]);
