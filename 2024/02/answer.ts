const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// // Solution for https://adventofcode.com/2024/day/2

const reports = input.split('\n').map(line => line.split(" ").map(level => parseInt(level)));

const getLevelDifference = (first: number, second: number) => first - second;
const checkReportSafety = (report: number[], reportSign: number): boolean => {
  for (let i = 0; i < report.length - 1; i++) {
    const currentLevel = report[i];
    const nextLevel = report[i + 1];
    const levelDifference = getLevelDifference(currentLevel, nextLevel);

    // Check if the trend matches the expected sign and the difference is within range
    if (Math.sign(levelDifference) !== reportSign || Math.abs(levelDifference) > 3) {
      return false;
    }
  }
  return true;
};
const checkReportWithOneRemoval = (report: number[]): boolean => {
  // Check if the original report is safe as-is
  const originalSign = Math.sign(report[0] - report[1]);
  if (originalSign !== 0 && checkReportSafety(report, originalSign)) {
    return true;
  }

  // Try removing each level and check if the remaining report is safe
  for (let i = 0; i < report.length; i++) {
    const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
    const modifiedSign = Math.sign(modifiedReport[0] - modifiedReport[1]);

    // Check if the modified report is safe for increasing or decreasing trends
    if (modifiedSign !== 0 && checkReportSafety(modifiedReport, modifiedSign)) {
      return true;
    }
  }

  return false;
};

// Part 1
const solution1 = reports.reduce((acc, report) => {
  const reportSign = Math.sign(report[0] - report[1]);
  if (reportSign !== 0 && checkReportSafety(report, reportSign)) {
    acc++;
  }
  return acc;
}, 0);

// Part 2
const solution2 = reports.reduce((acc, report) => {
  if (checkReportWithOneRemoval(report)) {
    acc++;
  }
  return acc;
}, 0);

// Answer
console.log([`${solution1}`, `${solution2}`]);