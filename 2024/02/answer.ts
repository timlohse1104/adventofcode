const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2024/day/2

const getLevelDifference = (first: number, second: number) => first - second;

const reports = input.split('\n').map(line => line.split(" ").map(level => parseInt(level)));

const solution1 = reports.reduce((acc, report) => {
  // Get weather the report numbers increase / decrease
  const reportSign = Math.sign(report[0] - report[1]);
  if(reportSign !== 0) {
    const isReportSafe = report.every((currentLevel,i,report) => {
      // Skip the last entry in the report
      const nextLevel = report[i + 1];
      if(nextLevel === undefined) return true;
      const levelDifference = getLevelDifference(currentLevel, nextLevel);
      // Level difference should always be consistent with general report sign, e.g. -1 / 1 (decreasing / increasing)
      if(Math.sign(levelDifference) !== reportSign) return false;

      return Math.abs(levelDifference) <= 3;
    })
    if(isReportSafe) acc++;
  }
  return acc;
},0);

// Bonus

const solution2 = '';

// Answer
console.log([`${solution1}`, `${solution2}`]);
