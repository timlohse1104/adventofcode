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
    console.log(`Running task for day ${day}`);

    const command = new Deno.Command(Deno.execPath(), {
      args: [
        "run",
        "--allow-read",
        `${year}/${day}/solution.ts`,
      ],
      stdout: "piped",
      stderr: "piped"
    });

    const { code, stdout, stderr } = command.outputSync();

    code === 0 ?
    console.log("stdout", new TextDecoder().decode(stdout)) :
    console.log("stderr", new TextDecoder().decode(stderr));
  });
  days = [];
});
