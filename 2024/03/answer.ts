const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2024/day/3

const globalMulRegex = /mul\(\d+,\d+\)/g;
const localMulRegex = /mul\((\d+),(\d+)\)/;
const doRegex = /do\(\)/;
const dontRegex = /don't\(\)/;

const multiply = (a:string, b:string) => parseInt(a) * parseInt(b);
const sequentialParser = (input: string): number => {
  let mulEnabled = true;
  let sum = 0;

  const parsedTokens = input.split(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/);

  for (const token of parsedTokens) {
      if (!token.trim()) continue;

      if (token.match(doRegex)) {
        mulEnabled = true;
      } else if (dontRegex.test(token)) {
        mulEnabled = false;
      } else if (mulEnabled && localMulRegex.test(token)) {
          const mulOperation = token.match(/\d+,\d+/)?.[0].split(',');
          sum += multiply(mulOperation![0], mulOperation![1]);
      }
  }

  return sum;
};

const mulOperations = input.match(globalMulRegex)?.map(mul => mul.match(/\d+,\d+/)?.[0].split(','));

// Part 1
const solution1 = mulOperations?.reduce((acc, operation) => acc + multiply(operation![0], operation![1]), 0);

// Part 2
const solution2 = sequentialParser(input);

// Answer
console.log([`${solution1}`, `${solution2}`]);
