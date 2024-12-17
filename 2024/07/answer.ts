const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data).trim().split('\n');

// Solution for https://adventofcode.com/2024/day/07

/**
 * Parses a line and returns the target number and an array of numbers. If the line is invalid, it returns null.
 *
 * @param line The line to parse.
 * @returns An object containing the target number and an array of numbers, or null if the line is invalid.
 */
function parseLine(line: string): { target: number, numbers: number[] } | null {
  // A line looks like: "192: 17 8 14"
  const parts = line.trim().split(':');
  if (parts.length !== 2) return null;

  const targetStr = parts[0].trim();
  const numbersStr = parts[1].trim();

  if (!targetStr || !numbersStr) return null;

  const target = parseInt(targetStr);
  const numbers = numbersStr.split(/\s+/).map(n => parseInt(n));

  return { target, numbers };
}

type MemoKey = string;

/**
 * Creates a unique key for memoization based on the current index and the cumulative value.
 *
 * @param index The current index in the array of numbers.
 */
function makeKey(index: number, currentValue: number): MemoKey {
  return `${index},${currentValue.toString()}`;
}


/**
 * Determines if it's possible to achieve the target number using a subset of the given numbers.
 *
 * @param target The target number to achieve.
 * @param numbers The array of numbers to use.
 * @returns true if it's possible to achieve the target number; false otherwise.
 */
function canAchieveTarget(target: number, numbers: number[]): boolean {
  if (numbers.length === 0) return false;
  if (numbers.length === 1) return numbers[0] === target;

  const memo = new Map<MemoKey, boolean>();

  /**
   * Depth-First Search helper function to explore all possibilities.
   *
   * @param index The current index in the array of numbers.
   * @param currentValue The cumulative value so far.
   * @returns true if it's possible to achieve the target number from this state; false otherwise.
   */
  function dfs(index: number, currentValue: number): boolean {
    // index: next number index to process
    // currentValue: value so far
    if (index === numbers.length) {
      return currentValue === target;
    }

    const key = makeKey(index, currentValue);
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    const nextNum = numbers[index];

    // Try addition
    if (dfs(index + 1, currentValue + nextNum)) {
      memo.set(key, true);
      return true;
    }

    // Try multiplication
    if (dfs(index + 1, currentValue * nextNum)) {
      memo.set(key, true);
      return true;
    }

    memo.set(key, false);
    return false;
  }

  // Start from the first number as the initial currentValue
  return dfs(1, numbers[0]);
}

// Part 1
const part1 = input.reduce((acc, value) => {
  const parsed = parseLine(value);
  if (!parsed) return acc;
  const { target, numbers } = parsed;

  return acc + (canAchieveTarget(target, numbers) ? target : 0);
}, 0).toString();

// Part 2
const part2 = '';

// Print answers
console.log([`${part1}`, `${part2}`]);