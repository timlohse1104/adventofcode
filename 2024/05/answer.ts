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

function topologicalSort(update: number[], rules: [number, number][]): number[] {
  const graph = new Map<number, number[]>();
  const inDegree = new Map<number, number>();

  // Initialize the graph and in-degree map
  for (const page of update) {
      graph.set(page, []);
      inDegree.set(page, 0);
  }

  // Build the graph and update in-degrees
  for (const [x, y] of rules) {
      if (graph.has(x) && graph.has(y)) {
          graph.get(x)!.push(y);
          inDegree.set(y, inDegree.get(y)! + 1);
      }
  }

  const queue: number[] = [];

  // Enqueue pages with zero in-degree
  for (const [page, degree] of inDegree.entries()) {
      if (degree === 0) {
          queue.push(page);
      }
  }

  const sorted: number[] = [];

  while (queue.length > 0) {
      const page = queue.shift()!;
      sorted.push(page);

      for (const neighbor of graph.get(page)!) {
          inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
          if (inDegree.get(neighbor) === 0) {
              queue.push(neighbor);
          }
      }
  }

  return sorted;
}

function calculateSumOfMiddlePagesForIncorrectUpdates(input: string): number {
  const { rules, updates } = parseInput(input);
  let sum = 0;

  for (const update of updates) {
      if (!isOrdered(update, rules)) {
          const orderedUpdate = topologicalSort(update, rules);
          sum += findMiddleElement(orderedUpdate);
      }
  }

  return sum;
}

// Solution for Part 1
const solution1 = calculateSumOfMiddlePages(input);

// Solution for Part 2
const solution2 = calculateSumOfMiddlePagesForIncorrectUpdates(input);

// Answer
console.log([`${solution1}`, `${solution2}`]);