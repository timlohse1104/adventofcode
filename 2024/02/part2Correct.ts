const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2024/day/2

const reports = input.split('\n').map(line => line.split(" ").map(level => parseInt(level)));

function decreasing(e, i, arr) {
  return i == 0 || (e < arr[i - 1] && arr[i - 1] - e < 4)
}

function increasing(e, i, arr) {
  return i == 0 || (e > arr[i - 1] && e - arr[i - 1] < 4)
}
function cut(arr, i) {
  return arr.slice(0, i).concat(arr.slice(i + 1, arr.length))
}

function everyButOne(arr, f) {
  if (arr.every(f)) return true
  return arr.some((e, i, a) => cut(a, i).every(f))
}
const solution2 = reports.map(row => everyButOne(row, decreasing) || everyButOne(row, increasing))
.filter(Boolean).length

console.log(solution2);
