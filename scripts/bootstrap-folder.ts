import { existsSync, mkdirSync } from 'node:fs';
const encoder = new TextEncoder();

const [year, day] = Deno.args;
const folderPath = `./${year}/${day}`;
if (!existsSync(folderPath)) {
  mkdirSync(folderPath);
}
const answerFileContent = encoder.encode(`const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/${year}/day/${day}

// Part 1
const solution1 = '';

// Part 2
const solution2 = '';

// Answer
console.log([\`\${solution1}\`, \`\${solution2}\`]);`);

Deno.writeFileSync(`${folderPath}/answer.ts`, answerFileContent);
Deno.writeFileSync(`${folderPath}/input.txt`, encoder.encode(''));
Deno.writeFileSync(`${folderPath}/task.md`, encoder.encode(''));
