const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2022/day/8

// look around
// left/right/top/bottom neighbor? - no: exposed, yes: compare height of alle neighbors -> lower: exposed, higher/equal: not exposed

const grid = input.split('\n').map((l) => l.split('').map((e) => Number(e)));
const getNeighbors = (grid, x, y) => {
  const neighbors = { left: [], right: [], top: [], bottom: [] };
  for (let i = 1; i <= grid.length; i++) {
    if (grid[y - i]) neighbors.top.push(grid[y - i][x]);
    if (grid[y + i]) neighbors.bottom.push(grid[y + i][x]);
    if (grid[y][x - i] || grid[y][x - i] === 0) neighbors.left.push(grid[y][x - i]);
    if (grid[y][x + i] || grid[y][x + i] === 0) neighbors.right.push(grid[y][x + i]);
  }
  return neighbors;
};

const isExposed = (c, n) => {
  return (
    n.left.filter((e) => e >= c).length === 0 ||
    n.right.filter((e) => e >= c).length === 0 ||
    n.top.filter((e) => e >= c).length === 0 ||
    n.bottom.filter((e) => e >= c).length === 0
  );
};

const getRowExposedCount = (r, y, g) => {
  const foo = r.reduce((a, c, x) => {
    const neighbors = getNeighbors(g, x, y);
    return a + (Object.values(neighbors).filter((n) => n.length > 0).length < 4 ? 1 : isExposed(c, neighbors) ? 1 : 0);
  }, 0);
  return foo;
};

console.log(grid.reduce((a, c, y, g) => a + getRowExposedCount(c, y, g), 0));

// Bonus
const getDirectionCount = (t, d) => {
  let count = 0;
  d.every((e) => {
    if (e >= t) {
      count++;
      return false;
    }
    count++;
    return true;
  });
  return count;
};

const calcScenicScoreOfRow = (r, y, g) =>
  r.map((t, x) => {
    const n = getNeighbors(g, x, y);
    return getDirectionCount(t, n.left) * getDirectionCount(t, n.right) * getDirectionCount(t, n.top) * getDirectionCount(t, n.bottom);
  });
console.log('Bonus', Math.max(...grid.map((r, y, g) => calcScenicScoreOfRow(r, y, g)).flat()));
