'use strict';

import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

// Solution for https://adventofcode.com/2022/day/7

console.log(
  input
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
    })
    .reduce((a, c) => a + (c.size <= 100000 ? c.size : 0), 0)
);

