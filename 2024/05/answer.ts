const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2024/day/05

function parseInput(input: string): { rules: [number, number][], updates: number[][] } {
  const sections = input.trim().split('\n\n');
  const rules = sections[0].split('\n').map(line => {
      const [x, y] = line.split('|').map(Number);
      return [x, y];
  });
  const updates = sections[1].split('\n').map(line => line.split(',').map(Number));
  return { rules, updates };
}

function isOrdered(update: number[], rules: [number, number][]): boolean {
  const indexMap = new Map<number, number>();
  update.forEach((page, index) => indexMap.set(page, index));

  for (const [x, y] of rules) {
      if (indexMap.has(x) && indexMap.has(y)) {
          if (indexMap.get(x)! >= indexMap.get(y)!) {
              return false;
          }
      }
  }
  return true;
}

function findMiddleElement(arr: number[]): number {
  const middleIndex = Math.floor(arr.length / 2);
  return arr[middleIndex];
}

function calculateSumOfMiddlePages(input: string): number {
  const { rules, updates } = parseInput(input);
  let sum = 0;

  for (const update of updates) {
      if (isOrdered(update, rules)) {
          sum += findMiddleElement(update);
      }
  }

  return sum;
}


const inputMock = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

// Solution for Part 1
const solution1 = calculateSumOfMiddlePages(input);

// Solution for Part 2
const solution2 = '';

// Answer
console.log([`${solution1}`, `${solution2}`]);