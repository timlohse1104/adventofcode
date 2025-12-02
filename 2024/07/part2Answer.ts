const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data).trim().split('\n');

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

function canAchieveTargetWithConcatenation(target: bigint, numbers: bigint[]): boolean {
  if (numbers.length === 0) return false;
  if (numbers.length === 1) return numbers[0] === target;

  type MemoKey = string;
  const memo = new Map<MemoKey, boolean>();

  function dfs(index: number, accumulatedValue: bigint, lastOperand: bigint): boolean {
    if (index === numbers.length) {
      return (accumulatedValue + lastOperand) === target;
    }

    const key = `${index},${accumulatedValue},${lastOperand}`;
    if (memo.has(key)) return memo.get(key)!;

    const nextNum = numbers[index];

    // Concatenation
    {
      const concatVal = BigInt(String(lastOperand) + String(nextNum));
      if (dfs(index + 1, accumulatedValue, concatVal)) {
        memo.set(key, true);
        return true;
      }
    }

    // Addition
    {
      const addVal = accumulatedValue + lastOperand;
      if (dfs(index + 1, addVal, nextNum)) {
        memo.set(key, true);
        return true;
      }
    }

    // Multiplication
    {
      const mulVal = (accumulatedValue + lastOperand) * nextNum;
      if (dfs(index + 1, 0n, mulVal)) {
        memo.set(key, true);
        return true;
      }
    }

    memo.set(key, false);
    return false;
  }

  return dfs(1, 0n, numbers[0]);
}

// Compute only the part two result
const part2Sum = input.reduce((acc, line) => {
  const parsed = parseLine(line);
  if (!parsed) return acc;
  const { target, numbers } = parsed;
  return acc + (canAchieveTargetWithConcatenation(target, numbers) ? target : 0n);
}, 0n);

// Print only the part two answer
console.log(part2Sum.toString());
