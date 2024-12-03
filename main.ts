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
years.forEach( year =>  {
  console.log(startupMessage.year(year));

  for (const dirEntry of Deno.readDirSync(year)) {
    if (dirEntry.isDirectory && parseInt(dirEntry.name)) days.push(dirEntry.name); // Filter only folders with numbers as names
  };
  days.sort((a, b) => parseInt(a) - parseInt(b));

  days.forEach(day => {
    if (!(solutions as any)[year][day]) return;

    const command = new Deno.Command(Deno.execPath(), {
      args: [
        "run",
        "--allow-read",
        `${year}/${day}/answer.ts`,
      ],
      stdout: "piped",
      stderr: "piped"
    });

    const { code, stdout, stderr } = command.outputSync();

    if(code === 1) {
      console.error("stderr", new TextDecoder().decode(stderr))
    } else {
      console.log(`\n\x1b[1mRunning test for day ${day}\x1b[0m`);
      const dayResult = JSON.parse(new TextDecoder().decode(stdout));
      try {
        const solutionsOfTheDay = (solutions as any)[year][day];

        dayResult.forEach( (answer, index) => {
          const partSolution = solutionsOfTheDay[index];
          answer === partSolution ? console.log(`\x1b[32mDay ${day} Part ${index + 1} passed the test.\x1b[0m Correct value: ${partSolution}`) : console.error(`\x1b[31mDay ${day} Part ${index + 1} failed the test. \x1b[31m${answer} (actual)\x1b[0m / \x1b[32m${partSolution} (expected)\x1b[0m`);
        })
      } catch(e) {
        console.error(e);
      }
    };
  });
  days = [];
});
