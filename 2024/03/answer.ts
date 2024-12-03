const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2024/day/3

const multiply = (a:string, b:string) => parseInt(a) * parseInt(b);
const mulRegex = /mul\(\d+,\d+\)/g;
const mulOperations = input.match(mulRegex)?.map(mul => mul.match(/\d+,\d+/)?.[0].split(','));
console.log(mulOperations)

const solution1 = mulOperations?.reduce((acc, operation) => acc + multiply(operation![0], operation![1]), 0);

// Bonus
const solution2 = '';

// Answer
console.log([`${solution1}`, `${solution2}`]);
