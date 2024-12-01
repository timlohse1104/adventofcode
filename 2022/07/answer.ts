const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync(new URL("input.txt", import.meta.url).pathname);
const input = decoder.decode(data);

// Solution for https://adventofcode.com/2022/day/7

const folders = input
  .split('\n')
  .map((l, i, a) => {
    const ಠ_ಠ = { name: '', size: 0, dirs: [], files: [] };
    if (/^\$\s(cd)\s(\w+)|\//.test(l)) {
      let j = i + 2;
      ಠ_ಠ.name = l.replace('$ cd ', '');
      while (!/^\$.+/.test(a[j]) && a[j]) {
        const e = {
          type: /^\d+/.test(a[j]) ? 'file' : 'dir',
          name: a[j].replace(/^dir\s+/, ''),
          size: /^\d+/.test(a[j]) ? Number(a[j].replace(/\s\w+.\w+/, '')) : 0,
        };
        /^\d+/.test(a[j]) ? ಠ_ಠ.files.push(e) : ಠ_ಠ.dirs.push(e);
        j++;
      }
    }
    ಠ_ಠ.size = ಠ_ಠ.files.reduce((a, c) => a + c.size, 0);
    return ಠ_ಠ;
  })
  .filter((l) => l.name !== '')
  .reverse()
  .map((d, i, a) => {
    d.dirs.forEach((c) => {
      d.size += a.find((e) => e.name === c.name)?.size;
    });
    return d;
  });
const solution1 = folders.reduce((a, c) => a + (c.size <= 100000 ? c.size : 0), 0);

// Bonus
const sizes = input
  .split('\n')
  .filter((l) => /\d+/.test(l))
  .map((l) => Number(l.replace(/\s\w+.\w+/, '')))
  .filter((l) => l.name !== '');
// console.log('required', 30000000 - (70000000 - sizes.reduce((a, c) => a + c, 0)));
const solution2 = Math.min(...folders.filter((f) => f.size >= 30000000 - (70000000 - sizes.reduce((a, c) => a + c, 0))).map((e) => e.size));

// returns 8701334, correct answer is 7421137 - what am I missing?

console.log([`${solution1}`, `${solution2}`]);
