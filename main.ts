import { solutions } from './solutions.ts';

// https://onlineasciitools.com/convert-text-to-ascii-art - banner4
const startupMessage = {
  title: `
  ....###....########..##.....##.########.##....##.########..#######..########..######...#######..########..########
  ...##.##...##.....##.##.....##.##.......###...##....##....##.....##.##.......##....##.##.....##.##.....##.##......
  ..##...##..##.....##.##.....##.##.......####..##....##....##.....##.##.......##.......##.....##.##.....##.##......
  .##.....##.##.....##.##.....##.######...##.##.##....##....##.....##.######...##.......##.....##.##.....##.######..
  .#########.##.....##..##...##..##.......##..####....##....##.....##.##.......##.......##.....##.##.....##.##......
  .##.....##.##.....##...##.##...##.......##...###....##....##.....##.##.......##....##.##.....##.##.....##.##......
  .##.....##.########.....###....########.##....##....##.....#######..##........######...#######..########..########
  `,
  year: (year: string) => {
    const th = year.charAt(0); // thousands
    const h = year.charAt(1); // hundreds
    const t = year.charAt(2); // tens
    const o = year.charAt(3); // ones
    return `
   ____   ____   ____   ____
  ||${th} || ||${h} || ||${t} || ||${o} ||
  ||__|| ||__|| ||__|| ||__||
  |/__\\| |/__\\| |/__\\| |/__\\|
  `
  },
};

console.log(startupMessage.title);

const years: string[] = [];
for (const dirEntry of Deno.readDirSync(".")) {
  if (dirEntry.isDirectory && parseInt(dirEntry.name)) years.push(dirEntry.name); // Filter only folders with numbers as names
}

years.sort((a, b) => parseInt(a) - parseInt(b));

let days: string[] = [];
for(const year of years) {
  console.log(startupMessage.year(year));

  for (const dirEntry of Deno.readDirSync(year)) {
    if (dirEntry.isDirectory && parseInt(dirEntry.name)) days.push(dirEntry.name); // Filter only folders with numbers as names
  };
  days.sort((a, b) => parseInt(a) - parseInt(b));

  if(days.length === 0){
    console.log('No days to solve in this year.')
    continue;
  }

  for(const day of days) {
    if (!(solutions as any)[year][day]) continue;

    const currentDayAnswers =  await import (`./${year}/${day}/answer.ts`);
    const {part1, part2} = currentDayAnswers.default || currentDayAnswers;

    if(!part1 && !part2){
      console.error(`\x1b[31mNo answers found in ./${year}/${day}/answer.ts\x1b[0m`)
    } else {
      console.log(`\n\x1b[1mRunning test for day ${day}\x1b[0m`);
      const solutionsOfTheDay = (solutions as any)[year][day];
      const parts = [part1, part2].filter(Boolean);

      parts.forEach( (answer, index) => {
        const partSolution = solutionsOfTheDay[index];
        answer === partSolution ? console.log(`\x1b[32mDay ${day} Part ${index + 1} passed the test.\x1b[0m Correct value: ${partSolution}`) : console.error(`\x1b[31mDay ${day} Part ${index + 1} failed the test. \x1b[31m${answer} (actual)\x1b[0m / \x1b[32m${partSolution} (expected)\x1b[0m`);
      })
    };
  };
  days = [];
};
