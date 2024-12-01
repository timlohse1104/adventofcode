const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

const getLineDistance = (first: number, second: number) => Math.abs(first - second);

const distances = input.split('\n').map(line => line.split(/\s+/g)).flat();
const firstHalf = [];
const secondHalf = [];

for (let i = 0; i < distances.length; i++) {
  if(i % 2 === 0) {
    firstHalf.push(distances[i]);
  } else {
    secondHalf.push(distances[i]);
  }
}
const sortedDistances = [firstHalf.sort(), secondHalf.sort()];
const solution1 = sortedDistances[0].reduce((acc, firstDistance, index) => acc + getLineDistance(parseInt(firstDistance), parseInt(sortedDistances[1][index])),0);

// Bonus

console.log([`${solution1}`]);
