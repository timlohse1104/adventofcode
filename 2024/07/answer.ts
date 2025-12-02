const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const partOneInput = decoder.decode(data).trim().split('\n');
const partTwoInput = decoder.decode(data).trim().split('\n');
// const testInpzt = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`.trim().split('\n')

// Solution for https://adventofcode.com/2024/day/07

/**
 * Parses a line and returns the target number and an array of numbers. If the line is invalid, it returns null.
 *
 * @param line The line to parse.
 * @returns An object containing the target number and an array of numbers, or null if the line is invalid.
 */
function parseLine(line: string): { target: bigint, numbers: bigint[] } | null {
  const parts = line.trim().split(':');
  if (parts.length !== 2) return null;

  const targetStr = parts[0].trim();
  const numbersStr = parts[1].trim();

  if (!targetStr || !numbersStr) return null;

  const target = BigInt(targetStr);
  const numbers = numbersStr.split(/\s+/).map(n => BigInt(n));

  return { target, numbers };
}

type MemoKey = string;

/**
 * Creates a unique key for memoization based on the current index and the cumulative value.
 *
 * @param index The current index in the array of numbers.
 */
function makeKey(index: number, currentValue: bigint): MemoKey {
  return `${index},${currentValue.toString()}`;
}


/**
 * Determines if it's possible to achieve the target number using a subset of the given numbers.
 *
 * @param target The target number to achieve.
 * @param numbers The array of numbers to use.
 * @returns true if it's possible to achieve the target number; false otherwise.
 */
function canAchieveTarget(target: bigint, numbers: bigint[]): boolean {
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
  function dfs(index: number, currentValue: bigint): boolean {
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

/**
 * Check if it's possible to achieve the target number using only addition and multiplication with given numbers.
 *
 * @param target The target number to achieve.
 * @param numbers The array of numbers to use for operations.
 * @returns true if it's possible to achieve the target using only addition and multiplication; false otherwise.
 */
function canAchieveTargetWithConcatenation(target: bigint, numbers: bigint[]): boolean {
  if (numbers.length === 0) return false;
  if (numbers.length === 1) return numbers[0] === target;

  type MemoKey = string;
  const memo = new Map<MemoKey, boolean>();

  function makeKey(index: number, accumulatedValue: bigint, lastOperand: bigint): MemoKey {
    return `${index},${accumulatedValue.toString()},${lastOperand.toString()}`;
  }

  function dfs(index: number, accumulatedValue: bigint, lastOperand: bigint): boolean {
    if (index === numbers.length) {
      return (accumulatedValue + lastOperand) === target;
    }

    const key = makeKey(index, accumulatedValue, lastOperand);
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    const nextNum = numbers[index];

    // 1) Concatenation
    const concatVal = BigInt(String(lastOperand) + String(nextNum));
    if (dfs(index + 1, accumulatedValue, concatVal)) {
      memo.set(key, true);
      return true;
    }

    // 2) Addition
    if (dfs(index + 1, accumulatedValue + lastOperand, nextNum)) {
      memo.set(key, true);
      return true;
    }

    // 3) Multiplication
    const mulVal = (accumulatedValue + lastOperand) * nextNum;
    if (dfs(index + 1, 0n, mulVal)) {
      memo.set(key, true);
      return true;
    }

    memo.set(key, false);
    return false;
  }

  return dfs(1, 0n, numbers[0]);
}

// Part 1
const part1 = partOneInput.reduce((acc, value) => {
  const parsed = parseLine(value);
  if (!parsed) return acc;

  const { target, numbers } = parsed;
  return acc + (canAchieveTarget(target, numbers) ? target : 0n);
}, 0n).toString();

// Part 2
const part2 = partTwoInput.reduce((acc, line) => {
  const parsed = parseLine(line);
  if (!parsed) return acc;

  const { target, numbers } = parsed;
  // Check if we can achieve target with concatenation as well
  return acc + (canAchieveTargetWithConcatenation(target, numbers) ? target : 0n);
}, 0n);

// Print answers
console.log([`${part1}`, `${part2}`]);